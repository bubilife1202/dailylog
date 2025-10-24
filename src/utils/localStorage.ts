import type { AppData, DailyLog, BaseCode, GeneratedReport } from '../types';
import { DEFAULT_APP_DATA } from '../types';

const STORAGE_KEY = 'cozac-life-debugger';

/**
 * localStorage에서 전체 앱 데이터 로드
 */
export const loadAppData = (): AppData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return DEFAULT_APP_DATA;
    }
    const data = JSON.parse(stored) as AppData;
    // 기본값과 병합하여 누락된 필드 방지
    return {
      ...DEFAULT_APP_DATA,
      ...data,
      settings: {
        ...DEFAULT_APP_DATA.settings,
        ...data.settings,
      },
      metadata: {
        ...DEFAULT_APP_DATA.metadata,
        ...data.metadata,
      },
    };
  } catch (error) {
    console.error('Failed to load app data:', error);
    return DEFAULT_APP_DATA;
  }
};

/**
 * localStorage에 전체 앱 데이터 저장
 */
export const saveAppData = (data: AppData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save app data:', error);
    throw new Error('데이터 저장에 실패했습니다.');
  }
};

/**
 * Base Code 저장
 */
export const saveBaseCode = (baseCode: BaseCode): void => {
  const data = loadAppData();

  // 기존 Base Code가 있으면 히스토리로 이동
  if (data.baseCode) {
    data.baseCodeHistory.push({
      ...data.baseCode,
      archivedAt: new Date().toISOString(),
    });
  }

  data.baseCode = baseCode;
  saveAppData(data);
};

/**
 * Daily Log 저장/업데이트
 */
export const saveDailyLog = (log: DailyLog): void => {
  const data = loadAppData();

  // 같은 날짜의 로그가 있으면 업데이트, 없으면 추가
  const existingIndex = data.dailyLogs.findIndex(l => l.date === log.date);

  if (existingIndex >= 0) {
    data.dailyLogs[existingIndex] = log;
  } else {
    data.dailyLogs.push(log);
    data.metadata.totalLogs++;
  }

  // 날짜순 정렬 (최신순)
  data.dailyLogs.sort((a, b) => b.date.localeCompare(a.date));

  // 스트릭 계산
  data.metadata.currentStreak = calculateCurrentStreak(data.dailyLogs);
  data.metadata.longestStreak = Math.max(
    data.metadata.longestStreak,
    data.metadata.currentStreak
  );

  // 첫 로그 날짜 기록
  if (!data.metadata.firstLogDate || log.date < data.metadata.firstLogDate) {
    data.metadata.firstLogDate = log.date;
  }

  saveAppData(data);
};

/**
 * 특정 날짜의 Daily Log 가져오기
 */
export const getDailyLog = (date: string): DailyLog | undefined => {
  const data = loadAppData();
  return data.dailyLogs.find(log => log.date === date);
};

/**
 * 기간별 Daily Log 가져오기
 */
export const getDailyLogsByPeriod = (startDate: string, endDate: string): DailyLog[] => {
  const data = loadAppData();
  return data.dailyLogs.filter(
    log => log.date >= startDate && log.date <= endDate
  );
};

/**
 * Report 저장
 */
export const saveGeneratedReport = (report: GeneratedReport): void => {
  const data = loadAppData();
  data.generatedReports.push(report);
  // 최신순 정렬
  data.generatedReports.sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
  saveAppData(data);
};

/**
 * Report 삭제
 */
export const deleteGeneratedReport = (reportId: string): void => {
  const data = loadAppData();
  data.generatedReports = data.generatedReports.filter(r => r.id !== reportId);
  saveAppData(data);
};

/**
 * 첫 방문 완료 처리
 */
export const markFirstVisitComplete = (): void => {
  const data = loadAppData();
  data.isFirstVisit = false;
  saveAppData(data);
};

/**
 * 전체 데이터 JSON으로 내보내기
 */
export const exportDataAsJSON = (): string => {
  const data = loadAppData();
  return JSON.stringify(data, null, 2);
};

/**
 * JSON 데이터 가져오기 (유효성 검증 포함)
 */
export const importDataFromJSON = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString) as AppData;

    // 기본 유효성 검증
    if (!data.version || !Array.isArray(data.dailyLogs)) {
      throw new Error('Invalid data format');
    }

    saveAppData(data);
    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
};

/**
 * 모든 데이터 삭제
 */
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * 저장 공간 사용량 계산 (bytes)
 */
export const getStorageSize = (): number => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return 0;
  return new Blob([data]).size;
};

/**
 * 저장 공간 사용량 (MB)
 */
export const getStorageSizeMB = (): string => {
  const bytes = getStorageSize();
  const mb = bytes / (1024 * 1024);
  return mb.toFixed(2);
};

/**
 * 현재 스트릭 계산
 */
const calculateCurrentStreak = (logs: DailyLog[]): number => {
  if (logs.length === 0) return 0;

  const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));
  const today = new Date().toISOString().split('T')[0];

  let streak = 0;
  let currentDate = new Date(today);

  for (const log of sortedLogs) {
    const logDate = new Date(log.date);
    const diffDays = Math.floor(
      (currentDate.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === streak) {
      streak++;
    } else if (diffDays > streak) {
      break;
    }
  }

  return streak;
};

/**
 * 주간 로그 완성도 계산
 */
export const getWeeklyCompletion = (): { completed: number; total: number } => {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 6);

  const weekStart = weekAgo.toISOString().split('T')[0];
  const weekEnd = today.toISOString().split('T')[0];

  const logsThisWeek = getDailyLogsByPeriod(weekStart, weekEnd);

  return {
    completed: logsThisWeek.length,
    total: 7,
  };
};

/**
 * 월간 로그 완성도 계산
 */
export const getMonthlyCompletion = (): { completed: number; total: number } => {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
    .toISOString()
    .split('T')[0];
  const monthEnd = today.toISOString().split('T')[0];

  const logsThisMonth = getDailyLogsByPeriod(monthStart, monthEnd);
  const daysInMonth = today.getDate();

  return {
    completed: logsThisMonth.length,
    total: daysInMonth,
  };
};

/**
 * 백업 날짜 업데이트
 */
export const updateLastBackupDate = (): void => {
  const data = loadAppData();
  data.metadata.lastBackupDate = new Date().toISOString().split('T')[0];
  saveAppData(data);
};
