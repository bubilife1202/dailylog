import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  loadAppData,
  exportDataAsJSON,
  importDataFromJSON,
  clearAllData,
  getStorageSizeMB,
  updateLastBackupDate,
} from '../utils/localStorage';

function Settings() {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const appData = loadAppData();
  const storageSizeMB = getStorageSizeMB();

  const handleExportData = () => {
    try {
      const jsonData = exportDataAsJSON();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      const date = new Date().toISOString().split('T')[0];
      link.download = `cozac-life-debugger-backup-${date}.json`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      updateLastBackupDate();
      alert('✅ 데이터가 다운로드되었습니다!');
    } catch (error) {
      alert('❌ 내보내기에 실패했습니다.');
    }
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event: any) => {
        const jsonString = event.target.result;

        const confirmed = window.confirm(
          '⚠️ 현재 데이터를 백업 파일로 덮어쓰시겠습니까?\n현재 데이터는 삭제됩니다.'
        );

        if (confirmed) {
          const success = importDataFromJSON(jsonString);
          if (success) {
            alert('✅ 데이터를 가져왔습니다! 페이지를 새로고침합니다.');
            window.location.reload();
          } else {
            alert('❌ 잘못된 파일 형식입니다.');
          }
        }
      };

      reader.readAsText(file);
    };

    input.click();
  };

  const handleDeleteAllData = () => {
    if (deleteConfirmText !== 'DELETE') {
      alert('삭제하려면 "DELETE"를 정확히 입력해주세요.');
      return;
    }

    clearAllData();
    alert('✅ 모든 데이터가 삭제되었습니다.');
    window.location.href = '/';
  };

  const formatBaseCode = (type: string, value: string): string => {
    const labels: Record<string, Record<string, string>> = {
      energy: { A: '도전 지향', B: '안정 지향' },
      decision: { A: '논리 중심', B: '공감 중심' },
      action: { A: '실행 지향', B: '계획 지향' },
      value: { A: '성장 지향', B: '균형 지향' },
      recovery: { A: '활동적 방식', B: '정적 방식' },
    };
    return labels[type]?.[value] || value;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/daily-log')}
            className="text-gray-600 hover:text-gray-900 mb-4"
          >
            ← 돌아가기
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">설정</h1>
        </div>

        {/* 섹션 1: Base Code 관리 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Base Code 관리</h2>

          {appData.baseCode ? (
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">
                현재 Base Code (v{appData.baseCode.version},{' '}
                {new Date(appData.baseCode.createdAt).toLocaleDateString('ko-KR')} 생성)
              </p>
              <div className="space-y-1 text-sm">
                <p>• 에너지: {formatBaseCode('energy', appData.baseCode.energy)}</p>
                <p>• 결정: {formatBaseCode('decision', appData.baseCode.decision)}</p>
                <p>• 행동: {formatBaseCode('action', appData.baseCode.action)}</p>
                <p>• 가치: {formatBaseCode('value', appData.baseCode.value)}</p>
                <p>• 회복: {formatBaseCode('recovery', appData.baseCode.recovery)}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 mb-4">Base Code가 아직 정의되지 않았습니다.</p>
          )}

          <button
            onClick={() => navigate('/base-code')}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition active:scale-98 min-h-[52px]"
          >
            Base Code 재평가하기
          </button>
        </div>

        {/* 섹션 2: 데이터 관리 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">데이터 관리</h2>

          {/* 저장 공간 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600">📊 저장 공간 사용량</p>
            <p className="text-2xl font-bold text-gray-900">
              {storageSizeMB} MB <span className="text-sm text-gray-600">/ 5 MB</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(parseFloat(storageSizeMB) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* 버튼들 */}
          <div className="space-y-3">
            <button
              onClick={handleExportData}
              className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-medium py-3 px-6 rounded-lg transition active:scale-98 min-h-[52px]"
            >
              내 데이터 내보내기 (JSON)
            </button>

            <button
              onClick={handleImportData}
              className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-medium py-3 px-6 rounded-lg transition active:scale-98 min-h-[52px]"
            >
              데이터 가져오기
            </button>
          </div>

          {/* 경고 */}
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              ⚠️ <strong>중요:</strong> 데이터는 이 브라우저에만 저장됩니다.
              <br />
              • 브라우저 캐시 삭제 시 데이터 손실
              <br />
              • 다른 기기/브라우저에서는 접근 불가
              <br />→ 정기적으로 데이터를 내보내기하세요!
            </p>
          </div>
        </div>

        {/* 섹션 3: 위험 영역 */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
          <h2 className="text-xl font-bold text-red-900 mb-4">위험 영역</h2>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium py-3 px-6 rounded-lg transition active:scale-98 min-h-[52px]"
            >
              모든 데이터 삭제
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-900 font-bold mb-2">
                  🚨 정말 모든 데이터를 삭제하시겠습니까?
                </p>
                <p className="text-sm text-red-800 mb-3">
                  삭제되는 항목: Base Code, 모든 Daily Log, 생성된 리포트
                  <br />
                  이 작업은 되돌릴 수 없습니다!
                </p>
                <p className="text-sm text-red-800 mb-2">
                  삭제하려면 <strong>"DELETE"</strong>를 입력하세요:
                </p>
                <input
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full px-4 py-3 text-base border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 mb-3"
                  placeholder="DELETE"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmText('');
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-gray-800 font-medium py-3 px-4 rounded-lg transition active:scale-98 min-h-[48px]"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleDeleteAllData}
                    className="flex-1 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium py-3 px-4 rounded-lg transition active:scale-98 min-h-[48px]"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 섹션 4: 정보 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">정보</h2>

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>버전:</strong> Cozac's Life Debugger v1.0
            </p>
            <p>
              <strong>총 로그:</strong> {appData.metadata.totalLogs}개
            </p>
            <p>
              <strong>최장 스트릭:</strong> {appData.metadata.longestStreak}일
            </p>
            {appData.metadata.firstLogDate && (
              <p>
                <strong>첫 로그:</strong>{' '}
                {new Date(appData.metadata.firstLogDate).toLocaleDateString('ko-KR')}
              </p>
            )}
            {appData.metadata.lastBackupDate && (
              <p>
                <strong>마지막 백업:</strong>{' '}
                {new Date(appData.metadata.lastBackupDate).toLocaleDateString('ko-KR')}
              </p>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              <strong>개인정보 처리방침</strong>
            </p>
            <p className="text-xs text-gray-600">
              이 앱은 서버를 사용하지 않으며, 어떠한 데이터도 외부로 전송하지 않습니다. 모든
              데이터는 당신의 브라우저(localStorage)에만 저장됩니다.
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Made by <strong>Cozac</strong> (코작)
              <br />
              인생을 코딩하는 작가
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
