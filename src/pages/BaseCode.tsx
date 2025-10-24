import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveBaseCode } from '../utils/localStorage';
import type { BaseCode, EnergyType, DecisionType, ActionType, ValueType, RecoveryType } from '../types';

interface Question {
  id: keyof Omit<BaseCode, 'version' | 'createdAt' | 'lastUpdatedAt'>;
  title: string;
  optionA: { label: string; description: string };
  optionB: { label: string; description: string };
  hint: string;
}

const questions: Question[] = [
  {
    id: 'energy',
    title: '당신은 주로 어디서 에너지를 얻나요?',
    optionA: {
      label: '외부 활동과 새로운 자극',
      description: '도전 지향',
    },
    optionB: {
      label: '내면의 집중과 안정적인 환경',
      description: '안정 지향',
    },
    hint: '스트레스를 받아도 바깥 활동으로 해소한다면 A',
  },
  {
    id: 'decision',
    title: '중요한 결정을 내릴 때 기준은 무엇인가요?',
    optionA: {
      label: '데이터와 논리, 객관적인 사실',
      description: '논리 중심',
    },
    optionB: {
      label: '관계와 감정, 조화로운 결과',
      description: '공감 중심',
    },
    hint: "'이게 합리적인가?'를 먼저 따진다면 A",
  },
  {
    id: 'action',
    title: '일을 처리하는 방식은 어떤가요?',
    optionA: {
      label: '즉각적인 실행과 유연한 적응',
      description: '실행 지향',
    },
    optionB: {
      label: '명확한 계획과 체계적인 절차',
      description: '계획 지향',
    },
    hint: '계획 없이 시작하면 불안하다면 B',
  },
  {
    id: 'value',
    title: '당신에게 더 중요한 가치는 무엇인가요?',
    optionA: {
      label: "'성장'과 '성취'",
      description: '성장 지향',
    },
    optionB: {
      label: "'안정'과 '균형'",
      description: '균형 지향',
    },
    hint: '도전이 없으면 지루하다면 A',
  },
  {
    id: 'recovery',
    title: '스트레스를 받을 때 어떻게 회복하나요?',
    optionA: {
      label: '활동적인 방식',
      description: '운동, 사람 만나기 등',
    },
    optionB: {
      label: '정적인 방식',
      description: '휴식, 혼자 있기, 명상 등',
    },
    hint: '혼자만의 시간이 필요하다면 B',
  },
];

function BaseCode() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{
    energy?: EnergyType;
    decision?: DecisionType;
    action?: ActionType;
    value?: ValueType;
    recovery?: RecoveryType;
  }>({});

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (answer: 'A' | 'B') => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: answer,
    };
    setAnswers(newAnswers);

    // 마지막 질문인 경우
    if (currentStep === questions.length - 1) {
      // Base Code 저장
      const baseCode: BaseCode = {
        version: '1.0',
        createdAt: new Date().toISOString(),
        energy: newAnswers.energy!,
        decision: newAnswers.decision!,
        action: newAnswers.action!,
        value: newAnswers.value!,
        recovery: newAnswers.recovery!,
      };

      saveBaseCode(baseCode);

      // Daily Log로 이동
      setTimeout(() => {
        alert('✅ Base Code가 저장되었습니다!');
        navigate('/daily-log');
      }, 300);
    } else {
      // 다음 질문으로
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Base Code 정의
          </h1>
          <p className="text-gray-600">
            당신의 삶을 디버깅하기 위해, '초기 설정값(Base Code)'을 먼저 정의합니다.
          </p>
        </div>

        {/* 진행률 */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              {currentStep + 1} / {questions.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 질문 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentQuestion.title}
          </h2>

          {/* 선택지 */}
          <div className="space-y-4">
            <button
              onClick={() => handleAnswer('A')}
              className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition duration-200 group"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-200 group-hover:bg-blue-500 text-gray-700 group-hover:text-white rounded-full flex items-center justify-center font-bold mr-4">
                  A
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">
                    {currentQuestion.optionA.label}
                  </p>
                  <p className="text-sm text-gray-600">
                    ({currentQuestion.optionA.description})
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleAnswer('B')}
              className="w-full text-left p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition duration-200 group"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-200 group-hover:bg-purple-500 text-gray-700 group-hover:text-white rounded-full flex items-center justify-center font-bold mr-4">
                  B
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-1">
                    {currentQuestion.optionB.label}
                  </p>
                  <p className="text-sm text-gray-600">
                    ({currentQuestion.optionB.description})
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* 힌트 */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>힌트:</strong> {currentQuestion.hint}
            </p>
          </div>
        </div>

        {/* 이전 버튼 */}
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            ← 이전 질문
          </button>
        )}

        {/* 안내 */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            💡 Base Code는 나중에 '설정'에서 수정할 수 있습니다. 3개월마다 재평가를 권장합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default BaseCode;
