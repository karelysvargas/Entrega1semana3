import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { RECIPES_DATA } from '../../data/recipesData';
import { RecipeItem } from '../../types';
import { SafeImage } from '../SafeImage';

export const FotosFragment: React.FC = () => {
  const { showToast } = useToast();
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem>(RECIPES_DATA[0]);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const handleSelectRecipe = (recipe: RecipeItem) => {
    setSelectedRecipe(recipe);
    showToast(`ImageView onClick: ${recipe.title} cargado en el ImageView principal`);
  };

  return (
    <div className="flex flex-col w-full gap-4 max-w-3xl mx-auto pb-10">
      {/* Fragment Header matching Screenshot 3 */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#006e1c] text-[22px]">
            photo_library
          </span>
          <h2 className="text-lg font-semibold text-[#1b1c1c]">
            Galería Gastronómica
          </h2>
        </div>
        <p className="text-xs text-[#3f4a3c] mt-0.5">
          Demostración de ScrollView y eventos onClick en ImageView
        </p>
      </div>

      {/* Hero Detail Section */}
      <section className="bg-white rounded-xl shadow-xs border border-[#efeded] p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#3f4a3c] font-semibold uppercase tracking-wider">
            Detalle de la Imagen Seleccionada:
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#4caf50]/20 text-[#006e1c] text-xs font-semibold">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            Activo
          </span>
        </div>

        {/* Selected Image with overlay */}
        <div className="relative w-full h-48 sm:h-56 rounded-lg overflow-hidden bg-[#efeded] border border-[#efeded]">
          <SafeImage
            src={selectedRecipe.imageUrl}
            alt={selectedRecipe.imageAlt}
            className="w-full h-full object-cover transition-all duration-300"
            fallbackIcon="restaurant"
            fallbackText={selectedRecipe.title}
          />
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-8 flex items-center justify-between">
            <span className="text-xs text-white font-medium drop-shadow truncate pr-2">
              {selectedRecipe.badge}
            </span>
            <button
              type="button"
              onClick={() => setIsZoomOpen(true)}
              title="Ampliar imagen y ver receta completa"
              className="text-white hover:text-[#94f990] transition-colors p-1"
            >
              <span className="material-symbols-outlined text-[20px]">zoom_in</span>
            </button>
          </div>
        </div>

        {/* Text information */}
        <div className="flex flex-col gap-1 pt-1">
          <h3 className="text-base font-semibold text-[#1b1c1c]">
            {selectedRecipe.title}
          </h3>
          <p className="text-xs text-[#3f4a3c] leading-relaxed">
            {selectedRecipe.description}
          </p>
        </div>

        {/* 3 Metrics Pills */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="bg-[#f5f3f3] rounded-lg p-2 flex flex-col items-center text-center border border-[#efeded]/60">
            <span className="text-[11px] text-[#3f4a3c]">Calorías</span>
            <span className="text-xs text-[#006e1c] font-semibold">{selectedRecipe.kcal}</span>
          </div>
          <div className="bg-[#f5f3f3] rounded-lg p-2 flex flex-col items-center text-center border border-[#efeded]/60">
            <span className="text-[11px] text-[#3f4a3c]">Tiempo prep.</span>
            <span className="text-xs text-[#1b1c1c] font-medium">{selectedRecipe.time}</span>
          </div>
          <div className="bg-[#f5f3f3] rounded-lg p-2 flex flex-col items-center text-center border border-[#efeded]/60">
            <span className="text-[11px] text-[#3f4a3c]">Dificultad</span>
            <span className="text-xs text-[#286b33] font-medium">{selectedRecipe.difficulty}</span>
          </div>
        </div>
      </section>

      {/* Menu Options List matching Screenshot 3 */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-[#3f4a3c] font-semibold uppercase tracking-wider">
            Opciones del Menú (ScrollView)
          </span>
          <span className="text-xs text-[#3f4a3c]">
            {RECIPES_DATA.length} recetas registradas
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {RECIPES_DATA.map((recipe) => {
            const isSelected = selectedRecipe.id === recipe.id;
            return (
              <article
                key={recipe.id}
                onClick={() => handleSelectRecipe(recipe)}
                className={`cursor-pointer rounded-xl p-2.5 shadow-xs transition-all duration-200 flex items-center gap-3 border ${
                  isSelected
                    ? 'bg-[#4caf50]/10 border-[#4caf50] ring-1 ring-[#4caf50]/30'
                    : 'bg-white hover:bg-[#f5f3f3] border-[#efeded]'
                }`}
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#efeded] border border-[#efeded]">
                  <SafeImage
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                    fallbackIcon="restaurant"
                  />
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-semibold text-[#1b1c1c] truncate">
                      {recipe.title}
                    </h4>
                    {isSelected && (
                      <span className="items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#4caf50] text-[#003c0b] text-[10px] font-semibold shrink-0 inline-flex">
                        <span className="material-symbols-outlined text-[12px]">done</span>
                        Seleccionado
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#3f4a3c] line-clamp-1 mt-0.5">
                    {recipe.subtitle}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-[#006e1c] font-medium">{recipe.kcal}</span>
                    <span className="text-[#3f4a3c] text-[10px]">•</span>
                    <span className="text-[11px] text-[#3f4a3c]">{recipe.time}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Zoom / Full Recipe Dialog */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto android-scroll shadow-2xl border border-[#efeded] flex flex-col">
            <div className="relative h-56 w-full shrink-0">
              <SafeImage
                src={selectedRecipe.imageUrl}
                alt={selectedRecipe.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
              <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2.5 py-1 rounded-lg text-xs font-medium">
                {selectedRecipe.kcal} • {selectedRecipe.time}
              </div>
            </div>

            <div className="p-5 flex flex-col gap-3.5">
              <div>
                <h3 className="text-base font-bold text-[#1b1c1c]">{selectedRecipe.title}</h3>
                <p className="text-xs text-[#3f4a3c] mt-1 leading-relaxed">{selectedRecipe.description}</p>
              </div>

              {selectedRecipe.ingredients && (
                <div className="bg-[#f5f3f3] p-3 rounded-xl border border-[#efeded]">
                  <h4 className="text-xs font-bold text-[#006e1c] mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">grocery</span>
                    Ingredientes Recomendados
                  </h4>
                  <ul className="text-xs text-[#3f4a3c] space-y-1 list-disc list-inside">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i}>{ing}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedRecipe.steps && (
                <div className="bg-[#f5f3f3] p-3 rounded-xl border border-[#efeded]">
                  <h4 className="text-xs font-bold text-[#006e1c] mb-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    Paso a Paso
                  </h4>
                  <ol className="text-xs text-[#3f4a3c] space-y-1.5 list-decimal list-inside">
                    {selectedRecipe.steps.map((st, i) => (
                      <li key={i}>{st}</li>
                    ))}
                  </ol>
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="w-full py-2 bg-[#006e1c] text-white rounded-xl text-xs font-semibold hover:bg-[#286b33] transition-colors mt-1"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
