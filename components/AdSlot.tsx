'use client';

import { useEffect } from 'react';

interface AdSlotProps {
  id: string;
  slot?: string;
  format?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdSlot({
  id,
  slot = '1234567890',
  format = 'auto',
  className = '',
  style = {},
}: AdSlotProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className={`flex justify-center my-6 ${className}`} style={style}>
      <ins
        className="adsbygoogle ad-slot"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxx"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
