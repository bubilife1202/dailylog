import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveDailyLog, getDailyLog, loadAppData, getWeeklyCompletion } from '../utils/localStorage';
import type { DailyLog as DailyLogType, ActivityType, EmotionType } from '../types';
import Calendar from '../components/Calendar';
import VersionFooter from '../components/VersionFooter';

const activities: ActivityType[] = ['업무', '공부', '운동', '관계', '휴식', '창작', '기타'];
const emotions: { emoji: EmotionType; label: string }[] = [
  { emoji: '🔥', label: '열정/의욕' },
  { emoji: '💡', label: '영감/깨달음' },
  { emoji: '😊', label: '만족/기쁨' },
  { emoji: '😐', label: '평온/무난' },
  { emoji: '😥', label: '피로/우울' },
  { emoji: '🤯', label: '혼란/스트레스' },
];

function DailyLog() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [energy, setEnergy] = useState<number>(3);
  const [activity, setActivity] = useState<ActivityType | ''>('');
  const [emotion, setEmotion] = useState<EmotionType | ''>('');
  const [note, setNote] = useState('');
  const [streak, setStreak] = useState(0);
  const [weeklyCompletion, setWeeklyCompletion] = useState({ completed: 0, total: 7 });
  const [showCalendar, setShowCalendar] = useState(false);
  const [yesterdayLog, setYesterdayLog] = useState<DailyLogType | null>(null);

  // 현재 날짜의 로그 로드
  useEffect(() => {
    const log = getDailyLog(currentDate);
    if (log) {
      setEnergy(log.energy);
      setActivity(log.activity);
      setEmotion(log.emotion);
      setNote(log.note || '');
    } else {
      // 새 날짜는 기본값
      setEnergy(3);
      setActivity('');
      setEmotion('');
      setNote('');
    }

    // 어제 로그 로드
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayDateStr = yesterday.toISOString().split('T')[0];
    const yesterdayLogData = getDailyLog(yesterdayDateStr);
    setYesterdayLog(yesterdayLogData || null);

    // 스트릭 및 주간 완성도 업데이트
    const data = loadAppData();
    setStreak(data.metadata.currentStreak);
    setWeeklyCompletion(getWeeklyCompletion());
  }, [currentDate]);

  const handleDateChange = (offset: number) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + offset);
    setCurrentDate(date.toISOString().split('T')[0]);
  };

  const handleCopyYesterday = () => {
    if (yesterdayLog) {
      setEnergy(yesterdayLog.energy);
      setActivity(yesterdayLog.activity);
      setEmotion(yesterdayLog.emotion);
      setNote(''); // 메모만 비우기
    }
  };

  const handleSave = () => {
    if (!activity || !emotion) {
      alert('주요 활동과 핵심 감정을 선택해주세요.');
      return;
    }

    const log: DailyLogType = {
      date: currentDate,
      energy,
      activity: activity as ActivityType,
      emotion: emotion as EmotionType,
      note: note.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    saveDailyLog(log);
    alert('✅ 로그 저장 완료!');

    // 스트릭 및 주간 완성도 업데이트
    const data = loadAppData();
    setStreak(data.metadata.currentStreak);
    setWeeklyCompletion(getWeeklyCompletion());
  };

  const canGenerateReport = weeklyCompletion.completed >= 3;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Cozac's Life Debugger
          </h1>
          <div className="flex items-center space-x-4">
            {streak > 0 && (
              <div className="flex items-center space-x-1 text-orange-600 font-bold">
                <span>🔥</span>
                <span>{streak}일</span>
              </div>
            )}
            <button
              onClick={() => navigate('/settings')}
              className="text-gray-600 hover:text-gray-900"
            >
              ⚙️
            </button>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 스트릭 및 완성도 */}
        {(streak > 0 || weeklyCompletion.completed > 0) && (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              {streak > 0 && (
                <div className="mb-4 md:mb-0">
                  <p className="text-sm opacity-90">연속 기록</p>
                  <p className="text-3xl font-bold">🔥 {streak}일</p>
                </div>
              )}
              <div>
                <p className="text-sm opacity-90">이번 주 로그 완성도</p>
                <p className="text-2xl font-bold">
                  {weeklyCompletion.completed} / {weeklyCompletion.total}일
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 로그 입력 카드 */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* 날짜 선택 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => handleDateChange(-1)}
                className="min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded-lg text-2xl transition"
              >
                ←
              </button>
              <div className="text-center flex-1 mx-4">
                <p className="text-xl md:text-2xl font-bold text-gray-900">
                  {new Date(currentDate).toLocaleDateString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short',
                  })}
                </p>
              </div>
              <button
                onClick={() => handleDateChange(1)}
                disabled={currentDate >= new Date().toISOString().split('T')[0]}
                className="min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-gray-100 active:bg-gray-200 rounded-lg text-2xl transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>

            {/* 캘린더 토글 버튼 */}
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {showCalendar ? '📅 캘린더 닫기' : '📅 캘린더 보기'}
            </button>
          </div>

          {/* 캘린더 뷰 */}
          {showCalendar && (
            <div className="mb-6">
              <Calendar
                dailyLogs={loadAppData().dailyLogs}
                currentDate={currentDate}
                onDateSelect={(date) => {
                  setCurrentDate(date);
                  setShowCalendar(false);
                }}
              />
            </div>
          )}

          {/* 어제 로그 미리보기 */}
          {yesterdayLog && !getDailyLog(currentDate) && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-blue-900 font-medium mb-2">
                    💡 어제는 이랬어요
                  </p>
                  <p className="text-sm text-blue-700">
                    에너지 {yesterdayLog.energy}/5, {yesterdayLog.activity},{' '}
                    {yesterdayLog.emotion}
                  </p>
                </div>
                <button
                  onClick={handleCopyYesterday}
                  className="ml-3 px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 active:scale-95 transition whitespace-nowrap"
                >
                  오늘도 비슷해요
                </button>
              </div>
            </div>
          )}

          <div className="border-t border-gray-200 pt-8"></div>

          {/* Q1: 에너지 레벨 */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              오늘의 에너지 레벨은?
            </label>
            <div className="px-2">
              <input
                type="range"
                min="1"
                max="5"
                value={energy}
                onChange={(e) => setEnergy(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>1 (탈진)</span>
                <span className="font-bold text-blue-600 text-lg">{energy}</span>
                <span>5 (최고조)</span>
              </div>
            </div>
          </div>

          {/* Q2: 주요 활동 */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              오늘 가장 많은 시간을 쓴 활동은?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {activities.map((act) => (
                <button
                  key={act}
                  onClick={() => setActivity(act)}
                  className={`min-h-[52px] py-3 px-4 rounded-lg font-medium transition active:scale-95 ${
                    activity === act
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                  }`}
                >
                  {act}
                </button>
              ))}
            </div>
          </div>

          {/* Q3: 감정 상태 */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              오늘의 핵심 감정은?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {emotions.map((emo) => (
                <button
                  key={emo.emoji}
                  onClick={() => setEmotion(emo.emoji)}
                  className={`min-h-[64px] py-4 px-4 rounded-lg font-medium transition active:scale-95 ${
                    emotion === emo.emoji
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                  }`}
                >
                  <span className="text-3xl block mb-1">{emo.emoji}</span>
                  <span className="text-xs block">{emo.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Q4: 한 줄 로그 */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              한 줄 로그 (선택)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="예: '기획안 통과', '번아웃', '좋은 대화'"
              className="w-full px-4 py-4 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* 저장 버튼 */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl active:scale-98 min-h-[56px]"
          >
            로그 저장하기
          </button>
        </div>

        {/* 리포트 생성 버튼 */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/report')}
            disabled={!canGenerateReport}
            className={`w-full font-bold py-4 px-6 rounded-lg transition duration-200 shadow-lg ${
              canGenerateReport
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            📊 이번 주 AI 분석 받기 (로그 {weeklyCompletion.completed}일)
            {!canGenerateReport && ' - 최소 3일 로그 필요'}
          </button>
        </div>

        {/* 버전 표시 */}
        <VersionFooter />
      </div>
    </div>
  );
}

export default DailyLog;
