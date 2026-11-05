export interface UniversityModel {
  id: string;
  name: string;
  region: '수도권' | '충청권' | '영남권' | '호남권' | '수도권/강원';
  currentFleet: string;
  proposedModel: string;
  contactTier: '1차 직접 접촉' | '2차 DM/공식 초청' | '2차 DM / 로드쇼 참석';
  targetDay: string;
  estimatedDemand: string;
  chinaFit: '최상' | '높음' | '협의 필요';
  keyPoints: string[];
  docCitation: string;
}

export const UNIVERSITIES_DATA: UniversityModel[] = [
  {
    id: 'u-cheongju',
    name: '청주대학교',
    region: '충청권',
    currentFleet: 'DA40·DA42 운용 이력 보유',
    proposedModel: '기존 운용 경험 바탕 추가 기체 구매, MRO 및 교육협력 강화',
    contactTier: '1차 직접 접촉',
    targetDay: 'Day 2 (오송) & Day 3 (현장방문)',
    estimatedDemand: '2 ~ 4대 (DA40/DA42)',
    chinaFit: '최상',
    keyPoints: [
      '국내에서 Diamond 기종을 가장 활발히 운용한 대학 중 하나',
      '사천 MRO 거점 구축 시 정비 비용 절감 및 부품 공급 수혜',
      '교수진 및 학생들의 Diamond 기종 신뢰도 우수',
    ],
    docCitation: 'Doc 3 (p.4, 7)',
  },
  {
    id: 'u-fardong',
    name: '극동대학교',
    region: '충청권',
    currentFleet: 'DA42 운용 이력 보유',
    proposedModel: 'DA42 등 다발훈련기 확대 도입 및 중국 비행실습 연계',
    contactTier: '1차 직접 접촉',
    targetDay: 'Day 2 (오송) & Day 3 (현장방문)',
    estimatedDemand: '2 ~ 3대 (DA42 쌍발)',
    chinaFit: '최상',
    keyPoints: [
      '다발기(Multi-engine) 자격 취득을 위한 DA42 선호도 매우 높음',
      '중국 내 비행실습 및 타임빌딩(Time Building) 연계 적합성 1순위',
      '11월 25일 우선 현장방문 후보',
    ],
    docCitation: 'Doc 3 (p.4, 7)',
  },
  {
    id: 'u-hanseo',
    name: '한서대학교',
    region: '충청권',
    currentFleet: '대규모 비행교육 자체 인프라 (태안비행장 보유)',
    proposedModel: '대규모 교육 인프라 연계 중국 교환학생 & 한·중 공동교육',
    contactTier: '1차 직접 접촉',
    targetDay: 'Day 2 (오송) / Day 3 협의',
    estimatedDemand: '3 ~ 5대 (공동교육)',
    chinaFit: '높음',
    keyPoints: [
      '자체 비행장 및 대규모 훈련 인프라 보유',
      '중국 항공시장 진출을 위한 한·중 공동 커리큘럼 및 교환학생 파트너',
      '글로벌 조종사 육성 트랙 선도 가능',
    ],
    docCitation: 'Doc 3 (p.5, 7)',
  },
  {
    id: 'u-chodang',
    name: '초당대학교',
    region: '호남권',
    currentFleet: 'DA40·DA42 운용 이력 보유',
    proposedModel: '중국 현지 위탁운영 및 졸업생 비행시간 축적(타임빌딩)',
    contactTier: '1차 직접 접촉',
    targetDay: 'Day 2 (오송 로드쇼)',
    estimatedDemand: '2 ~ 3대 (DA40/DA42)',
    chinaFit: '최상',
    keyPoints: [
      'DA40·DA42 운용 경험 기반으로 중국 현지 위탁운영 친화적',
      '국내 비행시간 한계를 극복할 중국 현지 비행실습 높은 수요',
    ],
    docCitation: 'Doc 3 (p.5, 7)',
  },
  {
    id: 'u-kau',
    name: '한국항공대학교',
    region: '수도권',
    currentFleet: '대규모 자체 비행교육원 및 항공사 직결 라인',
    proposedModel: '중국·중동 민항 및 일반항공 진출 글로벌 다변화 프로그램',
    contactTier: '1차 직접 접촉',
    targetDay: 'Day 1 (서울 용산)',
    estimatedDemand: '2 ~ 4대 (특수목적/글로벌)',
    chinaFit: '높음',
    keyPoints: [
      '국내 최고 권위 항공 교육기관',
      '국내 대형사 편중 탈피, 중국/중동 일반항공 및 페리비행 진로 구축',
      '11월 23일 용산 로드쇼 핵심 초청 대상',
    ],
    docCitation: 'Doc 3 (p.3, 7)',
  },
  {
    id: 'u-hanhangjeon',
    name: '한국항공직업전문학교(한항전)',
    region: '수도권',
    currentFleet: '비행교육 전문 실무 훈련기관',
    proposedModel: '실무 훈련기 구매 및 중국 교육사업 협력 패키지',
    contactTier: '2차 DM / 로드쇼 참석',
    targetDay: 'Day 1 (서울 용산)',
    estimatedDemand: '1 ~ 2대 (훈련기)',
    chinaFit: '높음',
    keyPoints: [
      '조종사 및 항공정비사 전문 양성 기관',
      '신규 훈련기 도입 및 사천 MRO 정비사 취업 연계 시너지',
    ],
    docCitation: 'Doc 3 (p.3, 7)',
  },
  {
    id: 'u-kyungwoon',
    name: '경운대학교',
    region: '영남권',
    currentFleet: 'C172, XL2 운용 이력',
    proposedModel: '노후 C172 교체 및 DA40 신규 도입, 훈련체계 협력',
    contactTier: '1차 직접 접촉',
    targetDay: 'Day 2 (오송 로드쇼)',
    estimatedDemand: '2 ~ 3대 (C172 대체)',
    chinaFit: '높음',
    keyPoints: [
      '영남권 비행교육 거점, 구미 항공산업과 인접',
      '노후화된 가솔린 훈련기(C172)의 고효율 디젤엔진 DA40 대체 매력도 높음',
    ],
    docCitation: 'Doc 3 (p.5, 7)',
  },
  {
    id: 'u-jungwon',
    name: '중원대학교',
    region: '충청권',
    currentFleet: 'C172 운용, 재단 대출 프로그램 정보 보유',
    proposedModel: '항공기 금융·리스 연계 및 교육투자 맞춤 모델',
    contactTier: '2차 DM / 로드쇼 참석',
    targetDay: 'Day 2 (오송 로드쇼)',
    estimatedDemand: '1 ~ 2대 (금융리스)',
    chinaFit: '협의 필요',
    keyPoints: [
      '재단 차원의 항공기 금융/투자 프로그램 보유',
      '만풍그룹의 금융리스 및 현물투자 패키지와 매칭 가능성 높음',
    ],
    docCitation: 'Doc 3 (p.4, 7)',
  },
  {
    id: 'u-sehan',
    name: '세한대학교',
    region: '호남권',
    currentFleet: '외부 위탁교육 위주 운영',
    proposedModel: '해외 위탁비용 절감형 중국 현지 비행실습 전면 전환',
    contactTier: '1차 직접 접촉',
    targetDay: 'Day 2 (오송 로드쇼)',
    estimatedDemand: '위탁 계약 15~25명/년',
    chinaFit: '최상',
    keyPoints: [
      '자체 비행기 구매 부담 대신 중국 현지 운영법인 위탁실습 수요 강함',
      '3학년 전원 중국 현지 실습 및 학점 인정 패키지 제안',
    ],
    docCitation: 'Doc 3 (p.5, 7)',
  },
  {
    id: 'u-silla',
    name: '신라대학교',
    region: '영남권',
    currentFleet: '외부 위탁교육 위주 운영',
    proposedModel: '중국 교육기관 연계 및 해외 비행실습 패키지',
    contactTier: '1차 직접 접촉',
    targetDay: 'Day 2 (오송 로드쇼)',
    estimatedDemand: '위탁 계약 10~20명/년',
    chinaFit: '높음',
    keyPoints: [
      '동남권 항공운항학과로 해외 실습 전환 의향 높음',
      '중국 내 타임빌딩 비용 경쟁력 제안',
    ],
    docCitation: 'Doc 3 (p.5, 7)',
  },
  {
    id: 'u-kwandong',
    name: '가톨릭관동대학교',
    region: '수도권/강원',
    currentFleet: '외부 위탁교육 위주 운영',
    proposedModel: '기존 위탁교육 개선 및 중국 현지 실습·공동교육',
    contactTier: '2차 DM / 로드쇼 참석',
    targetDay: 'Day 1 (서울 용산)',
    estimatedDemand: '위탁 계약 10~15명/년',
    chinaFit: '높음',
    keyPoints: [
      '국내 비행 훈련 대기 시간 지연 문제 해결 대안으로 중국 실습 제안',
      '11월 23일 용산 간담회 참석',
    ],
    docCitation: 'Doc 3 (p.3, 7)',
  },
];

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  dayOfWeek: string;
  region: string;
  title: string;
  location: string;
  locationUrl?: string;
  purpose: string;
  highlights: string[];
  schedule: {
    time: string;
    activity: string;
    content: string;
    participants: string;
  }[];
}

