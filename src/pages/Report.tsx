import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadAppData, getDailyLogsByPeriod, saveGeneratedReport } from '../utils/localStorage';
import type { BaseCode, ActivityType } from '../types';

const MASTER_PROMPT = `[프롬프트 명령어] v1.0

너는 '라이프 코치'이자 냉철한 '데이터 분석가'다.
나의 'Base Code (초기 설정값)'와 나의 '주간 로그' 데이터가 주어졌다.

[분석 목표]
'Base Code'(내가 정의한 성향)와 '주간 로그'(나의 실제 행동) 사이의
'시너지'와 '충돌(버그)'을 찾아내고, '삶을 디버깅'하기 위한
구체적인 액션 플랜을 제시해야 한다.

[분석 단계]
1. **데이터 요약:**
   'Base Code'와 '주간 로그'의 핵심을 각각 한 문장으로 요약한다.

2. **패턴 분석 (Synergy):**
   이번 주 로그에서 'Base Code'의 성향과 '잘 맞는(시너지)'
   긍정적인 행동을 1~2가지 찾아라.
   왜 이것이 시너지인지 'Base Code'에 기반하여 설명하라.

3. **버그 탐지 (Conflict):**
   이번 주 로그에서 'Base Code'의 성향과 '충돌하는(버그)'
   행동 패턴을 1~2가지 찾아라.
   이것이 왜 문제인지 'Base Code'에 기반하여 논리적으로 설명하라.
   (예: "당신은 '계획 지향'인데, 실제로는 즉흥적으로 움직여 피로도가 높았다")

4. **디버깅 패치 (Action Plan):**
   탐지된 '버그'를 해결하고 '시너지'를 강화하기 위한
   '다음 주 액션 플랜'을 3가지 제안하라.
   각 플랜은 구체적이고 실행 가능해야 한다.
   (예: "매일 아침 10분 계획 시간 갖기" 같은 명확한 행동)

[출력 형식]
- 톤앤매너: '코작(Cozac)'의 톤으로, 논리적이고 명료하며,
  공감하되 냉철하게 '디버깅 리포트' 형식으로 작성하라.
- 'Base Code', 'Log', 'Bug', 'Synergy', 'Patch' 같은
  프로그래밍 용어를 적극 활용하라.
- 각 섹션을 명확히 구분하고, 불렛 포인트로 가독성을 높여라.

[제목 형식]
"🔍 Life Debugging Report | [분석 기간]"`;

