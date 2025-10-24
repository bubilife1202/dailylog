import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadAppData, saveAppData } from '../utils/localStorage';
import type { GeneratedReport } from '../types';
import VersionFooter from '../components/VersionFooter';

function PastReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<GeneratedReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<GeneratedReport | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  useEffect(() => {
    const data = loadAppData();
    // 최신순 정렬
    const sortedReports = [...data.generatedReports].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setReports(sortedReports);
  }, []);

  const handleReportClick = (report: GeneratedReport) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleCopyData = async (report: GeneratedReport) => {
    try {
      await navigator.clipboard.writeText(report.dataPacket);
      setCopySuccess(report.id);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      alert('복사에 실패했습니다.');
    }
  };

  const handleDeleteReport = (reportId: string) => {
    if (!confirm('이 리포트를 삭제하시겠습니까?')) return;

    const data = loadAppData();
    data.generatedReports = data.generatedReports.filter((r) => r.id !== reportId);
    saveAppData(data);

    setReports(data.generatedReports.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
    setShowModal(false);
    setSelectedReport(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 pb-20">
      {/* 헤더 */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate('/daily-log')}
            className="mr-4 text-gray-600 hover:text-gray-900 text-xl"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-gray-900">📚 과거 리포트</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {reports.length === 0 ? (
          // 빈 상태
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              아직 생성된 리포트가 없습니다
            </h2>
            <p className="text-gray-600 mb-6">
              리포트 화면에서 첫 디버깅 리포트를 생성해보세요!
            </p>
            <button
              onClick={() => navigate('/report')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all min-h-[48px]"
            >
              첫 리포트 생성하기
            </button>
          </div>
        ) : (
          // 리포트 목록
          <div className="space-y-4">
            <div className="text-sm text-gray-600 mb-4">
              총 {reports.length}개의 리포트
            </div>
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer active:scale-[0.99]"
                onClick={() => handleReportClick(report)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      📊 {formatDate(report.createdAt)}
                    </div>
                    <div className="text-sm text-gray-600">
                      분석 기간: {formatDate(report.period.start)} ~{' '}
                      {formatDate(report.period.end)}
                    </div>
                  </div>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                    {report.promptVersion}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  클릭하여 상세 보기
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 버전 표시 */}
        {reports.length > 0 && <VersionFooter />}

        {/* 하단 네비게이션 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
          <div className="max-w-2xl mx-auto flex gap-2">
            <button
              onClick={() => navigate('/daily-log')}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 active:scale-95 transition-all min-h-[48px]"
            >
              Daily Log
            </button>
            <button
              onClick={() => navigate('/report')}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all min-h-[48px]"
            >
              새 리포트 생성
            </button>
          </div>
        </div>
      </div>

      {/* 리포트 상세 모달 */}
      {showModal && selectedReport && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    📊 리포트 상세
                  </h2>
                  <div className="text-sm text-gray-600">
                    {formatDate(selectedReport.createdAt)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(selectedReport.period.start)} ~{' '}
                    {formatDate(selectedReport.period.end)}
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* 모달 바디 */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-2">데이터 패킷</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                  <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                    {selectedReport.dataPacket}
                  </pre>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleCopyData(selectedReport)}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all min-h-[48px]"
                >
                  {copySuccess === selectedReport.id ? '✓ 복사됨!' : '📋 데이터 복사'}
                </button>
                <button
                  onClick={() => handleDeleteReport(selectedReport.id)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 active:scale-95 transition-all min-h-[48px]"
                >
                  🗑️ 삭제
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PastReports;
