// 사용자가 원하는 웹사이트 유형과 기능을 선택해 실시간으로 견적을 계산·작성하는 컴포넌트
import { useState, useEffect } from 'react'
import { Check, Calculator, Copy, Send, Clock, Sparkles, X } from 'lucide-react'
import {
  quotePlans as defaultPlans,
  quoteFeatures as defaultFeatures,
  quoteSchedules,
} from '../data/portfolioData'

export default function QuoteBuilder({
  plans = defaultPlans,
  features = defaultFeatures,
  eventConfig,
  preselectedPlanId,
  onSubmitQuote,
}) {
  // 1. 선택된 기본 유형 ID
  const [selectedPlanId, setSelectedPlanId] = useState(plans[0]?.id)
  // 2. 선택된 추가 기능 ID 목록 (배열)
  const [selectedFeatureIds, setSelectedFeatureIds] = useState(['feat-responsive'])
  // 3. 선택된 일정 ID
  const [selectedScheduleId, setSelectedScheduleId] = useState(quoteSchedules[0].id)

  // 4. 의뢰인 작성 정보
  const [clientName, setClientName] = useState('')
  const [clientContact, setClientContact] = useState('')
  const [clientMemo, setClientMemo] = useState('')

  // 5. 견적서 완성 모달 & 복사 상태
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [copied, setCopied] = useState(false)

  // 위쪽 포트폴리오 뷰어에서 "이 스타일로 견적 내기"를 눌렀을 때 기본 유형을 자동으로 맞춰줍니다.
  useEffect(() => {
    if (preselectedPlanId) {
      setSelectedPlanId(preselectedPlanId)
    }
  }, [preselectedPlanId])

  // 추가 기능 체크박스 토글(켜기/끄기) 함수
  const toggleFeature = (featureId) => {
    setSelectedFeatureIds((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    )
  }

  // 현재 선택된 항목 객체 찾기
  const activePlan = plans.find((p) => p.id === selectedPlanId) || plans[0]
  const activeFeatures = features.filter((f) => selectedFeatureIds.includes(f.id))
  const activeSchedule =
    quoteSchedules.find((s) => s.id === selectedScheduleId) || quoteSchedules[0]

  // 총 예상 금액(만원 단위) 및 기간(일 단위) 실시간 계산
  const isHalfPrice = Boolean(eventConfig?.isHalfPriceActive)
  const basePrice = activePlan.price
  const featuresPrice = activeFeatures.reduce((sum, item) => sum + item.price, 0)
  const subtotal = basePrice + featuresPrice
  const regularTotalPrice = Math.round(subtotal * activeSchedule.multiplier)
  const totalPrice = isHalfPrice ? Math.round(regularTotalPrice * 0.5) : regularTotalPrice

  const baseDays = activePlan.days + activeFeatures.reduce((sum, item) => sum + item.days, 0)
  const totalDays =
    activeSchedule.id === 'sched-fast' ? Math.max(5, Math.round(baseDays * 0.7)) : baseDays

  // 숫자를 한국 원화 표기(예: 1,100,000원)로 변환해 주는 도우미 함수
  const formatKRW = (manWon) => `${(manWon * 10000).toLocaleString('ko-KR')}원`
  // 이벤트 적용 시 개별 항목 할인가 계산
  const getDisplayPrice = (manWon) => (isHalfPrice ? Math.round(manWon * 0.5) : manWon)

  // 완성된 견적서 텍스트 생성 (복사용)
  const buildSummaryText = () => {
    const featureLines =
      activeFeatures.length > 0
        ? activeFeatures.map((f) => `- ${f.name} (+${formatKRW(f.price)})`).join('\n')
        : '- 추가 기능 없음'

    return `[웹사이트 제작 맞춤 견적서]
■ 의뢰인: ${clientName || '미입력'}
■ 연락처: ${clientContact || '미입력'}

1. 기본 유형: ${activePlan.name} (${formatKRW(activePlan.price)})
2. 추가 기능:
${featureLines}
3. 제작 일정: ${activeSchedule.name} (${activeSchedule.extraLabel})

▶ 총 예상 견적: ${formatKRW(totalPrice)} (VAT 별도)
▶ 예상 제작 기간: 약 ${totalDays}일

■ 추가 요청사항:
${clientMemo || '없음'}`
  }

  // 견적서 작성 완료 버튼 클릭 처리 (관리자 목록에 암호화 저장 + 완료 모달 띄우기)
  const handleSubmitQuote = (e) => {
    e.preventDefault()
    if (onSubmitQuote) {
      onSubmitQuote({
        clientName,
        clientContact,
        clientMemo,
        planName: activePlan.name,
        featureNames: activeFeatures.map((f) => f.name),
        scheduleName: activeSchedule.name,
        totalPrice,
        totalDays,
      })
    }
    setShowReceiptModal(true)
  }

  // 견적서 텍스트 클립보드 복사
  const handleCopyQuote = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드 접근 불가 시 무시
    }
  }

  return (
    <section id="quote" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Interactive Quote Builder</span>
          <h2 className="section-title">원하는 옵션을 선택해 견적을 작성해 보세요</h2>
          <p className="section-desc">
            필요한 기능만 쏙쏙 골라 담으면 예상 비용과 제작 기간이 실시간으로 계산됩니다.
          </p>
          {isHalfPrice && (
            <div className="event-inline-banner">
              <Sparkles size={16} />
              <span>
                <strong>반값 할인 이벤트 진행 중!</strong> 아래 모든 견적이 자동으로{' '}
                <strong>50% 할인가</strong>로 적용됩니다.
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmitQuote} className="quote-layout">
          {/* 왼쪽: 옵션 선택 영역 (Step 1 ~ 3 + 의뢰인 정보) */}
          <div className="quote-steps">
            {/* Step 1. 웹사이트 기본 유형 */}
            <div className="glass-card quote-step-card">
              <div className="step-title-row">
                <span className="step-badge">STEP 01</span>
                <h3>웹사이트 기본 유형 선택</h3>
              </div>
              <div className="plan-grid">
                {plans.map((plan) => {
                  const isSelected = plan.id === selectedPlanId
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`option-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="option-top">
                        <strong>{plan.name}</strong>
                        <span className="option-check">{isSelected && <Check size={14} />}</span>
                      </div>
                      <p className="option-sub">{plan.subtitle}</p>
                      <div className="option-price">
                        {isHalfPrice && (
                          <del className="price-strike">{formatKRW(plan.price)}</del>
                        )}
                        {formatKRW(getDisplayPrice(plan.price))} <span>/ 기본 {plan.days}일</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2. 추가 기능 다중 선택 */}
            <div className="glass-card quote-step-card">
              <div className="step-title-row">
                <span className="step-badge">STEP 02</span>
                <h3>필요한 추가 기능 선택 (중복 선택 가능)</h3>
              </div>
              <div className="feature-grid">
                {features.map((feat) => {
                  const isChecked = selectedFeatureIds.includes(feat.id)
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => toggleFeature(feat.id)}
                      className={`option-card feature-card ${isChecked ? 'selected' : ''}`}
                    >
                      <div className="option-top">
                        <strong>{feat.name}</strong>
                        <span className="option-check">{isChecked && <Check size={14} />}</span>
                      </div>
                      <p className="option-sub">{feat.description}</p>
                      <div className="option-price">
                        {isHalfPrice && (
                          <del className="price-strike">+{formatKRW(feat.price)}</del>
                        )}
                        +{formatKRW(getDisplayPrice(feat.price))} <span>(+{feat.days}일)</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 3. 제작 일정 선택 */}
            <div className="glass-card quote-step-card">
              <div className="step-title-row">
                <span className="step-badge">STEP 03</span>
                <h3>희망 제작 일정 선택</h3>
              </div>
              <div className="schedule-grid">
                {quoteSchedules.map((sched) => {
                  const isSelected = sched.id === selectedScheduleId
                  return (
                    <button
                      key={sched.id}
                      type="button"
                      onClick={() => setSelectedScheduleId(sched.id)}
                      className={`option-card ${isSelected ? 'selected' : ''}`}
                    >
                      <div className="option-top">
                        <strong>{sched.name}</strong>
                        <span className="option-check">{isSelected && <Check size={14} />}</span>
                      </div>
                      <p className="option-sub">{sched.description}</p>
                      <div className="option-price">{sched.extraLabel}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 4. 의뢰인 정보 입력 */}
            <div className="glass-card quote-step-card">
              <div className="step-title-row">
                <span className="step-badge">STEP 04</span>
                <h3>견적서 발급 정보 입력</h3>
              </div>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="client-name">성함 또는 회사명 *</label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    placeholder="예: 홍길동 / (주)넥스트"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="client-contact">연락처 또는 이메일 *</label>
                  <input
                    id="client-contact"
                    type="text"
                    required
                    placeholder="예: 010-1234-5678 / email@company.com"
                    value={clientContact}
                    onChange={(e) => setClientContact(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-field" style={{ marginTop: '14px' }}>
                <label htmlFor="client-memo">추가 요청사항 (선택)</label>
                <textarea
                  id="client-memo"
                  rows={3}
                  placeholder="참고하고 싶은 사이트나 특별히 원하시는 기능이 있다면 자유롭게 적어주세요."
                  value={clientMemo}
                  onChange={(e) => setClientMemo(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 오른쪽: 실시간 견적 영수증 (스크롤해도 따라오는 Sticky 패널) */}
          <aside className="quote-summary-wrap">
            <div className="glass-card quote-summary-card">
              <div className="summary-header">
                <Calculator size={20} style={{ color: '#06b6d4' }} />
                <h3>실시간 예상 견적서</h3>
              </div>

              <div className="summary-list">
                <div className="summary-row">
                  <span>기본 유형 · {activePlan.name}</span>
                  <strong>{formatKRW(activePlan.price)}</strong>
                </div>

                {activeFeatures.length > 0 ? (
                  activeFeatures.map((feat) => (
                    <div key={feat.id} className="summary-row sub">
                      <span>+ {feat.name}</span>
                      <span>+{formatKRW(feat.price)}</span>
                    </div>
                  ))
                ) : (
                  <div className="summary-row sub">
                    <span>선택된 추가 기능 없음</span>
                    <span>0원</span>
                  </div>
                )}

                {activeSchedule.multiplier > 1 && (
                  <div className="summary-row sub highlight">
                    <span>빠른 납기 할증 (+25%)</span>
                    <span>+{formatKRW(totalPrice - subtotal)}</span>
                  </div>
                )}
              </div>

              <div className="summary-divider" />

              {isHalfPrice && (
                <div className="summary-row sub event-discount-row">
                  <span>🎉 반값 할인 이벤트 (-50%)</span>
                  <strong>-{formatKRW(regularTotalPrice - totalPrice)}</strong>
                </div>
              )}

              <div className="summary-total">
                <span>총 예상 견적 (VAT 별도)</span>
                <div style={{ textAlign: 'right' }}>
                  {isHalfPrice && (
                    <del className="price-strike" style={{ display: 'block', fontSize: '0.88rem' }}>
                      {formatKRW(regularTotalPrice)}
                    </del>
                  )}
                  <strong className="gradient-text">{formatKRW(totalPrice)}</strong>
                </div>
              </div>

              <div className="summary-duration">
                <Clock size={15} />
                <span>
                  예상 제작 기간: <strong>약 {totalDays}일</strong>
                </span>
              </div>

              <button type="submit" className="btn btn-primary summary-submit-btn">
                <Send size={16} />
                <span>견적서 작성 완료하기</span>
              </button>

              <p className="summary-note">
                * 위 금액은 참고용 예상 견적이며, 상세 미팅 후 최종 확정됩니다.
              </p>
            </div>
          </aside>
        </form>
      </div>

      {/* 견적서 작성 완료 팝업(모달) */}
      {showReceiptModal && (
        <div className="modal-backdrop" onClick={() => setShowReceiptModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              aria-label="닫기"
              onClick={() => setShowReceiptModal(false)}
            >
              <X size={18} />
            </button>

            <div className="hero-badge" style={{ marginBottom: '12px' }}>
              <Sparkles size={14} />
              <span>맞춤 견적서 생성 완료</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', marginBottom: '12px' }}>
              {clientName}님의 예상 견적서가 준비되었습니다!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '16px' }}>
              아래 견적 내역을 복사하여 이메일이나 메신저로 보내주시면 빠르게 상담을 도와드리겠습니다.
            </p>

            <pre className="terminal-code" style={{ maxHeight: '260px', fontSize: '0.82rem' }}>
              {buildSummaryText()}
            </pre>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="btn btn-glass"
                onClick={() => setShowReceiptModal(false)}
              >
                수정하기
              </button>
              <button type="button" className="btn btn-primary" onClick={handleCopyQuote}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? '복사 완료!' : '견적서 전체 복사'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