export const ITINERARY_DAYS: ItineraryDay[] = [
  {
    dayNumber: 1,
    date: '2026.11.23',
    dayOfWeek: '월요일',
    region: '서울 · 용산',
    title: '한국 항공교육시장 설명회 및 수도권 대학·기관 로드쇼',
    location: '나인트리 프리미어 로카우스 호텔 서울 용산',
    locationUrl: 'https://rokaushotel.com',
    purpose: '한국 항공교육시장 전반을 소개하고 수도권 주요 대학의 기체 구매 및 중국 실습 수요를 발굴한다.',
    highlights: [
      '한국 항공교육시장 및 대학별 보유현황 브리핑',
      'Diamond DA40·DA42 제품 설명회 (가격, 납기, 유지관리, 금융)',
      '수도권 대학 총장단 네트워킹 오찬 및 1:1 개별 상담',
      '중국 현지 실습사업 (3학년 교환학생 & 비행시간 축적) 모델 제안',
    ],
    schedule: [
      { time: '09:00 ~ 10:00', activity: '방한단 환영 및 오리엔테이션', content: 'SEBA Partners 사업 소개 및 방한단 일정 브리핑', participants: '방한단 3인, SEBA 팀' },
      { time: '10:00 ~ 11:00', activity: '한국 항공교육시장 브리핑', content: '국내 대학별 항공기 보유현황 및 비행교육 현황 분석', participants: '수도권 대학 관계자, 방한단' },
      { time: '11:00 ~ 12:00', activity: 'Diamond 제품 설명회', content: 'DA40·DA42 최신 기술, 가격, 납기, 유지비 및 금융리스 안내', participants: '이윤 아태총괄, 대학 관계자' },
      { time: '12:00 ~ 13:00', activity: '공식 네트워킹 오찬', content: '참석 대학 총장단, 학과장과의 교류 및 라운드테이블', participants: '전체 참석자' },
      { time: '13:00 ~ 15:00', activity: '대학·기관 공동 간담회', content: '항공기 구매, 현물투자 및 리스 조건 심층 협의', participants: '대학 구매처장, 방한단' },
      { time: '15:00 ~ 16:00', activity: '중국 현지 실습사업 설명', content: '3학년 교환학생 및 중국 현지 비행실습 모델 제안', participants: '한국항공대, 한항전, 관동대 등' },
      { time: '16:00 ~ 17:00', activity: '1:1 개별 상담 세션', content: '학교별 구매 규모 및 후속 협력의향서(LOI) 타진', participants: '대학별 1:1 매칭' },
    ],
  },
  {
    dayNumber: 2,
    date: '2026.11.24',
    dayOfWeek: '화요일',
    region: '충북 · 오송',
    title: '중부권 대학·비행교육기관 로드쇼 및 실무 구매협의',
    location: 'OSCO 중회의실 (충북 청주시 흥덕구 오송역 일원)',
    locationUrl: 'https://osco.or.kr',
    purpose: '중부권 항공운항학과 및 비행교육기관의 실제 구매 수요를 확인하고 실무 협의를 진행한다.',
    highlights: [
      '청주대, 극동대, 중원대, 경운대, 초당대, 세한대 등 핵심 6개교 집중',
      '단순 설명회가 아닌 구매·투자 결정권자가 참석하는 실무협의회 운영',
      '대학별 보유 기종(DA42, C172 등) 특성에 맞춘 차별화 패키지 제안',
    ],
    schedule: [
      { time: '09:00 ~ 10:00', activity: '오송 행사장 준비 및 등록', content: '참석 대학 확인 및 사전 질문지 검토', participants: 'SEBA 팀, 행사요원' },
      { time: '10:00 ~ 11:00', activity: '만풍그룹 회사 소개', content: '글로벌 항공사업 비전 및 Diamond Aircraft 소개', participants: '서지량 이사, 이윤 총괄' },
      { time: '11:00 ~ 12:00', activity: 'DA40·DA42 구매 설명회', content: '가격, 납기, 유지관리비 및 단발/쌍발 도입 조건', participants: '중부권 대학 구매·재정 관계자' },
      { time: '12:00 ~ 13:00', activity: '오찬 및 네트워킹', content: '대학 관계자 오찬 교류', participants: '전체 참석자' },
      { time: '13:00 ~ 14:30', activity: '대학별 협력모델 발표', content: '학교별 맞춤형 항공기 도입 및 현물투자 모델 제안', participants: 'SEBA 기장 총괄, 대학별 대표' },
      { time: '14:30 ~ 15:30', activity: '중국 실습 프로그램 안내', content: '중국 내 비행교육 및 위탁운영 프로그램 구체화', participants: '방한단, 대학 관계자' },
      { time: '15:30 ~ 17:00', activity: '개별 구매상담 및 LOI 타진', content: '기체 도입 규모, 예산, 계약 조건 후속 협의', participants: '대학별 1:1 상담' },
    ],
  },
  {
    dayNumber: 3,
    date: '2026.11.25',
    dayOfWeek: '수요일',
    region: '대학 현장 방문',
    title: '우선협력 거점 대학 직접 방문 및 교육협력 구체화',
    location: '극동대학교, 청주대학교 (사전 협의 대학 현장)',
    purpose: '구매 가능성이 높은 대학 현장을 방문하여 격납고·시설을 확인하고 중국 현지 실습·운영 모델을 구체화한다.',
    highlights: [
      '극동대학교: DA42 다발훈련기 확대 및 중국 실습 프로그램 연계 현장 점검',
      '청주대학교: 기존 Diamond 운용 격납고 점검 및 추가 구매·정비 협의',
      '대학 총장단 접견 및 5대 핵심 질문 협의',
    ],
    schedule: [
      { time: '09:00 ~ 12:00', activity: '극동대학교 현장 방문', content: '항공운항학과 시설 점검, DA42 추가 도입 및 중국 실습 연계 회의', participants: '방한단 3인, SEBA 기장, 극동대 총장단' },
      { time: '12:00 ~ 13:30', activity: '오찬 회동', content: '대학 수뇌부와 고위급 오찬 회동', participants: '주요 참석자' },
      { time: '14:00 ~ 17:30', activity: '청주대학교 현장 방문', content: '기존 Diamond 기종 운용 현황 점검, MRO 협력 및 추가 구매 논의', participants: '방한단 3인, SEBA 기장, 청주대 총장단' },
    ],
  },
  {
    dayNumber: 4,
    date: '2026.11.26',
    dayOfWeek: '목요일',
    region: '경남 · 사천',
    title: '경남 사천 경비행기 조립공장 유치 및 MRO 투자협의',
    location: '경남 사천시 항공산업 클러스터, KAI, KAEMS, 사천시청',
    purpose: 'Diamond 항공기 한국 조립생산 및 동북아 MRO 거점 구축 가능성을 검증하고 지자체·산업체와 협의한다.',
    highlights: [
      '사천 조립공장 후보지 현장 답사 및 생산시설 검토',
      'KAI·KAEMS와 경비행기 정비·부품 공급 및 기술교육 협력 논의',
      '사천시 및 경상남도 고위 관계자와 투자 인센티브·입지 혜택 협의',
      '만풍그룹 내부 의사결정 회의 (합작법인 JV 조건 검토)',
    ],
    schedule: [
      { time: '09:00 ~ 10:00', activity: '사천 도착 및 브리핑', content: '한국 항공산업 인프라 및 사천 클러스터 현황 소개', participants: '방한단, SEBA, 사천시 관계자' },
      { time: '10:00 ~ 11:30', activity: '항공 산업시설 및 부지 답사', content: '조립공장 후보 부지, 활주로 접근성 및 생산시설 검토', participants: '이소연 총경리, SEBA, 사천시' },
      { time: '11:30 ~ 12:30', activity: 'MRO 협력회의', content: '정비, 부품공급, 기술교육, 정비사 인력양성 협력', participants: '방한단, 정비 전문가' },
      { time: '12:30 ~ 13:30', activity: '오찬', content: '지자체 및 항공 산업 관계자 교류', participants: '전체 참석자' },
      { time: '13:30 ~ 15:00', activity: '항공산업체(KAI/KAEMS) 협의', content: 'KAI, KAEMS 등 유관 기업과 협력 및 부품 국산화 가능성 검토', participants: '서지량 이사, 산업체 임원' },
      { time: '15:00 ~ 16:00', activity: '지자체 투자협의', content: '사천시·경남도 외국인투자 지원책, 부지 인센티브 협의', participants: '서지량 이사, 지자체 고위관계자' },
      { time: '16:00 ~ 17:00', activity: '만풍그룹 내부 회의', content: '합작법인(JV) 설립 조건, 지분, 2,000억 매출 목표 타당성 검토', participants: '방한단 3인 내부' },
    ],
  },
  {
    dayNumber: 5,
    date: '2026.11.27',
    dayOfWeek: '금요일',
    region: '서울 · 종합회의',
    title: '사업종합회의 및 한·중 후속 협약(MOU) 체결',
    location: '서울 본부 회의실',
    purpose: '5일간의 방한 성과를 구체적인 사업 실행계획으로 전환하고 SEBA 파트너십 및 후속 일정을 확정한다.',
    highlights: [
      '대학별 상담 결과 종합 (구매수요 및 LOI 집계)',
      'SEBA Partners 독점적 사업개발 권한 및 파트너십 협약 체결',
      '사천 조립공장 후속 실사 일정 및 업무협약서(MOU) 날인',
      '공식 방한 일정 마무리 및 귀국 준비',
    ],
    schedule: [
      { time: '09:00 ~ 10:00', activity: '방한 결과 총괄 정리', content: '대학별 상담 결과, 구매 수요 및 피드백 종합 분석', participants: 'SEBA 팀, 방한단' },
      { time: '10:00 ~ 11:00', activity: '한국 사업 파트너십 협의', content: 'SEBA Partners 역할, 사업범위, 독점 판매권 협의', participants: '서지량 이사, SEBA 기장 총괄' },
      { time: '11:00 ~ 12:00', activity: '항공기 구매·리스 세부 협의', content: '우선 구매대학(청주대, 극동대 등) 계약구조 및 납기 일정화', participants: '이윤 총괄, SEBA 영업' },
      { time: '12:00 ~ 13:00', activity: '오찬 회동', content: '종합 오찬 및 성과 축하', participants: '전체 참석자' },
      { time: '13:00 ~ 14:00', activity: '중국 교육사업 협의', content: '중국 현지 위탁운영 및 교환학생 모델 계약안 논의', participants: '방한단, SEBA 교육기획' },
      { time: '14:00 ~ 15:00', activity: '사천 조립·MRO 후속조치', content: '지자체 협약 일정, 2차 실사단 파견 계획 확정', participants: '이소연 총경리, SEBA 총괄' },
      { time: '15:00 ~ 16:00', activity: '업무협약(MOU) 서명식', content: '후속 협상 일정, 담당자 지정 및 MOU 체결', participants: '서지량 이사, SEBA 대표' },
      { time: '16:00 ~ 17:00', activity: '공식 일정 종료 및 환송', content: '방한 성과 보고서 작성 착수 및 귀국길 환송', participants: '전체 참석자' },
    ],
  },
];

