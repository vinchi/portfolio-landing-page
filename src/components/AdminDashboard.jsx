// 관리자 전용 대시보드 컴포넌트: 견적 문의 관리, 포트폴리오 CRUD, 견적 단가 수정 기능 제공
import { useState } from 'react'
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  LogOut,
  FileText,
  LayoutGrid,
  Sliders,
  Trash2,
  Plus,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import { verifyAdminPassword } from '../utils/storageCrypto'

const STATUS_OPTIONS = ['접수대기', '상담중', '견적발송', '계약완료']

export default function AdminDashboard({
  isAuthenticated,
  onLoginSuccess,
  onLogout,
  onExitAdmin,
  quotes,
  onUpdateQuoteStatus,
  onDeleteQuote,
  portfolios,
  onSavePortfolios,
  plans,
  onSavePlans,
  features,
  onSaveFeatures,
  eventConfig,
  onSaveEventConfig,
  onResetDefaults,
}) {
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState('quotes') // 'quotes' | 'portfolios' | 'pricing'

  // 새 포트폴리오 추가 폼 상태
  const [newSite, setNewSite] = useState({
    name: '',
    category: '',
    url: '/demos/landing.html',
    displayUrl: 'https://new-site.portfolio.dev',
    thumbnail: '/images/demo-landing.jpg',
    description: '',
    matchedPlanId: plans[0]?.id || 'plan-landing',
  })

  // 관리자 로그인 처리 (SHA-256 해시 검증)
  const handleLogin = async (e) => {
    e.preventDefault()
    const isValid = await verifyAdminPassword(passwordInput)
    if (isValid) {
      setLoginError('')
      setPasswordInput('')
      onLoginSuccess()
    } else {
      setLoginError('비밀번호가 올바르지 않습니다. (초기 비밀번호: admin1234)')
    }
  }

  // 포트폴리오 항목 수정
  const handlePortfolioChange = (id, field, value) => {
    const updated = portfolios.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    )
    onSavePortfolios(updated)
  }

  // 새 포트폴리오 추가
  const handleAddPortfolio = (e) => {
    e.preventDefault()
    if (!newSite.name.trim() || !newSite.url.trim()) return
    const created = {
      ...newSite,
      id: `site-${Date.now()}`,
    }
    onSavePortfolios([...portfolios, created])
    setNewSite({
      name: '',
      category: '',
      url: '/demos/landing.html',
      displayUrl: 'https://new-site.portfolio.dev',
      thumbnail: '/images/demo-landing.jpg',
      description: '',
      matchedPlanId: plans[0]?.id || 'plan-landing',
    })
  }

  // 포트폴리오 삭제
  const handleDeletePortfolio = (id) => {
    if (portfolios.length <= 1) {
      alert('최소 1개 이상의 포트폴리오는 유지되어야 합니다.')
      return
    }
    onSavePortfolios(portfolios.filter((item) => item.id !== id))
  }

  // 단가(만원) / 기간(일) 숫자 수정
  const handlePlanChange = (id, field, value) => {
    const numValue = Math.max(0, Number(value) || 0)
    onSavePlans(plans.map((p) => (p.id === id ? { ...p, [field]: numValue } : p)))
  }

  const handleFeatureChange = (id, field, value) => {
    const numValue = Math.max(0, Number(value) || 0)
    onSaveFeatures(features.map((f) => (f.id === id ? { ...f, [field]: numValue } : f)))
  }

  // 1) 로그인 전 화면
  if (!isAuthenticated) {
    return (
      <section className="section admin-login-section">
        <div className="container">
          <div className="glass-card admin-login-card">
            <div className="admin-login-icon">
              <Lock size={26} />
            </div>
            <h2>관리자 로그인</h2>
            <p className="admin-login-desc">
              접수된 견적 문의 확인 및 포트폴리오·단가 관리를 위해 비밀번호를 입력해 주세요.
              <br />
              <span className="admin-hint">테스트용 초기 비밀번호: admin1234</span>
            </p>

            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="form-field">
                <label htmlFor="admin-pw">관리자 비밀번호</label>
                <input
                  id="admin-pw"
                  type="password"
                  placeholder="비밀번호 입력"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>

              {loginError && <p className="admin-error">{loginError}</p>}

              <div className="admin-login-actions">
                <button type="button" onClick={onExitAdmin} className="btn btn-glass">
                  <ArrowLeft size={16} />
                  <span>홈으로</span>
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  <ShieldCheck size={16} />
                  <span>관리자 접속</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }

  // 2) 인증 후 관리자 대시보드 화면
  const pendingCount = quotes.filter((q) => q.status === '접수대기').length

  return (
    <section className="section admin-section">
      <div className="container">
        {/* 상단 바 */}
        <div className="admin-topbar">
          <div>
            <span className="section-eyebrow">Admin Dashboard</span>
            <h1 className="admin-title">NEX.STUDIO 통합 관리자</h1>
          </div>
          <div className="admin-top-actions">
            <button type="button" onClick={onExitAdmin} className="btn btn-glass btn-sm">
              <ArrowLeft size={15} />
              <span>홈페이지 보기</span>
            </button>
            <button type="button" onClick={onLogout} className="btn btn-glass btn-sm">
              <LogOut size={15} />
              <span>로그아웃</span>
            </button>
          </div>
        </div>

        {/* 요약 통계 카드 3개 */}
        <div className="admin-stats-grid">
          <div className="glass-card admin-stat-card">
            <span>총 접수된 견적</span>
            <strong>{quotes.length}건</strong>
          </div>
          <div className="glass-card admin-stat-card">
            <span>접수 대기 중</span>
            <strong style={{ color: '#22d3ee' }}>{pendingCount}건</strong>
          </div>
          <div className="glass-card admin-stat-card">
            <span>등록된 포트폴리오</span>
            <strong>{portfolios.length}개</strong>
          </div>
        </div>

        {/* 관리 메뉴 탭 */}
        <div className="admin-tabs">
          <button
            type="button"
            onClick={() => setActiveTab('quotes')}
            className={`admin-tab-btn ${activeTab === 'quotes' ? 'active' : ''}`}
          >
            <FileText size={16} />
            <span>접수된 견적 문의 ({quotes.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('portfolios')}
            className={`admin-tab-btn ${activeTab === 'portfolios' ? 'active' : ''}`}
          >
            <LayoutGrid size={16} />
            <span>포트폴리오 관리 ({portfolios.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`admin-tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
          >
            <Sliders size={16} />
            <span>견적 단가 관리</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('event')}
            className={`admin-tab-btn ${activeTab === 'event' ? 'active' : ''}`}
          >
            <Sparkles size={16} />
            <span>
              이벤트 관리{' '}
              {eventConfig?.isHalfPriceActive && (
                <em className="admin-live-dot">ON</em>
              )}
            </span>
          </button>
        </div>

        {/* 탭 1: 접수된 견적 문의 목록 */}
        {activeTab === 'quotes' && (
          <div className="glass-card admin-panel">
            <div className="admin-panel-header">
              <h3>접수된 견적 문의 내역 (개인정보 AES-GCM 암호화 저장됨)</h3>
            </div>

            {quotes.length === 0 ? (
              <div className="admin-empty">
                아직 접수된 견적 문의가 없습니다. 홈페이지의 견적 작성기에서 견적을 제출하면
                이곳에 자동으로 기록됩니다.
              </div>
            ) : (
              <div className="admin-quote-list">
                {quotes.map((quote) => (
                  <article key={quote.id} className="admin-quote-item">
                    <div className="admin-quote-top">
                      <div>
                        <span className="admin-quote-date">{quote.createdAt}</span>
                        <h4>
                          {quote.clientName} <small>({quote.clientContact})</small>
                        </h4>
                      </div>

                      <div className="admin-quote-controls">
                        <select
                          aria-label="진행 상태"
                          value={quote.status}
                          onChange={(e) => onUpdateQuoteStatus(quote.id, e.target.value)}
                          className="admin-status-select"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>

                        <button
                          type="button"
                          onClick={() => onDeleteQuote(quote.id)}
                          className="admin-icon-btn danger"
                          title="삭제"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="admin-quote-body">
                      <div>
                        <strong>기본 유형:</strong> {quote.planName}
                      </div>
                      <div>
                        <strong>추가 기능:</strong>{' '}
                        {quote.featureNames?.length > 0 ? quote.featureNames.join(', ') : '없음'}
                      </div>
                      <div>
                        <strong>일정/금액:</strong> {quote.scheduleName} ·{' '}
                        <span style={{ color: '#22d3ee', fontWeight: 700 }}>
                          {(quote.totalPrice * 10000).toLocaleString('ko-KR')}원
                        </span>{' '}
                        (약 {quote.totalDays}일)
                      </div>
                      {quote.clientMemo && (
                        <div className="admin-quote-memo">요청사항: {quote.clientMemo}</div>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 탭 2: 포트폴리오 사이트 관리 */}
        {activeTab === 'portfolios' && (
          <div className="admin-stack">
            {/* 새 포트폴리오 추가 폼 */}
            <form onSubmit={handleAddPortfolio} className="glass-card admin-panel">
              <div className="admin-panel-header">
                <h3>새 포트폴리오 웹사이트 추가</h3>
              </div>
              <div className="form-grid">
                <div className="form-field">
                  <label>포트폴리오 이름 *</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 07. 부동산 / 인테리어 소개"
                    value={newSite.name}
                    onChange={(e) => setNewSite({ ...newSite, name: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>카테고리 태그 *</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 쇼룸 · 공간 아카이브"
                    value={newSite.category}
                    onChange={(e) => setNewSite({ ...newSite, category: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>실제 사이트 URL (iframe 주소) *</label>
                  <input
                    type="text"
                    required
                    placeholder="https://... 또는 /demos/brand.html"
                    value={newSite.url}
                    onChange={(e) => setNewSite({ ...newSite, url: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>표시용 주소 (브라우저 바)</label>
                  <input
                    type="text"
                    placeholder="https://my-site.portfolio.dev"
                    value={newSite.displayUrl}
                    onChange={(e) => setNewSite({ ...newSite, displayUrl: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-field" style={{ marginTop: '12px' }}>
                <label>설명</label>
                <input
                  type="text"
                  placeholder="포트폴리오에 대한 한 줄 설명을 입력하세요."
                  value={newSite.description}
                  onChange={(e) => setNewSite({ ...newSite, description: e.target.value })}
                />
              </div>
              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn btn-primary btn-sm">
                  <Plus size={16} />
                  <span>포트폴리오 추가하기</span>
                </button>
              </div>
            </form>

            {/* 기존 포트폴리오 수정 목록 */}
            <div className="glass-card admin-panel">
              <div className="admin-panel-header">
                <h3>등록된 포트폴리오 목록 (수정 시 메인 페이지에 즉시 반영됩니다)</h3>
              </div>
              <div className="admin-edit-list">
                {portfolios.map((site) => (
                  <div key={site.id} className="admin-edit-row">
                    <div className="admin-edit-fields">
                      <input
                        type="text"
                        value={site.name}
                        onChange={(e) => handlePortfolioChange(site.id, 'name', e.target.value)}
                        aria-label="사이트 이름"
                      />
                      <input
                        type="text"
                        value={site.url}
                        onChange={(e) => handlePortfolioChange(site.id, 'url', e.target.value)}
                        aria-label="사이트 URL"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeletePortfolio(site.id)}
                      className="admin-icon-btn danger"
                      title="포트폴리오 삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 탭 3: 견적 단가 및 기간 관리 */}
        {activeTab === 'pricing' && (
          <div className="glass-card admin-panel">
            <div className="admin-panel-header">
              <h3>견적 기본 유형 및 추가 기능 단가 관리 (단위: 만원 / 일)</h3>
              <button type="button" onClick={onResetDefaults} className="btn btn-glass btn-sm">
                <RotateCcw size={14} />
                <span>기본값으로 복원</span>
              </button>
            </div>

            <h4 className="admin-subhead">1. 웹사이트 기본 유형</h4>
            <div className="admin-pricing-list">
              {plans.map((plan) => (
                <div key={plan.id} className="admin-pricing-row">
                  <span className="admin-pricing-name">{plan.name}</span>
                  <div className="admin-pricing-inputs">
                    <label>
                      금액(만원)
                      <input
                        type="number"
                        value={plan.price}
                        onChange={(e) => handlePlanChange(plan.id, 'price', e.target.value)}
                      />
                    </label>
                    <label>
                      기간(일)
                      <input
                        type="number"
                        value={plan.days}
                        onChange={(e) => handlePlanChange(plan.id, 'days', e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h4 className="admin-subhead" style={{ marginTop: '24px' }}>
              2. 추가 기능 옵션
            </h4>
            <div className="admin-pricing-list">
              {features.map((feat) => (
                <div key={feat.id} className="admin-pricing-row">
                  <span className="admin-pricing-name">{feat.name}</span>
                  <div className="admin-pricing-inputs">
                    <label>
                      금액(만원)
                      <input
                        type="number"
                        value={feat.price}
                        onChange={(e) => handleFeatureChange(feat.id, 'price', e.target.value)}
                      />
                    </label>
                    <label>
                      기간(일)
                      <input
                        type="number"
                        value={feat.days}
                        onChange={(e) => handleFeatureChange(feat.id, 'days', e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* 탭 4: 반값 할인 이벤트 관리 */}
        {activeTab === 'event' && (
          <div className="glass-card admin-panel">
            <div className="admin-panel-header">
              <h3>반값 할인(50% OFF) 이벤트 설정</h3>
              <span
                className={`event-status-pill ${
                  eventConfig.isHalfPriceActive ? 'on' : 'off'
                }`}
              >
                {eventConfig.isHalfPriceActive ? '이벤트 진행 중 (50% 할인)' : '이벤트 꺼짐'}
              </span>
            </div>

            {/* 반값 할인 ON/OFF 토글 박스 */}
            <div className="admin-event-toggle-box">
              <div>
                <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '4px' }}>
                  전 품목 50% 반값 할인 이벤트 활성화
                </strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                  활성화하면 메인 페이지 접속 시 반값 할인 팝업이 자동으로 뜨고, 견적 계산기의 모든
                  금액이 50% 할인가로 적용됩니다.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onSaveEventConfig({
                    ...eventConfig,
                    isHalfPriceActive: !eventConfig.isHalfPriceActive,
                  })
                }
                className={`btn ${
                  eventConfig.isHalfPriceActive ? 'btn-primary' : 'btn-glass'
                }`}
              >
                {eventConfig.isHalfPriceActive ? '반값 할인 켜짐 (끄기)' : '반값 할인 켜기'}
              </button>
            </div>

            {/* 팝업 문구 수정 */}
            <div className="form-grid" style={{ marginTop: '22px' }}>
              <div className="form-field">
                <label htmlFor="ev-title">메인 팝업 제목</label>
                <input
                  id="ev-title"
                  type="text"
                  value={eventConfig.title}
                  onChange={(e) =>
                    onSaveEventConfig({ ...eventConfig, title: e.target.value })
                  }
                />
              </div>
              <div className="form-field">
                <label htmlFor="ev-sub">메인 팝업 안내 문구</label>
                <input
                  id="ev-sub"
                  type="text"
                  value={eventConfig.subtitle}
                  onChange={(e) =>
                    onSaveEventConfig({ ...eventConfig, subtitle: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
