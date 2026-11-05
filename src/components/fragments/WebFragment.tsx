import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { APP_ASSETS } from '../../data/recipesData';
import { SafeImage } from '../SafeImage';

export const WebFragment: React.FC = () => {
  const { showToast } = useToast();
  const [url, setUrl] = useState('https://nutricion-saludable.edu/desayunos');
  const [isLoading, setIsLoading] = useState(false);
  const [progressWidth, setProgressWidth] = useState('100%');
  const [statusMessage, setStatusMessage] = useState('Página cargada con éxito (HTTP 200 OK)');
  const [selectedTopic, setSelectedTopic] = useState<'guia' | 'superalimentos' | 'macros'>('guia');

  const handleLoadPage = () => {
    setIsLoading(true);
    setProgressWidth('30%');
    setStatusMessage('Conectando con servidor remoto...');
    showToast('WebView.loadUrl(): Conectando con servidor seguro...');

    setTimeout(() => {
      setProgressWidth('75%');
    }, 250);

    setTimeout(() => {
      setProgressWidth('100%');
      setIsLoading(false);
      setStatusMessage('Página cargada con éxito (HTTP 200 OK)');
      showToast('WebViewClient.onPageFinished() completado');
    }, 600);
  };

  const handleClearUrl = () => {
    setUrl('');
  };

  const handleSelectBookmark = (bookmarkUrl: string, topic: 'guia' | 'superalimentos' | 'macros') => {
    setUrl(bookmarkUrl);
    setSelectedTopic(topic);
    handleLoadPage();
  };

  return (
    <div className="flex flex-col w-full gap-4 max-w-3xl mx-auto pb-10">
      {/* Fragment Header matching Screenshot 5 */}
      <div className="flex flex-col bg-[#f5f3f3] p-4 rounded-xl shadow-xs border border-[#efeded]">
        <div className="flex items-center gap-1.5 text-[#006e1c]">
          <span className="material-symbols-outlined text-[20px]">public</span>
          <span className="text-xs font-bold uppercase tracking-wider">
            ANDROID STUDIO LAB • VISTA WEB
          </span>
        </div>
        <h1 className="text-lg font-semibold text-[#1b1c1c] mt-1">
          Vista Web - Navegador Integrado
        </h1>
        <p className="text-xs text-[#3f4a3c] mt-0.5">
          Implementación de android.webkit.WebView y EditText
        </p>
      </div>

      {/* URL Bar & Controls */}
      <div className="flex flex-col bg-white p-3.5 rounded-xl shadow-xs border border-[#efeded] gap-2.5">
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          {/* Outlined EditText */}
          <div className="flex-1 flex items-center bg-[#f5f3f3] px-3 py-2 rounded-lg border border-[#efeded] focus-within:border-[#006e1c] focus-within:bg-white transition-all">
            <span className="material-symbols-outlined text-[#6f7a6b] text-[20px] mr-2 select-none">
              link
            </span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLoadPage()}
              placeholder="https://..."
              spellCheck="false"
              className="w-full bg-transparent text-xs text-[#1b1c1c] outline-none border-none placeholder:text-[#becab9]"
            />
            {url && (
              <button
                type="button"
                onClick={handleClearUrl}
                title="Borrar URL"
                className="p-1 rounded-full text-[#6f7a6b] hover:text-[#1b1c1c] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            )}
          </div>

          {/* Android Standard Green Button */}
          <button
            type="button"
            onClick={handleLoadPage}
            disabled={isLoading}
            className="h-10 px-4 bg-[#4caf50] hover:bg-[#006e1c] text-white text-xs font-medium rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 active:opacity-90"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                isLoading ? 'animate-spin' : ''
              }`}
            >
              refresh
            </span>
            <span>{isLoading ? 'Cargando...' : 'Cargar Página'}</span>
          </button>
        </div>

        {/* Quick Presets / Bookmarks */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[11px] text-[#6f7a6b]">Marcadores:</span>
          <button
            type="button"
            onClick={() => handleSelectBookmark('https://nutricion-saludable.edu/desayunos', 'guia')}
            className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
              selectedTopic === 'guia'
                ? 'bg-[#abf4ac] text-[#002107] border-[#abf4ac]'
                : 'bg-[#f5f3f3] text-[#3f4a3c] border-[#efeded] hover:bg-[#efeded]'
            }`}
          >
            Guía de Desayunos
          </button>
          <button
            type="button"
            onClick={() => handleSelectBookmark('https://nutricion-saludable.edu/superalimentos', 'superalimentos')}
            className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
              selectedTopic === 'superalimentos'
                ? 'bg-[#abf4ac] text-[#002107] border-[#abf4ac]'
                : 'bg-[#f5f3f3] text-[#3f4a3c] border-[#efeded] hover:bg-[#efeded]'
            }`}
          >
            Superalimentos
          </button>
          <button
            type="button"
            onClick={() => handleSelectBookmark('https://nutricion-saludable.edu/regla-plato', 'macros')}
            className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
              selectedTopic === 'macros'
                ? 'bg-[#abf4ac] text-[#002107] border-[#abf4ac]'
                : 'bg-[#f5f3f3] text-[#3f4a3c] border-[#efeded] hover:bg-[#efeded]'
            }`}
          >
            Regla del Plato
          </button>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-[#efeded] text-xs">
          <div className="flex items-center gap-1.5">
            <span
              className={`material-symbols-outlined text-[16px] ${
                isLoading ? 'text-[#005faf] animate-spin' : 'text-[#006e1c]'
              }`}
            >
              {isLoading ? 'hourglass_top' : 'check_circle'}
            </span>
            <span
              className={`font-medium text-[11px] ${
                isLoading ? 'text-[#005faf]' : 'text-[#006e1c]'
              }`}
            >
              {statusMessage}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#3f4a3c] text-[11px]">
            <span className="material-symbols-outlined text-[14px]">security</span>
            <span>SSL Activo • TLS 1.3</span>
          </div>
        </div>
      </div>

      {/* Android WebView Simulation Window */}
      <div className="flex flex-col bg-white rounded-xl shadow-xs border border-[#efeded] overflow-hidden">
        {/* Browser Title Bar */}
        <div className="bg-[#e9e8e7] px-4 py-2 flex items-center justify-between border-b border-[#efeded]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#005faf] shrink-0">
              language
            </span>
            <span className="text-xs font-semibold text-[#1b1c1c] truncate">
              Portal de Nutrición y Salud Estudiantil
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#90d792]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#a5c8ff]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#78dc77]"></span>
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className="h-0.5 w-full bg-[#efeded]">
          <div
            className="h-full bg-[#006e1c] transition-all duration-300"
            style={{ width: progressWidth }}
          />
        </div>

        {/* WebView Native Content View */}
        <div
          className={`p-4 sm:p-5 flex flex-col gap-4 bg-white transition-opacity duration-200 ${
            isLoading ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {/* Article Header & Category */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="bg-[#d4e3ff] text-[#001c3a] text-[10px] px-2 py-0.5 rounded-md font-semibold">
                Campus Nutrición
              </span>
              <span className="text-[11px] text-[#3f4a3c]">
                Actualizado hoy • 5 min de lectura
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-[#1b1c1c] tracking-tight mt-1">
              Guía de Desayunos Saludables para Estudiantes Universitarios
            </h2>
          </div>

          {/* Illustrated Banner */}
          <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden shadow-xs border border-[#efeded]">
            <SafeImage
              src={APP_ASSETS.webBanner}
              alt="Mesa de desayuno saludable para estudiantes"
              className="w-full h-full object-cover"
              fallbackIcon="menu_book"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs text-white font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Especial Medicina Preventiva Estudiantil
              </span>
            </div>
          </div>

          {/* Paragraph 1 */}
          <p className="text-xs text-[#1b1c1c] leading-relaxed">
            Una nutrición adecuada durante las horas de estudio incrementa la concentración y evita la fatiga mental durante los exámenes.
          </p>

          {/* Highlight Bento Card: Regla del Plato */}
          <div className="bg-[#f5f3f3] p-3.5 rounded-xl flex flex-col gap-1.5 shadow-xs border border-[#efeded]">
            <div className="flex items-center gap-2 text-[#006e1c]">
              <span className="material-symbols-outlined text-[20px]">pie_chart</span>
              <span className="text-xs font-semibold text-[#1b1c1c]">Regla del Plato Matutino</span>
            </div>
            <p className="text-xs text-[#3f4a3c]">
              Estructura equilibrada recomendada por el Servicio de Bienestar Universitario:
            </p>
            <div className="grid grid-cols-3 gap-2 mt-1 text-center">
              <div className="bg-[#abf4ac]/40 p-2 rounded-lg flex flex-col items-center border border-[#abf4ac]/40">
                <span className="text-sm font-bold text-[#002107]">50%</span>
                <span className="text-[10px] text-[#07521d] font-medium leading-tight">
                  Frutas & Vegetales
                </span>
              </div>
              <div className="bg-[#d4e3ff]/50 p-2 rounded-lg flex flex-col items-center border border-[#d4e3ff]/50">
                <span className="text-sm font-bold text-[#001c3a]">25%</span>
                <span className="text-[10px] text-[#004786] font-medium leading-tight">
                  Proteínas Limpias
                </span>
              </div>
              <div className="bg-[#94f990]/40 p-2 rounded-lg flex flex-col items-center border border-[#94f990]/40">
                <span className="text-sm font-bold text-[#002204]">25%</span>
                <span className="text-[10px] text-[#005313] font-medium leading-tight">
                  Granos Enteros
                </span>
              </div>
            </div>
          </div>

          {/* 3 Key Tips List */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-[#1b1c1c] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#005faf] text-[18px]">
                tips_and_updates
              </span>
              3 Consejos Clave para el Rendimiento Académico:
            </span>

            <div className="flex flex-col gap-2 mt-0.5">
              <div className="flex items-start gap-2.5 p-2.5 bg-[#efeded] rounded-lg">
                <div className="w-5 h-5 rounded-full bg-[#006e1c] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#1b1c1c]">
                    No saltarse el desayuno antes de las 9:00 AM
                  </span>
                  <span className="text-[11px] text-[#3f4a3c] mt-0.5">
                    Activa el metabolismo circadiano y regula los picos de cortisol matutinos.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-[#efeded] rounded-lg">
                <div className="w-5 h-5 rounded-full bg-[#006e1c] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#1b1c1c]">
                    Mantener hidratación continua con agua fresca
                  </span>
                  <span className="text-[11px] text-[#3f4a3c] mt-0.5">
                    Un vaso con limón en ayunas favorece la absorción de electrolitos antes de clase.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 bg-[#efeded] rounded-lg">
                <div className="w-5 h-5 rounded-full bg-[#006e1c] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#1b1c1c]">
                    Limitar azúcares refinados para evitar somnolencia
                  </span>
                  <span className="text-[11px] text-[#3f4a3c] mt-0.5">
                    Evita los bajones de glucosa tipo 'sugar crash' durante las clases teóricas.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Academic Footer */}
      <div className="flex flex-col gap-1 p-3.5 bg-[#f5f3f3] rounded-xl text-[#3f4a3c] shadow-xs border border-[#efeded]">
        <div className="flex items-center justify-between text-xs font-medium border-b border-[#efeded] pb-1.5">
          <span className="font-mono text-[#006e1c]">android.webkit.WebView</span>
          <span>Estado: Desplazamiento Suave Habilitado</span>
        </div>
        <p className="text-[11px] leading-relaxed text-[#3f4a3c]/80 pt-1">
          Contenedor optimizado para pantalla completa con WebChromeClient y WebViewClient interactivos. El componente emula la navegación interna de la aplicación universitaria.
        </p>
      </div>
    </div>
  );
};
