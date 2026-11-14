// 첫 화면(히어로 섹션): 좌측 핵심 안내 + 우측 고품질 스튜디오 비주얼 이미지 카드로 구성
import { Eye, Calculator, Layers } from 'lucide-react'
import { profileData } from '../data/portfolioData'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        {/* 왼쪽 영역: 배지, 제목, 설명, 버튼 */}
        <div>
          <div className="hero-badge">
            <span className="hero-dot" />
            <span>{profileData.heroBadge}</span>
          </div>

          <h1 className="hero-title">
            {profileData.heroTitleLine1}
            <br />
            <span className="gradient-text">{profileData.heroTitleHighlight}</span>
            {profileData.heroTitleLine2}
          </h1>

          <p className="hero-desc">{profileData.heroDescription}</p>

          <div className="hero-actions">
            <a href="#portfolio-viewer" className="btn btn-primary">
              <Eye size={18} />
              <span>포트폴리오 사이트 보기</span>
            </a>

            <a href="#quote" className="btn btn-glass">
              <Calculator size={18} />
              <span>실시간 견적 작성하기</span>
            </a>
          </div>
        </div>

        {/* 오른쪽 영역: 스튜디오 대표 비주얼 이미지 카드 */}
        <div className="glass-card hero-visual-card">
          <div className="hero-image-wrap">
            <img
              src="/images/hero-studio.jpg"
              alt="NEX.STUDIO 웹 디자인 및 개발 쇼케이스 비주얼"
              className="hero-image"
            />
            <div className="hero-image-overlay" />
          </div>

          <div className="hero-visual-caption">
            <div className="hero-caption-icon">
              <Layers size={18} />
            </div>
            <div>
              <strong>6개 업종별 라이브 포트폴리오 수록</strong>
              <span>랜딩 · 브랜드 · SaaS · 쇼핑몰 · 교육 · 예약</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
