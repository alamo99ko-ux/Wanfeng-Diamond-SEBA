import React, { useState } from 'react';
import { 
  Coins, 
  Users, 
  Laptop, 
  Calendar, 
  TrendingUp, 
  CheckSquare, 
  Square, 
  HelpCircle,
  Download,
  AlertCircle,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  Eye,
  EyeOff
} from 'lucide-react';
import { ActiveTab } from './Header';

interface BudgetSimulatorProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectChecklistAssignee?: (assigneeId: string) => void;
  isBudgetUnlocked?: boolean;
  onUnlockBudget?: (pwd: string) => boolean;
  onLockBudget?: () => void;
}

export const BudgetSimulator: React.FC<BudgetSimulatorProps> = ({
  setActiveTab,
  onSelectChecklistAssignee,
  isBudgetUnlocked = false,
  onUnlockBudget,
  onLockBudget,
}) => {
  const [selectedModel, setSelectedModel] = useState<'minimal' | 'recommended' | 'expanded'>('recommended');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUnlockBudget) {
      const ok = onUnlockBudget(passwordInput);
      if (ok) {
        setPasswordError(false);
        setPasswordInput('');
      } else {
        setPasswordError(true);
      }
    }
  };
  const [equipmentProcured, setEquipmentProcured] = useState<Record<string, boolean>>({
    eq1: true, // 노트북
    eq2: true, // 모니터
    eq3: false,
    eq4: false,
    eq5: false,
    eq6: true, // 업무용 폰
    eq7: false,
    eq8: true, // 책상
    eq9: false,
  });

  const toggleEquipment = (id: string) => {
    setEquipmentProcured((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const modelData = {
    minimal: {
      name: '최소 운영형',
      headcount: '2명 (기존 정규직)',
      monthlyMin: 1200,
      monthlyMax: 1800,
      initial3MoMin: 5500,
      initial3MoMax: 7800,
      description: '기존 기장 출신 1명과 행정직 1명으로 방한 준비와 대학 영업을 병행. 업무 병목 위험 존재.',
      universitySales: '제한적 추진 (3~4개교 우선 접촉)',
      chinaLiaison: '기존 인력 분담 (통역 외부 의존)',
      advisors: '필요 시 간헐적 자문',
    },
    recommended: {
      name: '권장 운영형 (SEBA 채택안)',
      headcount: '4명 (상근 3인 + 중국어 1인)',
      monthlyMin: 2160,
      monthlyMax: 3255,
      initial3MoMin: 8540,
      initial3MoMax: 13455,
      description: '사업개발 전문 1명 정규 채용 + 중국어 계약직 1명 추가 확보. 대학 영업과 방한 의전 동시 원활 추진.',
      universitySales: '적극 추진 (11개 대학 전원 접촉 및 3개교 LOI 확보)',
      chinaLiaison: '전담 담당자 배정 및 실시간 협상 대응',
      advisors: '기술/정비 + 법률/인증 월 10~40시간 정기 자문',
    },
    expanded: {
      name: '확장 운영형',
      headcount: '5~6명 (전담팀 구축)',
      monthlyMin: 3500,
      monthlyMax: 4500,
      initial3MoMin: 14000,
      initial3MoMax: 19500,
      description: '전국 대학 영업망 및 중국 현지 전담 인력, MRO 전문 엔지니어를 사전 채용하는 전방위 확장 체제.',
      universitySales: '전국 비행교육원 및 항공사 연계망 확대',
      chinaLiaison: '중국 현지 주재 및 비행원 전담 데스크',
      advisors: '전담 상임 자문위원 위촉',
    },
  };

  const currentScenario = modelData[selectedModel];

  const equipmentList = [
    { id: 'eq1', name: '업무용 고성능 노트북', qty: '3대', minCost: 450, maxCost: 600, note: '사업총괄, 행정, 영업' },
    { id: 'eq2', name: '업무용 27인치 모니터', qty: '3대', minCost: 60, maxCost: 90, note: '듀얼 모니터 세팅' },
    { id: 'eq3', name: '복합기 및 고속 스캐너', qty: '1대', minCost: 40, maxCost: 80, note: '계약서 및 공문 인쇄' },
    { id: 'eq4', name: '화상회의 전용 시스템', qty: '1세트', minCost: 30, maxCost: 70, note: '중국 본사 정기 화상회의' },
    { id: 'eq5', name: '빔프로젝터 / 대형 디스플레이', qty: '1대', minCost: 50, maxCost: 120, note: '로드쇼 및 회의실 발표' },
    { id: 'eq6', name: '업무용 전용 휴대전화', qty: '2~3대', minCost: 100, maxCost: 180, note: '대학 영업 및 중국 연락' },
    { id: 'eq7', name: '외장 SSD / NAS 백업장치', qty: '1세트', minCost: 50, maxCost: 100, note: '대용량 항공 데이터 보관' },
    { id: 'eq8', name: '사무용 책상·의자 세트', qty: '3~4세트', minCost: 100, maxCost: 180, note: '신규 인력 사무환경' },
    { id: 'eq9', name: '네트워크 장비 및 기타 소모품', qty: '1식', minCost: 30, maxCost: 50, note: '보안 라우터, 소모품' },
  ];

  const totalProcuredCount = Object.values(equipmentProcured).filter(Boolean).length;

  // If locked, render security lock gate
  if (!isBudgetUnlocked) {
    return (
      <div className="space-y-6 pb-16 max-w-2xl mx-auto pt-6">
        <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-lg text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            <KeyRound className="w-8 h-8 text-slate-700 dark:text-slate-300" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
              <Lock className="w-3.5 h-3.5" />
              <span>비용·예산 관련 대외비 보안 탭 (보고서 2)</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              보안 비밀번호를 입력해주세요
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              상근 인력 4인 채용 인건비, 사무기기·장비 도입 예산 및 3개월 초기 예산(8,540만~1.34억 원) 산출안이 포함된 대외비 영역입니다.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="max-w-sm mx-auto space-y-3">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="비밀번호 8자리 입력 (28687870)"
                className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 pr-10 ${
                  passwordError
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-slate-400'
                }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {passwordError && (
              <div className="text-xs text-red-500 font-medium flex items-center justify-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>비밀번호가 일치하지 않습니다. 다시 확인해주세요.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <Unlock className="w-4 h-4" />
              <span>비용 시뮬레이터 잠금 해제</span>
            </button>
          </form>

          <div className="text-[11px] text-slate-400 dark:text-slate-500">
            보안 패스워드 설정: <span className="font-mono font-semibold">28687870</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Security Status Bar */}
      <div className="p-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
          <Unlock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="font-semibold">보안 인증 완료 (보고서 2 비용·예산 데이터 열람 중)</span>
        </div>
        {onLockBudget && (
          <button
            onClick={onLockBudget}
            className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 bg-white dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600 flex items-center gap-1"
          >
            <Lock className="w-3 h-3" />
            <span>다시 잠그기</span>
          </button>
        )}
      </div>

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Financial & Organizational Architecture (대외비)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            인력·장비·월 운영비 산출 및 예산 시뮬레이터
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            보고서 2에 근거한 상근 4인 권장형 조직 모델, 초기 3개월 8,540만~1.34억 원 소요 예산 분석
          </p>
        </div>

        {/* Model Selector Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setSelectedModel('minimal')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              selectedModel === 'minimal'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            최소 운영형 (2인)
          </button>
          <button
            onClick={() => setSelectedModel('recommended')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              selectedModel === 'recommended'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            권장 운영형 (4인) ★
          </button>
          <button
            onClick={() => setSelectedModel('expanded')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              selectedModel === 'expanded'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            확장 운영형 (5~6인)
          </button>
        </div>
      </div>

      {/* 1. Model Summary Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
              OPERATIONAL SCENARIO
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {currentScenario.name}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              {currentScenario.description}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">초기 3개월 소요 자금</span>
            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white tabular-nums">
              약 {currentScenario.initial3MoMin.toLocaleString()}만 ~ {currentScenario.initial3MoMax.toLocaleString()}만 원
            </span>
          </div>
        </div>

        {/* 4 Feature Comparison Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
              상근 인력 구성
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {currentScenario.headcount}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
              예상 월 운영비
            </div>
            <div className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400 mt-1 tabular-nums">
              {currentScenario.monthlyMin.toLocaleString()}만 ~ {currentScenario.monthlyMax.toLocaleString()}만 원
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
              대학 영업 강도
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {currentScenario.universitySales}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase">
              외부 전문가 자문
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              {currentScenario.advisors}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Initial 3-Month Startup Budget Table (Doc 2 p.5) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              초기 3개월 사업 추진 소요 예산 총괄표 (권장 4인 기준)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              상근 4명 기준 3개월 운용자금 및 방한 행사 실비 포함 (Doc 2 p.5)
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
            총계: 8,540만 ~ 1억 3,455만 원
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-4">비용 항목</th>
                <th className="py-2.5 px-4 text-right">예상 금액</th>
                <th className="py-2.5 px-4">세부 내역 및 산출 근거</th>
                <th className="py-2.5 px-4 w-32">담당자</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  1. 초기 장비 구입비
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold tabular-nums">
                  910만 ~ 1,470만 원
                </td>
                <td className="py-3 px-4">
                  업무용 노트북 3대, 모니터 3대, 복합기, 화상회의 세트, 빔프로젝터, 휴대전화, 책상·의자 등
                </td>
                <td className="py-3 px-4 text-slate-500">행정직 직원</td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  2. 3개월 운영비 (월 2,160~3,255만)
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold tabular-nums">
                  6,480만 ~ 9,765만 원
                </td>
                <td className="py-3 px-4">
                  상근 4인 인건비(1,630~2,195만/월) + 사무실 임대(100~200만) + 출장비 + 외부자문비
                </td>
                <td className="py-3 px-4 text-slate-500">사업총괄 / 행정</td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  3. 11월 방한 행사 운영비
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold tabular-nums">
                  650만 ~ 1,220만 원
                </td>
                <td className="py-3 px-4">
                  용산·오송 회의실 대관, 음향/화면, 브로슈어 인쇄, 중·한 통역(150~250만), 차량, 다과
                </td>
                <td className="py-3 px-4 text-slate-500">행정 / 중국어</td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  4. 초기 예비비
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold tabular-nums">
                  500만 ~ 1,000만 원
                </td>
                <td className="py-3 px-4">
                  긴급 실무 출장, 추가 법률 검토비, 현물투자 실무자 회동비 등 긴급 대응비
                </td>
                <td className="py-3 px-4 text-slate-500">사업총괄</td>
              </tr>

              <tr className="bg-slate-50/80 dark:bg-slate-800/80 font-bold">
                <td className="py-3.5 px-4 text-slate-900 dark:text-white">
                  [총 소요 자금]
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-emerald-600 dark:text-emerald-400 text-sm tabular-nums">
                  8,540만 ~ 1억 3,455만 원
                </td>
                <td className="py-3.5 px-4 text-[11px] text-slate-500 font-normal" colSpan={2}>
                  * 실제 항공기 구매대금, 사천 조립공장 부지/설비 투자금, 인증비 등은 별도 사업투자 예산으로 분리
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Interactive Equipment Procurement Checklist (Doc 2 p.4) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              필요 장비 및 사무환경 조달 현황 ({totalProcuredCount}/9종 조달 완료)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              체크박스를 클릭하여 장비 조달 상태를 실시간 업데이트할 수 있습니다. (Doc 2 p.4)
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
            예상 장비비: 910만 ~ 1,470만 원
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {equipmentList.map((eq) => {
            const isDone = equipmentProcured[eq.id];
            return (
              <div
                key={eq.id}
                onClick={() => toggleEquipment(eq.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                  isDone
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0">
                  {isDone ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isDone ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                      {eq.name}
                    </span>
                    <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                      {eq.qty}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 tabular-nums">
                    {eq.minCost}~{eq.maxCost}만 원
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {eq.note}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. 5-Month (2026.11 ~ 2027.03) Cash Flow Projection Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              5개월 (2026.11 ~ 2027.03) 월별 현금소요 및 인력투입 프로젝션
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              보고서 2 권고(p.8)에 따라 방한부터 계약 성립 및 조직 확대까지의 누적 소요액 모델링
            </p>
          </div>
          <span className="text-xs text-slate-400">단위: 만 원</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-4">월차 / 기간</th>
                <th className="py-2.5 px-4">투입 인력 및 단계</th>
                <th className="py-2.5 px-4 text-right">인건비</th>
                <th className="py-2.5 px-4 text-right">운영비·출장비</th>
                <th className="py-2.5 px-4 text-right">행사·장비비</th>
                <th className="py-2.5 px-4 text-right">당월 소요액</th>
                <th className="py-2.5 px-4 text-right">누적 소요액</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-bold font-sans text-slate-900 dark:text-white">
                  2026. 11월
                </td>
                <td className="py-3 px-4 font-sans">
                  상근 4인 + 통역 + 행사단기 4인 (방한 협상)
                </td>
                <td className="py-3 px-4 text-right tabular-nums">1,900</td>
                <td className="py-3 px-4 text-right tabular-nums">750</td>
                <td className="py-3 px-4 text-right text-blue-600 dark:text-blue-400 font-bold tabular-nums">2,200</td>
                <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white tabular-nums">4,850</td>
                <td className="py-3 px-4 text-right font-bold tabular-nums">4,850</td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-bold font-sans text-slate-900 dark:text-white">
                  2026. 12월
                </td>
                <td className="py-3 px-4 font-sans">
                  상근 4인 + 자문단 (대학 후속 계약 & LOI 실사)
                </td>
                <td className="py-3 px-4 text-right tabular-nums">1,900</td>
                <td className="py-3 px-4 text-right tabular-nums">650</td>
                <td className="py-3 px-4 text-right tabular-nums">150</td>
                <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white tabular-nums">2,700</td>
                <td className="py-3 px-4 text-right font-bold tabular-nums">7,550</td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-bold font-sans text-slate-900 dark:text-white">
                  2027. 01월
                </td>
                <td className="py-3 px-4 font-sans">
                  상근 4인 + 중국 출장 (중국 교육법인 협약)
                </td>
                <td className="py-3 px-4 text-right tabular-nums">1,900</td>
                <td className="py-3 px-4 text-right tabular-nums">900</td>
                <td className="py-3 px-4 text-right tabular-nums">100</td>
                <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white tabular-nums">2,900</td>
                <td className="py-3 px-4 text-right font-bold tabular-nums">10,450</td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-bold font-sans text-slate-900 dark:text-white">
                  2027. 02월
                </td>
                <td className="py-3 px-4 font-sans">
                  상근 5인 (기술·정비 전문가 채용 검토 착수)
                </td>
                <td className="py-3 px-4 text-right tabular-nums">2,400</td>
                <td className="py-3 px-4 text-right tabular-nums">700</td>
                <td className="py-3 px-4 text-right tabular-nums">100</td>
                <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white tabular-nums">3,200</td>
                <td className="py-3 px-4 text-right font-bold tabular-nums">13,650</td>
              </tr>

              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td className="py-3 px-4 font-bold font-sans text-slate-900 dark:text-white">
                  2027. 03월
                </td>
                <td className="py-3 px-4 font-sans">
                  조직 확대 (사천 JV 설립 및 초도 계약 체결)
                </td>
                <td className="py-3 px-4 text-right tabular-nums">2,600</td>
                <td className="py-3 px-4 text-right tabular-nums">850</td>
                <td className="py-3 px-4 text-right tabular-nums">200</td>
                <td className="py-3 px-4 text-right font-bold text-slate-900 dark:text-white tabular-nums">3,650</td>
                <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400 text-sm tabular-nums">
                  17,300 (약 1.73억)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
