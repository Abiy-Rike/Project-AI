'use client';

import AdSlot from '../AdSlot';

export default function SidebarAd() {
  return (
    <div className="hidden lg:block sticky top-24">
      <AdSlot
        id="sidebar"
        slot="3456789012"
        format="vertical"
        className="w-full"
      />
    </div>
  );
}
