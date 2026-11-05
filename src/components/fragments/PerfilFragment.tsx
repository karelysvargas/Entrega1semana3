import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const PerfilFragment: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editOccupation, setEditOccupation] = useState(user?.occupation || '');
  const [editMealPlan, setEditMealPlan] = useState(user?.mealPlan || '');
  const [editHealthGoal, setEditHealthGoal] = useState(user?.healthGoal || '');

  const handleOpenEdit = () => {
    setEditName(user?.name || '');
    setEditOccupation(user?.occupation || '');
    setEditMealPlan(user?.mealPlan || '');
    setEditHealthGoal(user?.healthGoal || '');
    setIsEditing(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      occupation: editOccupation,
      mealPlan: editMealPlan,
      healthGoal: editHealthGoal,
    });
    setIsEditing(false);
    showToast('Datos de usuario actualizados y guardados de forma segura');
  };

  return (
    <div className="flex flex-col w-full gap-4 max-w-3xl mx-auto pb-10">
      {/* Fragment Header matching Screenshot 2 */}
      <div className="flex flex-col gap-1 bg-[#f5f3f3] p-4 rounded-xl shadow-xs border border-[#efeded]">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006e1c] text-[22px]">
              account_circle
            </span>
            <h1 className="text-lg font-semibold text-[#1b1c1c] tracking-tight">
              Mi Perfil
            </h1>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#abf4ac] text-[#002107]">
            Miembro Activo
          </span>
        </div>
        <p className="text-xs text-[#3f4a3c]">
          Plan Bienestar Matutino • Miembro desde{' '}
          <span className="font-semibold text-[#1b1c1c]">
            {user?.memberSince || 'Marzo 2024'}
          </span>
        </p>
      </div>

      {/* Main Profile Card: Avatar + General Student Data */}
      <div className="flex flex-col md:flex-row gap-4 items-start bg-white p-4 rounded-xl shadow-xs border border-[#efeded]">
        {/* Avatar block */}
        <div className="flex flex-col items-center mx-auto md:mx-0 shrink-0">
          <div className="relative w-24 h-24 rounded-full p-1 bg-[#e9e8e7] shadow-inner">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#efeded]">
              {user?.avatarUrl ? (
                <img
                  alt="Foto de perfil de usuario"
                  className="w-full h-full object-cover rounded-full"
                  src={user.avatarUrl}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#006e1c]">
                  <span className="material-symbols-outlined text-[36px]">person</span>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-1 w-6 h-6 rounded-full bg-[#4caf50] text-[#003c0b] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[14px]">verified</span>
            </div>
          </div>
          <span className="mt-1.5 text-xs text-[#006e1c] font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">check_circle</span> Verificado
          </span>
        </div>

        {/* User Info Fields */}
        <div className="flex flex-col w-full gap-2 min-w-0">
          {/* Full Name Row */}
          <div className="bg-[#f5f3f3] px-3.5 py-2.5 rounded-lg flex items-center justify-between border border-[#efeded]/70">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-[#3f4a3c] block uppercase tracking-wider font-semibold">
                Nombre Completo
              </span>
              <span className="text-sm font-semibold text-[#1b1c1c] block truncate">
                {user?.name || 'Estudiante Universitario'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleOpenEdit}
              title="Editar nombre"
              className="p-1 rounded-md text-[#3f4a3c] hover:text-[#006e1c] hover:bg-white transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>

          {/* 2x2 Grid of details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-[#f5f3f3] px-3.5 py-2 rounded-lg border border-[#efeded]/70">
              <span className="text-[10px] text-[#3f4a3c] block uppercase tracking-wider font-semibold">
                Ocupación / Profesión
              </span>
              <span className="text-xs font-medium text-[#1b1c1c] block truncate">
                {user?.occupation || 'Diseñador Gráfico & Creativo'}
              </span>
            </div>

            <div className="bg-[#f5f3f3] px-3.5 py-2 rounded-lg border border-[#efeded]/70">
              <span className="text-[10px] text-[#3f4a3c] block uppercase tracking-wider font-semibold">
                Código de Usuario
              </span>
              <span className="text-xs font-mono font-bold text-[#006e1c] block truncate">
                {user?.code || '#HB-84920'}
              </span>
            </div>

            <div className="bg-[#f5f3f3] px-3.5 py-2 rounded-lg border border-[#efeded]/70">
              <span className="text-[10px] text-[#3f4a3c] block uppercase tracking-wider font-semibold">
                Plan de Alimentación
              </span>
              <span className="text-xs text-[#1b1c1c] block truncate">
                {user?.mealPlan || 'Estilo Saludable & Vitalidad'}
              </span>
            </div>

            <div className="bg-[#f5f3f3] px-3.5 py-2 rounded-lg border border-[#efeded]/70">
              <span className="text-[10px] text-[#3f4a3c] block uppercase tracking-wider font-semibold">
                Objetivo de Salud
              </span>
              <span className="text-xs text-[#1b1c1c] block truncate">
                {user?.healthGoal || 'Desayunos balanceados y energía diaria'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Android ScrollView Container */}
      <div className="flex flex-col bg-white rounded-xl shadow-xs border border-[#efeded] overflow-hidden">
        {/* Top bar of simulated ScrollView */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#f5f3f3] border-b border-[#efeded]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006e1c] text-[18px]">insights</span>
            <span className="text-xs font-semibold text-[#1b1c1c]">
              Hábitos y Preferencias Alimentarias
            </span>
          </div>
          <span className="text-[11px] text-[#006e1c] font-medium flex items-center gap-1 bg-[#94f990]/30 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[13px]">check</span> Actualizado hoy
          </span>
        </div>

        {/* Scrollable structured content matching Screenshot 2 */}
        <div className="p-4 flex flex-col gap-5 max-h-[380px] overflow-y-auto android-scroll">
          {/* Section 1: Hábitos y Rutinas Matutinas */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 pb-1">
              <span className="material-symbols-outlined text-[#006e1c] text-[20px]">history_edu</span>
              <h2 className="text-sm font-semibold text-[#006e1c]">Hábitos y Rutinas Matutinas</h2>
            </div>
            <div className="flex flex-col gap-2 pl-1">
              <div className="flex items-start gap-2 bg-[#f5f3f3] p-2.5 rounded-lg border border-[#efeded]/60">
                <span className="material-symbols-outlined text-[#006e1c] text-[18px] mt-0.5 shrink-0">
                  check_circle
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[#1b1c1c]">
                    Educación Secundaria Completa
                  </span>
                  <span className="text-[11px] text-[#3f4a3c]">
                    Bachiller Académico con Énfasis en Ciencias Naturales (2020)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-[#f5f3f3] p-2.5 rounded-lg border border-[#efeded]/60">
                <span className="material-symbols-outlined text-[#006e1c] text-[18px] mt-0.5 shrink-0">
                  check_circle
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[#1b1c1c]">
                    Grado en Tecnología de Software
                  </span>
                  <span className="text-[11px] text-[#3f4a3c]">
                    En curso (75% completado) • Facultad de Ingeniería
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-[#f5f3f3] p-2.5 rounded-lg border border-[#efeded]/60">
                <span className="material-symbols-outlined text-[#006e1c] text-[18px] mt-0.5 shrink-0">
                  verified
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[#1b1c1c]">
                    Cursos Certificados de Desarrollo
                  </span>
                  <span className="text-[11px] text-[#3f4a3c]">
                    Java SE 17, Fundamentos de Kotlin, Android Core SDK y Jetpack Essentials
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Mis Desayunos Favoritos */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 pb-1">
              <span className="material-symbols-outlined text-[#006e1c] text-[20px]">terminal</span>
              <h2 className="text-sm font-semibold text-[#006e1c]">Mis Desayunos Favoritos</h2>
            </div>
            <div className="flex flex-col gap-2 pl-1">
              <div className="flex flex-col bg-[#f5f3f3] p-2.5 rounded-lg border border-[#efeded]/60 gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1b1c1c]">
                    Proyecto "Healthy Breakfast"
                  </span>
                  <span className="text-[10px] bg-[#abf4ac] text-[#002107] px-1.5 py-0.5 rounded font-medium">
                    Práctica 3
                  </span>
                </div>
                <p className="text-[11px] text-[#3f4a3c] leading-relaxed">
                  Uso intensivo de FragmentTransaction, NavigationDrawer adaptativo, soporte multiventana y visualización de recursos nutricionales.
                </p>
              </div>

              <div className="flex flex-col bg-[#f5f3f3] p-2.5 rounded-lg border border-[#efeded]/60 gap-0.5">
                <span className="text-xs font-semibold text-[#1b1c1c]">
                  Calculadora Científica Básica
                </span>
                <p className="text-[11px] text-[#3f4a3c] leading-relaxed">
                  Implementada en Java puro para Android SDK con manejo de eventos onClickListener y diseño responsivo en RelativeLayout.
                </p>
              </div>

              <div className="flex flex-col bg-[#f5f3f3] p-2.5 rounded-lg border border-[#efeded]/60 gap-0.5">
                <span className="text-xs font-semibold text-[#1b1c1c]">
                  Sistema de Inventario Local
                </span>
                <p className="text-[11px] text-[#3f4a3c] leading-relaxed">
                  Persistencia de datos offline empleando SQLiteOpenHelper nativo con operaciones CRUD completas y adapters personalizados.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Habilidades Técnicas */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 pb-1">
              <span className="material-symbols-outlined text-[#006e1c] text-[20px]">tune</span>
              <h2 className="text-sm font-semibold text-[#006e1c]">Habilidades Técnicas</h2>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-1">
              {[
                'Android SDK',
                'Java',
                'Kotlin',
                'XML Layouts',
                'Material Components',
                'Git & GitHub',
                'Servicios REST (Retrofit/Volley)',
                'SQLite Local DB',
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-full text-[11px] bg-[#e9e8e7] text-[#1b1c1c] font-mono border border-[#efeded]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-[#f5f3f3] rounded-xl text-[#1b1c1c] shadow-xs border border-[#efeded]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#006e1c]/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[#006e1c] text-[22px]">
              local_fire_department
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#006e1c] font-bold uppercase tracking-wider">
              Resumen de Progreso Semanal
            </span>
            <p className="text-xs text-[#1b1c1c]">
              <span className="font-semibold text-[#006e1c]">5 de 7 días</span> desayunando saludable •{' '}
              <span className="font-semibold text-[#1b1c1c]">14 recetas</span> guardadas
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleOpenEdit}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#006e1c] text-white text-xs font-semibold shadow-xs hover:bg-[#286b33] transition-colors shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">settings</span>
          <span>Editar Información</span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#efeded] flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#efeded]">
              <h3 className="font-bold text-sm text-[#1b1c1c] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[20px] text-[#006e1c]">edit_note</span>
                Editar Información de Estudiante
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-[#6f7a6b] hover:text-[#1b1c1c]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#006e1c]">Nombre Completo</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="px-3 py-2 bg-[#f5f3f3] rounded-lg text-xs border border-transparent focus:border-[#006e1c] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#006e1c]">Ocupación / Profesión</label>
                <input
                  type="text"
                  value={editOccupation}
                  onChange={(e) => setEditOccupation(e.target.value)}
                  required
                  className="px-3 py-2 bg-[#f5f3f3] rounded-lg text-xs border border-transparent focus:border-[#006e1c] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#006e1c]">Plan de Alimentación</label>
                <input
                  type="text"
                  value={editMealPlan}
                  onChange={(e) => setEditMealPlan(e.target.value)}
                  required
                  className="px-3 py-2 bg-[#f5f3f3] rounded-lg text-xs border border-transparent focus:border-[#006e1c] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-semibold text-[#006e1c]">Objetivo de Salud</label>
                <textarea
                  rows={2}
                  value={editHealthGoal}
                  onChange={(e) => setEditHealthGoal(e.target.value)}
                  required
                  className="px-3 py-2 bg-[#f5f3f3] rounded-lg text-xs border border-transparent focus:border-[#006e1c] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1.5 rounded-lg text-xs text-[#3f4a3c] hover:bg-[#f5f3f3]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#006e1c] text-white text-xs font-semibold hover:bg-[#286b33]"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