function Report() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<'7' | '14' | '30'>('7');
  const [dataPacket, setDataPacket] = useState('');
  const [copiedData, setCopiedData] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  useEffect(() => {
    generateDataPacket();
  }, [period]);

  const generateDataPacket = () => {
    const appData = loadAppData();
    const baseCode = appData.baseCode;

    if (!baseCode) {
      alert('Base Code가 정의되지 않았습니다.');
      navigate('/base-code');
      return;
    }

    // 기간 계산
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - (Number(period) - 1));

    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    const logs = getDailyLogsByPeriod(start, end);

    if (logs.length < 3) {
      setDataPacket('⚠️ 로그가 3일 미만입니다. 최소 3일 이상 로그를 작성한 후 다시 시도하세요.');
      return;
    }

    // Base Code 해석
    const baseCodeText = formatBaseCode(baseCode);

    // 로그 통계 계산
    const avgEnergy = (logs.reduce((sum, log) => sum + log.energy, 0) / logs.length).toFixed(1);

    const activityCount: Record<ActivityType, number> = {
      '업무': 0,
      '공부': 0,
      '운동': 0,
      '관계': 0,
      '휴식': 0,
      '창작': 0,
      '기타': 0,
    };
    logs.forEach((log) => {
      activityCount[log.activity]++;
    });

    const activityPercent = Object.entries(activityCount)
      .filter(([_, count]) => count > 0)
      .map(([activity, count]) => `${activity}(${Math.round((count / logs.length) * 100)}%)`)
      .join(', ');

    const emotionCount: Record<string, number> = {};
    logs.forEach((log) => {
      emotionCount[log.emotion] = (emotionCount[log.emotion] || 0) + 1;
    });

    const emotionFreq = Object.entries(emotionCount)
      .sort((a, b) => b[1] - a[1])
      .map(([emotion, count]) => `'${emotion}'(${count}회)`)
      .join(', ');

    // 일별 로그 요약
    const dailySummary = logs
      .map((log) => {
        const date = new Date(log.date);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
        const noteText = log.note ? `: '${log.note}'` : '';
        return `  - ${dateStr} (에너지 ${log.energy}/5, ${log.activity}, ${log.emotion} )${noteText}`;
      })
      .join('\n');

    // 데이터 패킷 생성
    const packet = `[분석 요청 데이터]

1. 나의 'Base Code (초기 설정값)':
${baseCodeText}

2. 나의 '주간 로그' (${start} ~ ${end}, 총 ${logs.length}일):
   - 평균 에너지 레벨: ${avgEnergy} / 5.0
   - 주요 활동 비중: ${activityPercent}
   - 핵심 감정 빈도: ${emotionFreq}

   [일별 상세 로그]
${dailySummary}`;

    setDataPacket(packet);
  };

  const formatBaseCode = (baseCode: BaseCode) => {
    const labels: Record<string, Record<string, string>> = {
      energy: { A: '도전 지향 (외부 활동)', B: '안정 지향 (내면 집중)' },
      decision: { A: '논리 중심 (데이터 기반)', B: '공감 중심 (관계 중심)' },
      action: { A: '실행 지향 (즉각 적응)', B: '계획 지향 (체계적)' },
      value: { A: '성장 지향 (성취 중시)', B: '균형 지향 (안정 중시)' },
      recovery: { A: '활동적 방식 (운동/외출)', B: '정적 방식 (휴식/혼자)' },
    };

    return `   - 에너지: ${labels.energy[baseCode.energy]}
   - 결정: ${labels.decision[baseCode.decision]}
   - 행동: ${labels.action[baseCode.action]}
   - 가치: ${labels.value[baseCode.value]}
   - 회복: ${labels.recovery[baseCode.recovery]}`;
  };

  const copyToClipboard = async (text: string, type: 'data' | 'prompt') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'data') {
        setCopiedData(true);
        setTimeout(() => setCopiedData(false), 2000);
      } else {
        setCopiedPrompt(true);
        setTimeout(() => setCopiedPrompt(false), 2000);
      }
    } catch (error) {
      alert('복사에 실패했습니다. 텍스트를 수동으로 선택해서 복사해주세요.');
    }
  };

  const handleSaveReport = () => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - (Number(period) - 1));

    const report = {
      id: `report-${Date.now()}`,
      createdAt: new Date().toISOString(),
      period: {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
      },
      dataPacket,
      promptVersion: 'v1.0',
    };

    saveGeneratedReport(report);
    alert('✅ 리포트가 저장되었습니다!');
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            AI 분석을 위한 '재료'가 준비되었습니다
          </h1>
          <p className="text-gray-600">
            아래 1, 2번을 복사하여 당신의 ChatGPT에 붙여넣으세요.
          </p>
        </div>

        {/* 분석 기간 선택 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            분석 기간 선택
          </label>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            {[
              { value: '7', label: '최근 7일 (권장)' },
              { value: '14', label: '최근 14일' },
              { value: '30', label: '최근 30일' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPeriod(option.value as '7' | '14' | '30')}
                className={`min-h-[48px] px-4 py-3 rounded-lg font-medium transition active:scale-95 ${
                  period === option.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Box 1: 데이터 패킷 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              1번 재료: 나의 데이터 패킷
            </h2>
            <button
              onClick={() => copyToClipboard(dataPacket, 'data')}
              className={`min-h-[44px] px-5 py-2 rounded-lg font-medium transition active:scale-95 ${
                copiedData
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white'
              }`}
            >
              {copiedData ? '✅ 복사 완료!' : '데이터 복사'}
            </button>
          </div>
          <textarea
            value={dataPacket}
            readOnly
            className="w-full h-64 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm resize-none"
          />
        </div>

        {/* Box 2: 프롬프트 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              2번 재료: Cozac's Master Debug Prompt
            </h2>
            <button
              onClick={() => copyToClipboard(MASTER_PROMPT, 'prompt')}
              className={`min-h-[44px] px-5 py-2 rounded-lg font-medium transition active:scale-95 ${
                copiedPrompt
                  ? 'bg-green-600 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white'
              }`}
            >
              {copiedPrompt ? '✅ 복사 완료!' : '프롬프트 복사'}
            </button>
          </div>
          <textarea
            value={MASTER_PROMPT}
            readOnly
            className="w-full h-96 p-4 bg-gray-50 border border-gray-300 rounded-lg font-mono text-sm resize-none"
          />
        </div>

        {/* 가이드 */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-blue-900 mb-3">📋 복사 순서</h3>
          <ol className="space-y-2 text-blue-800">
            <li>1. [데이터 복사] 클릭</li>
            <li>2. ChatGPT 창을 열고 붙여넣기 (Ctrl+V)</li>
            <li>3. Shift+Enter로 줄바꿈</li>
            <li>4. [프롬프트 복사] 클릭하고 붙여넣기</li>
            <li>5. Enter (전송)!</li>
          </ol>
          <p className="mt-4 text-sm text-blue-700">
            💡 TIP: ChatGPT에 붙여넣은 후, 추가 질문도 가능합니다.
            <br />
            예: "특히 업무 스트레스를 줄이는 방법은?"
          </p>
        </div>

        {/* 리포트 저장 버튼 */}
        <button
          onClick={handleSaveReport}
          className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl active:scale-98 mb-4 min-h-[56px]"
        >
          이 리포트 저장하기
        </button>

        <p className="text-center text-sm text-gray-600">
          📌 리포트를 SNS에 공유하면 동기부여가 됩니다!
        </p>
      </div>
    </div>
  );
}

export default Report;
