import type { AppData, BaseCode, DailyLog, GeneratedReport } from '../types';

// 샘플 Base Code
export const SAMPLE_BASE_CODE: BaseCode = {
  version: '1.0',
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  energy: 'A', // 도전 지향
  decision: 'A', // 논리 중심
  action: 'B', // 계획 지향
  value: 'A', // 성장 지향
  recovery: 'B', // 정적
};

// 샘플 Daily Logs (최근 7일)
export const SAMPLE_DAILY_LOGS: DailyLog[] = [
  {
    date: getDateString(6),
    energy: 2,
    activity: '업무',
    emotion: '😥',
    note: '월요병... 피곤한 하루',
    createdAt: getDateString(6),
  },
  {
    date: getDateString(5),
    energy: 3,
    activity: '업무',
    emotion: '😐',
    note: '그냥 평범한 화요일',
    createdAt: getDateString(5),
  },
  {
    date: getDateString(4),
    energy: 4,
    activity: '공부',
    emotion: '💡',
    note: '새로운 걸 배웠다!',
    createdAt: getDateString(4),
  },
  {
    date: getDateString(3),
    energy: 3,
    activity: '운동',
    emotion: '😊',
    note: '운동 후 기분 좋음',
    createdAt: getDateString(3),
  },
  {
    date: getDateString(2),
    energy: 5,
    activity: '창작',
    emotion: '🔥',
    note: '프로젝트 진행 순조로움',
    createdAt: getDateString(2),
  },
  {
    date: getDateString(1),
    energy: 2,
    activity: '휴식',
    emotion: '😥',
    note: '번아웃 올 것 같음',
    createdAt: getDateString(1),
  },
  {
    date: getDateString(0),
    energy: 4,
    activity: '관계',
    emotion: '😊',
    note: '친구들과 좋은 시간',
    createdAt: getDateString(0),
  },
];

// 샘플 리포트
export const SAMPLE_REPORT: GeneratedReport = {
  id: 'sample-report-1',
  createdAt: new Date().toISOString(),
  period: {
    start: getDateString(6),
    end: getDateString(0),
  },
  dataPacket: generateSampleDataPacket(),
  promptVersion: 'v1.0',
};

// 헬퍼 함수: N일 전 날짜 문자열
function getDateString(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
}

// 샘플 데이터 패킷 생성
function generateSampleDataPacket(): string {
  return `[Base Code]
버전: 1.0
에너지: A (도전 지향)
의사결정: A (논리 중심)
행동: B (계획 지향)
가치관: A (성장 지향)
회복: B (정적 회복)

[Weekly Logs Summary]
총 기록일수: 7일
평균 에너지: 3.3/5

에너지 분포:
- 5점: 1일 (14%)
- 4점: 2일 (29%)
- 3점: 2일 (29%)
- 2점: 2일 (29%)

활동 분포:
- 업무: 2일
- 공부: 1일
- 운동: 1일
- 창작: 1일
- 휴식: 1일
- 관계: 1일

감정 분포:
- 🔥 (열정): 1일
- 💡 (영감): 1일
- 😊 (만족): 2일
- 😐 (평온): 1일
- 😥 (피로): 2일

주요 패턴:
- 주 초반 에너지 낮음 (월요병)
- 주 중반 활력 상승
- 성장 지향이지만 번아웃 조짐
- 다양한 활동 시도 중`;
}

// 전체 샘플 앱 데이터
export function createSampleAppData(): AppData {
  return {
    version: '1.2',
    isFirstVisit: false,
    baseCode: SAMPLE_BASE_CODE,
    baseCodeHistory: [],
    dailyLogs: SAMPLE_DAILY_LOGS,
    generatedReports: [SAMPLE_REPORT],
    settings: {
      notifications: {
        enabled: false,
        time: '21:00',
      },
      promptVersion: 'v1.0',
    },
    metadata: {
      totalLogs: 7,
      currentStreak: 7,
      longestStreak: 7,
      firstLogDate: getDateString(6),
    },
  };
}
