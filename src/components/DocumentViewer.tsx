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
  Bookmark
} from 'lucide-react';
import { ActiveTab } from './Header';

interface DocumentViewerProps {
  selectedDocId?: string;
  onSelectDoc?: (docId: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectChecklistAssignee?: (assigneeId: string) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  selectedDocId = 'doc-sacheon',
  onSelectDoc,
  setActiveTab,
  onSelectChecklistAssignee,
}) => {
  const [activeDocId, setActiveDocId] = useState<string>(selectedDocId);
  const [viewMode, setViewMode] = useState<'single' | 'compare'>('single');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectionIdx, setSelectedSectionIdx] = useState<number>(0);

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

      {/* Document Selector Pills (Single View Mode) */}
      {viewMode === 'single' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {DOCUMENTS_DATA.map((doc) => {
            const isSelected = doc.id === activeDocId;
            return (
              <button
                key={doc.id}
                onClick={() => {
                  setActiveDocId(doc.id);
                  if (onSelectDoc) onSelectDoc(doc.id);
                  setSelectedSectionIdx(0);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>[보고서 {doc.docNumber}] {doc.title.slice(0, 24)}...</span>
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
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {currentDoc.title}
              </h3>
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
          </div>
        </div>
      )}

      {/* COMPARE VIEW MODE (Side-by-Side 3 Documents Comparison) */}
      {viewMode === 'compare' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {DOCUMENTS_DATA.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    REPORT {doc.docNumber}
                  </span>
                  <span>{doc.date}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {doc.title}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {doc.subtitle}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  {doc.summary}
                </p>

                {/* Key Metrics */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    핵심 수치 & 지표
                  </div>
                  {doc.keyMetrics.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800">
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
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
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
          ))}
        </div>
      )}
    </div>
  );
};
