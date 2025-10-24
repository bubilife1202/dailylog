import { useState } from 'react';
import type { DailyLog } from '../types';

interface CalendarProps {
  dailyLogs: DailyLog[];
  currentDate: string;
  onDateSelect: (date: string) => void;
}

function Calendar({ dailyLogs, currentDate, onDateSelect }: CalendarProps) {
  const [viewDate, setViewDate] = useState(() => {
    const date = new Date(currentDate);
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  // 해당 월의 모든 날짜 생성
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0 (일요일) ~ 6 (토요일)

    const days: (Date | null)[] = [];

    // 이전 월의 빈 칸
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // 현재 월의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const days = getDaysInMonth(viewDate);
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  // 로그가 있는 날짜 확인
  const hasLog = (date: Date | null) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return dailyLogs.some((log) => log.date === dateStr);
  };

  // 오늘 날짜 확인
  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // 선택된 날짜 확인
  const isSelected = (date: Date | null) => {
    if (!date) return false;
    const dateStr = date.toISOString().split('T')[0];
    return dateStr === currentDate;
  };

  // 월 변경
  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setViewDate(newDate);
  };

  // 날짜 클릭
  const handleDateClick = (date: Date | null) => {
    if (!date) return;
    const dateStr = date.toISOString().split('T')[0];
    onDateSelect(dateStr);
  };

  const formatYearMonth = (date: Date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg active:scale-95 transition-all"
        >
          ◀
        </button>
        <h2 className="text-lg font-bold text-gray-900">
          {formatYearMonth(viewDate)}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg active:scale-95 transition-all"
        >
          ▶
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-bold ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, index) => {
          const dayHasLog = hasLog(date);
          const dayIsToday = isToday(date);
          const dayIsSelected = isSelected(date);

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              disabled={!date}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-lg text-sm
                transition-all
                ${!date ? 'invisible' : ''}
                ${dayIsSelected ? 'bg-indigo-600 text-white font-bold' : ''}
                ${!dayIsSelected && dayIsToday ? 'border-2 border-indigo-600 font-bold' : ''}
                ${!dayIsSelected && !dayIsToday && dayHasLog ? 'bg-green-100 text-gray-900' : ''}
                ${!dayIsSelected && !dayIsToday && !dayHasLog ? 'text-gray-400' : ''}
                ${date ? 'hover:bg-gray-100 active:scale-95' : ''}
                ${dayIsSelected ? 'hover:bg-indigo-700' : ''}
              `}
            >
              {date && (
                <>
                  <span>{date.getDate()}</span>
                  {dayHasLog && !dayIsSelected && (
                    <span className="text-xs">🟢</span>
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* 범례 */}
      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-green-100 rounded"></div>
          <span>로그 작성</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 border-2 border-indigo-600 rounded"></div>
          <span>오늘</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 bg-indigo-600 rounded"></div>
          <span>선택</span>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
