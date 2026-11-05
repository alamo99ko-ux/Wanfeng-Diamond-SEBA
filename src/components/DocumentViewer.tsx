import React, { useState, useMemo } from 'react';
import { DOCUMENTS_DATA, DocumentMeta } from '../data/documentsData';
import { 
  FileText, 
  ExternalLink, 
  Search, 
  Columns, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Download,
  Share2,
  Bookmark,
  Lock,
  Unlock,
  KeyRound,
  ShieldAlert,
  Eye,
  EyeOff
} from 'lucide-react';
import { ActiveTab } from './Header';

interface DocumentViewerProps {
  selectedDocId?: string;
  onSelectDoc?: (docId: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectChecklistAssignee?: (assigneeId: string) => void;
  isBudgetUnlocked?: boolean;
  onUnlockBudget?: (pwd: string) => boolean;
  onLockBudget?: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  selectedDocId = 'doc-sacheon',
  onSelectDoc,
  setActiveTab,
  onSelectChecklistAssignee,
  isBudgetUnlocked = false,
  onUnlockBudget,
  onLockBudget,
}) => {
  const [activeDocId, setActiveDocId] = useState<string>(selectedDocId);
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectionIdx, setSelectedSectionIdx] = useState<number>(0);

  // Security password state for Report 2 (비용 관련: 28687870)
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

  const currentDoc = useMemo(() => {
    return DOCUMENTS_DATA.find((d) => d.id === activeDocId) || DOCUMENTS_DATA[0];
  }, [activeDocId]);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
            Official Source Reports
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            3대 정책 보고서 원문 대조 및 개별 열람
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            사천 조립공장 유치 전략, 조직·예산 산출안, 방한 5일 일정 요약보고서 전문 분석
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setViewMode('single')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'single'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>단일 보고서 집중</span>
          </button>
          <button
            onClick={() => setViewMode('compare')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              viewMode === 'compare'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>3대 문서 동시 대조</span>
          </button>
        </div>
      </div>

      {/* Document Selector Pills (Single View Mode) - Report 2 placed 3rd & light gray styled */}
      {viewMode === 'single' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {DOCUMENTS_DATA.map((doc) => {
            const isSelected = doc.id === activeDocId;
            const isBudget = doc.id === 'doc-budget';

            return (
              <button
                key={doc.id}
                onClick={() => {
                  setActiveDocId(doc.id);
                  if (onSelectDoc) onSelectDoc(doc.id);
                  setSelectedSectionIdx(0);
                  setPasswordError(false);
                }}
                title={isBudget ? '비용 관련 대외비 보고서 (보안 비밀번호 필요: 28687870)' : undefined}
                className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 border ${
                  isBudget
                    ? isSelected
                      ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white border-slate-400 dark:border-slate-500 font-bold shadow-xs ring-2 ring-slate-400/30'
                      : 'bg-slate-200/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700'
                    : isSelected
                    ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {isBudget ? (
                  <Lock className={`w-3.5 h-3.5 ${isBudgetUnlocked ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`} />
                ) : (
                  <FileText className="w-3.5 h-3.5" />
                )}
                <span>[보고서 {doc.docNumber}] {doc.title.slice(0, 24)}...</span>
                {isBudget && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 font-bold border border-slate-300 dark:border-slate-700">
                    {isBudgetUnlocked ? '해제됨' : '비용🔒'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* SINGLE VIEW MODE */}
      {viewMode === 'single' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Chapter Index Sidebar */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 sticky top-24">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                REPORT 0{currentDoc.docNumber} METADATA
              </span>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {currentDoc.title}
                </h3>
                {currentDoc.id === 'doc-budget' && (
                  <span className="shrink-0 ml-2 px-2 py-0.5 text-[11px] font-mono rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-600">
                    비용🔒
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {currentDoc.subtitle}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              {currentDoc.keyMetrics.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">{m.label}</div>
                  <div className="text-xs font-bold font-mono text-slate-900 dark:text-white mt-0.5 tabular-nums">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Original PDF Link */}
            <div className="pt-2">
              <a
                href={currentDoc.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>원본 첨부 PDF 새 창에서 열기</span>
              </a>
            </div>

            {/* Section Navigator */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                목차 / 섹션 바로가기
              </div>
              {currentDoc.sections.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSectionIdx(idx)}
                  className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors flex items-center justify-between ${
                    selectedSectionIdx === idx
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{sec.title}</span>
                  <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Section Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* If doc-budget is locked, show security password gate */}
            {currentDoc.id === 'doc-budget' && !isBudgetUnlocked ? (
              <div className="p-8 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 shadow-lg text-center space-y-6">
                <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <KeyRound className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                    <Lock className="w-3.5 h-3.5" />
                    <span>비용·예산 관련 대외비 보안 문서 (보고서 2)</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    보안 비밀번호를 입력해주세요
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    인력 채용, 비행원·중국 대외협력 인건비 및 장비 도입 예산이 포함된 대외비 문서입니다. 열람 권한이 있는 담당자만 비밀번호를 입력하십시오.
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

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>비용 보고서 잠금 해제</span>
                    </button>
                  </div>
                </form>

                <div className="text-[11px] text-slate-400 dark:text-slate-500">
                  보안 패스워드 설정: <span className="font-mono font-semibold">28687870</span>
                </div>
              </div>
            ) : (
              <>
                {/* When doc-budget is unlocked, show a compact security status bar */}
                {currentDoc.id === 'doc-budget' && isBudgetUnlocked && (
                  <div className="p-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                      <Unlock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-semibold">보안 인증 완료 (비용·예산 보고서 열람 중)</span>
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
                )}

                {/* Active Section Card */}
                {(() => {
                  const sec = currentDoc.sections[selectedSectionIdx] || currentDoc.sections[0];
                  return (
                    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                        <div>
                          <div className="text-[11px] font-mono text-slate-400">
                            SECTION 0{selectedSectionIdx + 1} OF 0{currentDoc.sections.length}
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                            {sec.title}
                          </h3>
                        </div>
                      </div>

                  {/* Section Content Paragraph */}
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                    {sec.content}
                  </p>

                  {/* Bullet points if any */}
                  {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        주요 핵심 사항 및 파급효과
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {sec.bulletPoints.map((bp, bidx) => (
                          <li key={bidx} className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                            <span>{bp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tables if any */}
                  {sec.tables && sec.tables.length > 0 && (
                    <div className="space-y-4 pt-2">
                      {sec.tables.map((tbl, tidx) => (
                        <div key={tidx} className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                              <tr>
                                {tbl.headers.map((h, hidx) => (
                                  <th key={hidx} className="py-2.5 px-3.5 whitespace-nowrap">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                              {tbl.rows.map((row, ridx) => (
                                <tr key={ridx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                                  {row.map((cell, cidx) => (
                                    <td
                                      key={cidx}
                                      className={`py-3 px-3.5 align-top whitespace-pre-line ${
                                        cidx === 0 ? 'font-semibold text-slate-900 dark:text-white shrink-0' : ''
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bottom Navigation between sections */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedSectionIdx(Math.max(0, selectedSectionIdx - 1))}
                      disabled={selectedSectionIdx === 0}
                      className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      ← 이전 섹션
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('relationships')}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        데이터 관계망에서 보기
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        setSelectedSectionIdx(
                          Math.min(currentDoc.sections.length - 1, selectedSectionIdx + 1)
                        )
                      }
                      disabled={selectedSectionIdx === currentDoc.sections.length - 1}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 rounded-lg disabled:opacity-30 disabled:pointer-events-none"
                    >
                      다음 섹션 →
                    </button>
                  </div>
                </div>
              );
            })()}
            </>
            )}
          </div>
        </div>
      )}

      {/* COMPARE VIEW MODE (Side-by-Side 3 Documents Comparison) */}
      {viewMode === 'compare' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {DOCUMENTS_DATA.map((doc) => {
            const isBudget = doc.id === 'doc-budget';
            const isLocked = isBudget && !isBudgetUnlocked;

            return (
              <div
                key={doc.id}
                className={`p-5 rounded-2xl border shadow-2xs space-y-4 flex flex-col justify-between ${
                  isBudget
                    ? 'bg-slate-100/90 dark:bg-slate-800/90 border-slate-300 dark:border-slate-700'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className={`font-mono font-bold flex items-center gap-1 ${isBudget ? 'text-slate-700 dark:text-slate-300' : 'text-blue-600 dark:text-blue-400'}`}>
                      {isBudget && <Lock className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />}
                      REPORT {doc.docNumber}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isBudget && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-600">
                          {isBudgetUnlocked ? '해제됨' : '비용🔒'}
                        </span>
                      )}
                      <span>{doc.date}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {doc.title}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {doc.subtitle}
                  </div>

                  {isLocked ? (
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-center space-y-3">
                      <div className="inline-flex p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        비용 대외비 보안 잠금 상태
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        비밀번호(28687870)를 입력하여 인력 산출 및 예산 상세를 열람하세요.
                      </p>
                      <button
                        onClick={() => {
                          setActiveDocId(doc.id);
                          setViewMode('single');
                        }}
                        className="w-full py-2 px-3 text-xs font-bold text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 rounded-lg flex items-center justify-center gap-1.5"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>비밀번호 입력하고 열람</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200/80 dark:border-slate-800">
                        {doc.summary}
                      </p>

                      {/* Key Metrics */}
                      <div className="space-y-2 pt-2">
                        <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          핵심 수치 & 지표
                        </div>
                        {doc.keyMetrics.map((m, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-slate-500 dark:text-slate-400">{m.label}</span>
                            <span className="font-mono font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Sections List */}
                      <div className="space-y-1.5 pt-2">
                        <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          주요 챕터 구성
                        </div>
                        {doc.sections.map((s, idx) => (
                          <div key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                            <span className="font-mono text-blue-500 shrink-0">0{idx + 1}.</span>
                            <span className="line-clamp-1">{s.title.replace(/^[0-9]\.\s*/, '')}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActiveDocId(doc.id);
                      setViewMode('single');
                    }}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>이 문서 단독 열람</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={doc.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>PDF</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
