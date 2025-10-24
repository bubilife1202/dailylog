// Base Code Types
export type EnergyType = 'A' | 'B'; // A: 도전 지향, B: 안정 지향
export type DecisionType = 'A' | 'B'; // A: 논리 중심, B: 공감 중심
export type ActionType = 'A' | 'B'; // A: 실행 지향, B: 계획 지향
export type ValueType = 'A' | 'B'; // A: 성장 지향, B: 균형 지향
export type RecoveryType = 'A' | 'B'; // A: 활동적, B: 정적

export interface BaseCode {
  version: string;
  createdAt: string;
  lastUpdatedAt?: string;
  energy: EnergyType;
  decision: DecisionType;
  action: ActionType;
  value: ValueType;
  recovery: RecoveryType;
}

export interface BaseCodeHistory {
  version: string;
  createdAt: string;
  archivedAt: string;
  energy: EnergyType;
  decision: DecisionType;
  action: ActionType;
  value: ValueType;
  recovery: RecoveryType;
}

// Daily Log Types
export type ActivityType = '업무' | '공부' | '운동' | '관계' | '휴식' | '창작' | '기타';
export type EmotionType = '🔥' | '💡' | '😊' | '😐' | '😥' | '🤯';

export interface DailyLog {
  date: string; // YYYY-MM-DD
  energy: number; // 1-5
  activity: ActivityType;
  emotion: EmotionType;
  note?: string;
  createdAt: string;
}

// Report Types
export interface GeneratedReport {
  id: string;
  createdAt: string;
  period: {
    start: string; // YYYY-MM-DD
    end: string; // YYYY-MM-DD
  };
  dataPacket: string;
  promptVersion: string;
}

// Settings Types
export interface NotificationSettings {
  enabled: boolean;
  time: string; // HH:MM format
}

export interface Settings {
  notifications: NotificationSettings;
  promptVersion: string;
}

// Metadata Types
export interface Metadata {
  totalLogs: number;
  currentStreak: number;
  longestStreak: number;
  firstLogDate?: string;
  lastBackupDate?: string;
}

// Main App Data Structure
export interface AppData {
  version: string;
  isFirstVisit: boolean;
  baseCode?: BaseCode;
  baseCodeHistory: BaseCodeHistory[];
  dailyLogs: DailyLog[];
  generatedReports: GeneratedReport[];
  settings: Settings;
  metadata: Metadata;
}

// Default Values
export const DEFAULT_APP_DATA: AppData = {
  version: '1.0',
  isFirstVisit: true,
  baseCodeHistory: [],
  dailyLogs: [],
  generatedReports: [],
  settings: {
    notifications: {
      enabled: false,
      time: '21:00',
    },
    promptVersion: 'v1.0',
  },
  metadata: {
    totalLogs: 0,
    currentStreak: 0,
    longestStreak: 0,
  },
};
