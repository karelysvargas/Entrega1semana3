import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { FragmentTab } from '../types';
import { APP_ASSETS } from '../data/recipesData';
import { SafeImage } from './SafeImage';
import { ApkGuideModal } from './ApkGuideModal';

interface HeaderProps {
  currentTab: FragmentTab;
  onTabChange: (tab: FragmentTab) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onOpenAuthModal?: () => void;
}

const TAB_TITLES: Record<FragmentTab, { title: string; subtitle: string }> = {
  perfil: { title: 'Perfil', subtitle: 'Hábitos y Nutrición Saludable' },
  fotos: { title: 'Fotos', subtitle: 'Práctica Universitaria Android • Fotos' },
  video: { title: 'Video', subtitle: 'Práctica Universitaria Android • Video' },
  web: { title: 'Vista Web', subtitle: 'Práctica Universitaria Android • Vista Web' },
  botones: { title: 'Botones y Controles', subtitle: 'Práctica Universitaria Android • Botones y Controles' },
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  isMobileFrame,
  onToggleMobileFrame,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  const [showApkGuide, setShowApkGuide] = useState(false);

  const screenInfo = TAB_TITLES[currentTab] || { title: 'Inicio', subtitle: 'Proyecto Móvil' };

  return (
    <>
      <header className="sticky top-0 w-full z-40 bg-[#fbf9f9]/95 backdrop-blur-md border-b border-[#efeded] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-4 flex items-center justify-between max-w-7xl mx-auto">
          {/* Left: Brand Identity matching screenshots */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 shrink-0 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-xs p-0.5 border border-[#efeded]">
              <SafeImage
                src={APP_ASSETS.logo}
                alt="Logotipo de Recetario de Desayunos Saludables"
                className="h-full w-full object-contain"
                fallbackIcon="eco"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[15px] font-bold text-[#006e1c] leading-tight truncate">
                  Recetario de Desayunos Saludables
                </span>
                <span className="text-[11px] font-medium text-[#3f4a3c] hidden sm:inline">
                  - Proyecto Móvil
                </span>
              </div>
              <span className="text-[11px] text-[#3f4a3c] truncate leading-tight">
                {screenInfo.subtitle}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* APK Generator Button */}
            <button
              onClick={() => setShowApkGuide(true)}
              title="Ver guía para generar el archivo APK"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#006e1c] hover:bg-[#286b33] transition-colors shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">android</span>
              <span>Generar APK</span>
            </button>

            {/* Viewport Frame Toggle */}
            <button
              onClick={onToggleMobileFrame}
              title={isMobileFrame ? 'Cambiar a Pantalla Completa' : 'Cambiar a Marco Android 390px'}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#006e1c] bg-[#94f990]/20 hover:bg-[#94f990]/40 transition-colors border border-[#006e1c]/10"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isMobileFrame ? 'fullscreen' : 'smartphone'}
              </span>
              <span className="hidden md:inline">
                {isMobileFrame ? 'Vista Fluida' : 'Marco Móvil'}
              </span>
            </button>

            {/* Profile Avatar & Menu Button */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(prev => !prev)}
                aria-label="Menú de usuario"
                className="w-9 h-9 rounded-full bg-[#006e1c] text-white flex items-center justify-center overflow-hidden hover:opacity-95 focus:ring-2 focus:ring-[#4caf50] transition-all shadow-sm"
                type="button"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-[20px]">person</span>
                )}
              </button>

              {/* User Dropdown Dialog */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl border border-[#efeded] p-3 z-50 text-[#1b1c1c] animate-fade-in">
                    <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#efeded]">
                      <div className="w-10 h-10 rounded-full bg-[#efeded] overflow-hidden shrink-0">
                        {user?.avatarUrl ? (
                          <img
                            src={user.avatarUrl}
                            alt={user.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#006e1c]">
                            <span className="material-symbols-outlined text-[22px]">person</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#1b1c1c] truncate">
                          {user?.name || 'Usuario Invitado'}
                        </span>
                        <span className="text-[11px] text-[#3f4a3c] truncate">
                          {user?.email || 'Sin sesión iniciada'}
                        </span>
                        <span className="text-[10px] font-mono text-[#006e1c] font-semibold">
                          {user?.code || '#GUEST'}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 py-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onTabChange('perfil');
                        }}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs hover:bg-[#f5f3f3] text-left transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#006e1c]">
                          account_circle
                        </span>
                        <span>Ver Perfil de Estudiante</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          setShowSecurityDialog(true);
                        }}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs hover:bg-[#f5f3f3] text-left transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#005faf]">
                          verified_user
                        </span>
                        <span>Seguridad y Cifrado</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          setShowApkGuide(true);
                        }}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs hover:bg-[#f5f3f3] text-left transition-colors text-[#006e1c] font-medium"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          android
                        </span>
                        <span>Generar APK</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-[#efeded]">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                          showToast('Sesión cerrada de forma segura');
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">logout</span>
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Security Info Dialog */}
      {showSecurityDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#efeded] flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#efeded]">
              <div className="flex items-center gap-2 text-[#006e1c]">
                <span className="material-symbols-outlined text-[24px]">shield</span>
                <h3 className="font-bold text-sm text-[#1b1c1c]">Seguridad de Datos Universitarios</h3>
              </div>
              <button
                onClick={() => setShowSecurityDialog(false)}
                className="text-[#6f7a6b] hover:text-[#1b1c1c] p-1 rounded-full"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2.5 text-xs text-[#3f4a3c] leading-relaxed">
              <div className="bg-[#f5f3f3] p-3 rounded-xl flex flex-col gap-1 border border-[#efeded]">
                <span className="font-semibold text-[#006e1c] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">key</span> Cifrado Criptográfico
                </span>
                <p>
                  Las contraseñas se almacenan mediante el algoritmo <strong>SHA-256</strong> con sal de protección usando la <strong>Web Crypto API nativa</strong>.
                </p>
              </div>

              <div className="bg-[#f5f3f3] p-3 rounded-xl flex flex-col gap-1 border border-[#efeded]">
                <span className="font-semibold text-[#005faf] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">lock</span> Prevención XSS y Sesión
                </span>
                <p>
                  Todos los campos de texto son sanitizados para evitar inyecciones de código malicioso. Las sesiones cuentan con caducidad programada y tokens aleatorios de 192 bits.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-[#6f7a6b]">
                <span>Usuario activo: {user?.email || 'N/A'}</span>
                <span className="text-[#006e1c] font-medium">Estado: Seguro</span>
              </div>
            </div>

            <button
              onClick={() => setShowSecurityDialog(false)}
              className="mt-2 w-full py-2.5 rounded-xl bg-[#006e1c] text-white text-xs font-medium hover:bg-[#286b33] transition-colors"
              type="button"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* APK Generation Guide Modal */}
      <ApkGuideModal
        isOpen={showApkGuide}
        onClose={() => setShowApkGuide(false)}
      />
    </>
  );
};
