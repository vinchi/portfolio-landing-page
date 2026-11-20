// 상용화에 필요한 약관 링크, 사업자 정보, 연락처 및 관리자 페이지 진입 링크를 표시하는 푸터 컴포넌트
import { Mail, Github, Shield } from 'lucide-react'
import { profileData } from '../data/portfolioData'

export default function Footer({ onOpenAdmin, onOpenLegal }) {
  const biz = profileData.businessInfo

  return (
    <footer id="contact" className="footer">
      <div className="container">
        {/* 상단: 법적 고지 링크 & 외부 연락처 */}
        <div className="footer-top">
          <div className="footer-legal-links">
            <button type="button" onClick={() => onOpenLegal('terms')}>
              이용약관
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="footer-privacy-link"
            >
              개인정보처리방침
            </button>
            <button type="button" onClick={() => onOpenLegal('refund')}>
              환불 · 취소 및 A/S 정책
            </button>
            <button type="button" onClick={() => onOpenLegal('email-policy')}>
              이메일무단수집거부
            </button>
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

        {/* 중단: 사업자 정보 */}
        <div className="footer-business-info">
          <p>
            <span>상호명: {biz.companyName}</span>
            <span>대표자: {biz.ceoName}</span>
            <span>사업자등록번호: {biz.businessNumber}</span>
            <span>통신판매업 신고번호: {biz.ecommerceNumber}</span>
          </p>
          <p>
            <span>사업장 주소: {biz.address}</span>
            <span>고객센터: {biz.phone}</span>
            <span>운영시간: {biz.hours}</span>
          </p>
        </div>

        {/* 하단: 저작권 */}
        <div className="footer-bottom" style={{ marginTop: '18px' }}>
          <div>
            © {new Date().getFullYear()} {biz.companyName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
