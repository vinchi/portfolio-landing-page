// 홈페이지 안에서 실제 포트폴리오 웹사이트를 직접 열어보고 체험할 수 있는 라이브 뷰어 컴포넌트
import { useState, useEffect } from 'react'
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Calculator,
  Globe,
  RefreshCw,
} from 'lucide-react'
import { portfolioSites as defaultSites } from '../data/portfolioData'

// 화면 크기 버튼에 따라 iframe 컨테이너의 너비를 조절합니다.
const viewportWidths = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
}

export default function PortfolioViewer({ portfolios = defaultSites, onSelectStyleForQuote }) {
  // 현재 보고 있는 포트폴리오 사이트 ID
  const [activeSiteId, setActiveSiteId] = useState(portfolios[0]?.id)
  // 현재 미리보기 화면 크기 모드 ('desktop' | 'tablet' | 'mobile')
  const [deviceMode, setDeviceMode] = useState('desktop')
  // iframe 새로고침을 위한 키 상태
  const [iframeKey, setIframeKey] = useState(0)

  // 관리자 페이지에서 포트폴리오 목록이 변경되었을 때 안전하게 첫 항목 선택 유지
  useEffect(() => {
    if (!portfolios.some((s) => s.id === activeSiteId) && portfolios.length > 0) {
      setActiveSiteId(portfolios[0].id)
    }
  }, [portfolios, activeSiteId])

  const activeSite = portfolios.find((site) => site.id === activeSiteId) || portfolios[0]

  // DB에서 불러온 항목에 techBadges가 없을 경우 기본 데이터에서 보충합니다.
  const badges =
    activeSite?.techBadges ||
    defaultSites.find((d) => d.id === activeSite?.id)?.techBadges ||
    []

  // 브라우저 캐시 무효화를 위해 로컬 데모(/demos/*) 경로에 버전 쿼리를 붙입니다.
  const resolvedUrl = activeSite?.url?.startsWith('/demos/')
    ? `${activeSite.url}${activeSite.url.includes('?') ? '&' : '?'}v=20261120`
    : activeSite?.url

  // "이 스타일로 견적 내기" 버튼 클릭 시 견적 섹션으로 이동하며 기본 플랜을 연동해 줍니다.
  const handleQuoteWithStyle = () => {
    if (onSelectStyleForQuote && activeSite) {
      onSelectStyleForQuote(activeSite.matchedPlanId)
    }
    const quoteEl = document.getElementById('quote')
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="portfolio-viewer" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Live Portfolio Viewer</span>
          <h2 className="section-title">홈페이지에서 포트폴리오를 직접 체험해 보세요</h2>
          <p className="section-desc">
            아래 탭에서 원하는 작업물을 선택하면 화면 이동 없이 실제 웹 애플리케이션을 클릭하고
            체험해 보실 수 있으며, 새 창으로 크게 열어 전체 기능도 확인하실 수 있습니다.
          </p>
        </div>

        {/* 포트폴리오 사이트 선택 탭 목록 (썸네일 이미지 포함) */}
        <div className="viewer-tabs">
          {portfolios.map((site) => {
            const isActive = site.id === activeSite?.id
            return (
              <button
                key={site.id}
                type="button"
                onClick={() => setActiveSiteId(site.id)}
                className={`viewer-tab viewer-tab-with-thumb ${isActive ? 'active' : ''}`}
              >
                <img
                  src={site.thumbnail}
                  alt={site.name}
                  className="viewer-tab-thumb"
                />
                <div className="viewer-tab-meta">
                  <span className="viewer-tab-cat">{site.category}</span>
                  <strong className="viewer-tab-name">{site.name}</strong>
                </div>
              </button>
            )
          })}
        </div>

        {/* 선택된 사이트의 설명, 핵심 기술 스펙 배지 & 액션 바 */}
        <div className="glass-card viewer-info-bar">
          <div className="viewer-info-left">
            <p className="viewer-site-desc">{activeSite?.description}</p>
            {badges.length > 0 && (
              <div className="viewer-tech-badges">
                {badges.map((badge) => (
                  <span key={badge} className="viewer-tech-badge">
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="viewer-info-actions">
            <a
              href={resolvedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass btn-sm"
            >
              <ExternalLink size={15} />
              <span>새 창에서 전체화면 체험</span>
            </a>
            <button
              type="button"
              onClick={handleQuoteWithStyle}
              className="btn btn-primary btn-sm"
            >
              <Calculator size={15} />
              <span>이 스타일로 견적 내기</span>
            </button>
          </div>
        </div>

        {/* 실제 웹사이트가 렌더링되는 브라우저 프레임 */}
        <div className="glass-card browser-frame">
          {/* 브라우저 상단 툴바 */}
          <div className="browser-toolbar">
            <div className="terminal-dots">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
            </div>

            {/* 가짜 주소창 (현재 선택된 포트폴리오 주소 표시) */}
            <div className="browser-address">
              <Globe size={13} />
              <span>{activeSite?.displayUrl}</span>
            </div>

            {/* 우측 도구: 기기 화면 크기 전환 + 새로고침 + 새 창 열기 */}
            <div className="toolbar-right-group">
              <div className="device-switcher" role="group" aria-label="화면 크기 전환">
                <button
                  type="button"
                  title="데스크톱 화면"
                  onClick={() => setDeviceMode('desktop')}
                  className={`device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
                >
                  <Monitor size={16} />
                </button>
                <button
                  type="button"
                  title="태블릿 화면"
                  onClick={() => setDeviceMode('tablet')}
                  className={`device-btn ${deviceMode === 'tablet' ? 'active' : ''}`}
                >
                  <Tablet size={16} />
                </button>
                <button
                  type="button"
                  title="모바일 화면"
                  onClick={() => setDeviceMode('mobile')}
                  className={`device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                >
                  <Smartphone size={16} />
                </button>
              </div>

              <button
                type="button"
                title="미리보기 새로고침"
                aria-label="미리보기 새로고침"
                onClick={() => setIframeKey((k) => k + 1)}
                className="toolbar-action-btn"
              >
                <RefreshCw size={15} />
              </button>

              <a
                href={resolvedUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="새 창에서 열기"
                aria-label="새 창에서 열기"
                className="toolbar-action-btn"
              >
                <ExternalLink size={15} />
              </a>
            </div>
          </div>

          {/* 실제 iframe 뷰포트 영역 */}
          <div className="browser-viewport-wrap">
            <iframe
              key={`${activeSite?.id}-${iframeKey}`}
              src={resolvedUrl}
              title={activeSite?.name}
              className="browser-iframe"
              style={{ width: viewportWidths[deviceMode] }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
