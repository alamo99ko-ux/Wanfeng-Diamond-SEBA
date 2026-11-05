import React from 'react';
import { ActiveTab } from './Header';
import { 
  Building2, 
  TrendingUp, 
  Calendar, 
  Users, 
  Coins, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Award,
  Compass,
  Briefcase,
  FileText
} from 'lucide-react';
import { DOCUMENTS_DATA } from '../data/documentsData';
import { ITINERARY_DAYS } from '../data/universitiesAndItineraryData';

interface IntegratedDashboardProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectDoc?: (docId: string) => void;
  overallChecklistProgress: number;
}

export const IntegratedDashboard: React.FC<IntegratedDashboardProps> = ({
  setActiveTab,
  onSelectDoc,
  overallChecklistProgress,
}) => {
  const heroImage = '/src/assets/images/diamond_aircraft_hero_1793839052359.jpg';
  const meetingImage = '/src/assets/images/aviation_executive_meeting_1793839054720.jpg';

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">만풍오토홀딩스그룹 방한</span>
                <span aria-hidden="true">·</span>
                <span>2026.11.23(월) ~ 11.27(금)</span>
                <span aria-hidden="true">·</span>
                <span>SEBA Partners 추진</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                글로벌 항공기업 방한 및 <br className="hidden sm:inline" />
                <span className="text-blue-600 dark:text-blue-400">경남 사천 경비행기 조립공장</span> 유치 전략
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                오스트리아 <strong className="font-semibold text-slate-900 dark:text-white">Diamond Aircraft</strong>의
                모기업 만풍그룹(연매출 7조원) 최고경영진 방한을 맞아, 경남 사천 한·중 합작공장(JV) 유치,
                수도권·중부권 11개 대학 비행교육 네트워크, 3대 조종사 진로 다변화 및 3년 내 연 매출 2,000억 원 달성을 위한 통합 프로젝트 포털입니다.
              </p>
            </div>

            <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('relationships')}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>데이터 관계망 시각화 보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('checklists')}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>담당자별 체크리스트</span>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                  {overallChecklistProgress}% 완료
                </span>
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 rounded-lg transition-colors"
              >
                <span>3대 원문 보고서 대조</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full">
            <img
              src={heroImage}
              alt="Diamond Aircraft DA42 twin-engine aircraft"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
              <div className="text-xs font-mono tracking-wider text-blue-300">DIAMOND DA42 & DA40 AIRCRAFT</div>
              <div className="text-sm font-semibold">오스트리아 다이아몬드 항공 완제기 조립 라인</div>
              <div className="text-xs text-slate-300">경남 사천시 항공산업 클러스터 한·중 합작공장(JV) 후보</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">3년 목표 매출</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            2,000억 원
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            공장 가동 후 3년 내 유니콘 기업 도약
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">연간 조립/생산량</span>
            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            100 ~ 300대
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            완성창 및 키트 조립 (DA40/DA42)
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">타깃 항공 대학</span>
            <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            11개 대학 / 8+ 섭외
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            수도권 및 중부권 로드쇼 참여
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">초기 3개월 예산</span>
            <Coins className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
            8,540만 ~ 1.34억
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            상근 4인 권장형 조직 운용 기준
          </div>
        </div>
      </section>

      {/* 2-1. ★ NEW: Korean Enterprise (Hyundai & Kia) Existing Collaboration Spotlight */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-cyan-950 via-slate-900 to-blue-950 border border-cyan-800/60 text-white shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 rounded">
                VERIFIED COOPERATION
              </span>
              <span className="text-xs text-cyan-200">
                [대정부 정책 보고 증보판] 3장 반영
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>한국 완성차 기업(현대·기아) 협력 실적 및 항공 제조 연계</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              만풍그룹은 단순한 신규 진입 외국기업이 아닙니다. <strong className="text-white">현대자동차를 글로벌 OEM 고객사로 명시</strong>하고 있으며,
              <strong className="text-cyan-300"> 현대·기아와 20년 이상의 협력 기반</strong>을 유지해 온 검증된 글로벌 제조 파트너입니다.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <a
              href="/assets/aistudio/261105_________________________________1257fa2e.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>증보판 원문 PDF 보기</span>
            </a>
          </div>
        </div>

        {/* 3 Fact Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-800/40 space-y-2">
            <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
              FACT 01 · 공식 OEM 고객사
            </div>
            <div className="text-sm font-bold text-white">
              현대자동차 공식 명시
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              만풍 자동차 휠 사업부 공식 카탈로그에 Hyundai를 글로벌 완성차 고객사로 공식 명시. 연간 휠 생산능력 1,800만 개 기반의 대량 양산 및 엄격한 품질·납기 검증 완료.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-800/40 space-y-2">
            <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
              FACT 02 · 20년 장기 협력
            </div>
            <div className="text-sm font-bold text-white">
              현대·기아 20년 파트너십
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              만풍그룹 공식 발표에서 현대·기아와 20년 이상 협력 관계를 유지해 왔다고 공개. 자동차용 알루미늄 휠 및 마그네슘 경량화 소재 기술 분야 핵심 공급망 역할 수행.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-800/40 space-y-2">
            <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase">
              FACT 03 · 최근 고위급 교류
            </div>
            <div className="text-sm font-bold text-white">
              2026.08 기아 중국 구매본부장 방문
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              2026년 8월 20일 기아 중국 구매본부장 리태원(Li Taiyuan)이 만풍그룹 본사를 직접 방문하여 신에너지차(NEV) 부품, 글로벌 생산 대응 및 해외 공급망 전략 협력 논의.
            </p>
          </div>
        </div>

        {/* 3-1. Aviation Synergies Box */}
        <div className="p-5 rounded-xl bg-slate-950/60 border border-cyan-700/30 space-y-3">
          <div className="text-xs font-bold text-cyan-300">
            사천 항공기 조립공장 유치와의 연계 시너지 (왜 중요한가?)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">①</span>
              <span><strong>글로벌 양산·품질 대응력:</strong> 글로벌 완성차 OEM 수준의 까다로운 품질관리와 납기관리 역량을 사천 조립공장 라인 운영에 즉시 접목</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">②</span>
              <span><strong>한국 산업계와의 신뢰 접점:</strong> 20년간 다져진 신뢰로 국내 부품 협력업체 발굴 및 KAI/KAEMS 등 항공업계와의 기술 교류 촉진</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">③</span>
              <span><strong>소재·가공 기술의 항공 확장:</strong> 자동차 경량화 부품에서 축적한 주조·가공·경량소재 기술 노하우를 항공기 부품 국산화 기반으로 활용</span>
            </div>
          </div>
        </div>

        {/* Official Sources Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-slate-400 border-t border-cyan-900/60">
          <div className="flex items-center gap-3">
            <span>공식 출처:</span>
            <a
              href="https://www.wfaw.com.cn/Aluminum-Alloy-Auto-Whee/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Wanfeng Auto Wheel 공식 제품소개</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://news.10jqka.com.cn/20260820/c679146451.shtml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>2026.08.20 기아 중국 구매본부장 만풍그룹 방문 보도</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            onClick={() => {
              if (onSelectDoc) onSelectDoc('doc-sacheon');
              setActiveTab('documents');
            }}
            className="text-white hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            <span>대정부 정책 보고서 전문 대조하기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. Three Strategic Growth Axes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
              Core Strategic Pillars
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Diamond Korea 3대 핵심 성장축
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            보고서 3 요약 (p.13)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 font-mono font-bold text-sm flex items-center justify-center">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              항공기 판매 및 제조
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              DA40 단발기 및 DA42 쌍발기의 국내 대학/비행원 판매, 경남 사천 조립생산 공장(한·중 합작 JV),
              동북아 MRO 정비 거점 구축, 부품 국산화 및 동남아시아 시장 수출 기지화.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              관련: 경남 사천시, KAI/KAEMS, 만풍그룹, 기술자문
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-sm flex items-center justify-center">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              한·중 항공교육 네트워크
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              한국 대학의 항공기 구매 또는 현물투자 참여, 중국 현지 법인 위탁운영, 3학년 비행실습 프로그램 및 학점 인정 연계.
              대학은 시설 투자부담을 줄이고 중국 인프라를 활용.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              관련: 극동대, 청주대, 한서대, 초당대 등 11개 대학
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm flex items-center justify-center">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              글로벌 조종사 Career Network
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              국내 대형사 편중 조종사 취업시장을 탈피하여 군 조종장교, 정규 민간항공사 부기장,
              글로벌 일반항공(중국·중동 항공사, 비행교관, 페리비행, 특수비행)의 3대 진로 트랙 구축.
            </p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              관련: 한국항공대, 조종인력 풀, 해외 채용사
            </div>
          </div>
        </div>
      </section>

      {/* 4. Three Documents Cross-Navigation (Organically Linked) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
              Three Synthesized Reports
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3대 핵심 보고서 유기적 연결 및 개별 열람
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('documents')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>전체 문서 비교 열람하기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOCUMENTS_DATA.map((doc) => (
            <div
              key={doc.id}
              className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    REPORT {doc.docNumber}
                  </span>
                  <span>{doc.date}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {doc.summary}
                </p>

                <div className="pt-2 space-y-1.5">
                  {doc.keyMetrics.slice(0, 2).map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">{m.label}</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (onSelectDoc) onSelectDoc(doc.id);
                    setActiveTab('documents');
                  }}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  <span>문서 상세 보기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={doc.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1"
                  title="원문 PDF 열기"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 5-Day Visual Timeline Preview */}
      <section className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
              Mission Roadmap
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              방한 5일간 핵심 일정 흐름 (2026.11.23 ~ 11.27)
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('itinerary')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>시간대별 세부 일정 및 대학 매트릭스</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {ITINERARY_DAYS.map((day) => (
            <div
              key={day.dayNumber}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    DAY {day.dayNumber}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">{day.date}</span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {day.region}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  {day.location}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
                <p className="line-clamp-2">{day.purpose}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Key Personnel & Delegation Cross-Table */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wanfeng Delegation */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>만풍오토홀딩스그룹 방한 최고경영진</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">대표단 3인</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                <span>徐志良 (Xu Zhiliang)</span>
                <span className="text-blue-600 dark:text-blue-400">최종 의사결정권자</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                그룹 이사, 당위 부서기, 총재판공실 주임, 저장성 일반항공산업협회 부비서장
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                그룹 차원의 투자·전략적 협력 결정, 사천 조립공장 설립 최종 결재
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                <span>李赟 (Li Yun)</span>
                <span className="text-indigo-600 dark:text-indigo-400">판매 및 파트너십</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                완펑 다이아몬드 에어크래프트 아시아태평양 총괄 매니저
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                한국 시장 진출, DA40·DA42 판매 가격·납기 협상, 대학 및 지역 파트너 협의
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                <span>李小娟 (Li Xiaojuan)</span>
                <span className="text-emerald-600 dark:text-emerald-400">제조 및 생산기술</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                저장 완펑 항공기 제조 유한공사 총경리
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                사천 조립생산 공장 부지 실사, 조립 라인 구축 및 기술이전·MRO 실무 협의
              </div>
            </div>
          </div>
        </div>

        {/* SEBA Partners Core Organization */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>SEBA Partners 사업추진 TF 조직체계</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">권장 상근 4인 + 자문단</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                <span>기장 출신 사업총괄 (기존)</span>
                <span className="text-blue-600 dark:text-blue-400">Aviation Expert</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                만풍그룹 협상, 항공사업 기획, 비행교육·운항 모델, 사천 조립·MRO 사업구조 총괄
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                <span>행정·사업지원 담당 (기존)</span>
                <span className="text-slate-600 dark:text-slate-400">Operations</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                문서, 일정 관리, 대학 초청공문 발송, 회계·계약 관리, 용산/오송 회의장 운영
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                <span>사업개발·영업 담당 (추가 채용 1순위)</span>
                <span className="text-indigo-600 dark:text-indigo-400">BD / Sales</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                11개 대학 발굴 및 현물투자 협의, 구매수요 조사, 3개교 이상 LOI 확보
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white">
                <span>중국어·국제업무 / 외부 전문 자문단</span>
                <span className="text-amber-600 dark:text-amber-400">China Desk & Advisors</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                만풍그룹 연락·의전·동시통역 지원, 항공기 제조·정비 및 법률·합작법인 전문 자문
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6-1. Roadshow & Visit Request Callout */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-slate-50 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
              Online Registration & Visit Requests
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              로드쇼 참가신청서 및 지자체·대학 방문요청서 접수
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('forms')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>전체 접수 양식 바로가기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Form 1 Card */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800/80 border border-blue-100 dark:border-blue-900/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded">
                  양식 1
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  수도권·중부권 대학 및 기관
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                설명회 로드쇼 참가 신청서
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                오송역과 용산역 중 참여 가능한 일자와 장소를 선택(용산역 23일 오후 2시 부터 4시까지, 오송역 24일 오후 2시 부터 4시까지)하여 웹화면에서 바로신청할 수 있습니다.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700">
              <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
                ● 용산역 23일(오후 2시~4시) / ● 오송역 24일(오후 2시~4시)
              </span>
              <button
                onClick={() => setActiveTab('forms')}
                className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
              >
                <span>웹화면에서 바로신청</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Form 2 Card */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800/80 border border-emerald-100 dark:border-emerald-900/40 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded">
                  양식 2
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  지자체·대학 실사 방문 (14시~16시)
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                현장 방문요청서
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                11월 25일 또는 26일(요청시간: 14시~16시) 중 택일, 도시 이름을 입력하고 기관명, 담당자이름, 전화번호, 이메일주소를 기재하여 실사 방문을 요청합니다.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                ● 11월 25일(14시~16시) / ● 11월 26일(14시~16시)
              </span>
              <button
                onClick={() => setActiveTab('forms')}
                className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
              >
                <span>웹화면에서 바로신청</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Action Banner */}
      <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-bold">
            만풍그룹 방한 D-Day 실무 준비 및 데이터 관계망 탐색
          </h3>
          <p className="text-xs sm:text-sm text-blue-200 max-w-2xl leading-relaxed">
            3대 문서에 기록된 사천 조립공장 유치 조건, 11개 대학 맞춤 모델, 소요 예산 8,540만~1.34억 원 및
            담당자별 실시간 체크리스트를 지금 바로 확인하십시오.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('relationships')}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold bg-white text-blue-900 hover:bg-blue-50 rounded-lg transition-colors whitespace-nowrap shadow-xs"
          >
            관계망 그래프 열기
          </button>
          <button
            onClick={() => setActiveTab('checklists')}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold bg-blue-700/60 hover:bg-blue-700 border border-blue-400/40 text-white rounded-lg transition-colors whitespace-nowrap"
          >
            체크리스트 열기
          </button>
        </div>
      </section>
    </div>
  );
};
