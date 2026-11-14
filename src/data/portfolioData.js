/**
 * ⭐ 포트폴리오 웹사이트 뷰어 & 실시간 견적 계산기 데이터 파일
 *
 * 이 파일의 내용만 수정하면:
 * 1. 홈페이지 안에서 보여줄 내 포트폴리오 웹사이트 주소(url)와 설명
 * 2. 견적 계산기의 기본 유형, 추가 기능 옵션, 단가 및 제작 기간
 * 을 손쉽게 바꿀 수 있습니다!
 */

export const profileData = {
  brandName: 'NEX.STUDIO',
  ownerName: '김개발',
  heroBadge: '포트폴리오 미리보기 & 실시간 맞춤 견적',
  heroTitleLine1: '실제 포트폴리오를 직접 보고,',
  heroTitleHighlight: '원하는 기능대로 견적',
  heroTitleLine2: '을 계산해 보세요.',
  heroDescription:
    '아래 브라우저 화면에서 제가 제작한 포트폴리오 웹사이트들을 직접 클릭하고 둘러보신 뒤, 원하시는 옵션을 선택해 예상 제작 비용과 기간을 바로 확인하실 수 있습니다.',
  githubUrl: 'https://github.com/your-github-id',
  email: 'hello@example.com',
}

/**
 * 1. 홈페이지 안의 브라우저 프레임(iframe)에서 직접 보여줄 포트폴리오 웹사이트 목록
 * ⭐ 본인의 실제 포트폴리오 사이트 주소(예: 'https://my-portfolio.com')가 있다면
 *    아래 url 항목만 교체하시면 홈페이지 안에서 바로 열립니다!
 */
export const portfolioSites = [
  {
    id: 'site-landing',
    name: '01. 프로덕트 / 스타트업 랜딩',
    category: '원페이지 · 고전환 마케팅',
    url: '/demos/landing.html',
    thumbnail: '/images/demo-landing.jpg',
    displayUrl: 'https://nova-studio.portfolio.dev',
    description:
      '제품이나 서비스를 한 페이지에서 강렬하게 소개하고 문의/신청 전환율을 높이는 모던 다크 랜딩 페이지입니다.',
    matchedPlanId: 'plan-landing',
  },
  {
    id: 'site-brand',
    name: '02. 브랜드 / 기업 홈페이지',
    category: '다중 페이지 · 에디토리얼',
    url: '/demos/brand.html',
    thumbnail: '/images/demo-brand.jpg',
    displayUrl: 'https://atelier-co.portfolio.dev',
    description:
      '회사 소개, 작업물 아카이브, 문의 페이지까지 깔끔하고 신뢰감 있게 구성한 브랜드 웹사이트입니다.',
    matchedPlanId: 'plan-brand',
  },
  {
    id: 'site-saas',
    name: '03. 기능형 SaaS 웹 플랫폼',
    category: '대시보드 · 회원/결제 연동',
    url: '/demos/saas.html',
    thumbnail: '/images/demo-saas.jpg',
    displayUrl: 'https://pulse-cloud.portfolio.dev',
    description:
      '실시간 데이터 시각화, 사용자 관리, 결제 내역 조회 등 복잡한 웹 애플리케이션 기능을 담은 플랫폼입니다.',
    matchedPlanId: 'plan-platform',
  },
  {
    id: 'site-commerce',
    name: '04. 이커머스 / 온라인 쇼핑몰',
    category: 'D2C 스토어 · 장바구니/결제',
    url: '/demos/commerce.html',
    thumbnail: '/images/demo-commerce.jpg',
    displayUrl: 'https://maison-select.portfolio.dev',
    description:
      '감각적인 상품 큐레이션과 장바구니 담기, 간편 결제 연동까지 매끄러운 구매 경험을 제공하는 쇼핑몰입니다.',
    matchedPlanId: 'plan-commerce',
  },
  {
    id: 'site-education',
    name: '05. 교육 / 온라인 클래스',
    category: '커리큘럼 · 수강 신청 시스템',
    url: '/demos/education.html',
    thumbnail: '/images/demo-education.jpg',
    displayUrl: 'https://edu-campus.portfolio.dev',
    description:
      '강의 커리큘럼 안내, 수강생 모집 및 결제 연동에 최적화된 교육·강의 플랫폼 웹사이트입니다.',
    matchedPlanId: 'plan-commerce',
  },
  {
    id: 'site-booking',
    name: '06. 병원 / 뷰티·예약 서비스',
    category: '실시간 예약 · 캘린더 연동',
    url: '/demos/booking.html',
    thumbnail: '/images/demo-booking.jpg',
    displayUrl: 'https://serene-clinic.portfolio.dev',
    description:
      '고객이 원하는 날짜와 시간을 직접 선택해 방문 예약을 접수할 수 있는 병원·클리닉·스튜디오 전용 웹입니다.',
    matchedPlanId: 'plan-commerce',
  },
]

