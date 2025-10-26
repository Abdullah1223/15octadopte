'use client';

import { useState, useEffect, useCallback } from 'react';

const PdfModal = ({ isOpen, setIsOpen,src }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  // Close modal on Escape key press
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setIsOpen(false);
  }, [setIsOpen]);

  // Detect when component mounts to add/remove event listeners
  useEffect(() => {
    setIsBrowser(true);
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !isBrowser) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
      role="dialog"
    >
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Modal container */}
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div 
          className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-auto overflow-hidden"
          onClick={e => e.stopPropagation()} // Prevent click propagation to backdrop
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Close PDF viewer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* PDF Content */}
          <div className="p-1 sm:p-4">
            <div className="aspect-[4/3] w-full">
              <iframe
                src={src}
                width="100%"
                height="100%"
                className="border-0"
                title="PDF Document Viewer"
                aria-label="PDF Document Viewer"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfModal;