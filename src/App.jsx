// 전체 앱의 최상위 컨트롤러: 페이지 라우팅(홈/로그인/내 정보/관리자), Firebase Auth, SQL Connect 연결 관리
import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Sparkles, X, Calculator } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PortfolioViewer from './components/PortfolioViewer'
import QuoteBuilder from './components/QuoteBuilder'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage'
import LegalPage from './components/LegalPage'
import {
  portfolioSites as defaultSites,
  quotePlans as defaultPlans,
  quoteFeatures as defaultFeatures,
} from './data/portfolioData'
import { STORAGE_KEYS } from './utils/storageCrypto'
import { auth, isFirebaseEnabled } from './lib/firebase'
import {
  defaultEventConfig,
  fetchAllAppData,
  insertQuote,
  updateQuoteStatusInDb,
  deleteQuoteInDb,
  savePortfoliosToDb,
  savePlansToDb,
  saveFeaturesToDb,
  saveEventConfigToDb,
} from './services/dbService'

const LEGAL_ROUTES = ['terms', 'privacy', 'refund', 'email-policy']

function getRouteFromHash() {
  const h = window.location.hash
  if (h === '#admin') return 'admin'
  if (h === '#login') return 'login'
  if (h === '#profile') return 'profile'
  if (h === '#terms') return 'terms'
  if (h === '#privacy') return 'privacy'
  if (h === '#refund') return 'refund'
  if (h === '#email-policy') return 'email-policy'
  return 'home'
}

