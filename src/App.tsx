/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { IntegratedDashboard } from './components/IntegratedDashboard';
import { RelationshipGraphView } from './components/RelationshipGraphView';
import { DocumentViewer } from './components/DocumentViewer';
import { ItineraryAndUniversities } from './components/ItineraryAndUniversities';
import { BudgetSimulator } from './components/BudgetSimulator';
import { RoleChecklistCenter } from './components/RoleChecklistCenter';
import { INITIAL_CHECKLISTS, ChecklistItem } from './data/checklistsData';
import { Plane, FileText, GitGraph, CheckCircle2, Building } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('integrated');
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-sacheon');
  const [selectedAssigneeFilter, setSelectedAssigneeFilter] = useState<string>('all');

  // Dark Mode State with document element synchronization
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wanfeng_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('wanfeng_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('wanfeng_theme', 'light');
    }
  }, [darkMode]);

  // Checklists State with localStorage persistence
  const [checklists, setChecklists] = useState<ChecklistItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wanfeng_project_checklists');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved checklists', e);
        }
      }
    }
    return INITIAL_CHECKLISTS;
  });

  useEffect(() => {
    localStorage.setItem('wanfeng_project_checklists', JSON.stringify(checklists));
  }, [checklists]);

  // Calculate overall checklist progress
  const completedCount = checklists.filter((c) => c.status === 'completed').length;
  const overallProgress = checklists.length > 0 ? Math.round((completedCount / checklists.length) * 100) : 0;

  // Cross-link handlers
  const handleSelectDoc = (docId: string) => {
    setSelectedDocId(docId);
  };

  const handleSelectChecklistAssignee = (assigneeId: string) => {
    setSelectedAssigneeFilter(assigneeId);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-blue-500 selection:text-white">
      {/* Top Bar Contract Compliant Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        overallChecklistProgress={overallProgress}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'integrated' && (
          <IntegratedDashboard
            setActiveTab={setActiveTab}
            onSelectDoc={handleSelectDoc}
            overallChecklistProgress={overallProgress}
          />
        )}

        {activeTab === 'relationships' && (
          <RelationshipGraphView
            setActiveTab={setActiveTab}
            onSelectDoc={handleSelectDoc}
            onSelectChecklistAssignee={handleSelectChecklistAssignee}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentViewer
            selectedDocId={selectedDocId}
            onSelectDoc={handleSelectDoc}
            setActiveTab={setActiveTab}
            onSelectChecklistAssignee={handleSelectChecklistAssignee}
          />
        )}

        {activeTab === 'itinerary' && (
          <ItineraryAndUniversities
            setActiveTab={setActiveTab}
            onSelectChecklistAssignee={handleSelectChecklistAssignee}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetSimulator
            setActiveTab={setActiveTab}
            onSelectChecklistAssignee={handleSelectChecklistAssignee}
          />
        )}

        {activeTab === 'checklists' && (
          <RoleChecklistCenter
            checklists={checklists}
            setChecklists={setChecklists}
            initialAssigneeFilter={selectedAssigneeFilter}
            setActiveTab={setActiveTab}
            onSelectDoc={handleSelectDoc}
          />
        )}
      </main>

      {/* Clean Editorial Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-8 transition-colors mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              SEBA Partners · Wanfeng Auto Holding Group & Diamond Aircraft
            </span>
            <span aria-hidden="true">·</span>
            <span>경남 사천 경비행기 조립공장 유치 TF</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="/assets/aistudio/261105_________________________________1257fa2e.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors font-semibold text-cyan-700 dark:text-cyan-400"
            >
              사천 유치 전략 보고서 (현대·기아 협력 증보판 PDF)
            </a>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <a
              href="/assets/aistudio/261104________________69c62b48.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              인력·비용 산출안 PDF
            </a>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <a
              href="/assets/aistudio/261104__________________5__________________353b37f7.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              방한 5일 일정 요약 PDF
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