/**
 * 2. 견적 계산기 — Step 1: 웹사이트 기본 유형 (단일 선택)
 * price는 만원 단위 숫자로 관리합니다 (예: 80 -> 800,000원)
 */
export const quotePlans = [
  {
    id: 'plan-landing',
    name: '원페이지 랜딩 페이지',
    subtitle: '핵심 소개 + 문의/신청 전환 중심 (1페이지)',
    price: 80,
    days: 7,
  },
  {
    id: 'plan-brand',
    name: '브랜드 · 소개 홈페이지',
    subtitle: '메인 + 소개/포트폴리오/문의 등 (최대 5페이지)',
    price: 150,
    days: 14,
  },
  {
    id: 'plan-commerce',
    name: '쇼핑몰 · 예약 · 교육형 웹',
    subtitle: '상품/강의 등록 + 예약 또는 장바구니·결제 연동',
    price: 220,
    days: 21,
  },
  {
    id: 'plan-platform',
    name: '기능형 웹 서비스 / 플랫폼',
    subtitle: '맞춤형 UI + 데이터 처리 및 대시보드 구축',
    price: 300,
    days: 28,
  },
]

/**
 * 3. 견적 계산기 — Step 2: 추가 기능 옵션 (다중 선택 가능)
 */
export const quoteFeatures = [
  {
    id: 'feat-responsive',
    name: '모바일·태블릿 완벽 반응형 최적화',
    description: '모든 기기 해상도에 맞춘 레이아웃 세밀 조정',
    price: 30,
    days: 3,
  },
  {
    id: 'feat-admin',
    name: '관리자(Admin) 페이지 구축',
    description: '게시물, 이미지, 문의 내역을 직접 수정·관리하는 화면',
    price: 70,
    days: 7,
  },
  {
    id: 'feat-auth',
    name: '회원가입 / 소셜 로그인',
    description: '이메일·카카오·구글 로그인 및 마이페이지 기능',
    price: 60,
    days: 5,
  },
  {
    id: 'feat-payment',
    name: '온라인 결제 / 예약 시스템 연동',
    description: '카드·간편결제(PG) 또는 실시간 날짜 예약 기능',
    price: 80,
    days: 7,
  },
  {
    id: 'feat-seo',
    name: 'SEO 검색엔진 최적화 & 속도 튜닝',
    description: '구글/네이버 검색 등록 및 메타 태그 최적화',
    price: 25,
    days: 2,
  },
  {
    id: 'feat-multilang',
    name: '다국어 지원 (한국어/영어)',
    description: '언어 전환 버튼 및 다국어 텍스트 구조 설계',
    price: 45,
    days: 4,
  },
]

/**
 * 4. 견적 계산기 — Step 3: 희망 제작 일정
 */
export const quoteSchedules = [
  {
    id: 'sched-standard',
    name: '일반 진행 (표준 일정)',
    description: '차분한 기획과 충분한 검수를 거치는 기본 일정',
    multiplier: 1,
    extraLabel: '추가 비용 없음',
  },
  {
    id: 'sched-fast',
    name: '빠른 납기 (우선 진행)',
    description: '예상 기간을 약 30% 단축하여 최우선 순위로 제작',
    multiplier: 1.25,
    extraLabel: '전체 비용 +25%',
  },
]
