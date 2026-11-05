/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { FragmentTab } from './types';
import { AndroidFrame } from './components/AndroidFrame';
import { Header } from './components/Header';
import { NavigationRail } from './components/NavigationRail';
import { LoginFragment } from './components/fragments/LoginFragment';
import { PerfilFragment } from './components/fragments/PerfilFragment';
import { FotosFragment } from './components/fragments/FotosFragment';
import { VideoFragment } from './components/fragments/VideoFragment';
import { WebFragment } from './components/fragments/WebFragment';
import { BotonesFragment } from './components/fragments/BotonesFragment';

function MainAppContent() {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [currentTab, setCurrentTab] = useState<FragmentTab>('perfil');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [tabHistory, setTabHistory] = useState<FragmentTab[]>(['perfil']);

  const handleTabChange = (newTab: FragmentTab) => {
    setCurrentTab(newTab);
    setTabHistory((prev) => [...prev, newTab]);
  };

  const handleAndroidBack = () => {
    if (tabHistory.length > 1) {
      const newHistory = [...tabHistory];
      newHistory.pop(); // remove current
      const prev = newHistory[newHistory.length - 1];
      setTabHistory(newHistory);
      setCurrentTab(prev);
      showToast(`Intent: onBackPressed() -> Volviendo a ${prev}`);
    } else {
      setCurrentTab('perfil');
      showToast('Intent: onBackPressed() -> En pantalla principal');
    }
  };

  const handleAndroidHome = () => {
    setCurrentTab('perfil');
    showToast('Intent: Activity HOME -> Mi Perfil');
  };

  if (!isAuthenticated) {
    return (
      <AndroidFrame
        isMobileFrame={isMobileFrame}
        onBackClick={() => showToast('En pantalla de inicio de sesión')}
        onHomeClick={() => showToast('Inicio de sesión requerido')}
      >
        <div className="relative">
          {/* Quick frame toggle banner */}
          <div className="absolute top-2 right-2 z-50">
            <button
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              className="p-1 rounded-md bg-white/80 backdrop-blur-xs text-[#006e1c] shadow-xs border border-[#efeded] text-[11px] flex items-center gap-1 px-2"
              title={isMobileFrame ? 'Ver en Pantalla Completa' : 'Ver en Marco Móvil'}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isMobileFrame ? 'fullscreen' : 'smartphone'}
              </span>
              <span className="hidden sm:inline">
                {isMobileFrame ? 'Fluido' : 'Móvil'}
              </span>
            </button>
          </div>
          <LoginFragment onLoginSuccess={() => setCurrentTab('perfil')} />
        </div>
      </AndroidFrame>
    );
  }

  return (
    <AndroidFrame
      isMobileFrame={isMobileFrame}
      onBackClick={handleAndroidBack}
      onHomeClick={handleAndroidHome}
    >
      <div className="flex flex-col min-h-full bg-[#fbf9f9]">
        {/* Top App Header */}
        <Header
          currentTab={currentTab}
          onTabChange={handleTabChange}
          isMobileFrame={isMobileFrame}
          onToggleMobileFrame={() => setIsMobileFrame((v) => !v)}
        />

        {/* Dual-pane layout: Navigation Rail + Fragment Content View */}
        <div className="flex flex-1 w-full relative">
          {/* Vertical Navigation Rail */}
          <NavigationRail
            currentTab={currentTab}
            onSelectTab={handleTabChange}
          />

          {/* Active Fragment Content Area */}
          <main className="flex-1 p-3 sm:p-5 overflow-y-auto android-scroll">
            {currentTab === 'perfil' && <PerfilFragment />}
            {currentTab === 'fotos' && <FotosFragment />}
            {currentTab === 'video' && <VideoFragment />}
            {currentTab === 'web' && <WebFragment />}
            {currentTab === 'botones' && <BotonesFragment />}
          </main>
        </div>
      </div>
    </AndroidFrame>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <MainAppContent />
      </ToastProvider>
    </AuthProvider>
  );
}
