// Firebase 앱, Authentication(이메일/Google), SQL Connect(Data Connect) 초기화 파일
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect'
import { connectorConfig } from '@nex-studio/dataconnect'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// .env.local에 실제 Firebase 설정이 입력되어 있는지 확인합니다.
export const isFirebaseEnabled = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    !firebaseConfig.apiKey.includes('your-firebase-api-key') &&
    !firebaseConfig.projectId.includes('your-project-id')
)

let authInstance = null
let dataConnectInstance = null

if (isFirebaseEnabled) {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  authInstance = getAuth(app)
  dataConnectInstance = getDataConnect(app, connectorConfig)

  // 로컬 에뮬레이터 사용 옵션이 켜져 있으면 로컬 포트로 연결합니다.
  if (import.meta.env.VITE_USE_DATACONNECT_EMULATOR === 'true') {
    connectDataConnectEmulator(dataConnectInstance, '127.0.0.1', 9399)
  }
}

export const auth = authInstance
export const googleProvider = new GoogleAuthProvider()
export const dataConnect = dataConnectInstance
