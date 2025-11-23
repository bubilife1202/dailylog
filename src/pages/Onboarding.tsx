import { useNavigate } from 'react-router-dom';
import { markFirstVisitComplete, saveAppData } from '../utils/localStorage';
import { createSampleAppData } from '../utils/sampleData';

function Onboarding() {
  const navigate = useNavigate();

  const handleStart = () => {
    markFirstVisitComplete();
    navigate('/base-code');
  };

  const handleTryDemo = () => {
    // 샘플 데이터 저장
    const sampleData = createSampleAppData();
    saveAppData(sampleData);

    // Daily Log로 이동 (샘플 데이터로 체험)
    navigate('/daily-log');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cozac's Life Debugger
          </h1>
          <p className="text-lg text-gray-600">
            인생을 3초만에 기록하고, AI로 분석하세요
          </p>
        </div>

        {/* 핵심 가치 제안 */}
        <div className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6">
          <h2 className="text-xl font-bold mb-3">💡 이렇게 사용해요</h2>
          <div className="space-y-2 text-sm">
            <p>1️⃣ <strong>매일 3초</strong> 투자 (에너지/활동/감정만)</p>
            <p>2️⃣ <strong>7일 모으면</strong> ChatGPT가 분석</p>
            <p>3️⃣ <strong>개선점</strong>을 구체적으로 제안받기</p>
          </div>
        </div>

        {/* 프로세스 설명 */}
        <div className="mb-8 space-y-4 text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <p className="font-semibold">나의 기준점 정의</p>
              <p className="text-sm text-gray-600">5가지 질문으로 내가 어떤 사람인지 정의</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <p className="font-semibold">하루 3초 기록</p>
              <p className="text-sm text-gray-600">매일 에너지, 활동, 감정만 체크</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div>
              <p className="font-semibold">AI 분석 받기</p>
              <p className="text-sm text-gray-600">ChatGPT로 내 삶의 패턴과 개선점 발견</p>
            </div>
          </div>
        </div>

        {/* 핵심 가치 카드 */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <p className="font-semibold text-sm text-gray-800">3초만에</p>
            <p className="text-xs text-gray-600">하루 기록</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <p className="font-semibold text-sm text-gray-800">100%</p>
            <p className="text-xs text-gray-600">프라이버시</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🤖</div>
            <p className="font-semibold text-sm text-gray-800">AI</p>
            <p className="text-xs text-gray-600">맞춤 분석</p>
          </div>
        </div>

        {/* 시작 버튼들 */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleTryDemo}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-5 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl active:scale-98 min-h-[60px] text-lg"
          >
            ✨ 체험하기 (샘플 데이터로 미리보기)
          </button>

          <button
            onClick={handleStart}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-5 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl active:scale-98 min-h-[60px] text-lg"
          >
            🚀 바로 시작하기
          </button>
        </div>

        {/* 프라이버시 안내 */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 text-center">
            🔒 <strong>완벽한 프라이버시:</strong> 서버에 데이터를 전송하지 않습니다.
            <br />
            모든 정보는 오직 이 브라우저에만 저장됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
