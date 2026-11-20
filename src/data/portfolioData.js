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
  ownerName: '전민수',
  heroBadge: '포트폴리오 미리보기 & 실시간 맞춤 견적',
  heroTitleLine1: '실제 포트폴리오를 직접 보고,',
  heroTitleHighlight: '원하는 기능대로 견적',
  heroTitleLine2: '을 계산해 보세요.',
  heroDescription:
    '아래 브라우저 화면에서 제가 제작한 포트폴리오 웹사이트들을 직접 클릭하고 둘러보신 뒤, 원하시는 옵션을 선택해 예상 제작 비용과 기간을 바로 확인하실 수 있습니다.',
  githubUrl: 'https://github.com/your-github-id',
  email: 'ceo@nexstudio.kr',
  // ⭐ 상용화 시 본인의 실제 사업자 정보로 수정해 주세요!
  businessInfo: {
    companyName: 'NEX.STUDIO (넥스스튜디오)',
    ceoName: '전민수',
    businessNumber: '000-00-00000',
    ecommerceNumber: '제2026-서울강남-00000호',
    address: '서울특별시 강남구 테헤란로 000, 00층',
    phone: '070-4757-7370',
    hours: '평일 10:00 ~ 18:00 (점심 12:30 ~ 13:30 / 주말·공휴일 휴무)',
  },
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
      '실제 작동하는 AI 워크플로우 파이프라인 시뮬레이터와 ROI 절감 계산기, 월간/연간 요금제 토글이 탑재된 인터랙티브 프로덕트 사이트입니다.',
    techBadges: ['AI 워크플로우 시뮬레이터', 'ROI 계산기', '요금제 토글', '다크 글래스 UI'],
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
      'Before/After 공간 비교 슬라이더와 평수·마감재 예산 시뮬레이터, 에디토리얼 프로젝트 상세 모달을 갖춘 하이엔드 건축 스튜디오 웹사이트입니다.',
    techBadges: ['멀티뷰 아카이브', 'Before/After 비교 슬라이더', '평수·예산 시뮬레이터', '에디토리얼 모달'],
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
      '5개 화면이 전환되는 SPA 대시보드에 실시간 인터랙티브 SVG 차트, 라이브 로그 스트림, 팀원 초대(RBAC) 및 CSV 내보내기를 구현한 클라우드 관제 플랫폼입니다.',
    techBadges: ['실시간 SVG 차트', '5개 뷰 SPA 라우팅', 'RBAC 팀원·CSV 내보내기', '라이브 로그 스트림'],
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
      '옵션 선택과 리뷰 작성이 가능한 상품 상세 모달, 무료배송 게이지·쿠폰 할인(WELCOME10) 장바구니, 3단계 체크아웃 및 주문내역 조회가 작동하는 쇼핑몰입니다.',
    techBadges: ['옵션·리뷰 작성 모달', '쿠폰·무료배송 게이지', '3단계 결제 체크아웃', '위시리스트·주문내역'],
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
      '수강 신청 후 내 강의실(LMS 플레이어)로 전환되어 레슨 완료 진도율 트래킹, 100% 달성 시 수료증 발급, 자동저장 강의노트와 Q&A가 작동하는 교육 플랫폼입니다.',
    techBadges: ['LMS 강의 플레이어', '진도율·수료증 발급', '자동저장 강의노트', 'Q&A 게시판'],
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
      '커스텀 월간 캘린더로 예약 가능 시간을 실시간 필터링하고, 4단계 위자드로 QR 모바일 예약권 발급과 예약 시간 변경·취소까지 처리하는 예약 앱입니다.',
    techBadges: ['커스텀 월간 캘린더', '4단계 예약 위자드', 'QR 모바일 예약권', '예약 변경·취소'],
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
