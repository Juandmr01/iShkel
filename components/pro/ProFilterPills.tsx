// components/pro/ProFilterPills.tsx
'use client';

import { useState } from 'react';

type Pill = { id: string; label: string };

export default function ProFilterPills({ pills }: { pills: Pill[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setActiveId(id);
    const target = document.getElementById(id);
    if (!target) return;

    const offset = 100; // navbar clearance
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-[900px] mx-auto"
    >
      {pills.map((pill) => {
        const isActive = activeId === pill.id;
        return (
          <button
            key={pill.id}
            onClick={() => handleClick(pill.id)}
            className={`px-5 sm:px-6 h-10 sm:h-11 rounded-full text-[12px] sm:text-[13px] font-neue uppercase tracking-[0.14em] transition-all duration-300 ease-out active:scale-[0.97] ${
              isActive
                ? 'bg-[#191817] text-white'
                : 'bg-[#f2f2f2] text-[#191817] hover:bg-[#e5e5e5]'
            }`}
          >
            {pill.label}
          </button>
        );
      })}
    </div>
  );
}