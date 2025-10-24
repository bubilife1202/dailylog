function VersionFooter() {
  // 항상 최신 버전 표시 (package.json과 동기화)
  const APP_VERSION = '1.2';

  return (
    <div className="mt-12 pt-6 border-t border-gray-200 text-center">
      <p className="text-xs text-gray-500">
        Cozac's Life Debugger v{APP_VERSION}
      </p>
    </div>
  );
}

export default VersionFooter;
