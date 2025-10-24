import { loadAppData } from '../utils/localStorage';

function VersionFooter() {
  const appData = loadAppData();
  const version = appData.version;

  return (
    <div className="mt-12 pt-6 border-t border-gray-200 text-center">
      <p className="text-xs text-gray-500">
        Cozac's Life Debugger v{version}
      </p>
    </div>
  );
}

export default VersionFooter;
