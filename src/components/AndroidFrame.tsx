import React from 'react';

interface AndroidFrameProps {
  children: React.ReactNode;
  isMobileFrame: boolean;
  onBackClick?: () => void;
  onHomeClick?: () => void;
  currentTimeString?: string;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  isMobileFrame,
  onBackClick,
  onHomeClick,
  currentTimeString = '09:41',
}) => {
  if (!isMobileFrame) {
    return <div className="min-h-screen w-full flex flex-col">{children}</div>;
  }

  return (
    <div className="min-h-screen w-full bg-[#303031]/90 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Android Device Shell */}
      <div className="relative w-[390px] h-[844px] max-h-[96vh] bg-[#fbf9f9] rounded-[42px] shadow-2xl ring-[12px] ring-[#1b1c1c] overflow-hidden flex flex-col border-[4px] border-black select-none">
        {/* Android Status Bar */}
        <div className="h-8 bg-[#fbf9f9] w-full px-5 flex items-center justify-between text-xs font-semibold text-[#1b1c1c] shrink-0 z-50 border-b border-[#efeded]/40">
          <span className="font-mono text-[11px]">{currentTimeString}</span>
          {/* Camera Punchhole */}
          <div className="w-3.5 h-3.5 bg-black rounded-full shadow-inner"></div>
          <div className="flex items-center gap-1.5 text-[14px]">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_4_bar</span>
            <span className="material-symbols-outlined text-[14px]">wifi</span>
            <span className="material-symbols-outlined text-[14px]">battery_full</span>
          </div>
        </div>

        {/* Inner Content Area */}
        <div className="flex-1 w-full overflow-y-auto android-scroll relative flex flex-col">
          {children}
        </div>

        {/* Android 3-Button Navigation Bar */}
        <div className="h-10 bg-[#efeded] w-full flex items-center justify-around text-[#3f4a3c] shrink-0 border-t border-[#becab9]/40 z-50">
          {/* Back Triangle */}
          <button
            type="button"
            onClick={onBackClick}
            aria-label="Atrás"
            className="p-1 hover:text-[#006e1c] active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
          </button>
          {/* Home Circle */}
          <button
            type="button"
            onClick={onHomeClick}
            aria-label="Inicio"
            className="p-1 hover:text-[#006e1c] active:scale-90 transition-transform"
          >
            <div className="w-4 h-4 rounded-full border-2 border-current"></div>
          </button>
          {/* Recent Apps Square */}
          <button
            type="button"
            aria-label="Recientes"
            className="p-1 hover:text-[#006e1c] active:scale-90 transition-transform"
          >
            <div className="w-3.5 h-3.5 rounded-xs border-2 border-current"></div>
          </button>
        </div>
      </div>
    </div>
  );
};
