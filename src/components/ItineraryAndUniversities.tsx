import React, { useState } from 'react';
import { 
  ITINERARY_DAYS, 
  UNIVERSITIES_DATA, 
  CAREER_TRACKS, 
  UniversityModel 
} from '../data/universitiesAndItineraryData';
import { 
  Calendar, 
  GraduationCap, 
  Navigation, 
  MapPin, 
  ExternalLink, 
  Search, 
  Filter, 
  Calculator, 
  Compass, 
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { ActiveTab } from './Header';

interface ItineraryAndUniversitiesProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectChecklistAssignee?: (assigneeId: string) => void;
  onSelectFormPreset?: (preset: {
    formType: 'roadshow' | 'visit' | 'list';
    venue?: string;
    date?: string;
  }) => void;
}

export const ItineraryAndUniversities: React.FC<ItineraryAndUniversitiesProps> = ({
  setActiveTab,
  onSelectChecklistAssignee,
  onSelectFormPreset,
}) => {
  const [subTab, setSubTab] = useState<'itinerary' | 'universities' | 'careers' | 'simulator'>('itinerary');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchUniv, setSearchUniv] = useState<string>('');

  // Simulator State
  const [da40Count, setDa40Count] = useState<number>(4);
  const [da42Count, setDa42Count] = useState<number>(2);
  const [trainingHoursPerPlane, setTrainingHoursPerPlane] = useState<number>(400);

  const selectedDay = ITINERARY_DAYS.find((d) => d.dayNumber === selectedDayNumber) || ITINERARY_DAYS[0];

  const filteredUniversities = UNIVERSITIES_DATA.filter((u) => {
    const matchRegion = selectedRegion === 'all' || u.region === selectedRegion;
    const matchSearch =
      searchUniv.trim() === '' ||
      u.name.toLowerCase().includes(searchUniv.toLowerCase()) ||
      u.currentFleet.toLowerCase().includes(searchUniv.toLowerCase()) ||
      u.proposedModel.toLowerCase().includes(searchUniv.toLowerCase());
    return matchRegion && matchSearch;
  });

  // Simulator calculation estimates
  // DA40 approx $550k (~750M KRW), DA42 approx $1M (~1.35B KRW)
  const totalFleetCost = da40Count * 7.5 + da42Count * 13.5; // In 100M KRW
  const annualFlightHours = (da40Count + da42Count) * trainingHoursPerPlane;
  const trainedStudents = Math.floor(annualFlightHours / 150); // ~150 hrs per student per year
  // Diesel Jet-A1 fuel saving estimate vs 100LL Avgas: ~15,000 KRW/hr saved
  const annualFuelSavings = Math.floor((annualFlightHours * 18000) / 10000); // In 10,000 KRW

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header & Sub-nav */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
            Mission Operations & Academic Partnerships
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            5일 일정 로드맵 · 11개 대학 맞춤 모델 · 조종사 커리어
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            서울 용산부터 충북 오송, 경남 사천까지의 5일 현장 타임라인 및 대학별 협력 매트릭스
          </p>
        </div>

        {/* Sub-tab segmented buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setSubTab('itinerary')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              subTab === 'itinerary'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>5일 방한 일정</span>
          </button>
          <button
            onClick={() => setSubTab('universities')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              subTab === 'universities'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>11개 대학 매트릭스</span>
          </button>
          <button
            onClick={() => setSubTab('careers')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              subTab === 'careers'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>조종사 3대 진로</span>
          </button>
          <button
            onClick={() => setSubTab('simulator')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              subTab === 'simulator'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>도입 시뮬레이터</span>
          </button>
        </div>
      </div>

      {/* 1. ITINERARY TAB */}
      {subTab === 'itinerary' && (
        <div className="space-y-6">
          {/* Day Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {ITINERARY_DAYS.map((day) => {
              const isSelected = day.dayNumber === selectedDayNumber;
              return (
                <button
                  key={day.dayNumber}
                  onClick={() => setSelectedDayNumber(day.dayNumber)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-600 dark:bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-mono font-bold ${isSelected ? 'text-blue-200' : 'text-blue-600 dark:text-blue-400'}`}>
                      DAY 0{day.dayNumber}
                    </span>
                    <span className={`text-[11px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                      {day.date.slice(5)}
                    </span>
                  </div>
                  <div className="font-bold text-xs sm:text-sm mt-1 truncate">
                    {day.region}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Header Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-600 dark:text-blue-400">
                  <span>DAY 0{selectedDay.dayNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedDay.date} ({selectedDay.dayOfWeek})</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedDay.region}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedDay.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{selectedDay.location}</span>
                </span>
                {selectedDay.locationUrl && (
                  <a
                    href={selectedDay.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>웹사이트</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {selectedDay.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            {/* Quick Action Button for Roadshow / Visit Request based on current Day */}
            {(selectedDayNumber === 1 || selectedDayNumber === 2) && (
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-blue-950 dark:text-blue-200 block">
                      {selectedDayNumber === 1 ? '용산역 23일 로드쇼 설명회' : '오송역 24일 로드쇼 설명회'}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded">
                      오후 2시 부터 4시까지
                    </span>
                  </div>
                  <span className="text-blue-700 dark:text-blue-300 text-[11px] mt-0.5 block">
                    {selectedDayNumber === 1
                      ? '수도권 항공대학 및 비행교육기관 대상 사업설명회 (오후 2시 ~ 4시)'
                      : '중부권 항공대학 및 지자체 대상 사업설명회 (오후 2시 ~ 4시)'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (onSelectFormPreset) {
                      onSelectFormPreset({
                        formType: 'roadshow',
                        venue: selectedDayNumber === 1 ? '용산역 23일 (오후 2시 부터 4시까지)' : '오송역 24일 (오후 2시 부터 4시까지)',
                      });
                    }
                    setActiveTab('forms');
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>{selectedDayNumber === 1 ? '용산역 23일 (오후 2시~4시) 웹화면에서 바로신청' : '오송역 24일 (오후 2시~4시) 웹화면에서 바로신청'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {(selectedDayNumber === 3 || selectedDayNumber === 4) && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-emerald-950 dark:text-emerald-200 block">
                      {selectedDayNumber === 3 ? '11월 25일 지자체·대학 현장 방문요청' : '11월 26일 지역 기관·대학 현장 방문요청'}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
                      요청시간: 14시~16시
                    </span>
                  </div>
                  <span className="text-emerald-700 dark:text-emerald-300 text-[11px] mt-0.5 block">
                    대표단이 귀 기관(도시)을 직접 찾아가 비행교육 인프라 및 협력 방안을 실사·협의합니다. (14시~16시)
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (onSelectFormPreset) {
                      onSelectFormPreset({
                        formType: 'visit',
                        date: selectedDayNumber === 3 ? '11월 25일 (14시~16시)' : '11월 26일 (14시~16시)',
                      });
                    }
                    setActiveTab('forms');
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>{selectedDayNumber === 3 ? '11월 25일 (14시~16시) 웹화면에서 바로신청' : '11월 26일 (14시~16시) 웹화면에서 바로신청'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Hourly Timetable */}
            <div className="pt-4 space-y-3">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                시간대별 상세 진행 일정
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4 w-32">시간</th>
                      <th className="py-2.5 px-4 w-48">일정명</th>
                      <th className="py-2.5 px-4">세부 협의 내용</th>
                      <th className="py-2.5 px-4 w-44">참석자</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {selectedDay.schedule.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="py-3 px-4 font-mono font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
                          {item.time}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                          {item.activity}
                        </td>
                        <td className="py-3 px-4 leading-relaxed">
                          {item.content}
                        </td>
                        <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                          {item.participants}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. UNIVERSITIES MATRIX TAB */}
      {subTab === 'universities' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> 권역:
              </span>
              {[
                { id: 'all', label: '전체 (11개교)' },
                { id: '수도권', label: '수도권' },
                { id: '충청권', label: '충청권' },
                { id: '호남권', label: '호남권' },
                { id: '영남권', label: '영남권' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRegion(r.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    selectedRegion === r.id
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="대학명, 보유기종 검색..."
                value={searchUniv}
                onChange={(e) => setSearchUniv(e.target.value)}
                className="w-full sm:w-56 pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Universities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredUniversities.map((univ) => (
              <div
                key={univ.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {univ.name}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {univ.region} · {univ.contactTier}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">
                        현재 운용 현황
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 block">
                        {univ.currentFleet}
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40">
                      <span className="text-blue-500 text-[10px] uppercase font-bold block">
                        맞춤 제안 모델
                      </span>
                      <span className="font-semibold text-blue-900 dark:text-blue-200 mt-0.5 block">
                        {univ.proposedModel}
                      </span>
                    </div>
                  </div>

                  {/* Demand & China Fit Indicators */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div>
                      <span className="text-slate-400 block">도입 수요 추정</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {univ.estimatedDemand}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">중국 실습 적합도</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {univ.chinaFit}
                      </span>
                    </div>
                  </div>

                  {/* Key points */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    {univ.keyPoints.map((pt, pidx) => (
                      <div key={pidx} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold shrink-0">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-mono text-[10px]">{univ.targetDay}</span>
                  <span className="text-[10px] text-slate-400">{univ.docCitation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PILOT CAREER TRACKS TAB */}
      {subTab === 'careers' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              조종사 양성 및 취업시장 3대 진로 트랙 다변화
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              현재 한국 조종사 취업시장은 일부 대형 민간항공사 및 계열사 부기장 채용에 과도하게 편중되어 있습니다.
              Diamond Aircraft 도입과 중국 실습 네트워크를 통해 공군, 민항, 글로벌 일반항공(Career Building)의
              3대 진로를 확보하여 취업 정체를 해소합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAREER_TRACKS.map((track) => (
              <div
                key={track.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {track.code}
                    </span>
                    <span className="text-[11px] text-slate-400">Doc 3 (p.9)</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {track.title}
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        양성 경로
                      </span>
                      <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">
                        {track.trainingPath}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40">
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold block">
                        최종 진로
                      </span>
                      <span className="font-semibold text-emerald-900 dark:text-emerald-200 mt-0.5 block">
                        {track.finalCareer}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                    {track.description}
                  </p>

                  {track.specificRoles && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        주요 유급 비행 직무 분야
                      </div>
                      {track.specificRoles.map((role, ridx) => (
                        <div key={ridx} className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span>{role}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. FLEET & ACQUISITION SIMULATOR TAB */}
      {subTab === 'simulator' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              대학 훈련기 도입 및 연료비 절감 시뮬레이터
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              DA40(단발) 및 DA42(쌍발) 도입 대수에 따른 총 도입비, 연간 운항시간, 배출 조종학생 수 및 디젤(Jet-A1) 엔진 연료비 절감 효과를 산출합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                DA40 단발기 도입 대수: <span className="text-blue-600 font-mono font-bold">{da40Count}대</span>
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={da40Count}
                onChange={(e) => setDa40Count(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>0대</span>
                <span>5대</span>
                <span>10대</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                DA42 쌍발 다발기 도입 대수: <span className="text-indigo-600 font-mono font-bold">{da42Count}대</span>
              </label>
              <input
                type="range"
                min="0"
                max="8"
                value={da42Count}
                onChange={(e) => setDa42Count(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>0대</span>
                <span>4대</span>
                <span>8대</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                기당 연간 운항시간: <span className="text-emerald-600 font-mono font-bold">{trainingHoursPerPlane}시간</span>
              </label>
              <input
                type="range"
                min="200"
                max="600"
                step="50"
                value={trainingHoursPerPlane}
                onChange={(e) => setTrainingHoursPerPlane(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>200h</span>
                <span>400h</span>
                <span>600h</span>
              </div>
            </div>
          </div>

          {/* Results KPI Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">예상 도입 규모 (신조기)</div>
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                약 {totalFleetCost.toFixed(1)}억 원
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">총 {da40Count + da42Count}대 기준</div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">연간 총 운항 시간</div>
              <div className="text-xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1 tabular-nums">
                {annualFlightHours.toLocaleString()} 시간
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">자가용+사업용+다발기</div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">연간 조종사 배출 용량</div>
              <div className="text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                약 {trainedStudents} 명 / 년
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">학생당 150시간 기준</div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">디젤엔진 연간 유류비 절감</div>
              <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
                약 {annualFuelSavings.toLocaleString()}만 원
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">100LL 가솔린 대비 Jet-A1 절감</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