export default function App() {
  // 현재 라우트 ('home' | 'login' | 'profile' | 'admin')
  const [route, setRoute] = useState(getRouteFromHash)
  // Firebase 사용자 로그인 상태
  const [currentUser, setCurrentUser] = useState(null)
  const [authReady, setAuthReady] = useState(!auth)

  // 관리자 로그인 여부 (세션 동안 유지)
  const [isAdminAuth, setIsAdminAuth] = useState(
    () => sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true'
  )

  // 포트폴리오 뷰어에서 선택한 스타일을 견적 계산기로 연결
  const [preselectedPlanId, setPreselectedPlanId] = useState(null)

  // 핵심 데이터 상태
  const [portfolios, setPortfolios] = useState(defaultSites)
  const [plans, setPlans] = useState(defaultPlans)
  const [features, setFeatures] = useState(defaultFeatures)
  const [eventConfig, setEventConfig] = useState(defaultEventConfig)
  const [quotes, setQuotes] = useState([])

  // 메인 페이지 진입 시 반값 할인 팝업 표시 여부
  const [showEventPopup, setShowEventPopup] = useState(false)

  // Firebase Auth 로그인 상태 구독
  useEffect(() => {
    if (!auth) return undefined
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setAuthReady(true)
    })
    return () => unsubscribe()
  }, [])

  // 앱 시작 시 Firebase SQL Connect(또는 localStorage)에서 전체 데이터 불러오기
  useEffect(() => {
    async function init() {
      const data = await fetchAllAppData()
      setPortfolios(data.portfolios)
      setPlans(data.plans)
      setFeatures(data.features)
      setEventConfig(data.eventConfig)
      setQuotes(data.quotes)
    }
    init()
  }, [])

  // 메인 홈 화면일 때만 반값 할인 팝업 표시
  useEffect(() => {
    if (route === 'home' && eventConfig.isHalfPriceActive) {
      setShowEventPopup(true)
    } else {
      setShowEventPopup(false)
    }
  }, [route, eventConfig.isHalfPriceActive])

  // URL 해시 변경 감지
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // 내 정보 페이지 보호: 비로그인 상태에서 #profile 접근 시 로그인 페이지로 이동
  useEffect(() => {
    if (authReady && route === 'profile' && !currentUser) {
      navigateTo('login')
    }
  }, [authReady, route, currentUser])

  const navigateTo = (target, scrollTop = true) => {
    const hashMap = {
      home: '',
      login: '#login',
      profile: '#profile',
      admin: '#admin',
      terms: '#terms',
      privacy: '#privacy',
      refund: '#refund',
      'email-policy': '#email-policy',
    }
    window.location.hash = hashMap[target] ?? ''
    setRoute(target)
    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // 사용자 로그아웃 처리
  const handleUserLogout = async () => {
    if (auth) {
      await signOut(auth)
    }
    if (route === 'profile') {
      navigateTo('home')
    }
  }

  // 견적 제출 처리 (AES-GCM 암호화 후 DB 저장)
  const handleSubmitQuote = async (quoteData) => {
    const created = await insertQuote(quoteData, quotes)
    setQuotes((prev) => [created, ...prev])
  }

  // 관리자: 견적 상태 변경 / 삭제
  const handleUpdateQuoteStatus = async (id, nextStatus) => {
    const updated = quotes.map((q) => (q.id === id ? { ...q, status: nextStatus } : q))
    setQuotes(updated)
    await updateQuoteStatusInDb(id, nextStatus, updated)
  }

  const handleDeleteQuote = async (id) => {
    const updated = quotes.filter((q) => q.id !== id)
    setQuotes(updated)
    await deleteQuoteInDb(id, updated)
  }

  // 관리자: 포트폴리오 / 단가 / 이벤트 저장
  const handleSavePortfolios = async (nextPortfolios) => {
    const prev = portfolios
    setPortfolios(nextPortfolios)
    await savePortfoliosToDb(nextPortfolios, prev)
  }

  const handleSavePlans = async (nextPlans) => {
    setPlans(nextPlans)
    await savePlansToDb(nextPlans)
  }

  const handleSaveFeatures = async (nextFeatures) => {
    setFeatures(nextFeatures)
    await saveFeaturesToDb(nextFeatures)
  }

  const handleSaveEventConfig = async (nextConfig) => {
    setEventConfig(nextConfig)
    await saveEventConfigToDb(nextConfig)
  }

  const handleResetDefaults = async () => {
    if (!window.confirm('포트폴리오와 견적 단가를 초기 기본값으로 되돌릴까요?')) return
    await Promise.all([
      handleSavePortfolios(defaultSites),
      handleSavePlans(defaultPlans),
      handleSaveFeatures(defaultFeatures),
    ])
  }

  // 관리자 인증 처리
  const handleAdminLoginSuccess = () => {
    setIsAdminAuth(true)
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true')
  }

  const handleAdminLogout = () => {
    setIsAdminAuth(false)
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION)
  }

  return (
    <>
      <div className="bg-effects" aria-hidden="true">
        <div className="bg-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {route === 'admin' ? (
        <main>
          <AdminDashboard
            isAuthenticated={isAdminAuth}
            isFirebaseEnabled={isFirebaseEnabled}
            onLoginSuccess={handleAdminLoginSuccess}
            onLogout={handleAdminLogout}
            onExitAdmin={() => navigateTo('home')}
            quotes={quotes}
            onUpdateQuoteStatus={handleUpdateQuoteStatus}
            onDeleteQuote={handleDeleteQuote}
            portfolios={portfolios}
            onSavePortfolios={handleSavePortfolios}
            plans={plans}
            onSavePlans={handleSavePlans}
            features={features}
            onSaveFeatures={handleSaveFeatures}
            eventConfig={eventConfig}
            onSaveEventConfig={handleSaveEventConfig}
            onResetDefaults={handleResetDefaults}
          />
        </main>
      ) : (
        <>
          <Navbar
            currentUser={currentUser}
            onGoHome={(scroll = true) => navigateTo('home', scroll)}
            onOpenLogin={() => navigateTo('login')}
            onOpenProfile={() => navigateTo('profile')}
            onLogout={handleUserLogout}
          />

          {route === 'login' && (
            <main>
              <LoginPage
                onSuccess={() => navigateTo('profile')}
                onBackHome={() => navigateTo('home')}
              />
            </main>
          )}

          {route === 'profile' && (
            <main>
              <ProfilePage
                user={currentUser}
                onLogout={handleUserLogout}
                onBackHome={() => navigateTo('home')}
              />
            </main>
          )}

          {LEGAL_ROUTES.includes(route) && (
            <main>
              <LegalPage
                activeKey={route}
                onSelectDoc={(docKey) => navigateTo(docKey)}
                onBackHome={() => navigateTo('home')}
              />
            </main>
          )}

          {route === 'home' && (
            <main>
              <Hero />
              <PortfolioViewer
                portfolios={portfolios}
                onSelectStyleForQuote={setPreselectedPlanId}
              />
              <QuoteBuilder
                plans={plans}
                features={features}
                eventConfig={eventConfig}
                preselectedPlanId={preselectedPlanId}
                onSubmitQuote={handleSubmitQuote}
              />
            </main>
          )}

          <Footer
            onOpenAdmin={() => navigateTo('admin')}
            onOpenLegal={(docKey) => navigateTo(docKey)}
          />

          {/* 관리자에서 반값 할인 이벤트를 켰을 때 메인 페이지에 뜨는 팝업 */}
          {route === 'home' && showEventPopup && (
            <div className="modal-backdrop" onClick={() => setShowEventPopup(false)}>
              <div
                className="modal-content event-popup-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="modal-close"
                  aria-label="닫기"
                  onClick={() => setShowEventPopup(false)}
                >
                  <X size={18} />
                </button>

                <div className="event-popup-badge">
                  <Sparkles size={15} />
                  <span>LIMITED TIME · 50% OFF</span>
                </div>

                <h3 className="event-popup-title">{eventConfig.title}</h3>
                <p className="event-popup-desc">{eventConfig.subtitle}</p>

                <div className="event-popup-actions">
                  <button
                    type="button"
                    className="btn btn-glass"
                    onClick={() => setShowEventPopup(false)}
                  >
                    닫기
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setShowEventPopup(false)
                      const el = document.getElementById('quote')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <Calculator size={16} />
                    <span>반값으로 견적 내러가기</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
