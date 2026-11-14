// 하단 연락처, 브랜드 정보 및 관리자 페이지 진입 링크를 표시하는 푸터 컴포넌트
import { Mail, Github, Shield } from 'lucide-react'
import { profileData } from '../data/portfolioData'

export default function Footer({ onOpenAdmin }) {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {profileData.ownerName} ({profileData.brandName}). All
            rights reserved.
          </div>

          <div className="footer-links">
            <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a href={`mailto:${profileData.email}`}>
              <Mail size={16} />
              <span>{profileData.email}</span>
            </a>
            <button type="button" onClick={onOpenAdmin}>
              <Shield size={15} />
              <span>관리자 페이지</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
