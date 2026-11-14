// 전체 앱의 최상위 컨트롤러: 일반 홈페이지 화면과 관리자 대시보드 화면을 전환하고 데이터를 관리합니다.
import { useState, useEffect } from 'react'
import { Sparkles, X, Calculator } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PortfolioViewer from './components/PortfolioViewer'
import QuoteBuilder from './components/QuoteBuilder'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import {
  portfolioSites as defaultSites,
  quotePlans as defaultPlans,
  quoteFeatures as defaultFeatures,
} from './data/portfolioData'
import { STORAGE_KEYS, encryptPayload, decryptPayload } from './utils/storageCrypto'

const defaultEventConfig = {
  isHalfPriceActive: false,
  title: '🎉 특별 반값 할인 이벤트!',
  subtitle: '지금 견적을 작성하시면 모든 웹사이트 제작 비용이 50% 반값으로 자동 적용됩니다.',
}

export default function App() {
  // 현재 화면 모드 (false: 일반 홈페이지, true: 관리자 페이지)
  const [isAdminView, setIsAdminView] = useState(() => window.location.hash === '#admin')
  // 관리자 로그인 여부 (세션 동안 유지)
  const [isAdminAuth, setIsAdminAuth] = useState(
    () => sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true'
  )

  // 포트폴리오 뷰어에서 선택한 스타일을 견적 계산기로 연결
  const [preselectedPlanId, setPreselectedPlanId] = useState(null)

  // 관리 가능한 상태 데이터 (초기값은 portfolioData.js에서 로드)
  const [portfolios, setPortfolios] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PORTFOLIOS)
      return saved ? JSON.parse(saved) : defaultSites
    } catch {
      return defaultSites
    }
  })

  const [plans, setPlans] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLANS)
      return saved ? JSON.parse(saved) : defaultPlans
    } catch {
      return defaultPlans
    }
  })

  const [features, setFeatures] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEATURES)
      return saved ? JSON.parse(saved) : defaultFeatures
    } catch {
      return defaultFeatures
    }
  })

  // 반값 할인 이벤트 설정 상태
  const [eventConfig, setEventConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENT_CONFIG)
      return saved ? JSON.parse(saved) : defaultEventConfig
    } catch {
      return defaultEventConfig
    }
  })

  // 메인 페이지 진입 시 반값 할인 팝업 표시 여부
  const [showEventPopup, setShowEventPopup] = useState(false)

  useEffect(() => {
    if (!isAdminView && eventConfig.isHalfPriceActive) {
      setShowEventPopup(true)
    } else {
      setShowEventPopup(false)
    }
  }, [isAdminView, eventConfig.isHalfPriceActive])

  // 접수된 견적 문의 목록 (AES-GCM 암호화되어 localStorage에 저장됨)
  const [quotes, setQuotes] = useState([])

  // 앱 시작 시 암호화된 견적 목록 복호화하여 불러오기
  useEffect(() => {
    async function loadQuotes() {
      const encrypted = localStorage.getItem(STORAGE_KEYS.QUOTES)
      if (encrypted) {
        const decrypted = await decryptPayload(encrypted)
        if (Array.isArray(decrypted)) {
          setQuotes(decrypted)
        }
      }
    }
    loadQuotes()
  }, [])

  // URL 해시(#admin) 변경 감지
  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // 견적 목록 변경 시 암호화하여 저장하는 헬퍼 함수
  const persistQuotes = async (nextQuotes) => {
    setQuotes(nextQuotes)
    const encrypted = await encryptPayload(nextQuotes)
    localStorage.setItem(STORAGE_KEYS.QUOTES, encrypted)
  }

  // 사용자가 견적을 제출했을 때 호출
  const handleSubmitQuote = async (quoteData) => {
    const newEntry = {
      id: `quote-${Date.now()}`,
      createdAt: new Date().toLocaleString('ko-KR'),
      status: '접수대기',
      ...quoteData,
    }
    await persistQuotes([newEntry, ...quotes])
  }

  // 관리자: 견적 상태 변경
  const handleUpdateQuoteStatus = async (id, nextStatus) => {
    const updated = quotes.map((q) => (q.id === id ? { ...q, status: nextStatus } : q))
    await persistQuotes(updated)
  }

  // 관리자: 견적 삭제
  const handleDeleteQuote = async (id) => {
    const updated = quotes.filter((q) => q.id !== id)
    await persistQuotes(updated)
  }

  // 관리자: 포트폴리오 / 단가 저장
  const handleSavePortfolios = (nextPortfolios) => {
    setPortfolios(nextPortfolios)
    localStorage.setItem(STORAGE_KEYS.PORTFOLIOS, JSON.stringify(nextPortfolios))
  }

  const handleSavePlans = (nextPlans) => {
    setPlans(nextPlans)
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(nextPlans))
  }

  const handleSaveFeatures = (nextFeatures) => {
    setFeatures(nextFeatures)
    localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(nextFeatures))
  }

  const handleSaveEventConfig = (nextConfig) => {
    setEventConfig(nextConfig)
    localStorage.setItem(STORAGE_KEYS.EVENT_CONFIG, JSON.stringify(nextConfig))
  }

  // 기본값으로 초기화
  const handleResetDefaults = () => {
    if (!window.confirm('포트폴리오와 견적 단가를 초기 기본값으로 되돌릴까요?')) return
    handleSavePortfolios(defaultSites)
    handleSavePlans(defaultPlans)
    handleSaveFeatures(defaultFeatures)
  }

  // 관리자 화면 열기/닫기 및 로그인/로그아웃
  const openAdmin = () => {
    window.location.hash = 'admin'
    setIsAdminView(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const exitAdmin = () => {
    window.location.hash = ''
    setIsAdminView(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLoginSuccess = () => {
    setIsAdminAuth(true)
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true')
  }

  const handleLogout = () => {
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

      {isAdminView ? (
        <main>
          <AdminDashboard
            isAuthenticated={isAdminAuth}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
            onExitAdmin={exitAdmin}
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
          <Navbar onOpenAdmin={openAdmin} />
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
          <Footer onOpenAdmin={openAdmin} />

          {/* 관리자에서 반값 할인 이벤트를 켰을 때 메인 페이지에 뜨는 팝업 */}
          {showEventPopup && (
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
