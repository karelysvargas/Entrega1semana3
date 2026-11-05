import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { APP_ASSETS } from '../../data/recipesData';
import { SafeImage } from '../SafeImage';

interface LoginFragmentProps {
  onLoginSuccess: () => void;
}

export const LoginFragment: React.FC<LoginFragmentProps> = ({ onLoginSuccess }) => {
  const { login, loginAsGuest, register } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('alumno@universidad.edu');
  const [password, setPassword] = useState('desayunos2025');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Modals
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const result = await login(email, password, rememberMe);
      if (result.success) {
        showToast(`Intent hacia MainActivity iniciado para: ${email} (Recordar: ${rememberMe ? 'Sí' : 'No'})`);
        onLoginSuccess();
      } else {
        setErrorMessage(result.error || 'Credenciales inválidas');
        showToast(result.error || 'Error al iniciar sesión');
      }
    } catch {
      setErrorMessage('Ocurrió un error al procesar el inicio de sesión');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    showToast('Acceso como Invitado concedido (Intent: Mode_Guest)');
    onLoginSuccess();
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      showToast('Ingresa un correo universitario válido');
      return;
    }
    setForgotSuccess(true);
    showToast('Instrucciones seguras de recuperación enviadas a tu correo');
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSuccess(false);
    }, 2200);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    const res = await register(regName, regEmail, regPassword);
    if (res.success) {
      showToast('¡Registro completado de forma segura! Bienvenido al proyecto.');
      setShowRegisterModal(false);
      onLoginSuccess();
    } else {
      setRegError(res.error || 'Error al registrar usuario');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fbf9f9]">
      {/* Top Header replicating screenshot 1 */}
      <header className="fixed top-0 w-full z-30 bg-[#fbf9f9]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#efeded]">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg overflow-hidden bg-white p-0.5 border border-[#efeded]">
              <SafeImage
                src={APP_ASSETS.logo}
                alt="Recetario de Desayunos Saludables logo"
                className="h-full w-full object-contain"
                fallbackIcon="nutrition"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-[#006e1c] leading-tight">
                  Recetario de Desayunos Saludables
                </span>
                <span className="text-[11px] text-[#3f4a3c]">- Proyecto Móvil</span>
              </div>
              <span className="text-[11px] text-[#3f4a3c] leading-none">
                Práctica Universitaria Android • Inicio de Sesión
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#006e1c] flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </header>

      {/* Main Body Card Replicating Screen 1 */}
      <main className="flex-1 flex flex-col items-center justify-center pt-20 pb-8 px-4 w-full max-w-md mx-auto">
        <div className="w-full flex flex-col bg-white rounded-xl shadow-xs border border-[#efeded] p-4 sm:p-5 gap-4">
          {/* Activity Header */}
          <div className="flex flex-col items-center text-center gap-1 pb-1">
            <div className="flex items-center gap-2 py-1">
              <div className="w-10 h-10 rounded-full bg-[#4caf50] flex items-center justify-center text-[#003c0b] shadow-xs">
                <span className="material-symbols-outlined text-[24px]">nutrition</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-[#006e1c] leading-tight">
                  Recetario de Desayunos Saludables
                </span>
                <span className="text-[10px] text-[#286b33] font-bold tracking-wider uppercase leading-none">
                  NUTRICIÓN & BIENESTAR
                </span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#006e1c] mt-1">Iniciar Sesión</h2>
            <span className="text-xs text-[#3f4a3c]">
              Práctica Universitaria Android • Autenticación
            </span>
            <p className="text-xs text-[#3f4a3c] max-w-xs mt-1">
              Ingresa tus credenciales para acceder a tus recetas saludables y planes nutricionales.
            </p>
          </div>

          {/* Hero Banner Image */}
          <div className="w-full overflow-hidden rounded-xl shadow-xs border border-[#efeded] h-36">
            <SafeImage
              src={APP_ASSETS.loginHero}
              alt="Desayuno saludable con frutas y avena"
              className="w-full h-full object-cover"
              fallbackIcon="brunch_dining"
              fallbackText="Desayunos Saludables"
            />
          </div>

          {/* Login Form */}
          <form className="flex flex-col gap-3.5" onSubmit={handleLoginSubmit}>
            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-[#ffdad6] text-[#93000a] text-xs font-medium flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label
                className="text-xs text-[#006e1c] font-semibold flex items-center gap-1"
                htmlFor="input-email"
              >
                <span className="material-symbols-outlined text-[16px]">mail</span>
                Correo Electrónico
              </label>
              <div className="relative flex items-center bg-[#f5f3f3] rounded-lg border border-transparent focus-within:border-[#006e1c] focus-within:bg-white transition-all">
                <span className="material-symbols-outlined text-[#6f7a6b] text-[20px] ml-3 pointer-events-none">
                  alternate_email
                </span>
                <input
                  id="input-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alumno@universidad.edu"
                  required
                  className="w-full bg-transparent px-3 py-2.5 text-xs text-[#1b1c1c] placeholder:text-[#6f7a6b] focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label
                className="text-xs text-[#006e1c] font-semibold flex items-center gap-1"
                htmlFor="input-password"
              >
                <span className="material-symbols-outlined text-[16px]">lock</span>
                Contraseña
              </label>
              <div className="relative flex items-center bg-[#f5f3f3] rounded-lg border border-transparent focus-within:border-[#006e1c] focus-within:bg-white transition-all">
                <span className="material-symbols-outlined text-[#6f7a6b] text-[20px] ml-3 pointer-events-none">
                  key
                </span>
                <input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-transparent px-3 py-2.5 text-xs text-[#1b1c1c] placeholder:text-[#6f7a6b] focus:outline-none pr-10"
                />
                <button
                  type="button"
                  aria-label="Mostrar u ocultar contraseña"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-2.5 p-1 text-[#6f7a6b] hover:text-[#1b1c1c] transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between gap-1 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#006e1c] accent-[#006e1c] cursor-pointer"
                />
                <span className="text-xs text-[#1b1c1c]">Recordar sesión</span>
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs text-[#005faf] hover:underline focus:outline-none font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 bg-[#006e1c] hover:bg-[#286b33] text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-xs transition-colors active:opacity-90 mt-1"
            >
              <span className="material-symbols-outlined text-[20px]">login</span>
              <span>{isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}</span>
            </button>

            {/* Subtle Divider */}
            <div className="flex items-center gap-2 my-1">
              <div className="flex-1 h-[1px] bg-[#e3e2e2]"></div>
              <span className="text-[11px] text-[#3f4a3c]">o continúa con</span>
              <div className="flex-1 h-[1px] bg-[#e3e2e2]"></div>
            </div>

            {/* Secondary Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleGuest}
                className="h-10 bg-[#f5f3f3] hover:bg-[#d4e3ff] text-[#005faf] rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">no_accounts</span>
                <span>Invitado</span>
              </button>
              <button
                type="button"
                onClick={() => setShowRegisterModal(true)}
                className="h-10 bg-[#f5f3f3] hover:bg-[#efeded] text-[#3f4a3c] hover:text-[#1b1c1c] rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span>Registrarse</span>
              </button>
            </div>
          </form>

          {/* Academic Footer Info */}
          <div className="bg-[#f5f3f3] rounded-lg p-2.5 flex items-center justify-between text-[11px] text-[#3f4a3c]">
            <span className="flex items-center gap-1 text-[#006e1c] font-medium">
              <span className="material-symbols-outlined text-[16px]">verified</span> Práctica Android SDK
            </span>
            <span className="font-mono">v1.2.0 • SQLite/Room</span>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#efeded] flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#efeded]">
              <h3 className="font-bold text-sm text-[#1b1c1c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-[#005faf]">lock_reset</span>
                Recuperar Contraseña
              </h3>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="text-[#6f7a6b] hover:text-[#1b1c1c]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {forgotSuccess ? (
              <div className="p-3 bg-[#abf4ac]/40 rounded-xl text-xs text-[#003c0b] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006e1c]">check_circle</span>
                <span>Se ha enviado un correo con instrucciones de restablecimiento seguro.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="flex flex-col gap-3">
                <p className="text-xs text-[#3f4a3c]">
                  Ingresa tu correo institucional registrado para recibir un enlace de recuperación seguro con cifrado temporal.
                </p>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="alumno@universidad.edu"
                  required
                  className="px-3 py-2 bg-[#f5f3f3] rounded-lg text-xs border border-transparent focus:border-[#006e1c] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#006e1c] text-white rounded-lg text-xs font-medium hover:bg-[#286b33] transition-colors"
                >
                  Enviar enlace de verificación
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#efeded] flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#efeded]">
              <h3 className="font-bold text-sm text-[#1b1c1c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-[#006e1c]">person_add</span>
                Registro de Estudiante
              </h3>
              <button
                type="button"
                onClick={() => setShowRegisterModal(false)}
                className="text-[#6f7a6b] hover:text-[#1b1c1c]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-2.5">
              {regError && (
                <div className="p-2 rounded bg-[#ffdad6] text-[#93000a] text-xs font-medium">
                  {regError}
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#006e1c]">Nombre Completo</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Ej. Ana Lucía Morales"
                  required
                  className="px-3 py-2 bg-[#f5f3f3] rounded-lg text-xs border border-transparent focus:border-[#006e1c] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#006e1c]">Correo Institucional</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="estudiante@universidad.edu"
                  required
                  className="px-3 py-2 bg-[#f5f3f3] rounded-lg text-xs border border-transparent focus:border-[#006e1c] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#006e1c]">Contraseña Segura</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  className="px-3 py-2 bg-[#f5f3f3] rounded-lg text-xs border border-transparent focus:border-[#006e1c] focus:outline-none"
                />
              </div>

              <p className="text-[10px] text-[#6f7a6b] leading-tight">
                Tus datos se procesarán de forma segura en almacenamiento local cifrado cumpliendo los lineamientos del proyecto.
              </p>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#006e1c] text-white rounded-lg text-xs font-medium hover:bg-[#286b33] transition-colors mt-1"
              >
                Crear Cuenta Segura
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
