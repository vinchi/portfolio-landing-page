// 상단 고정 네비게이션 바 컴포넌트
import { Terminal, Calculator, Shield } from 'lucide-react'
import { profileData } from '../data/portfolioData'

export default function Navbar({ onOpenAdmin }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* 좌측 브랜드 로고 */}
        <a href="#top" className="nav-logo">
          <span className="nav-logo-badge">
            <Terminal size={18} />
          </span>
          <span>{profileData.brandName}</span>
        </a>

        {/* 가운데 섹션 이동 메뉴 */}
        <ul className="nav-links">
          <li>
            <a href="#portfolio-viewer">포트폴리오 직접 보기</a>
          </li>
          <li>
            <a href="#quote">맞춤 견적 작성</a>
          </li>
          <li>
            <a href="#contact">문의하기</a>
          </li>
        </ul>

        {/* 우측 버튼 영역: 관리자 페이지 진입 & 견적 계산 바로가기 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="btn btn-glass nav-cta"
            title="관리자 페이지"
          >
            <Shield size={14} />
            <span>관리자</span>
          </button>

          <a href="#quote" className="btn btn-primary nav-cta">
            <Calculator size={15} />
            <span>견적 계산하기</span>
          </a>
        </div>
      </div>
    </header>
  )
}
