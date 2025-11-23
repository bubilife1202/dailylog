import { useState } from 'react';

interface HelpContent {
  title: string;
  sections: {
    question: string;
    answer: string;
  }[];
}

interface HelpButtonProps {
  content: HelpContent;
}

function HelpButton({ content }: HelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 도움말 버튼 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition duration-200 flex items-center justify-center text-2xl z-40"
        aria-label="도움말"
      >
        ?
      </button>

      {/* 모달 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* 모달 내용 */}
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 헤더 */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{content.title}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition"
                  aria-label="닫기"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 내용 */}
            <div className="p-6 space-y-6">
              {content.sections.map((section, index) => (
                <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                    <span className="text-blue-600 mr-2">Q.</span>
                    {section.question}
                  </h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line pl-6">
                    {section.answer}
                  </div>
                </div>
              ))}
            </div>

            {/* 푸터 */}
            <div className="sticky bottom-0 bg-gray-50 p-4 rounded-b-2xl border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HelpButton;
