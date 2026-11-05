import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Send, 
  FileCheck, 
  Building2, 
  Phone, 
  Mail, 
  User, 
  Download, 
  Trash2, 
  ExternalLink,
  Layers,
  ArrowRight,
  Info,
  Cloud,
  Database,
  HardDrive,
  Copy,
  Check,
  Share2,
  FileSpreadsheet,
  HelpCircle,
  RefreshCw,
  FolderUp,
  ShieldCheck
} from 'lucide-react';

export type RoadshowVenueChoice = 
  | '용산역 23일 (오후 2시 부터 4시까지)'
  | '오송역 24일 (오후 2시 부터 4시까지)'
  | '용산역 23일'
  | '오송역 24일';

export type VisitDateChoice = 
  | '11월 25일 (14시~16시)'
  | '11월 26일 (14시~16시)'
  | '11월 25일'
  | '11월 26일';

export interface RoadshowRegistration {
  id: string;
  selectedVenue: RoadshowVenueChoice | string;
  orgName: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  attendeesCount: string;
  interests: string[];
  notes?: string;
  submittedAt: string;
}

export interface VisitRequest {
  id: string;
  selectedDate: VisitDateChoice | string;
  city: string;
  orgName: string;
  contactName: string;
  phone: string;
  email: string;
  facilityName?: string;
  agenda?: string;
  submittedAt: string;
}

interface RegistrationAndVisitFormsProps {
  initialFormType?: 'roadshow' | 'visit' | 'list';
  defaultVenue?: string;
  defaultDate?: string;
}

