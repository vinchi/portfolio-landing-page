// 이메일 로그인/회원가입 및 Google 소셜 로그인을 지원하는 인증 페이지 컴포넌트
import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { Mail, Lock, User, ArrowLeft, LogIn, UserPlus } from 'lucide-react'
import { auth, googleProvider } from '../lib/firebase'

// Firebase 인증 오류 코드를 친절한 한국어 메시지로 변환합니다.
function getFriendlyAuthError(code) {
  switch (code) {
    case 'auth/email-already-in-use':
      return '이미 가입된 이메일 주소입니다. 로그인을 시도해 주세요.'
    case 'auth/invalid-email':
      return '올바른 이메일 형식을 입력해 주세요.'
    case 'auth/weak-password':
      return '비밀번호는 6자리 이상으로 입력해 주세요.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return '이메일 또는 비밀번호가 올바르지 않습니다.'
    case 'auth/popup-closed-by-user':
      return 'Google 로그인 창이 닫혔습니다. 다시 시도해 주세요.'
    case 'auth/unauthorized-domain':
      return '현재 도메인(localhost 등)이 Firebase 콘솔 승인 도메인에 등록되지 않았습니다.'
    default:
      return '인증 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
  }
}

export default function LoginPage({ onSuccess, onBackHome }) {
  // 'login' | 'signup' 모드 전환
  const [mode, setMode] = useState('login')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  // 이메일 로그인 또는 회원가입 처리
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    if (!auth) {
      setErrorMsg('Firebase 인증 설정이 연결되지 않았습니다.')
      return
    }
    setErrorMsg('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        if (displayName.trim()) {
          await updateProfile(cred.user, { displayName: displayName.trim() })
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      onSuccess()
    } catch (err) {
      setErrorMsg(getFriendlyAuthError(err.code))
    } finally {
      setLoading(false)
    }
  }

  // Google 소셜 로그인 / 회원가입 처리
  const handleGoogleAuth = async () => {
    if (!auth) {
      setErrorMsg('Firebase 인증 설정이 연결되지 않았습니다.')
      return
    }
    setErrorMsg('')
    setLoading(true)

    try {
      await signInWithPopup(auth, googleProvider)
      onSuccess()
    } catch (err) {
      setErrorMsg(getFriendlyAuthError(err.code))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section auth-section">
      <div className="container">
        <div className="glass-card auth-card">
          {/* 상단 로그인 / 회원가입 탭 */}
          <div className="auth-tabs">
            <button
              type="button"
              onClick={() => {
                setMode('login')
                setErrorMsg('')
              }}
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            >
              <LogIn size={16} />
              <span>로그인</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup')
                setErrorMsg('')
              }}
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            >
              <UserPlus size={16} />
              <span>이메일 회원가입</span>
            </button>
          </div>

          <h2 className="auth-title">
            {mode === 'login' ? 'NEX.STUDIO 로그인' : '새 계정 만들기'}
          </h2>
          <p className="auth-desc">
            {mode === 'login'
              ? '이메일 또는 Google 계정으로 간편하게 로그인하세요.'
              : '이메일로 가입하거나 아래 Google 버튼으로 바로 시작할 수 있습니다.'}
          </p>

          {/* Google 소셜 로그인 / 회원가입 버튼 */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleAuth}
            className="btn btn-google"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M12 5c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.31 0 3.26 2.69 1.29 6.61l3.66 2.84C5.82 6.86 8.66 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.52-1.14 2.81-2.42 3.68l3.71 2.88c2.17-2 3.73-4.94 3.73-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M4.95 14.55A7.01 7.01 0 0 1 4.58 12c0-.88.15-1.74.37-2.55L1.29 6.61A11.97 11.97 0 0 0 0 12c0 1.94.46 3.77 1.29 5.39l3.66-2.84z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.71-2.88c-1.08.72-2.45 1.15-4.22 1.15-3.34 0-6.18-1.86-7.05-4.81l-3.66 2.84C3.26 21.31 7.31 24 12 24z"
              />
            </svg>
            <span>Google 계정으로 계속하기</span>
          </button>

          <div className="auth-divider">
            <span>또는 이메일로 진행</span>
          </div>

          {/* 이메일 로그인 / 회원가입 폼 */}
          <form onSubmit={handleEmailSubmit} className="auth-form">
            {mode === 'signup' && (
              <div className="form-field">
                <label htmlFor="auth-name">이름 (닉네임)</label>
                <div className="input-with-icon">
                  <User size={16} />
                  <input
                    id="auth-name"
                    type="text"
                    placeholder="홍길동"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-field">
              <label htmlFor="auth-email">이메일 주소</label>
              <div className="input-with-icon">
                <Mail size={16} />
                <input
                  id="auth-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="auth-pw">비밀번호</label>
              <div className="input-with-icon">
                <Lock size={16} />
                <input
                  id="auth-pw"
                  type="password"
                  placeholder="6자 이상 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {errorMsg && <p className="admin-error">{errorMsg}</p>}

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
              {loading
                ? '처리 중...'
                : mode === 'login'
                  ? '이메일로 로그인'
                  : '회원가입 완료'}
            </button>
          </form>

          <button type="button" onClick={onBackHome} className="auth-back-link">
            <ArrowLeft size={15} />
            <span>홈페이지로 돌아가기</span>
          </button>
        </div>
      </div>
    </section>
  )
}
