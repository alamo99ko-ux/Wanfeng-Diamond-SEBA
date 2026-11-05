import React, { useState, useMemo } from 'react';
import { 
  GRAPH_NODES, 
  GRAPH_LINKS, 
  GraphNode, 
  GraphLink, 
  NodeCategory 
} from '../data/relationshipsData';
import { 
  Search, 
  Filter, 
  Layers, 
  Compass, 
  ArrowRight, 
  Info, 
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Table as TableIcon,
  GitGraph
} from 'lucide-react';
import { ActiveTab } from './Header';

interface RelationshipGraphViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectDoc?: (docId: string) => void;
  onSelectChecklistAssignee?: (assigneeId: string) => void;
}

export const RelationshipGraphView: React.FC<RelationshipGraphViewProps> = ({
  setActiveTab,
  onSelectDoc,
  onSelectChecklistAssignee,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('wanfeng_group');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeViewMode, setActiveViewMode] = useState<'graph' | 'matrix' | 'pathfinder'>('graph');

  // Path Finder state
  const [pathSource, setPathSource] = useState<string>('wanfeng_group');
  const [pathTarget, setPathTarget] = useState<string>('univ_cheongju');

  // Node position map for visual SVG layout
  // Grouped logically: Wanfeng (Top-Left), SEBA (Center-Left), Sacheon/Gov (Top-Right), Projects (Center), Universities (Bottom-Right), Budget (Bottom-Left)
  const nodeLayoutPositions: Record<string, { x: number; y: number }> = {
    // Wanfeng
    wanfeng_group: { x: 180, y: 110 },
    diamond_aircraft: { x: 380, y: 90 },
    xu_zhiliang: { x: 100, y: 220 },
    li_yun: { x: 260, y: 210 },
    li_xiaojuan: { x: 400, y: 220 },

    // Korean Partners (Hyundai & Kia)
    hyundai_kia: { x: 500, y: 80 },
    kia_china: { x: 320, y: 25 },

    // Sacheon & Industry
    sacheon_gov: { x: 720, y: 100 },
    kai_kaems: { x: 900, y: 110 },

    // Projects
    track_assembly_jv: { x: 620, y: 230 },
    track_mro_hub: { x: 840, y: 230 },
    track_aircraft_sales: { x: 540, y: 380 },
    track_edu_china: { x: 740, y: 380 },
    track_pilot_careers: { x: 880, y: 440 },

    // SEBA Partners
    seba_partners: { x: 180, y: 380 },
    captain_head: { x: 90, y: 480 },
    admin_staff: { x: 210, y: 520 },
    sales_lead: { x: 330, y: 460 },
    china_liaison: { x: 340, y: 320 },
    external_advisors: { x: 80, y: 340 },

    // Universities
    univ_cheongju: { x: 500, y: 560 },
    univ_fardong: { x: 650, y: 560 },
    univ_hanseo: { x: 800, y: 560 },
    univ_chodang: { x: 940, y: 560 },
    univ_kau: { x: 950, y: 330 },
    univ_others: { x: 720, y: 660 },

    // Budget
    budget_3month: { x: 100, y: 660 },
    budget_events: { x: 270, y: 660 },
  };

  const categoryColors: Record<NodeCategory, { bg: string; border: string; text: string; fill: string }> = {
    wanfeng_diamond: { bg: 'bg-blue-50 dark:bg-blue-950/40', border: 'border-blue-400 dark:border-blue-600', text: 'text-blue-700 dark:text-blue-300', fill: '#3b82f6' },
    seba_partners: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-400 dark:border-emerald-600', text: 'text-emerald-700 dark:text-emerald-300', fill: '#10b981' },
    government_org: { bg: 'bg-amber-50 dark:bg-amber-950/40', border: 'border-amber-400 dark:border-amber-600', text: 'text-amber-700 dark:text-amber-300', fill: '#f59e0b' },
    project_tracks: { bg: 'bg-indigo-50 dark:bg-indigo-950/40', border: 'border-indigo-400 dark:border-indigo-600', text: 'text-indigo-700 dark:text-indigo-300', fill: '#6366f1' },
    universities: { bg: 'bg-rose-50 dark:bg-rose-950/40', border: 'border-rose-400 dark:border-rose-600', text: 'text-rose-700 dark:text-rose-300', fill: '#f43f5e' },
    budget_resources: { bg: 'bg-slate-100 dark:bg-slate-800', border: 'border-slate-400 dark:border-slate-600', text: 'text-slate-700 dark:text-slate-300', fill: '#64748b' },
    korean_partners: { bg: 'bg-cyan-50 dark:bg-cyan-950/40', border: 'border-cyan-400 dark:border-cyan-600', text: 'text-cyan-700 dark:text-cyan-300', fill: '#06b6d4' },
  };

  // Filtered nodes
  const filteredNodes = useMemo(() => {
    return GRAPH_NODES.filter((n) => {
      const matchCategory = selectedCategory === 'all' || n.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.roleOrType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Selected node object
  const selectedNode = useMemo(() => {
    return GRAPH_NODES.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId]);

  // Connected links for selected node
  const connectedLinks = useMemo(() => {
    if (!selectedNodeId) return [];
    return GRAPH_LINKS.filter(
      (l) => l.source === selectedNodeId || l.target === selectedNodeId
    );
  }, [selectedNodeId]);

  // Neighbor nodes
  const neighborNodeIds = useMemo(() => {
    const ids = new Set<string>();
    connectedLinks.forEach((l) => {
      ids.add(l.source);
      ids.add(l.target);
    });
    return ids;
  }, [connectedLinks]);

  // Simple BFS for Path Finder
  const computedPath = useMemo(() => {
    if (pathSource === pathTarget) return [pathSource];
    const queue: { node: string; path: string[] }[] = [{ node: pathSource, path: [pathSource] }];
    const visited = new Set<string>([pathSource]);

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current.node === pathTarget) {
        return current.path;
      }

      // Find neighbors
      const neighbors: string[] = [];
      GRAPH_LINKS.forEach((l) => {
        if (l.source === current.node && !visited.has(l.target)) {
          neighbors.push(l.target);
        } else if (l.target === current.node && !visited.has(l.source)) {
          neighbors.push(l.source);
        }
      });

      for (const neighbor of neighbors) {
        visited.add(neighbor);
        queue.push({ node: neighbor, path: [...current.path, neighbor] });
      }
    }
    return [];
  }, [pathSource, pathTarget]);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Controls & View Mode Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
            Interactive Network Analysis
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            데이터 간의 유기적 관계망 (Visual Network)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            만풍그룹·사천시·SEBA·대학 및 5대 핵심 프로젝트 간의 입체적 연결 관계 분석
          </p>
        </div>

        {/* View Mode Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setActiveViewMode('graph')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeViewMode === 'graph'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <GitGraph className="w-3.5 h-3.5" />
            <span>관계도 그래프</span>
          </button>
          <button
            onClick={() => setActiveViewMode('matrix')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeViewMode === 'matrix'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>관계 매트릭스 표</span>
          </button>
          <button
            onClick={() => setActiveViewMode('pathfinder')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              activeViewMode === 'pathfinder'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>경로 추적 (Path)</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: INTERACTIVE SVG GRAPH */}
      {activeViewMode === 'graph' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Visual Canvas */}
          <div className="lg:col-span-8 p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            {/* Filter Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: '전체' },
                  { id: 'korean_partners', label: '★ 한국 협력기업(현대·기아)' },
                  { id: 'wanfeng_diamond', label: '만풍·다이아몬드' },
                  { id: 'seba_partners', label: 'SEBA 조직' },
                  { id: 'government_org', label: '지자체·산업계' },
                  { id: 'project_tracks', label: '핵심 프로젝트' },
                  { id: 'universities', label: '참여 대학' },
                  { id: 'budget_resources', label: '예산·자원' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 dark:bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="노드 검색 (사천, 청주대 등)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 pl-8 pr-3 py-1 text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-md border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="relative w-full overflow-x-auto rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 min-h-[580px] p-2">
              <svg viewBox="0 0 1060 720" className="w-full h-auto min-w-[760px] select-none">
                <defs>
                  {/* Arrowhead marker */}
                  <marker
                    id="arrowhead"
                    markerWidth="8"
                    markerHeight="6"
                    refX="16"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
                  </marker>
                  <marker
                    id="arrowhead-active"
                    markerWidth="8"
                    markerHeight="6"
                    refX="16"
                    refY="3"
                    orient="auto"
                  >
                    <polygon points="0 0, 8 3, 0 6" fill="#3b82f6" />
                  </marker>
                </defs>

                {/* Render Links */}
                {GRAPH_LINKS.map((link) => {
                  const sPos = nodeLayoutPositions[link.source];
                  const tPos = nodeLayoutPositions[link.target];
                  if (!sPos || !tPos) return null;

                  const isConnected =
                    selectedNodeId === link.source || selectedNodeId === link.target;
                  const isDimmed = selectedNodeId && !isConnected;

                  return (
                    <g key={link.id} className="transition-opacity duration-200">
                      <line
                        x1={sPos.x}
                        y1={sPos.y}
                        x2={tPos.x}
                        y2={tPos.y}
                        stroke={isConnected ? '#3b82f6' : '#cbd5e1'}
                        strokeWidth={isConnected ? 2.5 : 1.2}
                        strokeDasharray={link.relationshipType === 'partnership' ? '4 2' : undefined}
                        opacity={isDimmed ? 0.15 : 0.85}
                        markerEnd={isConnected ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                      />
                      {/* Midpoint Label if connected */}
                      {isConnected && (
                        <text
                          x={(sPos.x + tPos.x) / 2}
                          y={(sPos.y + tPos.y) / 2 - 4}
                          textAnchor="middle"
                          fill="#2563eb"
                          className="text-[10px] font-bold"
                          paintOrder="stroke"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinejoin="round"
                        >
                          {link.label}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Render Nodes */}
                {GRAPH_NODES.map((node) => {
                  const pos = nodeLayoutPositions[node.id];
                  if (!pos) return null;

                  const isSelected = selectedNodeId === node.id;
                  const isNeighbor = neighborNodeIds.has(node.id);
                  const isDimmed = selectedNodeId && !isSelected && !isNeighbor;
                  const color = categoryColors[node.category];

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      onClick={() => setSelectedNodeId(node.id)}
                      className="cursor-pointer transition-transform duration-150 hover:scale-105"
                      opacity={isDimmed ? 0.25 : 1}
                    >
                      {/* Node Circle */}
                      <circle
                        r={isSelected ? 26 : 20}
                        fill={color.fill}
                        stroke={isSelected ? '#1e293b' : 'white'}
                        strokeWidth={isSelected ? 3 : 2}
                        className="shadow-sm"
                      />

                      {/* Ripple ring on selected */}
                      {isSelected && (
                        <circle
                          r="32"
                          fill="none"
                          stroke={color.fill}
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                          className="animate-pulse"
                        />
                      )}

                      {/* Text Label Below Node */}
                      <text
                        y={isSelected ? 36 : 30}
                        textAnchor="middle"
                        className={`text-[11px] font-semibold tracking-tight ${
                          isSelected
                            ? 'font-bold fill-slate-900 dark:fill-white text-[12px]'
                            : 'fill-slate-700 dark:fill-slate-300'
                        }`}
                        paintOrder="stroke"
                        stroke="#ffffff"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      >
                        {node.name.length > 12 ? node.name.slice(0, 11) + '..' : node.name}
                      </text>

                      {/* Badge subtitle */}
                      {node.badge && (
                        <text
                          y={isSelected ? 48 : 42}
                          textAnchor="middle"
                          className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400"
                        >
                          {node.badge}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span>* 노드를 클릭하면 연결된 모든 관계와 문서 출처 및 담당자 체크리스트가 우측에 표시됩니다.</span>
              <button
                onClick={() => setSelectedNodeId(null)}
                className="hover:text-blue-600 flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>선택 초기화</span>
              </button>
            </div>
          </div>

          {/* Node Inspector Drawer */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5 sticky top-24">
            {selectedNode ? (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {selectedNode.categoryLabel}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {selectedNode.docCitation}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {selectedNode.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {selectedNode.roleOrType}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Direct Action Shortcuts */}
                <div className="pt-2 flex flex-col gap-2">
                  {selectedNode.category === 'seba_partners' && (
                    <button
                      onClick={() => {
                        if (onSelectChecklistAssignee) {
                          onSelectChecklistAssignee(selectedNode.id);
                        }
                        setActiveTab('checklists');
                      }}
                      className="w-full py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>담당자 체크리스트 바로가기</span>
                    </button>
                  )}

                  {selectedNode.category === 'universities' && (
                    <button
                      onClick={() => setActiveTab('itinerary')}
                      className="w-full py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>11개 대학 매트릭스 상세 보기</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      if (onSelectDoc) {
                        const targetDoc =
                          selectedNode.keyDoc === 'doc1'
                            ? 'doc-sacheon'
                            : selectedNode.keyDoc === 'doc2'
                            ? 'doc-budget'
                            : 'doc-itinerary';
                        onSelectDoc(targetDoc);
                      }
                      setActiveTab('documents');
                    }}
                    className="w-full py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>원문 보고서 대조 보기</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Connected Relationships List */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>직접 연결된 관계 ({connectedLinks.length}건)</span>
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {connectedLinks.map((link) => {
                      const isSource = link.source === selectedNode.id;
                      const otherId = isSource ? link.target : link.source;
                      const otherNode = GRAPH_NODES.find((n) => n.id === otherId);

                      return (
                        <div
                          key={link.id}
                          onClick={() => setSelectedNodeId(otherId)}
                          className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-all"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                              {link.label}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {link.docSource}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-1">
                            <span>{isSource ? '→ ' : '← '}</span>
                            <span>{otherNode?.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                            {link.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <Info className="w-8 h-8 mx-auto stroke-1" />
                <p className="text-xs">
                  그래프에서 노드를 클릭하면 상세 정보와 연결망이 표시됩니다.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: RELATIONSHIP MATRIX TABLE */}
      {activeViewMode === 'matrix' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              5대 전략 과제별 주체·담당자·예산·보고서 연계 매트릭스
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              보고서 1, 2, 3 종합 교차 분석
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">전략 과제명</th>
                  <th className="py-3 px-4">핵심 주체</th>
                  <th className="py-3 px-4">내부 담당자</th>
                  <th className="py-3 px-4">소요 예산 / 투자</th>
                  <th className="py-3 px-4">관련 대학 / 파트너</th>
                  <th className="py-3 px-4">출처 보고서</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="bg-cyan-50/60 dark:bg-cyan-950/30 hover:bg-cyan-100/50 dark:hover:bg-cyan-900/40 border-l-4 border-l-cyan-500">
                  <td className="py-3.5 px-4 font-bold text-cyan-950 dark:text-cyan-200">
                    ★ 한국 완성차 기업(현대·기아) 협력 실적 & 공급망 연계
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                    만풍 휠 사업부, 현대자동차, 기아 중국 (리태원 본부장)
                  </td>
                  <td className="py-3.5 px-4 font-medium text-cyan-700 dark:text-cyan-300">
                    만풍그룹 최고경영진, 기술협력팀
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    현대·기아 20년 협력 기반<br />(연간 휠 생산 1,800만 개)
                  </td>
                  <td className="py-3.5 px-4">
                    현대자동차 공식 고객사, 기아 중국 신에너지차 협력
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-cyan-700 dark:text-cyan-300">
                    Doc 1 개정판 (p.2, 공식 웹 증빙)
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    사천 경비행기 조립공장 JV 설립
                  </td>
                  <td className="py-3.5 px-4">만풍그룹, 사천시, 경남도</td>
                  <td className="py-3.5 px-4 font-medium text-blue-600 dark:text-blue-400">
                    기장 출신 사업총괄, 법률자문
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    3년 내 연매출 2,000억 목표<br />(외투 지원 별도)
                  </td>
                  <td className="py-3.5 px-4">사천 항공산업 클러스터</td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">Doc 1 (p.1~2), Doc 3 (p.5)</td>
                </tr>

                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    동북아 경비행기 MRO 거점 구축
                  </td>
                  <td className="py-3.5 px-4">Diamond Aircraft, KAI, KAEMS</td>
                  <td className="py-3.5 px-4 font-medium text-emerald-600 dark:text-emerald-400">
                    기술·정비 전문가 (외부자문)
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    월 100~200만 원 (자문비)
                  </td>
                  <td className="py-3.5 px-4">KAEMS, 국내 항공정비업체</td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">Doc 1 (p.2), Doc 3 (p.6)</td>
                </tr>

                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    수도권·중부권 대학 항공기 판매 & 리스
                  </td>
                  <td className="py-3.5 px-4">완펑 아태총괄(이윤), SEBA</td>
                  <td className="py-3.5 px-4 font-medium text-indigo-600 dark:text-indigo-400">
                    사업개발·영업 담당
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    DA40/DA42 완제기·키트<br />(3개교 이상 LOI 목표)
                  </td>
                  <td className="py-3.5 px-4">청주대, 극동대, 경운대 등 11개교</td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">Doc 3 (p.3~7, 12)</td>
                </tr>

                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    한·중 비행교육 & 중국 실습 모델
                  </td>
                  <td className="py-3.5 px-4">중국 현지 운영법인, 한국 대학</td>
                  <td className="py-3.5 px-4 font-medium text-blue-600 dark:text-blue-400">
                    기장 출신 사업총괄, 중국어 담당
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    대학 현물투자 및 리스 계약
                  </td>
                  <td className="py-3.5 px-4">한서대, 초당대, 세한대, 신라대</td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">Doc 3 (p.8)</td>
                </tr>

                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    글로벌 조종사 Career Network 다변화
                  </td>
                  <td className="py-3.5 px-4">만풍그룹 네트워크, 해외 항공사</td>
                  <td className="py-3.5 px-4 font-medium text-amber-600 dark:text-amber-400">
                    기장 출신 사업총괄
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    취업 연계형 타임빌딩 프로그램
                  </td>
                  <td className="py-3.5 px-4">한국항공대, 비행원 수료생 풀</td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">Doc 3 (p.9~10)</td>
                </tr>

                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    방한 로드쇼 행사 및 SEBA 사업권 확보
                  </td>
                  <td className="py-3.5 px-4">SEBA Partners, 만풍그룹</td>
                  <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-400">
                    행정직 직원, 행사단기 2~4명
                  </td>
                  <td className="py-3.5 px-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    행사비 650~1,220만 원
                  </td>
                  <td className="py-3.5 px-4">용산 로카우스 호텔, 오송 OSCO</td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">Doc 2 (p.4~5), Doc 3 (p.11~12)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: PATH FINDER */}
      {activeViewMode === 'pathfinder' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              데이터 간 최단 연결 경로 추적기 (Relationship Path Finder)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              임의의 두 주체 또는 자원을 선택하면 정책·조직·대학·예산이 어떻게 연결되어 있는지 단계별로 보여줍니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                출발 노드 (Start Node)
              </label>
              <select
                value={pathSource}
                onChange={(e) => setPathSource(e.target.value)}
                className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              >
                {GRAPH_NODES.map((n) => (
                  <option key={n.id} value={n.id}>
                    [{n.categoryLabel}] {n.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                도착 노드 (Target Node)
              </label>
              <select
                value={pathTarget}
                onChange={(e) => setPathTarget(e.target.value)}
                className="w-full text-xs p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              >
                {GRAPH_NODES.map((n) => (
                  <option key={n.id} value={n.id}>
                    [{n.categoryLabel}] {n.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Computed Path Display */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
              연결 경로 탐색 결과 ({computedPath.length}개 노드 경유)
            </div>

            {computedPath.length > 0 ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 overflow-x-auto py-2">
                {computedPath.map((nodeId, idx) => {
                  const node = GRAPH_NODES.find((n) => n.id === nodeId);
                  if (!node) return null;
                  const color = categoryColors[node.category];

                  return (
                    <React.Fragment key={nodeId}>
                      <div className={`p-3 rounded-xl border ${color.border} ${color.bg} shadow-2xs shrink-0 min-w-[180px]`}>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                          STEP {idx + 1} · {node.categoryLabel}
                        </div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                          {node.name}
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-1">
                          {node.roleOrType}
                        </div>
                      </div>

                      {idx < computedPath.length - 1 && (
                        <div className="hidden sm:flex items-center justify-center text-slate-400">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500">
                선택한 두 노드 사이에 직접 연결된 경로가 없습니다. 다른 노드를 선택해 보세요.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
