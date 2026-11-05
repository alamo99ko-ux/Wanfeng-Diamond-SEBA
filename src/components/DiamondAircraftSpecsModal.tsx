import React, { useState } from 'react';
import { 
  Plane, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Fuel, 
  Gauge, 
  Users, 
  ShieldCheck, 
  Wrench, 
  DollarSign, 
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

interface DiamondAircraftSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFormPreset?: (preset: {
    formType: 'roadshow' | 'visit' | 'list';
    venue?: string;
    date?: string;
  }) => void;
}

export const DiamondAircraftSpecsModal: React.FC<DiamondAircraftSpecsModalProps> = ({
  isOpen,
  onClose,
  onSelectFormPreset,
}) => {
  const [activeTab, setActiveTab] = useState<'compare' | 'economy' | 'synergy'>('compare');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-600 text-white shrink-0 shadow-md">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Diamond Aircraft Fleet Spec Matrix
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  DA40 NG & DA42-VI
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                다이아몬드 항공기 DA40 NG vs DA42-VI 상세 제원 대조 및 메리트
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-base font-bold transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub Navigation Segmented Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>상세 제원 1:1 대조 표</span>
          </button>
          <button
            onClick={() => setActiveTab('economy')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'economy'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Fuel className="w-3.5 h-3.5" />
            <span>연료 절감 & 운용 경제성 분석</span>
          </button>
          <button
            onClick={() => setActiveTab('synergy')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'synergy'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>사천 MRO & 한·중 위탁실습 시너지</span>
          </button>
        </div>

        {/* TAB 1: COMPARE SPEC MATRIX */}
        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* DA40 NG Card */}
              <div className="p-5 rounded-xl bg-blue-50/50 dark:bg-slate-800/60 border border-blue-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    SINGLE ENGINE DIESEL
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                    기본/사업용 훈련기
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  DA40 NG (Next Generation)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  고효율 Austro Engine AE300 디젤 터보 엔진 탑재. 자가용(PPL) 및 사업용(CPL) 기본조종사 양성을 위한 글로벌 대표 4인승 단발 훈련기.
                </p>
                <div className="text-xs font-bold text-blue-700 dark:text-blue-300 font-mono">
                  예상 도입가격: 약 $550,000 (약 7.5억 원)
                </div>
              </div>

              {/* DA42-VI Card */}
              <div className="p-5 rounded-xl bg-indigo-50/50 dark:bg-slate-800/60 border border-indigo-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    TWIN ENGINE LIGHT AIRCRAFT
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                    계기/다발 훈련 및 타임빌딩
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  DA42-VI (Twin Engine)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  쌍발 Austro Engine AE300 터보 디젤 엔진 탑재. 다발 자격(Multi-engine) 및 계기 비행, 민항 부기장 시간누적(Time Building)을 위한 압도적 성능의 쌍발기.
                </p>
                <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 font-mono">
                  예상 도입가격: 약 $1,050,000 (약 13.5억 원)
                </div>
              </div>
            </div>

            {/* Spec Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4 w-1/3">구분 항목 (Specifications)</th>
                    <th className="py-3 px-4 w-1/3 text-blue-700 dark:text-blue-300 bg-blue-50/30 dark:bg-blue-950/20">
                      DA40 NG (단발 디젤)
                    </th>
                    <th className="py-3 px-4 w-1/3 text-indigo-700 dark:text-indigo-300 bg-indigo-50/30 dark:bg-indigo-950/20">
                      DA42-VI (쌍발 디젤)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">엔진 사양 (Engine)</td>
                    <td className="py-2.5 px-4">Austro Engine AE300 168HP 터보 디젤 (1기)</td>
                    <td className="py-2.5 px-4 font-semibold text-indigo-600 dark:text-indigo-400">
                      Austro Engine AE300 168HP 터보 디젤 (2기)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">사용 연료 (Fuel Type)</td>
                    <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-bold">
                      Jet A-1 / 등유 계열 (Avgas 대비 50% 저렴)
                    </td>
                    <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-bold">
                      Jet A-1 / 등유 계열 (동일 연료)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">연료 소모량 (Fuel Burn)</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-blue-600">~5.1 gal/hr (19.3 L/hr)</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-indigo-600">~10.4 gal/hr (39.4 L/hr 총합)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">순항 속도 (Cruise Speed)</td>
                    <td className="py-2.5 px-4 font-mono">154 kts (285 km/h)</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-indigo-600">194 kts (359 km/h)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">최대 항속거리 (Max Range)</td>
                    <td className="py-2.5 px-4 font-mono">940 NM (1,740 km)</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-indigo-600">1,215 NM (2,250 km)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">탑승 인원 (Seats)</td>
                    <td className="py-2.5 px-4">4인승 (교관 1 + 학생 3)</td>
                    <td className="py-2.5 px-4">4인승 (교관 1 + 학생 3)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">유효 하중 (Useful Load)</td>
                    <td className="py-2.5 px-4 font-mono">~410 kg</td>
                    <td className="py-2.5 px-4 font-mono font-bold text-indigo-600">~590 kg</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">항법 시스템 (Avionics)</td>
                    <td className="py-2.5 px-4">Garmin G1000 NXi 3-Display 전자식 최첨단 계기판</td>
                    <td className="py-2.5 px-4">Garmin G1000 NXi 최신 통합 콕핏</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">핵심 훈련 목적</td>
                    <td className="py-2.5 px-4">자가용(PPL), 사업용(CPL) 기본 운항 훈련</td>
                    <td className="py-2.5 px-4 font-bold text-indigo-600">계기비행(IR), 다발자격(Multi), 타임빌딩</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-slate-900 dark:text-white">국내 주요 선호 대학</td>
                    <td className="py-2.5 px-4">청주대, 한국항공대, 경운대, 중원대</td>
                    <td className="py-2.5 px-4 font-bold text-indigo-600">극동대, 청주대, 초당대 (다발훈련 최우선)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: FUEL ECONOMY */}
        {activeTab === 'economy' && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                <Fuel className="w-4 h-4 text-emerald-600" />
                <span>왜 Austro Engine 디젤(Jet A-1) 엔진인가?</span>
              </div>
              <p className="text-emerald-800/90 dark:text-emerald-300 leading-relaxed">
                기존 가솔린 훈련기(C172, PA28)에 사용되는 100LL Avgas는 리터당 비용이 매우 비싸고 수급이 까다롭습니다. 
                반면 Diamond DA40/42는 민항기와 동일한 Jet A-1 등유 연료를 사용하므로 연료비가 리터당 약 40~50% 저렴합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
                <div className="text-slate-500 dark:text-slate-400">연간 기당 유류비 절감액</div>
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  약 1,800만~2,500만 원
                </div>
                <div className="text-[10px] text-slate-400">연 400시간 비행 기준</div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
                <div className="text-slate-500 dark:text-slate-400">연료 효율성 (Fuel Efficiency)</div>
                <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                  시간당 19.3 L
                </div>
                <div className="text-[10px] text-slate-400">DA40 NG 고속 순항 시</div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-1">
                <div className="text-slate-500 dark:text-slate-400">TBO (오버홀 주기)</div>
                <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
                  1,800~2,000 시간
                </div>
                <div className="text-[10px] text-slate-400">정비 신뢰도 및 내구성 증대</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SACHEON MRO & SYNERGY */}
        {activeTab === 'synergy' && (
          <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                  <Wrench className="w-4 h-4 text-blue-600" />
                  <span>1. 경남 사천 MRO 및 조립공장 연계</span>
                </div>
                <p className="leading-relaxed text-[11px] text-slate-600 dark:text-slate-400">
                  경남 사천시 조립공장 유치 시, 부품 수입에 따른 3~6개월의 납기 지연을 완전히 단축하고 국내 사천 MRO 거점에서 정기점검 및 엔진 오버홀을 24시간 내 대응할 수 있습니다.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                  <Award className="w-4 h-4 text-indigo-600" />
                  <span>2. 중국 현지 위탁실습 & 타임빌딩</span>
                </div>
                <p className="leading-relaxed text-[11px] text-slate-600 dark:text-slate-400">
                  국내 기상 제한(공중기동 및 유류 한계)을 극복하고, 만풍그룹이 운영하는 중국 내 3개 비행학교에 3학년 학생들을 위탁하여 저렴한 비용으로 150~300시간의 고품질 비행시간을 누적합니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400">
            * 만풍그룹·Diamond Aircraft 공식 제원표에 의거함 (2026 방한 보고서 1 & 3)
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onSelectFormPreset && (
              <button
                onClick={() => {
                  onSelectFormPreset({ formType: 'roadshow', venue: '용산역 23일 (오후 2시 부터 4시까지)' });
                  onClose();
                }}
                className="flex-1 sm:flex-initial px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
              >
                도입 설명회 참가 신청하기
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
