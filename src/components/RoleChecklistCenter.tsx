import React, { useState, useMemo } from 'react';
import { 
  ChecklistItem, 
  TaskStatus, 
  TaskPhase, 
  TaskPriority 
} from '../data/checklistsData';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  Plus, 
  Filter, 
  Search, 
  Download, 
  RotateCcw, 
  Trash2, 
  UserCheck, 
  CheckSquare, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { ActiveTab } from './Header';

interface RoleChecklistCenterProps {
  checklists: ChecklistItem[];
  setChecklists: React.Dispatch<React.SetStateAction<ChecklistItem[]>>;
  initialAssigneeFilter?: string;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectDoc?: (docId: string) => void;
}

export const RoleChecklistCenter: React.FC<RoleChecklistCenterProps> = ({
  checklists,
  setChecklists,
  initialAssigneeFilter = 'all',
  setActiveTab,
  onSelectDoc,
}) => {
  const [selectedAssignee, setSelectedAssignee] = useState<string>(initialAssigneeFilter);
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDetails, setNewTaskDetails] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState('captain_head');
  const [newTaskPhase, setNewTaskPhase] = useState<TaskPhase>('방한 기간 (11.23~27)');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('high');

  const assigneeOptions = [
    { id: 'all', label: '전체 담당자', role: '총괄' },
    { id: 'captain_head', label: '기장 출신 사업총괄', role: '항공전문가' },
    { id: 'admin_staff', label: '행정·사업지원 담당', role: '운영·행정' },
    { id: 'sales_lead', label: '사업개발·영업 담당', role: '대학 영업' },
    { id: 'china_liaison', label: '중국어·국제업무 담당', role: '중국 협력' },
    { id: 'external_advisors', label: '외부 전문 자문단', role: '기술·법률' },
    { id: 'wanfeng_delegation', label: '만풍그룹 방한 대표단', role: '경영진' },
  ];

  // Toggle status
  const cycleStatus = (id: string) => {
    setChecklists((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextStatus: TaskStatus =
          item.status === 'pending'
            ? 'in_progress'
            : item.status === 'in_progress'
            ? 'completed'
            : 'pending';
        return { ...item, status: nextStatus };
      })
    );
  };

  // Add task handler
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const assigneeObj = assigneeOptions.find((a) => a.id === newTaskAssignee);

    const newTask: ChecklistItem = {
      id: `custom-${Date.now()}`,
      assigneeId: newTaskAssignee,
      assigneeName: assigneeObj?.label || '기장 출신 사업총괄',
      assigneeRole: assigneeObj?.role || '항공전문가',
      phase: newTaskPhase,
      priority: newTaskPriority,
      title: newTaskTitle.trim(),
      details: newTaskDetails.trim() || '추가 사용자 정의 과제',
      docSource: 'SEBA Partners 내부 과제',
      status: 'pending',
      isCustom: true,
    };

    setChecklists((prev) => [newTask, ...prev]);
    setNewTaskTitle('');
    setNewTaskDetails('');
    setShowAddModal(false);
  };

  // Delete custom task
  const handleDeleteTask = (id: string) => {
    setChecklists((prev) => prev.filter((item) => item.id !== id));
  };

  // Filtered Checklist
  const filteredTasks = useMemo(() => {
    return checklists.filter((item) => {
      const matchAssignee = selectedAssignee === 'all' || item.assigneeId === selectedAssignee;
      const matchPhase = selectedPhase === 'all' || item.phase === selectedPhase;
      const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;
      const matchPriority = selectedPriority === 'all' || item.priority === selectedPriority;
      const matchSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.assigneeName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchAssignee && matchPhase && matchStatus && matchPriority && matchSearch;
    });
  }, [checklists, selectedAssignee, selectedPhase, selectedStatus, selectedPriority, searchQuery]);

  // Overall Statistics
  const totalTasks = checklists.length;
  const completedTasks = checklists.filter((t) => t.status === 'completed').length;
  const inProgressTasks = checklists.filter((t) => t.status === 'in_progress').length;
  const pendingTasks = checklists.filter((t) => t.status === 'pending').length;
  const overallPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['담당자', '역할', '시점', '우선순위', '상태', '과제명', '세부내용', '근거문서'];
    const rows = checklists.map((c) => [
      `"${c.assigneeName}"`,
      `"${c.assigneeRole}"`,
      `"${c.phase}"`,
      `"${c.priority}"`,
      `"${c.status}"`,
      `"${c.title.replace(/"/g, '""')}"`,
      `"${c.details.replace(/"/g, '""')}"`,
      `"${c.docSource}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wanfeng_project_checklists_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
            Operational Readiness & Action Center
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            담당자별 실시간 체크리스트 관리 시스템
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            기장 총괄·행정·영업·중국어 담당 및 자문단별 D-3주부터 방한 D-Day까지의 실행 과업 추적
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>과제 추가</span>
          </button>
          <button
            onClick={exportToCSV}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV 저장</span>
          </button>
        </div>
      </div>

      {/* Overall Progress Scorecard */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              전체 과업 완료율
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
              {overallPercentage}% <span className="text-xs font-normal text-slate-500 font-sans">({completedTasks}/{totalTasks}개 완료)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Circle className="w-3 h-3 text-slate-400" />
              <span>미착수 {pendingTasks}</span>
            </span>
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>진행중 {inProgressTasks}</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>완료 {completedTasks}</span>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
            className="bg-emerald-500 transition-all duration-300"
          />
          <div
            style={{ width: `${(inProgressTasks / totalTasks) * 100}%` }}
            className="bg-amber-400 transition-all duration-300"
          />
        </div>

        {/* Per-assignee completion chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {assigneeOptions.slice(1).map((opt) => {
            const assigneeTasks = checklists.filter((c) => c.assigneeId === opt.id);
            const done = assigneeTasks.filter((c) => c.status === 'completed').length;
            const pct = assigneeTasks.length > 0 ? Math.round((done / assigneeTasks.length) * 100) : 0;
            const isFilterActive = selectedAssignee === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => setSelectedAssignee(isFilterActive ? 'all' : opt.id)}
                className={`p-2 rounded-lg border text-left transition-all ${
                  isFilterActive
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {opt.label}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  <span>{done}/{assigneeTasks.length}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{pct}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Phase Filter */}
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md py-1.5 px-2 text-slate-800 dark:text-slate-200"
          >
            <option value="all">전체 시점</option>
            <option value="D-3주 전">D-3주 전</option>
            <option value="D-2주 전">D-2주 전</option>
            <option value="D-1주 전">D-1주 전</option>
            <option value="방한 기간 (11.23~27)">방한 기간 (11.23~27)</option>
            <option value="방한 후 (D+7 이내)">방한 후 (D+7 이내)</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md py-1.5 px-2 text-slate-800 dark:text-slate-200"
          >
            <option value="all">전체 상태</option>
            <option value="pending">미착수</option>
            <option value="in_progress">진행중</option>
            <option value="completed">완료</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md py-1.5 px-2 text-slate-800 dark:text-slate-200"
          >
            <option value="all">전체 우선순위</option>
            <option value="high">우선순위: 상</option>
            <option value="medium">우선순위: 중</option>
            <option value="low">우선순위: 하</option>
          </select>

          {(selectedAssignee !== 'all' || selectedPhase !== 'all' || selectedStatus !== 'all' || selectedPriority !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedAssignee('all');
                setSelectedPhase('all');
                setSelectedStatus('all');
                setSelectedPriority('all');
                setSearchQuery('');
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline px-2 py-1 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>초기화</span>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="과업명, 내용 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-56 pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Task List Cards */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed';
            const isInProgress = task.status === 'in_progress';

            return (
              <div
                key={task.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start justify-between gap-4 ${
                  isCompleted
                    ? 'bg-slate-50/80 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-80'
                    : isInProgress
                    ? 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-700/80 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3.5 flex-1">
                  {/* Status Toggle Button */}
                  <button
                    onClick={() => cycleStatus(task.id)}
                    aria-label="상태 변경"
                    className="mt-0.5 shrink-0 transition-transform hover:scale-110"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : isInProgress ? (
                      <Clock className="w-5 h-5 text-amber-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-slate-400" />
                    )}
                  </button>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap text-[11px]">
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {task.assigneeName}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 dark:text-slate-400 font-mono">
                        {task.phase}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span
                        className={`font-semibold ${
                          task.priority === 'high'
                            ? 'text-red-600 dark:text-red-400'
                            : task.priority === 'medium'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-slate-500'
                        }`}
                      >
                        우선순위: {task.priority === 'high' ? '상' : task.priority === 'medium' ? '중' : '하'}
                      </span>
                      {task.isCustom && (
                        <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.5 rounded">
                          사용자 등록
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-sm sm:text-base font-bold text-slate-900 dark:text-white ${
                        isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : ''
                      }`}
                    >
                      {task.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {task.details}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                      <span>근거: {task.docSource}</span>
                      {task.docSource.includes('Doc') && (
                        <button
                          onClick={() => {
                            if (onSelectDoc) {
                              const docId = task.docSource.includes('Doc 1')
                                ? 'doc-sacheon'
                                : task.docSource.includes('Doc 2')
                                ? 'doc-budget'
                                : 'doc-itinerary';
                              onSelectDoc(docId);
                            }
                            setActiveTab('documents');
                          }}
                          className="text-blue-500 hover:underline flex items-center gap-0.5"
                        >
                          <span>보고서 확인</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : isInProgress
                        ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {isCompleted ? '완료' : isInProgress ? '진행중' : '미착수'}
                  </span>

                  {task.isCustom && (
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-md transition-colors"
                      title="과제 삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400">
            조건에 부합하는 체크리스트 과제가 없습니다. 필터를 조정해 보세요.
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                새로운 실무 체크리스트 과업 등록
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  담당자 선택 *
                </label>
                <select
                  value={newTaskAssignee}
                  onChange={(e) => setNewTaskAssignee(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                >
                  {assigneeOptions.slice(1).map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label} ({a.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    추진 시점 *
                  </label>
                  <select
                    value={newTaskPhase}
                    onChange={(e) => setNewTaskPhase(e.target.value as TaskPhase)}
                    className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="D-3주 전">D-3주 전</option>
                    <option value="D-2주 전">D-2주 전</option>
                    <option value="D-1주 전">D-1주 전</option>
                    <option value="방한 기간 (11.23~27)">방한 기간 (11.23~27)</option>
                    <option value="방한 후 (D+7 이내)">방한 후 (D+7 이내)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    우선순위 *
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as TaskPriority)}
                    className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="high">상 (긴급·필수)</option>
                    <option value="medium">중 (표준 과제)</option>
                    <option value="low">하 (보조 과제)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  과제 제목 *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 청주대 구매처장 1:1 상담자료 준비"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  세부 내용 및 산출물
                </label>
                <textarea
                  rows={3}
                  placeholder="구체적인 과업 목표 및 필수 확보 서류..."
                  value={newTaskDetails}
                  onChange={(e) => setNewTaskDetails(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  과제 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