export const RegistrationAndVisitForms: React.FC<RegistrationAndVisitFormsProps> = ({
  initialFormType = 'roadshow',
  defaultVenue = '용산역 23일 (오후 2시 부터 4시까지)',
  defaultDate = '11월 25일 (14시~16시)',
}) => {
  const [formType, setFormType] = useState<'roadshow' | 'visit' | 'list'>(initialFormType);

  // Roadshow Form State with normalized afternoon time slot
  const initialRoadshowVenue = defaultVenue.includes('오송')
    ? '오송역 24일 (오후 2시 부터 4시까지)'
    : '용산역 23일 (오후 2시 부터 4시까지)';

  const initialVisitDate = defaultDate.includes('26')
    ? '11월 26일 (14시~16시)'
    : '11월 25일 (14시~16시)';

  const [roadshowVenue, setRoadshowVenue] = useState<string>(initialRoadshowVenue);
  const [roadshowOrg, setRoadshowOrg] = useState('');
  const [roadshowName, setRoadshowName] = useState('');
  const [roadshowPosition, setRoadshowPosition] = useState('');
  const [roadshowPhone, setRoadshowPhone] = useState('');
  const [roadshowEmail, setRoadshowEmail] = useState('');
  const [roadshowAttendees, setRoadshowAttendees] = useState('1명');
  const [roadshowInterests, setRoadshowInterests] = useState<string[]>(['항공기 구매 및 리스']);
  const [roadshowNotes, setRoadshowNotes] = useState('');
  const [roadshowSubmitted, setRoadshowSubmitted] = useState<RoadshowRegistration | null>(null);

  // Visit Request Form State with normalized 14시~16시 time slot
  const [visitDate, setVisitDate] = useState<string>(initialVisitDate);
  const [visitCity, setVisitCity] = useState('');
  const [visitOrg, setVisitOrg] = useState('');
  const [visitContactName, setVisitContactName] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitEmail, setVisitEmail] = useState('');
  const [visitFacility, setVisitFacility] = useState('');
  const [visitAgenda, setVisitAgenda] = useState('');
  const [visitSubmitted, setVisitSubmitted] = useState<VisitRequest | null>(null);

  // Submissions storage
  const [roadshowList, setRoadshowList] = useState<RoadshowRegistration[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wanfeng_roadshow_submissions');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    // Pre-seeded initial mock data for immediate demonstration
    return [
      {
        id: 'reg-01',
        selectedVenue: '용산역 23일 (오후 2시 부터 4시까지)',
        orgName: '한국항공대학교 비행교육원',
        name: '김항공',
        position: '비행교육원 팀장',
        phone: '010-3849-2918',
        email: 'aviation_kim@kau.ac.kr',
        attendeesCount: '2명',
        interests: ['항공기 구매 및 리스', '글로벌 조종사 진로 다변화'],
        notes: 'DA42 쌍발기 및 특수비행 커리어 트랙 협의 희망',
        submittedAt: '2026-11-04 14:20',
      },
      {
        id: 'reg-02',
        selectedVenue: '오송역 24일 (오후 2시 부터 4시까지)',
        orgName: '청주대학교 항공운항학과',
        name: '박운항',
        position: '학과장 / 교수',
        phone: '010-9182-3741',
        email: 'flight_park@cju.ac.kr',
        attendeesCount: '3명',
        interests: ['항공기 구매 및 리스', '사천 MRO 및 정비부품 지원'],
        notes: '기존 운용중인 Diamond 기종 추가 구매 및 사천 MRO 거점 논의',
        submittedAt: '2026-11-04 15:45',
      },
    ];
  });

  const [visitList, setVisitList] = useState<VisitRequest[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wanfeng_visit_requests');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      {
        id: 'vis-01',
        selectedDate: '11월 25일 (14시~16시)',
        city: '충북 음성군',
        orgName: '극동대학교 항공운항학과',
        contactName: '이극동',
        phone: '010-2345-6789',
        email: 'kd_aero@kdu.ac.kr',
        facilityName: '항공운항 시뮬레이터실 및 실습동',
        agenda: 'DA42 다발훈련기 확대 도입 및 중국 현지 비행실습 프로그램 연계 현장 점검',
        submittedAt: '2026-11-04 11:30',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('wanfeng_roadshow_submissions', JSON.stringify(roadshowList));
  }, [roadshowList]);

  useEffect(() => {
    localStorage.setItem('wanfeng_visit_requests', JSON.stringify(visitList));
  }, [visitList]);

  // Handle Roadshow Submit
  const handleRoadshowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roadshowOrg || !roadshowName || !roadshowPhone || !roadshowEmail) return;

    const newReg: RoadshowRegistration = {
      id: `reg-${Date.now()}`,
      selectedVenue: roadshowVenue,
      orgName: roadshowOrg.trim(),
      name: roadshowName.trim(),
      position: roadshowPosition.trim() || '담당자',
      phone: roadshowPhone.trim(),
      email: roadshowEmail.trim(),
      attendeesCount: roadshowAttendees,
      interests: roadshowInterests,
      notes: roadshowNotes.trim(),
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setRoadshowList([newReg, ...roadshowList]);
    setRoadshowSubmitted(newReg);
    // Reset inputs
    setRoadshowOrg('');
    setRoadshowName('');
    setRoadshowPosition('');
    setRoadshowPhone('');
    setRoadshowEmail('');
    setRoadshowNotes('');
  };

  // Handle Visit Request Submit
  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitCity || !visitOrg || !visitContactName || !visitPhone || !visitEmail) return;

    const newVisit: VisitRequest = {
      id: `vis-${Date.now()}`,
      selectedDate: visitDate,
      city: visitCity.trim(),
      orgName: visitOrg.trim(),
      contactName: visitContactName.trim(),
      phone: visitPhone.trim(),
      email: visitEmail.trim(),
      facilityName: visitFacility.trim(),
      agenda: visitAgenda.trim(),
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };

    setVisitList([newVisit, ...visitList]);
    setVisitSubmitted(newVisit);
    // Reset inputs
    setVisitCity('');
    setVisitOrg('');
    setVisitContactName('');
    setVisitPhone('');
    setVisitEmail('');
    setVisitFacility('');
    setVisitAgenda('');
  };

  const toggleInterest = (val: string) => {
    if (roadshowInterests.includes(val)) {
      setRoadshowInterests(roadshowInterests.filter((i) => i !== val));
    } else {
      setRoadshowInterests([...roadshowInterests, val]);
    }
  };

  // Modal state for Google Drive guide
  const [showDriveGuide, setShowDriveGuide] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Copy data formatted for direct paste into Google Sheets
  const copyForGoogleSheets = (type: 'roadshow' | 'visit') => {
    let tsv = '';
    if (type === 'roadshow') {
      const headers = ['신청ID', '참여장소/일자', '기관명', '성명', '직책', '연락처', '이메일', '참석인원', '관심분야', '비고', '제출일시'];
      const rows = roadshowList.map((r) => [
        r.id,
        r.selectedVenue,
        r.orgName,
        r.name,
        r.position,
        r.phone,
        r.email,
        r.attendeesCount,
        r.interests.join(' / '),
        (r.notes || '').replace(/\t|\n/g, ' '),
        r.submittedAt,
      ]);
      tsv = [headers.join('\t'), ...rows.map((row) => row.join('\t'))].join('\n');
    } else {
      const headers = ['요청ID', '희망일자', '도시이름', '기관명', '담당자이름', '전화번호', '이메일주소', '방문시설', '협의안건', '제출일시'];
      const rows = visitList.map((v) => [
        v.id,
        v.selectedDate,
        v.city,
        v.orgName,
        v.contactName,
        v.phone,
        v.email,
        (v.facilityName || '').replace(/\t|\n/g, ' '),
        (v.agenda || '').replace(/\t|\n/g, ' '),
        v.submittedAt,
      ]);
      tsv = [headers.join('\t'), ...rows.map((row) => row.join('\t'))].join('\n');
    }

    navigator.clipboard.writeText(tsv).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 3000);
    });
  };

  // Full backup JSON export
  const exportFullBackupJSON = () => {
    const data = {
      exportDate: new Date().toISOString(),
      roadshowRegistrations: roadshowList,
      visitRequests: visitList,
      totalCount: roadshowList.length + visitList.length,
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const link = document.createElement('a');
    link.href = jsonStr;
    link.download = `wanfeng_all_applications_backup_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
  };

  // Export submissions to CSV
  const exportRoadshowCSV = () => {
    const headers = ['신청ID', '참여장소/일자', '기관명', '성명', '직책', '연락처', '이메일', '참석인원', '관심분야', '비고', '제출일시'];
    const rows = roadshowList.map((r) => [
      `"${r.id}"`,
      `"${r.selectedVenue}"`,
      `"${r.orgName}"`,
      `"${r.name}"`,
      `"${r.position}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      `"${r.attendeesCount}"`,
      `"${r.interests.join(' / ')}"`,
      `"${(r.notes || '').replace(/"/g, '""')}"`,
      `"${r.submittedAt}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `roadshow_registrations_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const exportVisitCSV = () => {
    const headers = ['요청ID', '희망일자', '도시이름', '기관명', '담당자이름', '전화번호', '이메일주소', '방문시설', '협의안건', '제출일시'];
    const rows = visitList.map((v) => [
      `"${v.id}"`,
      `"${v.selectedDate}"`,
      `"${v.city}"`,
      `"${v.orgName}"`,
      `"${v.contactName}"`,
      `"${v.phone}"`,
      `"${v.email}"`,
      `"${(v.facilityName || '').replace(/"/g, '""')}"`,
      `"${(v.agenda || '').replace(/"/g, '""')}"`,
      `"${v.submittedAt}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `visit_requests_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
        <div>
          <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
            Official Registration & On-Site Visit Booking
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
            설명회 로드쇼 참가신청서 및 현장 방문요청서
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            용산역(23일)·오송역(24일) 설명회 참가 및 11월 25일·26일 만풍그룹 최고경영진 현장 방문 신청 접수
          </p>
        </div>

        {/* Form Mode Segmented Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setFormType('roadshow')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              formType === 'roadshow'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>설명회 참가신청서</span>
          </button>
          <button
            onClick={() => setFormType('visit')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              formType === 'visit'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>현장 방문요청서</span>
          </button>
          <button
            onClick={() => setFormType('list')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
              formType === 'list'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>접수 현황 ({roadshowList.length + visitList.length}건)</span>
          </button>
        </div>
      </div>

      {/* Persistence & Google Drive Storage Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/60 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-600 text-white shrink-0 shadow-xs">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                웹 브라우저 영구 저장 활성화됨
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                자동 보존 중 ({roadshowList.length + visitList.length}건)
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              페이지를 새로고침하거나 브라우저를 닫아도 신청 데이터가 안전하게 계속 유지됩니다.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={() => setShowDriveGuide(true)}
            className="px-3 py-1.5 rounded-lg font-semibold bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shadow-2xs text-xs"
          >
            <FolderUp className="w-3.5 h-3.5 text-indigo-600" />
            <span>구글 드라이브 저장 안내</span>
          </button>
          <button
            onClick={exportFullBackupJSON}
            className="px-3 py-1.5 rounded-lg font-semibold bg-slate-900 text-white dark:bg-slate-700 hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-2xs text-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>전체 백업 다운로드</span>
          </button>
        </div>
      </div>

      {/* FORM 1: ROADSHOW REGISTRATION FORM */}
      {formType === 'roadshow' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Form */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                APPLICATION FORM 01
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                만풍그룹 방한 로드쇼 참가 신청서
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                수도권 및 중부권 비행교육기관, 항공운항학과, 항공산업 관계자 여러분의 참여를 환영합니다.
              </p>
            </div>

            {roadshowSubmitted && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-sm">
                    {roadshowSubmitted.name}님의 참가 신청이 정상 접수되었습니다!
                  </div>
                  <div>
                    선택 장소/일자: <strong className="font-semibold">{roadshowSubmitted.selectedVenue}</strong> ({roadshowSubmitted.orgName})
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-300">
                    접수번호: {roadshowSubmitted.id} · 등록 안내 문자가 발송될 예정입니다. (구글 링크 연동 대기중)
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleRoadshowSubmit} className="space-y-5">
              {/* Radio Group for Venue and Date */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>참여 가능 일자 및 장소 선택 (필수) *</span>
                  <span className="text-[11px] text-slate-400 font-normal">Radio 버튼으로 하나를 선택해 주세요</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Yongsan */}
                  <label
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      roadshowVenue.includes('용산')
                        ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="roadshowVenueRadio"
                      value="용산역 23일 (오후 2시 부터 4시까지)"
                      checked={roadshowVenue.includes('용산')}
                      onChange={() => setRoadshowVenue('용산역 23일 (오후 2시 부터 4시까지)')}
                      className="mt-1 accent-blue-600"
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          용산역 23일
                        </span>
                        <span className="text-[11px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded">
                          오후 2시 부터 4시까지
                        </span>
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                        일시: 2026년 11월 23일 (월) 오후 2시 부터 4시까지
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        나인트리 프리미어 로카우스 호텔 서울 용산 (수도권 로드쇼)
                      </div>
                      <div className="text-[10px] text-slate-400 pt-0.5">
                        * 한국 항공교육시장 브리핑, Diamond 제품 설명 및 1:1 상담
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Osung */}
                  <label
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      roadshowVenue.includes('오송')
                        ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="roadshowVenueRadio"
                      value="오송역 24일 (오후 2시 부터 4시까지)"
                      checked={roadshowVenue.includes('오송')}
                      onChange={() => setRoadshowVenue('오송역 24일 (오후 2시 부터 4시까지)')}
                      className="mt-1 accent-blue-600"
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          오송역 24일
                        </span>
                        <span className="text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded">
                          오후 2시 부터 4시까지
                        </span>
                      </div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                        일시: 2026년 11월 24일 (화) 오후 2시 부터 4시까지
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        OSCO 중회의실 (충북 청주 오송역 일원, 중부권 로드쇼)
                      </div>
                      <div className="text-[10px] text-slate-400 pt-0.5">
                        * 대학별 협력모델 발표, DA40/42 구매 설명 및 1:1 구매상담
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    소속 기관명 / 대학교 *
                  </label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="예: 한국항공대학교, 청주대학교"
                      value={roadshowOrg}
                      onChange={(e) => setRoadshowOrg(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    참석자 성명 *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="홍길동"
                      value={roadshowName}
                      onChange={(e) => setRoadshowName(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    직위 / 직책
                  </label>
                  <input
                    type="text"
                    placeholder="예: 총장, 학과장, 처장, 팀장"
                    value={roadshowPosition}
                    onChange={(e) => setRoadshowPosition(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    휴대전화 번호 *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={roadshowPhone}
                      onChange={(e) => setRoadshowPhone(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    이메일 주소 *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="name@university.ac.kr"
                      value={roadshowEmail}
                      onChange={(e) => setRoadshowEmail(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Attendees count & interests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    동행 참석 인원수
                  </label>
                  <select
                    value={roadshowAttendees}
                    onChange={(e) => setRoadshowAttendees(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="1명">본인 1명</option>
                    <option value="2명">2명 (동행 1명)</option>
                    <option value="3명">3명 (동행 2명)</option>
                    <option value="4명 이상">4명 이상 (단체 참석)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    주요 관심 분야 (복수 선택 가능)
                  </label>
                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {[
                      '항공기 구매 및 리스',
                      '중국 비행실습 & 학점인정',
                      '사천 MRO 및 정비부품 지원',
                      '글로벌 조종사 진로 다변화',
                    ].map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleInterest(item)}
                        className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                          roadshowInterests.includes(item)
                            ? 'bg-blue-600 text-white font-medium shadow-2xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  사전 질의사항 및 요청사항 (선택사항)
                </label>
                <textarea
                  rows={2}
                  placeholder="예: 1:1 개별 상담 시 DA42 기종 납기 및 금융 리스 조건 사전 상담 희망..."
                  value={roadshowNotes}
                  onChange={(e) => setRoadshowNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Submit Button & Google Link Notice */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">
                  * 구글 링크(Google Forms/Sheets)는 추후 연동 예정이며, 현재 웹화면에서 바로신청하여 즉시 공식 접수됩니다.
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>웹화면에서 바로신청</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase">
                ROADSHOW GUIDE
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                방한 설명회 참가 혜택 및 안내
              </h4>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white mb-0.5">
                  1. 방한 최고경영진 1:1 대면 상담
                </div>
                <div>만풍그룹 이사(徐志良), 아태총괄(李赟), 항공기제조 총경리(李小娟)와의 직접적인 질의응답 및 후속 협상 기회 제공</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white mb-0.5">
                  2. 공식 네트워킹 오찬 및 교재 제공
                </div>
                <div>나인트리 프리미어 로카우스 및 OSCO 현장 오찬 제공, DA40·DA42 브로슈어 및 가격·기술 공식 자료집 배포</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white mb-0.5">
                  3. 우선 도입 및 위탁실습 인센티브
                </div>
                <div>방한 기간 중 구매의향서(LOI)를 협의하는 대학 대상 초도 물량 납기 우선권 및 장학/교류 프로그램 연계</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              문의처: SEBA Partners 사업총괄TF (기장 출신 사업총괄 / 행정지원팀)
            </div>
          </div>
        </div>
      )}

      {/* FORM 2: VISIT REQUEST FORM */}
      {formType === 'visit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                APPLICATION FORM 02
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                만풍그룹 최고경영진 현장 방문요청서
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                11월 25일(대학 현장 방문) 또는 11월 26일(사천 클러스터·산업체) 일정 중 만풍그룹 경영진의 귀 기관 방문을 신청합니다.
              </p>
            </div>

            {visitSubmitted && (
              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-sm">
                    {visitSubmitted.orgName}({visitSubmitted.city})의 현장 방문요청서가 정상 접수되었습니다!
                  </div>
                  <div>
                    희망 날짜: <strong className="font-semibold">{visitSubmitted.selectedDate}</strong> · 담당자: {visitSubmitted.contactName} ({visitSubmitted.phone})
                  </div>
                  <div className="text-[11px] text-indigo-700 dark:text-indigo-300">
                    접수번호: {visitSubmitted.id} · SEBA Partners 사업총괄 기장이 방문 동선 및 상세 일정을 검토 후 연락드립니다.
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleVisitSubmit} className="space-y-5">
              {/* Radio Group for Date Selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>
                    방문 요청일자 선택 <span className="text-indigo-600 dark:text-indigo-400 font-mono">(요청시간: 14시~16시)</span> *
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">Radio 버튼으로 하나를 선택해 주세요</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Nov 25 */}
                  <label
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      visitDate.includes('25')
                        ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="visitDateRadio"
                      value="11월 25일 (14시~16시)"
                      checked={visitDate.includes('25')}
                      onChange={() => setVisitDate('11월 25일 (14시~16시)')}
                      className="mt-1 accent-indigo-600"
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            11월 25일 (수)
                          </span>
                          <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded">
                            14시~16시
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                          대학 교육 협력
                        </span>
                      </div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                        요청일자: 11월 25일 | 방문시간: 14시~16시
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        거점 대학 직접 방문 및 격납고/시설 점검, 다발기 도입 협의
                      </div>
                      <div className="text-[10px] text-slate-400 pt-0.5">
                        * DA42 다발훈련기 도입, 중국 실습 위탁운영 모델 구체화 협의
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Nov 26 */}
                  <label
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      visitDate.includes('26')
                        ? 'border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="visitDateRadio"
                      value="11월 26일 (14시~16시)"
                      checked={visitDate.includes('26')}
                      onChange={() => setVisitDate('11월 26일 (14시~16시)')}
                      className="mt-1 accent-indigo-600"
                    />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white">
                            11월 26일 (목)
                          </span>
                          <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded">
                            14시~16시
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                          사천 제조·산업 협력
                        </span>
                      </div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                        요청일자: 11월 26일 | 방문시간: 14시~16시
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        경남 사천 항공 클러스터, 지자체 및 산업체 방문
                      </div>
                      <div className="text-[10px] text-slate-400 pt-0.5">
                        * 조립공장 후보지 실사, KAI/KAEMS MRO 협력, 지자체 투자협의
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* City Input (Required by user prompt) */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  방문 장소 (도시 이름 입력) *
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
                  <input
                    type="text"
                    required
                    placeholder="도시 이름을 입력해 주세요 (예: 충북 청주시, 음성군, 충남 태안군, 경남 사천시, 경북 구미시 등)"
                    value={visitCity}
                    onChange={(e) => setVisitCity(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Organization & Contact Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    기관명 (대학교 / 지자체 / 기업체) *
                  </label>
                  <div className="relative">
                    <Building2 className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="예: 극동대학교 항공운항학과, 사천시청 항공산업과"
                      value={visitOrg}
                      onChange={(e) => setVisitOrg(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    담당자 이름 *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="담당 실무자 또는 접견자 성명"
                      value={visitContactName}
                      onChange={(e) => setVisitContactName(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Email (Required by user prompt) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    전화번호 *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      value={visitPhone}
                      onChange={(e) => setVisitPhone(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    이메일 주소 *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="contact@org.domain"
                      value={visitEmail}
                      onChange={(e) => setVisitEmail(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Facility & Agenda */}
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  방문 희망 시설 / 세부 장소
                </label>
                <input
                  type="text"
                  placeholder="예: 대학 본관 회의실, 비행교육원 격납고 및 활주로 현장"
                  value={visitFacility}
                  onChange={(e) => setVisitFacility(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  협의 희망 안건 및 주요 내용
                </label>
                <textarea
                  rows={3}
                  placeholder="예: DA42 다발훈련기 2대 도입 협의, 3학년 비행실습 중국 현지 위탁운영 세부 조건 및 총장단 접견..."
                  value={visitAgenda}
                  onChange={(e) => setVisitAgenda(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-400">
                  * 제출 시 SEBA Partners 사업기획팀에 즉시 등록되며, 방한 대표단 일정과 조율 후 확정됩니다.
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>웹화면에서 바로신청</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                ON-SITE VISIT PROTOCOL
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                현장 방문 심사 및 선정 기준
              </h4>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white mb-0.5">
                  11월 25일 (수): 대학 현장 방문
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  보고서 3(p.4~5)에 따라 이동 시간을 감안하여 사전 협의된 2~3개 대학교를 우선 선별하여 방문합니다. (극동대, 청주대 등)
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-900 dark:text-white mb-0.5">
                  11월 26일 (목): 경남 사천 클러스터
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  사천시 항공산업 클러스터 부지, KAI/KAEMS MRO 현장 및 지자체 투자지원 협의를 집중 진행합니다.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-200">
              <strong>안내:</strong> 방문 일정은 이동 동선과 의사결정권자(총장단/지자체장) 접견 가능 여부를 종합하여 최종 확정됩니다.
            </div>
          </div>
        </div>
      )}

      {/* FORM 3: SUBMISSIONS MANAGEMENT LIST */}
      {formType === 'list' && (
        <div className="space-y-8">
          {/* Roadshow Submissions Table */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>설명회 로드쇼 접수 현황 ({roadshowList.length}건)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  용산역 23일 및 오송역 24일 설명회 참가 신청 명단
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => copyForGoogleSheets('roadshow')}
                  className="px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 rounded-lg transition-colors flex items-center gap-1.5"
                  title="구글 시트(Google Sheets)에 바로 붙여넣기(Ctrl+V)할 수 있게 복사합니다"
                >
                  {copiedType === 'roadshow' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>시트용 복사완료!</span>
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      <span>구글시트 붙여넣기용 복사</span>
                    </>
                  )}
                </button>
                <button
                  onClick={exportRoadshowCSV}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV 다운로드</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">신청일시</th>
                    <th className="py-2.5 px-3">선택 일자/장소</th>
                    <th className="py-2.5 px-3">기관명</th>
                    <th className="py-2.5 px-3">성명 / 직책</th>
                    <th className="py-2.5 px-3">연락처</th>
                    <th className="py-2.5 px-3">이메일</th>
                    <th className="py-2.5 px-3">인원</th>
                    <th className="py-2.5 px-3">관심분야 / 비고</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {roadshowList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                        {item.submittedAt}
                      </td>
                      <td className="py-2.5 px-3 font-bold whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${
                          item.selectedVenue.includes('용산')
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                        }`}>
                          {item.selectedVenue}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">
                        {item.orgName}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {item.name} <span className="text-slate-400 text-[11px]">({item.position})</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] whitespace-nowrap">
                        {item.phone}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px]">
                        {item.email}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        {item.attendeesCount}
                      </td>
                      <td className="py-2.5 px-3 text-[11px] max-w-xs truncate">
                        {item.interests.join(', ')} {item.notes ? `· ${item.notes}` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Visit Requests Table */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>현장 방문요청서 접수 현황 ({visitList.length}건)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  11월 25일 및 26일 만풍그룹 최고경영진 현장 방문 신청 명단
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => copyForGoogleSheets('visit')}
                  className="px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-300 dark:border-indigo-800 rounded-lg transition-colors flex items-center gap-1.5"
                  title="구글 시트(Google Sheets)에 바로 붙여넣기(Ctrl+V)할 수 있게 복사합니다"
                >
                  {copiedType === 'visit' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-indigo-600" />
                      <span>시트용 복사완료!</span>
                    </>
                  ) : (
                    <>
                      <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600" />
                      <span>구글시트 붙여넣기용 복사</span>
                    </>
                  )}
                </button>
                <button
                  onClick={exportVisitCSV}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV 다운로드</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">접수일시</th>
                    <th className="py-2.5 px-3">희망 일자</th>
                    <th className="py-2.5 px-3">도시 이름</th>
                    <th className="py-2.5 px-3">기관명</th>
                    <th className="py-2.5 px-3">담당자 이름</th>
                    <th className="py-2.5 px-3">전화번호</th>
                    <th className="py-2.5 px-3">이메일 주소</th>
                    <th className="py-2.5 px-3">방문시설 / 협의안건</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {visitList.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                        {item.submittedAt}
                      </td>
                      <td className="py-2.5 px-3 font-bold whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[11px] bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                          {item.selectedDate}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        {item.city}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                        {item.orgName}
                      </td>
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {item.contactName}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] whitespace-nowrap">
                        {item.phone}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px]">
                        {item.email}
                      </td>
                      <td className="py-2.5 px-3 text-[11px] max-w-sm truncate">
                        {item.facilityName ? `[${item.facilityName}] ` : ''}{item.agenda || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* GOOGLE DRIVE / SHEETS STORAGE GUIDE MODAL */}
      {showDriveGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300">
                  <FolderUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    구글 드라이브(Google Drive) 및 구글 시트 저장 안내
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    웹 신청 데이터를 구글 드라이브와 구글 스프레드시트에 영구 저장·연동하는 방법
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDriveGuide(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Current Storage Status */}
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>현재 웹상에서 브라우저(LocalStorage)에 실시간으로 계속 자동 저장되고 있습니다!</span>
              </div>
              <p className="text-emerald-800/90 dark:text-emerald-300 text-[11px] leading-relaxed">
                현재 등록된 로드쇼 신청서 <strong>{roadshowList.length}건</strong>과 현장 방문요청서 <strong>{visitList.length}건</strong>(총 {roadshowList.length + visitList.length}건)은 
                웹 브라우저 영구 저장소에 즉시 보존되므로 새로고침하거나 브라우저를 껐다 켜도 데이터가 소실되지 않습니다.
              </p>
            </div>

            {/* Google Drive / Google Sheets Methods */}
            <div className="space-y-4 text-xs">
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                구글 드라이브에 저장하는 3가지 간편 방법:
              </div>

              {/* Method 1: Direct Google Sheets Copy */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-mono">1</span>
                    <span>방법 1: 구글 스프레드시트에 1초 만에 붙여넣기 (가장 추천)</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                    원클릭 복사
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  아래 버튼을 누르면 구글 시트 규격(TSV)에 맞게 표 전체가 클립보드에 복사됩니다.
                  새 구글 시트(Google Sheets)를 열고 <strong className="text-slate-900 dark:text-white font-mono">A1 셀에서 Ctrl + V (붙여넣기)</strong>만 누르면 모든 열과 행이 완벽하게 들어갑니다!
                </p>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <button
                    onClick={() => copyForGoogleSheets('roadshow')}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1.5 transition-colors text-xs"
                  >
                    {copiedType === 'roadshow' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'roadshow' ? '로드쇼 명단 복사 완료!' : '로드쇼 명단 구글시트용 복사'}</span>
                  </button>
                  <button
                    onClick={() => copyForGoogleSheets('visit')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 transition-colors text-xs"
                  >
                    {copiedType === 'visit' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'visit' ? '방문요청 명단 복사 완료!' : '방문요청 명단 구글시트용 복사'}</span>
                  </button>
                  <a
                    href="https://sheets.new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1 hover:bg-slate-50 transition-colors text-xs"
                  >
                    <span>새 구글시트 열기 (sheets.new)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Method 2: CSV Upload to Google Drive */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-mono">2</span>
                  <span>방법 2: CSV 파일로 다운로드 후 구글 드라이브 폴더에 업로드</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  [CSV 다운로드] 버튼으로 파일을 저장한 뒤, 구글 드라이브(drive.google.com) 업무 폴더에 드래그&드롭하여 영구 백업 보관할 수 있습니다.
                </p>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <button
                    onClick={exportRoadshowCSV}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1.5 hover:bg-slate-300 transition-colors text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>로드쇼 CSV 받기</span>
                  </button>
                  <button
                    onClick={exportVisitCSV}
                    className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1.5 hover:bg-slate-300 transition-colors text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>방문요청 CSV 받기</span>
                  </button>
                  <a
                    href="https://drive.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold flex items-center gap-1 hover:bg-slate-50 transition-colors text-xs"
                  >
                    <span>구글 드라이브 열기</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Method 3: Google Forms webhook or full JSON backup */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px] font-mono">3</span>
                  <span>방법 3: 전체 통합 데이터 JSON 백업</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  신청일시, 상세 관심분야, 비고 및 시설명 등 모든 메타데이터가 완벽히 포함된 원본 JSON 백업 파일을 다운로드하여 구글 드라이브에 안전하게 보관할 수 있습니다.
                </p>
                <button
                  onClick={exportFullBackupJSON}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 dark:bg-slate-700 text-white font-semibold flex items-center gap-1.5 hover:bg-slate-900 transition-colors text-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>전체 신청자 통합 JSON 백업 다운로드</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setShowDriveGuide(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
