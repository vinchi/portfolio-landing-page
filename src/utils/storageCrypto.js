/**
 * 🔐 보안 및 암호화 유틸리티 (Web Crypto API 기반)
 *
 * - 관리자 비밀번호 검증 시 평문을 그대로 비교하지 않고 SHA-256 해시로 비교합니다.
 * - 의뢰인 개인정보(성함, 연락처 등)는 브라우저 저장소(localStorage)에 저장하기 전
 *   AES-GCM 방식으로 암호화하여 외부에 평문으로 노출되지 않도록 보호합니다.
 */

export const STORAGE_KEYS = {
  QUOTES: 'nex_studio_quotes_v1',
  PORTFOLIOS: 'nex_studio_portfolios_v1',
  PLANS: 'nex_studio_plans_v1',
  FEATURES: 'nex_studio_features_v1',
  EVENT_CONFIG: 'nex_studio_event_v1',
  ADMIN_SESSION: 'nex_studio_admin_session_v1',
}

// 초기 관리자 비밀번호('admin1234')의 SHA-256 해시값
// ※ 실제 서비스 배포 시에는 백엔드 서버 인증(JWT 등)으로 대체하는 것을 권장합니다.
const DEFAULT_ADMIN_HASH = 'ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270'

// 문자열을 SHA-256 해시 문자열(16진수)로 변환하는 함수
export async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

// 입력한 비밀번호가 관리자 비밀번호와 일치하는지 검증
export async function verifyAdminPassword(inputPassword) {
  const inputHash = await hashPassword(inputPassword)
  return inputHash === DEFAULT_ADMIN_HASH
}

// AES-GCM 암호화에 사용할 256비트 대칭키 생성 (앱 내부 시크릿 시드 기반)
async function getCryptoKey() {
  const rawSeed = new TextEncoder().encode('NEX_STUDIO_SECURE_KEY_2026_V1_32B!')
  const keyMaterial = await crypto.subtle.digest('SHA-256', rawSeed)
  return crypto.subtle.importKey('raw', keyMaterial, { name: 'AES-GCM' }, false, [
    'encrypt',
    'decrypt',
  ])
}

// 객체(예: 견적 목록)를 AES-GCM으로 암호화하여 문자열로 반환
export async function encryptPayload(payload) {
  const key = await getCryptoKey()
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoded = new TextEncoder().encode(JSON.stringify(payload))
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded)

  const combined = new Uint8Array(iv.length + encrypted.byteLength)
  combined.set(iv, 0)
  combined.set(new Uint8Array(encrypted), iv.length)

  // 바이너리를 Base64 문자열로 안전하게 변환
  let binary = ''
  combined.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

// 암호화된 문자열을 복호화하여 원래 객체로 복원
export async function decryptPayload(cipherText) {
  if (!cipherText) return null
  try {
    const binary = atob(cipherText)
    const combined = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i += 1) {
      combined[i] = binary.charCodeAt(i)
    }

    const iv = combined.slice(0, 12)
    const encryptedData = combined.slice(12)
    const key = await getCryptoKey()
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedData
    )
    const jsonString = new TextDecoder().decode(decrypted)
    return JSON.parse(jsonString)
  } catch {
    return null
  }
}
