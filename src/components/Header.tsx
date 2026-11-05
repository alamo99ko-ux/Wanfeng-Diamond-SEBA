import React from 'react';
import { Plane, Moon, Sun, Download, FileText } from 'lucide-react';

export type ActiveTab = 'integrated' | 'relationships' | 'documents' | 'itinerary' | 'budget' | 'checklists' | 'forms';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  overallChecklistProgress: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  overallChecklistProgress,
}) => {
  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'integrated', label: '종합 대시보드' },
    { id: 'relationships', label: '데이터 관계망 분석' },
    { id: 'documents', label: '3대 문서 열람·대조' },
    { id: 'itinerary', label: '5일 일정·대학 매트릭스' },
    { id: 'budget', label: '조직·예산 산출안' },
    { id: 'checklists', label: '담당자별 체크리스트' },
    { id: 'forms', label: '참가신청·방문요청' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white shadow-sm">
              <Plane className="w-5 h-5 -rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                SEBA · Wanfeng Diamond Korea Hub
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                만풍그룹 방한 및 사천 경비행기 조립공장 유치 포털
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                  {item.id === 'checklists' && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 tabular-nums">
                      {overallChecklistProgress}%
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Dark Mode Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile Select */}
            <div className="lg:hidden">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value as ActiveTab)}
                aria-label="메뉴 선택"
                className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 py-1.5 px-2 rounded-md border border-slate-300 dark:border-slate-700"
              >
                {navItems.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="다크 모드 토글"
              className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setActiveTab('forms')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 rounded-lg transition-colors shadow-xs whitespace-nowrap"
            >
              <span>신청서 작성</span>
            </button>

            <a
              href="/assets/aistudio/261105_________________________________1257fa2e.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 rounded-lg transition-colors shadow-xs whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>원문 PDF (증보판)</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
