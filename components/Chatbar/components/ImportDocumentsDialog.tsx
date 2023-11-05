import React, { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ImportDocumentsDialog: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation('import');
  const modalRef = useRef<HTMLDivElement>(null);
  const [importSource, setImportSource] = useState<'confluence' | 'pdf' | 'markdown'>('confluence');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      window.removeEventListener('mouseup', handleMouseUp);
      onClose();
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onClose]);

  if (!open) {
    return <></>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="fixed inset-0 z-10 overflow-hidden">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          />

          <div
            ref={modalRef}
            className="dark:border-netural-400 inline-block max-h-[400px] transform overflow-y-auto rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
            role="dialog"
          >
            <div className="text-lg pb-4 font-bold text-black dark:text-neutral-200">
              {t('Import Documents')}
            </div>

            <div>
              <select
                className="w-full cursor-pointer bg-transparent p-2 text-neutral-700 dark:text-neutral-200"
                value={importSource}
                onChange={(e) => setImportSource(e.target.value as 'confluence' | 'pdf' | 'markdown')}
              >
                <option value="confluence">Confluence</option>
                <option value="pdf">PDF</option>
                <option value="markdown">Markdown</option>
              </select>
            </div>

            {/* Import form based on the selected source */}
            {importSource === 'confluence' && (
              <div>
                <label>
                  Login:
                  <input
                    className="w-full cursor-pointer bg-transparent p-2 text-neutral-700 dark:text-neutral-200 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                    type="text"
                    value={login}
                  //onChange={(e) => setLogin(e.target.value)}
                  />
                </label>
                <br />
                <label>
                  Password:
                  <input
                    className="w-full cursor-pointer bg-transparent p-2 text-neutral-700 dark:text-neutral-200 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                    type="password"
                    value={password}
                  //onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                {/* Placeholder for Confluence import form */}
              </div>
            )}
            {importSource === 'pdf' && (
              <div>
                <label>
                  Attach PDF file:
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={(e) => {
                      // Handle PDF file selection logic here
                    }}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                  />
                </label>
              </div>
            )}
            {importSource === 'markdown' && (
              <div>
                <label>
                  Attach Markdown file:
                  <input
                    type="file"
                    accept=".md"
                    multiple
                    onChange={(e) => {
                      // Handle Markdown file selection logic here
                    }}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none"
                  />
                </label>
              </div>
            )}

            <button
              type="button"
              className="w-full px-4 py-2 mt-6 border rounded-lg shadow border-neutral-500 text-neutral-900 hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover-bg-neutral-300"
              onClick={() => {
                // Handle import logic here based on the import source, login, and password
                onClose();
              }}
            >
              {t('Import')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
