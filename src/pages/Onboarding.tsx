import { useNavigate } from 'react-router-dom';
import { markFirstVisitComplete } from '../utils/localStorage';

function Onboarding() {
  const navigate = useNavigate();

  const handleStart = () => {
    markFirstVisitComplete();
    navigate('/base-code');
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
            당신의 삶을 '디버깅'하세요
          </p>
        </div>

        {/* 프로세스 설명 */}
        <div className="mb-8 space-y-4 text-gray-700">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <div>
              <p className="font-semibold">Base Code 정의</p>
              <p className="text-sm text-gray-600">당신의 기본 설정값을 정의합니다</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <div>
              <p className="font-semibold">Daily Log 기록</p>
              <p className="text-sm text-gray-600">매일의 실제 행동을 데이터로 기록합니다</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <div>
              <p className="font-semibold">AI 리포트 생성</p>
              <p className="text-sm text-gray-600">GPT로 분석할 데이터를 자동 생성합니다</p>
            </div>
          </div>
        </div>

        {/* 핵심 가치 카드 */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">📊</div>
            <p className="font-semibold text-sm text-gray-800">데이터 기반</p>
            <p className="text-xs text-gray-600">자기 인식</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <p className="font-semibold text-sm text-gray-800">완벽한</p>
            <p className="text-xs text-gray-600">프라이버시</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🤖</div>
            <p className="font-semibold text-sm text-gray-800">고급</p>
            <p className="text-xs text-gray-600">프롬프트</p>
          </div>
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={handleStart}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-5 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl active:scale-98 min-h-[60px] text-lg"
        >
          Base Code 정의하러 가기
        </button>

        {/* 프라이버시 안내 */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800 text-center">
            ⚠️ <strong>중요:</strong> 이 앱은 서버에 데이터를 전송하지 않습니다.
            <br />
            모든 정보는 오직 '이 브라우저'에만 저장되므로, 정기적인 백업을 권장합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
