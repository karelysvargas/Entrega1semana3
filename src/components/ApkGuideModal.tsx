import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

interface ApkGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkGuideModal: React.FC<ApkGuideModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'capacitor' | 'cloud' | 'native'>('capacitor');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    showToast('¡Comando copiado al portapapeles!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const capacitorCommands = [
    {
      title: '1. Instalar dependencias de Capacitor en tu proyecto',
      cmd: 'npm install @capacitor/core @capacitor/cli @capacitor/android',
    },
    {
      title: '2. Inicializar la configuración de la app Android',
      cmd: 'npx cap init "Recetario Saludable" "com.universidad.recetariodesayunos" --web-dir dist',
    },
    {
      title: '3. Compilar la aplicación web y vincular la plataforma Android',
      cmd: 'npm run build\nnpx cap add android',
    },
    {
      title: '4. Sincronizar cambios y abrir el proyecto en Android Studio',
      cmd: 'npx cap sync\nnpx cap open android',
    },
    {
      title: '5. Generar el APK en Android Studio',
      cmd: '# En la barra superior de Android Studio:\n# 1. Haz clic en "Build"\n# 2. Selecciona "Build Bundle(s) / APK(s)" -> "Build APK(s)"\n# Tu archivo APK estará en:\n# android/app/build/outputs/apk/debug/app-debug.apk',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#efeded] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#006e1c] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">android</span>
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">Guía para Generar el APK</h2>
              <p className="text-xs text-white/80">
                Instala y ejecuta tu app en cualquier teléfono o emulador Android
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#efeded] bg-[#f5f3f3] p-1.5 gap-1 shrink-0">
          <button
            onClick={() => setActiveTab('capacitor')}
            className={`flex-1 py-2 px-2 text-xs font-medium rounded-lg transition-all text-center ${
              activeTab === 'capacitor'
                ? 'bg-white text-[#006e1c] shadow-xs font-semibold'
                : 'text-[#3f4a3c] hover:text-[#1b1c1c]'
            }`}
            type="button"
          >
            1. Con Capacitor (Recomendado)
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`flex-1 py-2 px-2 text-xs font-medium rounded-lg transition-all text-center ${
              activeTab === 'cloud'
                ? 'bg-white text-[#006e1c] shadow-xs font-semibold'
                : 'text-[#3f4a3c] hover:text-[#1b1c1c]'
            }`}
            type="button"
          >
            2. En la Nube (Sin Android Studio)
          </button>
          <button
            onClick={() => setActiveTab('native')}
            className={`flex-1 py-2 px-2 text-xs font-medium rounded-lg transition-all text-center ${
              activeTab === 'native'
                ? 'bg-white text-[#006e1c] shadow-xs font-semibold'
                : 'text-[#3f4a3c] hover:text-[#1b1c1c]'
            }`}
            type="button"
          >
            3. Android Studio Nativo
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-5 overflow-y-auto android-scroll space-y-4 flex-1 text-xs text-[#1b1c1c]">
          {activeTab === 'capacitor' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#e8f5e9] rounded-xl border border-[#c8e6c9] text-[#003c0b] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#006e1c] text-[20px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <p className="leading-relaxed">
                  <strong>Capacitor</strong> empaqueta todo el código de esta app web directamente en un proyecto Android nativo con soporte offline, cámara, almacenamiento y rendimiento nativo.
                </p>
              </div>

              <div className="space-y-3">
                {capacitorCommands.map((item, idx) => (
                  <div key={idx} className="bg-[#f5f3f3] p-3 rounded-xl border border-[#efeded]">
                    <div className="flex items-center justify-between pb-1.5">
                      <span className="font-semibold text-[#006e1c] text-[11px]">{item.title}</span>
                      <button
                        onClick={() => copyToClipboard(item.cmd, idx)}
                        className="flex items-center gap-1 text-[11px] font-medium text-[#005faf] hover:text-[#003567] bg-white px-2 py-0.5 rounded border border-[#efeded]"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {copiedIndex === idx ? 'done' : 'content_copy'}
                        </span>
                        <span>{copiedIndex === idx ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                    <pre className="font-mono text-[11px] text-[#303031] bg-[#e9e8e7] p-2.5 rounded-lg overflow-x-auto whitespace-pre-wrap select-all">
                      {item.cmd}
                    </pre>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#fff8e1] rounded-xl border border-[#ffe082] text-[#5d4037] text-[11px] leading-relaxed">
                <span className="font-bold flex items-center gap-1 text-[#f57f17] mb-1">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  ¿Dónde encuentro el APK listo para instalar?
                </span>
                Una vez compilado en Android Studio, el archivo se guardará en tu carpeta del proyecto:{' '}
                <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[10px]">
                  android/app/build/outputs/apk/debug/app-debug.apk
                </code>
                . Puedes pasarlo por WhatsApp, Telegram, Google Drive o cable USB a tu teléfono Android.
              </div>
            </div>
          )}

          {activeTab === 'cloud' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#e3f2fd] rounded-xl border border-[#bbdefb] text-[#003567] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#005faf] text-[20px] shrink-0 mt-0.5">
                  cloud_download
                </span>
                <p className="leading-relaxed">
                  Puedes generar un APK directamente desde internet sin tener instalado Android Studio en tu computadora usando <strong>PWABuilder</strong> o <strong>Bubblewrap</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <div className="bg-[#f5f3f3] p-3 rounded-xl border border-[#efeded] space-y-2">
                  <span className="font-semibold text-[#006e1c] block">
                    Paso 1: Copiar la URL de la aplicación
                  </span>
                  <p className="text-[#3f4a3c]">
                    Usa la URL de producción o compartida de esta aplicación:
                  </p>
                  <div className="flex items-center justify-between bg-[#e9e8e7] p-2 rounded-lg font-mono text-[11px]">
                    <span className="truncate pr-2">https://ais-dev-jlhl6mrba7e4l66sc5mctz-719327285580.us-east1.run.app</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          'https://ais-dev-jlhl6mrba7e4l66sc5mctz-719327285580.us-east1.run.app',
                          99
                        )
                      }
                      className="text-[#005faf] hover:text-[#003567] shrink-0 font-medium text-[11px] flex items-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                      <span>Copiar</span>
                    </button>
                  </div>
                </div>

                <div className="bg-[#f5f3f3] p-3 rounded-xl border border-[#efeded] space-y-1.5">
                  <span className="font-semibold text-[#006e1c] block">
                    Paso 2: Ingresar a PWABuilder
                  </span>
                  <p className="text-[#3f4a3c] leading-relaxed">
                    1. Entra a <strong>https://www.pwabuilder.com</strong> en tu navegador.<br />
                    2. Pega la URL de tu aplicación y haz clic en <em>"Start"</em>.<br />
                    3. Haz clic en <em>"Package for Stores"</em> y selecciona <strong>Android</strong>.<br />
                    4. Descarga el paquete generado: contiene tu archivo <strong>.apk</strong> listo para instalar en tu celular.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'native' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#f5f3f3] rounded-xl border border-[#efeded] space-y-2">
                <span className="font-semibold text-[#006e1c] block">
                  Si estás trabajando con código nativo en Android Studio (Kotlin / Java):
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-[#3f4a3c] pl-1 leading-relaxed">
                  <li>Abre tu proyecto en <strong>Android Studio</strong>.</li>
                  <li>Espera que Gradle termine de sincronizar (barra inferior).</li>
                  <li>Ve al menú principal: <strong>Build &gt; Build Bundle(s) / APK(s) &gt; Build APK(s)</strong>.</li>
                  <li>
                    Aparecerá una notificación emergente en la esquina inferior derecha:{' '}
                    <em>"APK(s) generated successfully"</em>.
                  </li>
                  <li>
                    Haz clic en <strong>locate</strong> dentro de la notificación para abrir la carpeta donde está el archivo{' '}
                    <code className="font-mono bg-white px-1 py-0.5 rounded text-[10px]">app-debug.apk</code>.
                  </li>
                </ol>
              </div>

              <div className="bg-[#e8f5e9] p-3 rounded-xl border border-[#c8e6c9] text-[#003c0b]">
                <span className="font-bold block mb-1">Para generar un APK firmado de entrega final (Release):</span>
                <p className="leading-relaxed">
                  Menú <strong>Build &gt; Generate Signed Bundle / APK...</strong> &gt; Selecciona <em>APK</em> &gt; Crea una llave de firma (Keystore) o usa una existente &gt; Selecciona <em>release</em> y presiona <em>Finish</em>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-[#f5f3f3] border-t border-[#efeded] flex items-center justify-between shrink-0">
          <span className="text-[11px] text-[#3f4a3c] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#006e1c]">verified</span>
            Compatible con Android 8.0 a 15+
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#006e1c] hover:bg-[#286b33] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            type="button"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
