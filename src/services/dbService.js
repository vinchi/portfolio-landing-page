/**
 * 📦 데이터베이스 통합 서비스 (Firebase SQL Connect + 로컬 저장소 자동 폴백)
 *
 * - Firebase 설정(.env.local)이 연결되어 있으면 Cloud SQL(PostgreSQL)에 영구 저장합니다.
 * - 설정이 아직 없으면 브라우저 localStorage에 저장하여 에러 없이 동작합니다.
 * - 의뢰인 개인정보(성함, 연락처, 메모)는 DB 전송 전 반드시 AES-GCM 암호화를 거칩니다.
 */
import {
  listPortfolios,
  listQuotePlans,
  listQuoteFeatures,
  getEventConfig,
  listQuotes,
  createQuote,
  updateQuoteStatus,
  deleteQuote,
  upsertPortfolio,
  deletePortfolio,
  upsertQuotePlan,
  upsertQuoteFeature,
  upsertEventConfig,
} from '@nex-studio/dataconnect'
import { dataConnect, isFirebaseEnabled } from '../lib/firebase'
import { STORAGE_KEYS, encryptPayload, decryptPayload } from '../utils/storageCrypto'
import {
  portfolioSites as defaultSites,
  quotePlans as defaultPlans,
  quoteFeatures as defaultFeatures,
} from '../data/portfolioData'

export const defaultEventConfig = {
  isHalfPriceActive: false,
  title: '🎉 특별 반값 할인 이벤트!',
  subtitle: '지금 견적을 작성하시면 모든 웹사이트 제작 비용이 50% 반값으로 자동 적용됩니다.',
}

// 앱 시작 시 전체 초기 데이터 불러오기
export async function fetchAllAppData() {
  if (!isFirebaseEnabled || !dataConnect) {
    return loadFromLocalStorage()
  }

  try {
    const [portRes, planRes, featRes, evRes, quoteRes] = await Promise.all([
      listPortfolios(dataConnect),
      listQuotePlans(dataConnect),
      listQuoteFeatures(dataConnect),
      getEventConfig(dataConnect),
      listQuotes(dataConnect),
    ])

    // 암호화된 견적 개인정보를 복호화하여 화면용 객체로 변환
    const decryptedQuotes = await Promise.all(
      (quoteRes.data?.quotes || []).map(async (row) => ({
        id: row.id,
        createdAt: new Date(row.createdAt).toLocaleString('ko-KR'),
        status: row.status,
        clientName: (await decryptPayload(row.clientNameEnc)) || '(복호화 오류)',
        clientContact: (await decryptPayload(row.clientContactEnc)) || '',
        clientMemo: (await decryptPayload(row.clientMemoEnc)) || '',
        planName: row.planName,
        featureNames: row.featureNames || [],
        scheduleName: row.scheduleName,
        totalPrice: row.totalPrice,
        totalDays: row.totalDays,
      }))
    )

    const portfolios =
      portRes.data?.portfolios?.length > 0 ? portRes.data.portfolios : defaultSites
    const plans =
      planRes.data?.quotePlans?.length > 0 ? planRes.data.quotePlans : defaultPlans
    const features =
      featRes.data?.quoteFeatures?.length > 0 ? featRes.data.quoteFeatures : defaultFeatures
    const eventConfig = evRes.data?.eventConfig
      ? {
          isHalfPriceActive: evRes.data.eventConfig.isHalfPriceActive,
          title: evRes.data.eventConfig.title,
          subtitle: evRes.data.eventConfig.subtitle,
        }
      : defaultEventConfig

    return { portfolios, plans, features, eventConfig, quotes: decryptedQuotes }
  } catch (err) {
    console.error('Firebase SQL Connect 로드 중 오류 발생, 로컬 모드로 전환:', err)
    return loadFromLocalStorage()
  }
}

async function loadFromLocalStorage() {
  const safeParse = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : fallback
    } catch {
      return fallback
    }
  }

  let quotes = []
  const encQuotes = localStorage.getItem(STORAGE_KEYS.QUOTES)
  if (encQuotes) {
    const dec = await decryptPayload(encQuotes)
    if (Array.isArray(dec)) quotes = dec
  }

  return {
    portfolios: safeParse(STORAGE_KEYS.PORTFOLIOS, defaultSites),
    plans: safeParse(STORAGE_KEYS.PLANS, defaultPlans),
    features: safeParse(STORAGE_KEYS.FEATURES, defaultFeatures),
    eventConfig: safeParse(STORAGE_KEYS.EVENT_CONFIG, defaultEventConfig),
    quotes,
  }
}

