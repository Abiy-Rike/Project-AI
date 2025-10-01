'use client';

import { useState, useEffect } from 'react';
import AdSlot from '../AdSlot';
import { X } from 'lucide-react';

export default function MobileStickyAd() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isVisible || !isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-2xl border-t border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 z-50 p-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Close ad"
      >
        <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>
      <AdSlot
        id="mobile-sticky"
        slot="4567890123"
        format="auto"
        className="w-full m-0"
      />
    </div>
  );
}
