import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '../../context/ToastContext';
import { APP_ASSETS } from '../../data/recipesData';
import { SafeImage } from '../SafeImage';

export const VideoFragment: React.FC = () => {
  const { showToast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(135); // 02:15 default
  const totalDurationSec = 340; // 05:40 default
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= totalDurationSec) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const togglePlayback = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    showToast(next ? 'VideoView.start(): Reproduciendo receta' : 'VideoView.pause(): Reproducción pausada');
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const newSec = Math.floor(pct * totalDurationSec);
    setCurrentTimeSec(newSec);
    showToast(`MediaController: Salto a ${formatTime(newSec)}`);
  };

  const handleRewind10 = () => {
    setCurrentTimeSec((prev) => Math.max(0, prev - 10));
    showToast('MediaController: Rebobinar 10 segundos');
  };

  const handleForward10 = () => {
    setCurrentTimeSec((prev) => Math.min(totalDurationSec, prev + 10));
    showToast('MediaController: Adelantar 10 segundos');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
      showToast('Modo pantalla completa activado');
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
      showToast('Pantalla completa desactivada');
    }
  };

  const progressPct = (currentTimeSec / totalDurationSec) * 100;

  return (
    <div className="flex flex-col w-full gap-4 max-w-3xl mx-auto pb-10">
      {/* Fragment Header matching Screenshot 4 */}
      <div className="flex flex-col bg-[#efeded] p-4 rounded-xl shadow-xs border border-[#efeded]">
        <div className="flex items-center gap-1.5 text-[#006e1c] mb-1">
          <span className="material-symbols-outlined text-[20px] fill-icon">
            ondemand_video
          </span>
          <span className="text-xs uppercase tracking-wider font-semibold">
            LIFECYCLE: ONRESUME()
          </span>
        </div>
        <h1 className="text-xl font-semibold text-[#1b1c1c]">Recetas</h1>
        <p className="text-xs text-[#3f4a3c] mt-0.5">
          Uso de componente VideoView y MediaController en Android
        </p>
      </div>

      {/* Simulated VideoView Container with MediaController */}
      <div
        ref={videoContainerRef}
        className="relative w-full bg-[#303031] rounded-xl overflow-hidden shadow-md flex flex-col aspect-video select-none group border border-[#efeded]"
        id="videoViewContainer"
      >
        {/* Thumbnail / Video simulation */}
        <SafeImage
          src={APP_ASSETS.videoPoster}
          alt="Video preparación de batido proteico"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying ? 'brightness-105' : 'opacity-90'
          }`}
          fallbackIcon="smart_display"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#303031]/90 via-[#303031]/20 to-transparent pointer-events-none" />

        {/* Central Floating Play/Pause Button */}
        <button
          type="button"
          aria-label={isPlaying ? 'Pausar video' : 'Reproducir video instructivo'}
          onClick={togglePlayback}
          className={`absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/85 text-[#1b1c1c] flex items-center justify-center backdrop-blur-xs shadow-md hover:bg-white hover:scale-105 active:scale-95 transition-all ${
            isPlaying ? 'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto' : 'opacity-100'
          }`}
        >
          <span className="material-symbols-outlined text-[32px] text-[#006e1c] fill-icon">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        {/* Status Badge at Top Left */}
        <div className="absolute top-3 left-3 bg-[#303031]/80 text-[#f2f0f0] px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-xs font-mono shadow-xs backdrop-blur-xs border border-white/10">
          <span
            className={`w-2 h-2 rounded-full ${
              isPlaying ? 'bg-[#94f990] animate-pulse' : 'bg-[#ba1a1a]'
            }`}
          />
          <span>
            {isPlaying ? 'Reproduciendo videoView...' : 'R.raw.receta_batido_matutino'}
          </span>
        </div>

        {/* Native MediaController Simulation Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-[#303031]/95 text-[#f2f0f0] p-3 flex flex-col gap-1.5 z-10">
          {/* Progress / SeekBar */}
          <div className="flex items-center gap-2.5 w-full">
            <span className="text-[11px] text-[#e3e2e2] font-mono shrink-0">
              {formatTime(currentTimeSec)}
            </span>
            <div
              onClick={handleSeek}
              className="relative flex-1 h-1.5 bg-[#e3e2e2]/30 rounded-full cursor-pointer flex items-center group/track"
            >
              <div
                className="h-full bg-[#4caf50] rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
              <div
                className="w-3.5 h-3.5 bg-white rounded-full shadow-xs -ml-1.5 ring-2 ring-[#4caf50] transition-transform hover:scale-125"
                style={{ left: `${progressPct}%`, position: 'absolute' }}
              />
            </div>
            <span className="text-[11px] text-[#e3e2e2] font-mono shrink-0">
              {formatTime(totalDurationSec)}
            </span>
          </div>

          {/* Lower Control Bar */}
          <div className="flex items-center justify-between pt-0.5">
            <div className="flex items-center gap-2">
              {/* Play/Pause */}
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                className="text-white hover:text-[#94f990] transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              {/* Rewind 10s */}
              <button
                type="button"
                onClick={handleRewind10}
                title="Retroceder 10 segundos"
                className="text-white hover:text-[#94f990] transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[18px]">replay_10</span>
              </button>

              {/* Forward 10s */}
              <button
                type="button"
                onClick={handleForward10}
                title="Adelantar 10 segundos"
                className="text-white hover:text-[#94f990] transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[18px]">forward_10</span>
              </button>

              {/* Volume toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsMuted(!isMuted);
                  showToast(isMuted ? 'Volumen activado' : 'Silenciado');
                }}
                className="text-white hover:text-[#94f990] transition-colors p-1 ml-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isMuted ? 'volume_off' : 'volume_up'}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#e3e2e2] mr-1 bg-white/10 px-1.5 py-0.5 rounded">
                HD 720p
              </span>
              <button
                type="button"
                onClick={toggleFullscreen}
                title="Pantalla completa"
                className="text-white hover:text-[#94f990] transition-colors p-1"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Details Card matching Screenshot 4 */}
      <div className="bg-[#f5f3f3] p-4 rounded-xl flex flex-col gap-2.5 shadow-xs border border-[#efeded]">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#abf4ac] text-[#002107] text-xs font-semibold mb-1">
              <span className="material-symbols-outlined text-[14px]">nutrition</span>
              Desayuno Rápido
            </span>
            <h2 className="text-base font-semibold text-[#1b1c1c] leading-tight mt-1">
              Preparación de Batido Proteico y Energético Matutino
            </h2>
          </div>
          <div className="flex items-center shrink-0 self-start">
            <span className="px-2.5 py-1 rounded bg-[#d4e3ff] text-[#001c3a] text-xs font-mono font-medium">
              android:id="@+id/videoView"
            </span>
          </div>
        </div>

        {/* Metadata Pill Row */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs text-[#3f4a3c]">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px] text-[#006e1c]">schedule</span>
            <span>
              Duración: <strong>5 min 40 seg</strong>
            </span>
          </div>
          <span className="text-[#becab9]">•</span>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px] text-[#005faf]">folder_open</span>
            <span>
              Formato: <strong>MP4 / H.264 (Local raw/assets)</strong>
            </span>
          </div>
        </div>

        {/* General Description */}
        <p className="text-xs text-[#3f4a3c] mt-1 leading-relaxed">
          Tutorial paso a paso diseñado para estudiantes universitarios. Explica cómo combinar frutas, semillas de chía y leche vegetal para un desayuno rápido y nutritivo antes de clases matutinas.
        </p>
      </div>

      {/* Steps List Card */}
      <div className="bg-[#efeded] p-4 rounded-xl flex flex-col gap-2.5 shadow-xs border border-[#efeded]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[#1b1c1c]">
            <span className="material-symbols-outlined text-[#006e1c] text-[22px]">
              format_list_numbered
            </span>
            <h3 className="text-sm font-semibold">Instrucciones resumidas</h3>
          </div>
          <span className="text-xs text-[#3f4a3c]">Paso a paso de la práctica</span>
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-xs border border-[#efeded]">
            <div className="w-7 h-7 rounded-full bg-[#4caf50] text-[#003c0b] text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
              1
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#1b1c1c]">
                Carga de ingredientes sólidos
              </span>
              <p className="text-xs text-[#3f4a3c] mt-0.5">
                Colocar plátano congelado y frutos rojos en el vaso de la licuadora.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-xs border border-[#efeded]">
            <div className="w-7 h-7 rounded-full bg-[#4caf50] text-[#003c0b] text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
              2
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#1b1c1c]">
                Adición de base líquida
              </span>
              <p className="text-xs text-[#3f4a3c] mt-0.5">
                Agregar 250ml de leche o bebida vegetal (almendras, avena o soya).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-xs border border-[#efeded]">
            <div className="w-7 h-7 rounded-full bg-[#4caf50] text-[#003c0b] text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
              3
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#1b1c1c]">
                Procesado y consistencia
              </span>
              <p className="text-xs text-[#3f4a3c] mt-0.5">
                Licuar a velocidad media-alta durante 45 segundos hasta obtener textura homogénea.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Notes Footer */}
      <div className="bg-[#f5f3f3] p-4 rounded-xl flex flex-col gap-1.5 shadow-xs border border-[#efeded]">
        <div className="flex items-center gap-1.5 text-[#006e1c]">
          <span className="material-symbols-outlined text-[20px]">info</span>
          <span className="text-xs font-semibold text-[#1b1c1c]">
            Notas Técnicas de Implementación
          </span>
        </div>
        <p className="text-xs text-[#3f4a3c] leading-relaxed">
          El layout implementa un ScrollView vertical continuo encapsulando el contenedor VideoView junto con las tarjetas descriptivas de ingredientes e instrucciones paso a paso, garantizando navegación fluida en dispositivos con pantallas compactas.
        </p>
      </div>
    </div>
  );
};
