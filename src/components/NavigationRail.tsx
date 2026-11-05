import React from 'react';
import { FragmentTab } from '../types';

interface NavigationRailProps {
  currentTab: FragmentTab;
  onSelectTab: (tab: FragmentTab) => void;
}

interface NavItem {
  id: FragmentTab;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'perfil', label: 'Perfil', icon: 'account_circle' },
  { id: 'fotos', label: 'Fotos', icon: 'photo_library' },
  { id: 'video', label: 'Video', icon: 'smart_display' },
  { id: 'web', label: 'Web', icon: 'language' },
  { id: 'botones', label: 'Botones', icon: 'smart_button' },
];

export const NavigationRail: React.FC<NavigationRailProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav
      className="w-[76px] sm:w-[96px] bg-[#f5f3f3] flex flex-col items-center py-4 gap-2 shrink-0 border-r border-[#efeded] select-none"
      aria-label="Navegación de secciones Android"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center w-[64px] sm:w-[84px] min-h-[52px] py-1.5 px-1 rounded-xl transition-all ${
              isActive
                ? 'bg-[#4caf50] text-[#003c0b] font-medium shadow-xs ring-1 ring-[#006e1c]/10'
                : 'text-[#3f4a3c] hover:text-[#1b1c1c] hover:bg-[#efeded]'
            }`}
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[22px] ${
                isActive ? 'fill-icon' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[11px] font-medium mt-0.5 tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