// 1. 새 견적 문의 저장 (전송 전 개인정보 AES-GCM 암호화)
export async function insertQuote(quoteData, currentQuotes) {
  const newEntry = {
    id: `quote-${Date.now()}`,
    createdAt: new Date().toLocaleString('ko-KR'),
    status: '접수대기',
    ...quoteData,
  }

  if (isFirebaseEnabled && dataConnect) {
    const [clientNameEnc, clientContactEnc, clientMemoEnc] = await Promise.all([
      encryptPayload(quoteData.clientName),
      encryptPayload(quoteData.clientContact),
      encryptPayload(quoteData.clientMemo || ''),
    ])

    await createQuote(dataConnect, {
      id: newEntry.id,
      clientNameEnc,
      clientContactEnc,
      clientMemoEnc,
      planName: quoteData.planName,
      featureNames: quoteData.featureNames || [],
      scheduleName: quoteData.scheduleName,
      totalPrice: quoteData.totalPrice,
      totalDays: quoteData.totalDays,
    })
  } else {
    const next = [newEntry, ...currentQuotes]
    localStorage.setItem(STORAGE_KEYS.QUOTES, await encryptPayload(next))
  }

  return newEntry
}

// 2. 견적 상태 변경
export async function updateQuoteStatusInDb(id, nextStatus, nextQuotes) {
  if (isFirebaseEnabled && dataConnect) {
    await updateQuoteStatus(dataConnect, { id, status: nextStatus })
  } else {
    localStorage.setItem(STORAGE_KEYS.QUOTES, await encryptPayload(nextQuotes))
  }
}

// 3. 견적 삭제
export async function deleteQuoteInDb(id, nextQuotes) {
  if (isFirebaseEnabled && dataConnect) {
    await deleteQuote(dataConnect, { id })
  } else {
    localStorage.setItem(STORAGE_KEYS.QUOTES, await encryptPayload(nextQuotes))
  }
}

// 4. 포트폴리오 목록 저장 (전체 동기화)
export async function savePortfoliosToDb(nextPortfolios, prevPortfolios = []) {
  if (isFirebaseEnabled && dataConnect) {
    const nextIds = new Set(nextPortfolios.map((p) => p.id))
    const removed = prevPortfolios.filter((p) => !nextIds.has(p.id))

    await Promise.all([
      ...removed.map((p) => deletePortfolio(dataConnect, { id: p.id })),
      ...nextPortfolios.map((p, idx) =>
        upsertPortfolio(dataConnect, {
          id: p.id,
          name: p.name,
          category: p.category,
          url: p.url,
          displayUrl: p.displayUrl || '',
          thumbnail: p.thumbnail || '/images/demo-landing.jpg',
          description: p.description || '',
          matchedPlanId: p.matchedPlanId || 'plan-landing',
          sortOrder: idx + 1,
        })
      ),
    ])
  } else {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIOS, JSON.stringify(nextPortfolios))
  }
}

// 5. 기본 유형 단가 저장
export async function savePlansToDb(nextPlans) {
  if (isFirebaseEnabled && dataConnect) {
    await Promise.all(
      nextPlans.map((p, idx) =>
        upsertQuotePlan(dataConnect, {
          id: p.id,
          name: p.name,
          subtitle: p.subtitle || '',
          price: p.price,
          days: p.days,
          sortOrder: idx + 1,
        })
      )
    )
  } else {
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(nextPlans))
  }
}

// 6. 추가 기능 단가 저장
export async function saveFeaturesToDb(nextFeatures) {
  if (isFirebaseEnabled && dataConnect) {
    await Promise.all(
      nextFeatures.map((f, idx) =>
        upsertQuoteFeature(dataConnect, {
          id: f.id,
          name: f.name,
          description: f.description || '',
          price: f.price,
          days: f.days,
          sortOrder: idx + 1,
        })
      )
    )
  } else {
    localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(nextFeatures))
  }
}

// 7. 반값 할인 이벤트 설정 저장
export async function saveEventConfigToDb(nextConfig) {
  if (isFirebaseEnabled && dataConnect) {
    await upsertEventConfig(dataConnect, {
      isHalfPriceActive: nextConfig.isHalfPriceActive,
      title: nextConfig.title,
      subtitle: nextConfig.subtitle,
    })
  } else {
    localStorage.setItem(STORAGE_KEYS.EVENT_CONFIG, JSON.stringify(nextConfig))
  }
}
