import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';

export const BotonesFragment: React.FC = () => {
  const { showToast } = useToast();

  // State for CheckBoxes
  const [chk1, setChk1] = useState(true);
  const [chk2, setChk2] = useState(true);
  const [chk3, setChk3] = useState(false);

  // State for RadioGroup
  const [activityLevel, setActivityLevel] = useState('Ligera');

  // State for Switches
  const [switchNotif, setSwitchNotif] = useState(true);
  const [switchData, setSwitchData] = useState(false);

  // State for LogCat output
  const [logText, setLogText] = useState(
    'Última interacción: Botón Normal presionado - CheckBox 1 activo - Switch 1 activado'
  );
  const [clickCount, setClickCount] = useState(1);

  const updateLog = (action: string) => {
    const c1 = chk1 ? 'activo' : 'inactivo';
    const s1 = switchNotif ? 'activado' : 'desactivado';
    const newLog = `[#${clickCount + 1}] ${action} - CheckBox 1 ${c1} - Switch 1 ${s1}`;
    setLogText(newLog);
    setClickCount((c) => c + 1);
  };

  const handleNormalButtonClick = () => {
    updateLog('Botón Normal presionado (Acción Primaria)');
    showToast('Button onClickListener: Botón Normal (Acción Primaria) ejecutado');
  };

  const handleFavButtonClick = () => {
    updateLog('Botón Favorito presionado');
    showToast('Button onClickListener: Guardado en lista de recetas favoritas');
  };

  const handleChk1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setChk1(checked);
    const text = `CheckBox 1 (chkBreakfastReminder) ${checked ? 'marcado' : 'desmarcado'}`;
    updateLog(text);
    showToast(text);
  };

  const handleChk2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setChk2(checked);
    const text = `CheckBox 2 (chkLactoseFree) ${checked ? 'marcado' : 'desmarcado'}`;
    updateLog(text);
    showToast(text);
  };

  const handleChk3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setChk3(checked);
    const text = `CheckBox 3 (chkOfflineMode) ${checked ? 'marcado' : 'desmarcado'}`;
    updateLog(text);
    showToast(text);
  };

  const handleRadioChange = (level: string) => {
    setActivityLevel(level);
    const text = `RadioGroup onCheckedChanged: ${level}`;
    updateLog(text);
    showToast(text);
  };

  const handleSwitchNotifChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSwitchNotif(checked);
    const text = `Switch (switchNotifications) ${checked ? 'activado' : 'desactivado'}`;
    updateLog(text);
    showToast(text);
  };

  const handleSwitchDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSwitchData(checked);
    const text = `Switch (switchDataSaver) ${checked ? 'activado' : 'desactivado'}`;
    updateLog(text);
    showToast(text);
  };

  return (
    <div className="flex flex-col w-full gap-4 max-w-3xl mx-auto pb-14">
      {/* Fragment Header matching Screenshot 6 */}
      <div className="bg-[#efeded] rounded-xl p-4 flex flex-col gap-1 shadow-xs border border-[#efeded]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006e1c] text-[22px]">
            smart_button
          </span>
          <h1 className="text-xl font-semibold text-[#1b1c1c]">
            Botones y Controles
          </h1>
        </div>
        <p className="text-xs text-[#3f4a3c]">
          Práctica Universitaria Android • Componentes Interactivos y Eventos
        </p>
      </div>

      {/* Interactive LogCat Terminal / TextView txtResultado */}
      <div className="bg-[#303031] rounded-xl p-4 text-[#f2f0f0] flex flex-col gap-2 shadow-xs border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#abf4ac]">
              terminal
            </span>
            <span className="text-xs font-mono uppercase tracking-wide text-[#abf4ac]">
              LogCat Emulator • TextView txtResultado
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#e3e2e2] px-2 py-0.5 rounded bg-white/15">
            tag: UI_EVENT
          </span>
        </div>
        <p
          id="log-output"
          className="text-xs font-mono text-[#90d792] bg-white/5 p-3 rounded-lg border border-white/10 break-all leading-relaxed"
        >
          {logText}
        </p>
      </div>

      {/* Section 1: Standard Buttons */}
      <section className="bg-white rounded-xl p-4 flex flex-col gap-3 shadow-xs border border-[#efeded]">
        <div className="flex items-center justify-between pb-1 border-b border-[#efeded]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006e1c] text-[20px]">
              touch_app
            </span>
            <h2 className="text-sm font-semibold text-[#1b1c1c]">
              1. Botones Estándar (Button / AppCompatButton)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#3f4a3c] hidden sm:inline">
            layout_width="match_parent"
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Botón Normal */}
          <button
            id="btn-normal"
            type="button"
            onClick={handleNormalButtonClick}
            className="w-full h-10 px-4 rounded-xl bg-[#4caf50] hover:bg-[#006e1c] text-white text-xs font-medium flex items-center justify-center gap-1.5 active:scale-[0.99] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Botón Normal (Acción Primaria)</span>
          </button>

          {/* Botón con Icono (Favorito) */}
          <button
            id="btn-fav"
            type="button"
            onClick={handleFavButtonClick}
            className="w-full h-10 px-4 rounded-xl bg-[#54a0fe] hover:bg-[#005faf] text-white text-xs font-medium flex items-center justify-center gap-1.5 active:scale-[0.99] transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] fill-icon">favorite</span>
            <span>Botón con Icono (Favorito)</span>
          </button>

          {/* Botón Deshabilitado */}
          <button
            disabled
            type="button"
            className="w-full h-10 px-4 rounded-xl bg-[#e9e8e7] text-[#6f7a6b] text-xs font-medium flex items-center justify-center gap-1.5 cursor-not-allowed opacity-80 border border-[#efeded]"
          >
            <span className="material-symbols-outlined text-[18px]">block</span>
            <span>Botón Deshabilitado (android:enabled="false")</span>
          </button>
        </div>
      </section>

      {/* Section 2: CheckBoxes */}
      <section className="bg-white rounded-xl p-4 flex flex-col gap-3 shadow-xs border border-[#efeded]">
        <div className="flex items-center justify-between pb-1 border-b border-[#efeded]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006e1c] text-[20px]">
              checklist
            </span>
            <h2 className="text-sm font-semibold text-[#1b1c1c]">
              2. Controles de Selección Múltiple (CheckBox)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#3f4a3c] hidden sm:inline">
            setOnCheckedChangeListener
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Checkbox 1 */}
          <label className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f5f3f3] hover:bg-[#efeded] cursor-pointer select-none transition-colors border border-[#efeded]/60">
            <input
              id="chk-1"
              type="checkbox"
              checked={chk1}
              onChange={handleChk1Change}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded bg-[#e3e2e2] peer-checked:bg-[#4caf50] flex items-center justify-center transition-colors shrink-0">
              <span className="material-symbols-outlined text-white text-[16px] hidden peer-checked:block">
                check
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#1b1c1c]">
                Recordar desayuno diario a las 7:30 AM
              </span>
              <span className="text-[10px] font-mono text-[#3f4a3c]">
                android:id="@+id/chkBreakfastReminder"
              </span>
            </div>
          </label>

          {/* Checkbox 2 */}
          <label className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f5f3f3] hover:bg-[#efeded] cursor-pointer select-none transition-colors border border-[#efeded]/60">
            <input
              id="chk-2"
              type="checkbox"
              checked={chk2}
              onChange={handleChk2Change}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded bg-[#e3e2e2] peer-checked:bg-[#4caf50] flex items-center justify-center transition-colors shrink-0">
              <span className="material-symbols-outlined text-white text-[16px] hidden peer-checked:block">
                check
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#1b1c1c]">Incluir recetas sin lactosa</span>
              <span className="text-[10px] font-mono text-[#3f4a3c]">
                android:id="@+id/chkLactoseFree"
              </span>
            </div>
          </label>

          {/* Checkbox 3 */}
          <label className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f5f3f3] hover:bg-[#efeded] cursor-pointer select-none transition-colors border border-[#efeded]/60">
            <input
              id="chk-3"
              type="checkbox"
              checked={chk3}
              onChange={handleChk3Change}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded bg-[#e3e2e2] peer-checked:bg-[#4caf50] flex items-center justify-center transition-colors shrink-0">
              <span className="material-symbols-outlined text-white text-[16px] hidden peer-checked:block">
                check
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#1b1c1c]">
                Modo offline para recetas descargadas
              </span>
              <span className="text-[10px] font-mono text-[#3f4a3c]">
                android:id="@+id/chkOfflineMode"
              </span>
            </div>
          </label>
        </div>
      </section>

      {/* Section 3: RadioGroup / RadioButton */}
      <section className="bg-white rounded-xl p-4 flex flex-col gap-3 shadow-xs border border-[#efeded]">
        <div className="flex flex-col gap-0.5 pb-1 border-b border-[#efeded]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006e1c] text-[20px]">
              radio_button_checked
            </span>
            <h2 className="text-sm font-semibold text-[#1b1c1c]">
              3. Selección Única (RadioGroup / RadioButton)
            </h2>
          </div>
          <p className="text-xs text-[#3f4a3c]">Nivel de actividad matutina:</p>
        </div>

        <div className="flex flex-col gap-2" role="radiogroup" aria-label="Nivel de actividad matutina">
          {/* Radio 1 */}
          <label className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f5f3f3] hover:bg-[#efeded] cursor-pointer select-none transition-colors border border-[#efeded]/60">
            <input
              id="rad-1"
              name="activity_level"
              type="radio"
              checked={activityLevel === 'Ligera'}
              onChange={() => handleRadioChange('Ligera')}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded-full bg-[#e3e2e2] peer-checked:bg-[#006e1c] flex items-center justify-center transition-colors shrink-0">
              <div className="w-2 h-2 rounded-full bg-white hidden peer-checked:block"></div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#1b1c1c]">
                Ligera (Estudio y clases teóricas)
              </span>
              <span className="text-[10px] font-mono text-[#3f4a3c]">
                android:id="@+id/rbLightActivity"
              </span>
            </div>
          </label>

          {/* Radio 2 */}
          <label className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f5f3f3] hover:bg-[#efeded] cursor-pointer select-none transition-colors border border-[#efeded]/60">
            <input
              id="rad-2"
              name="activity_level"
              type="radio"
              checked={activityLevel === 'Moderada'}
              onChange={() => handleRadioChange('Moderada')}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded-full bg-[#e3e2e2] peer-checked:bg-[#006e1c] flex items-center justify-center transition-colors shrink-0">
              <div className="w-2 h-2 rounded-full bg-white hidden peer-checked:block"></div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#1b1c1c]">
                Moderada (Caminata al campus / laboratorio)
              </span>
              <span className="text-[10px] font-mono text-[#3f4a3c]">
                android:id="@+id/rbModerateActivity"
              </span>
            </div>
          </label>

          {/* Radio 3 */}
          <label className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f5f3f3] hover:bg-[#efeded] cursor-pointer select-none transition-colors border border-[#efeded]/60">
            <input
              id="rad-3"
              name="activity_level"
              type="radio"
              checked={activityLevel === 'Intensa'}
              onChange={() => handleRadioChange('Intensa')}
              className="sr-only peer"
            />
            <div className="w-5 h-5 rounded-full bg-[#e3e2e2] peer-checked:bg-[#006e1c] flex items-center justify-center transition-colors shrink-0">
              <div className="w-2 h-2 rounded-full bg-white hidden peer-checked:block"></div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-[#1b1c1c]">
                Intensa (Deporte universitario matutino)
              </span>
              <span className="text-[10px] font-mono text-[#3f4a3c]">
                android:id="@+id/rbIntenseActivity"
              </span>
            </div>
          </label>
        </div>
      </section>

      {/* Section 4: Switches */}
      <section className="bg-white rounded-xl p-4 flex flex-col gap-3 shadow-xs border border-[#efeded]">
        <div className="flex items-center justify-between pb-1 border-b border-[#efeded]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006e1c] text-[20px]">
              toggle_on
            </span>
            <h2 className="text-sm font-semibold text-[#1b1c1c]">
              4. Interruptores de Estado (Switch / SwitchCompat)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#3f4a3c] hidden sm:inline">
            OnCheckedChangeListener
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Switch 1 */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f5f3f3] border border-[#efeded]/60">
            <div className="flex flex-col min-w-0 pr-3">
              <span className="text-xs font-medium text-[#1b1c1c]">
                Notificaciones de hábitos saludables
              </span>
              <span className="text-[10px] font-mono text-[#3f4a3c]">
                android:id="@+id/switchNotifications"
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                id="switch-1"
                type="checkbox"
                checked={switchNotif}
                onChange={handleSwitchNotifChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#e3e2e2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4caf50]"></div>
            </label>
          </div>

          {/* Switch 2 */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f5f3f3] border border-[#efeded]/60">
            <div className="flex flex-col min-w-0 pr-3">
              <span className="text-xs font-medium text-[#1b1c1c]">
                Modo ahorro de datos móviles
              </span>
              <span className="text-[10px] font-mono text-[#3f4a3c]">
                android:id="@+id/switchDataSaver"
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                id="switch-2"
                type="checkbox"
                checked={switchData}
                onChange={handleSwitchDataChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#e3e2e2] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4caf50]"></div>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};