export interface CareerTrack {
  id: string;
  code: string;
  title: string;
  targetRole: string;
  trainingPath: string;
  finalCareer: string;
  description: string;
  specificRoles?: string[];
}

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'track-a',
    code: 'Track A',
    title: '군 조종사 트랙 (공군 조종장교)',
    targetRole: '공군 조종장교 복무 후 민항 진출',
    trainingPath: '공군 중등비행과정 및 조종장교 임관 후 약 13년 군 복무',
    finalCareer: '전역 후 국내외 민간항공사 기장/부기장 진출',
    description: '군의 공식 선발제도 및 항공사 채용기준에 연계되는 국가급 정예 조종인력 양성 경로',
  },
  {
    id: 'track-b',
    code: 'Track B',
    title: '민간 항공사 정규 트랙',
    targetRole: '국내외 민간 항공사 신입 부기장',
    trainingPath: 'PPL(자가용) -> IR(계기비행) -> CPL(사업용) -> Multi(다발기) -> MCC & Jet Transition -> 타임빌딩(300~500h)',
    finalCareer: '대한항공, 아시아나, 저비용항공사(LCC) 및 해외 항공사 부기장',
    description: '대학 교육과 Diamond 항공기를 통한 고품질 훈련으로 민항 부기장 표준 채용조건 충족',
  },
  {
    id: 'track-c',
    code: 'Track C',
    title: '글로벌 일반항공 & Career Building 트랙',
    targetRole: '중국·중동 일반항공, 비행교관, 특수항공 임무',
    trainingPath: '실질 운항경력 축적(Time Building) 및 직무 역량화 프로그램',
    finalCareer: '중국·중동 일반항공 조종사, 비행교육원 교관, 해외 특수비행 조종사',
    description: '단순 비행시간 누적이 아닌 페리비행, 항공촬영, 산불진화, 응급의료, 에어택시 등 유급 비행경력 확보',
    specificRoles: [
      'Ferry Flight (항공기 신조기 해외 인도 비행)',
      'Aerial Photography / Survey (항공측량 및 고해상도 촬영)',
      'Aerial Observation & Weather (공중 정찰 및 기상 관측)',
      'Wildfire Aviation Support (산불 감시 및 소방 항공 지원)',
      'Emergency / Medical Support (응급환자 이송 및 의료 지원 비행)',
      'Small Cargo & Air Taxi (소형 화물 및 도서지역 여객 수송)',
      'Business Aviation (기업 전용기 및 비즈니스 제트 운항)',
    ],
  },
];
