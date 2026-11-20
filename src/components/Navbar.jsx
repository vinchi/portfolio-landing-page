// 상단 고정 네비게이션 바 컴포넌트 (로그인 시 프로필 아이콘 + 드롭다운 메뉴 제공)
import { useState, useEffect, useRef } from 'react'
import { LogIn, User, LogOut, ChevronDown, Eye, Calculator } from 'lucide-react'
import { profileData } from '../data/portfolioData'

export default function Navbar({ currentUser, onGoHome, onOpenLogin, onOpenProfile, onLogout }) {
  // 드롭다운 메뉴 열림/닫힘 상태
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  // 드롭다운 바깥을 클릭하면 자동으로 닫히도록 처리
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 로그아웃 시 드롭다운 닫기
  const handleLogoutClick = () => {
    setMenuOpen(false)
    onLogout()
  }

  // 홈 내 특정 섹션으로 이동하는 기타 메뉴 헬퍼
  const handleScrollToSection = (sectionId) => {
    setMenuOpen(false)
    if (onGoHome) onGoHome(false)
    setTimeout(() => {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* 좌측 브랜드 로고 이미지 + 텍스트 */}
        <a
          href="#top"
          onClick={(e) => {
            if (onGoHome) {
              e.preventDefault()
              onGoHome()
            }
          }}
          className="nav-logo"
        >
          <span className="nav-logo-badge">
            <img
              src="/images/logo.jpg"
              alt={`${profileData.brandName} 로고`}
              className="nav-logo-img"
            />
          </span>
          <span>{profileData.brandName}</span>
        </a>

        {/* 가운데 섹션 이동 메뉴 */}
        <ul className="nav-links">
          <li>
            <a
              href="#portfolio-viewer"
              onClick={() => {
                if (onGoHome) onGoHome(false)
              }}
            >
              포트폴리오 직접 보기
            </a>
          </li>
          <li>
            <a
              href="#quote"
              onClick={() => {
                if (onGoHome) onGoHome(false)
              }}
            >
              맞춤 견적 작성
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={() => {
                if (onGoHome) onGoHome(false)
              }}
            >
              문의하기
            </a>
          </li>
        </ul>

        {/* 우측 사용자 메뉴: 로그인 시 프로필 아이콘 + 드롭다운 */}
        <div ref={dropdownRef} className="nav-user-wrap">
          {currentUser ? (
            <>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="nav-avatar-btn"
                aria-expanded={menuOpen}
                aria-label="사용자 메뉴 열기"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="프로필"
                    className="nav-avatar-img"
                  />
                ) : (
                  <span className="nav-avatar-icon">
                    <User size={16} />
                  </span>
                )}
                <ChevronDown
                  size={14}
                  className={`nav-avatar-chevron ${menuOpen ? 'open' : ''}`}
                />
              </button>

              {menuOpen && (
                <div className="nav-dropdown">
                  {/* 사용자 요약 정보 */}
                  <div className="nav-dropdown-header">
                    <strong>{currentUser.displayName || '사용자'}</strong>
                    <span>{currentUser.email}</span>
                  </div>

                  <div className="nav-dropdown-divider" />

                  {/* 내 정보 */}
                  <button
                    type="button"
                    className="nav-dropdown-item"
                    onClick={() => {
                      setMenuOpen(false)
                      onOpenProfile()
                    }}
                  >
                    <User size={15} />
                    <span>내 정보</span>
                  </button>

                  {/* 기타 기능 메뉴 */}
                  <button
                    type="button"
                    className="nav-dropdown-item"
                    onClick={() => handleScrollToSection('portfolio-viewer')}
                  >
                    <Eye size={15} />
                    <span>포트폴리오 둘러보기</span>
                  </button>

                  <button
                    type="button"
                    className="nav-dropdown-item"
                    onClick={() => handleScrollToSection('quote')}
                  >
                    <Calculator size={15} />
                    <span>맞춤 견적 작성하기</span>
                  </button>

                  <div className="nav-dropdown-divider" />

                  {/* 로그아웃 */}
                  <button
                    type="button"
                    className="nav-dropdown-item danger"
                    onClick={handleLogoutClick}
                  >
                    <LogOut size={15} />
                    <span>로그아웃</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="btn btn-primary nav-cta"
            >
              <LogIn size={15} />
              <span>로그인 / 회원가입</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
