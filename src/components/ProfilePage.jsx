// 로그인한 사용자의 계정 정보를 확인하고 닉네임을 수정할 수 있는 내 정보 페이지 컴포넌트
import { useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { User, Mail, ShieldCheck, Calendar, LogOut, ArrowLeft, Check } from 'lucide-react'

export default function ProfilePage({ user, onLogout, onBackHome }) {
  const [newName, setNewName] = useState(user?.displayName || '')
  const [savedMsg, setSavedMsg] = useState('')
  const [saving, setSaving] = useState(false)

  if (!user) return null

  // 가입 방식 판별 (Google 또는 이메일)
  const providerId = user.providerData?.[0]?.providerId || 'password'
  const providerLabel = providerId === 'google.com' ? 'Google 소셜 계정' : '이메일 / 비밀번호'

  const handleUpdateName = async (e) => {
    e.preventDefault()
    if (!newName.trim()) return
    setSaving(true)
    setSavedMsg('')
    try {
      await updateProfile(user, { displayName: newName.trim() })
      setSavedMsg('이름이 성공적으로 변경되었습니다.')
      setTimeout(() => setSavedMsg(''), 2500)
    } catch {
      setSavedMsg('이름 변경 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="section auth-section">
      <div className="container">
        <div className="glass-card profile-card">
          <div className="profile-header">
            {user.photoURL ? (
              <img src={user.photoURL} alt="프로필 사진" className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar-fallback">
                <User size={30} />
              </div>
            )}

            <div>
              <span className="section-eyebrow" style={{ marginBottom: '4px' }}>
                My Account
              </span>
              <h2 className="profile-name">{user.displayName || '사용자'}</h2>
              <p className="profile-email">{user.email}</p>
            </div>
          </div>

          {/* 계정 상세 정보 */}
          <div className="profile-info-grid">
            <div className="profile-info-item">
              <span className="profile-info-label">
                <ShieldCheck size={15} /> 가입 방식
              </span>
              <strong>{providerLabel}</strong>
            </div>
            <div className="profile-info-item">
              <span className="profile-info-label">
                <Mail size={15} /> 이메일 인증
              </span>
              <strong>{user.emailVerified ? '인증 완료' : '미인증'}</strong>
            </div>
            <div className="profile-info-item">
              <span className="profile-info-label">
                <Calendar size={15} /> 계정 생성일
              </span>
              <strong>
                {user.metadata?.creationTime
                  ? new Date(user.metadata.creationTime).toLocaleDateString('ko-KR')
                  : '-'}
              </strong>
            </div>
            <div className="profile-info-item">
              <span className="profile-info-label">
                <Calendar size={15} /> 최근 로그인
              </span>
              <strong>
                {user.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleString('ko-KR')
                  : '-'}
              </strong>
            </div>
          </div>

          {/* 닉네임(표시 이름) 수정 폼 */}
          <form onSubmit={handleUpdateName} className="profile-edit-form">
            <div className="form-field">
              <label htmlFor="profile-name-input">표시 이름(닉네임) 변경</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  id="profile-name-input"
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="표시할 이름 입력"
                  style={{ flex: 1 }}
                />
                <button type="submit" disabled={saving} className="btn btn-primary btn-sm">
                  <Check size={15} />
                  <span>{saving ? '저장중' : '저장'}</span>
                </button>
              </div>
            </div>
            {savedMsg && <p className="profile-saved-msg">{savedMsg}</p>}
          </form>

          <div className="profile-actions">
            <button type="button" onClick={onBackHome} className="btn btn-glass">
              <ArrowLeft size={16} />
              <span>홈페이지로 돌아가기</span>
            </button>
            <button type="button" onClick={onLogout} className="btn btn-glass">
              <LogOut size={16} />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
