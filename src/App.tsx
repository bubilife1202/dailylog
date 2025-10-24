import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadAppData } from './utils/localStorage';

// Pages
import Onboarding from './pages/Onboarding';
import BaseCode from './pages/BaseCode';
import DailyLog from './pages/DailyLog';
import Report from './pages/Report';
import Settings from './pages/Settings';

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);
  const [hasBaseCode, setHasBaseCode] = useState<boolean | null>(null);

  useEffect(() => {
    const data = loadAppData();
    setIsFirstVisit(data.isFirstVisit);
    setHasBaseCode(!!data.baseCode);
  }, []);

  // 로딩 중
  if (isFirstVisit === null || hasBaseCode === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* 첫 방문 시 온보딩 */}
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Base Code 정의 */}
        <Route path="/base-code" element={<BaseCode />} />

        {/* Daily Log (메인 화면) */}
        <Route path="/daily-log" element={<DailyLog />} />

        {/* 디버깅 리포트 */}
        <Route path="/report" element={<Report />} />

        {/* 설정 */}
        <Route path="/settings" element={<Settings />} />

        {/* 기본 라우트: 조건부 리다이렉트 */}
        <Route
          path="/"
          element={
            isFirstVisit ? (
              <Navigate to="/onboarding" replace />
            ) : !hasBaseCode ? (
              <Navigate to="/base-code" replace />
            ) : (
              <Navigate to="/daily-log" replace />
            )
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
