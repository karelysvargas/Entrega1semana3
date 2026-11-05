import { RecipeItem } from '../types';

export const APP_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6_nisy_8-rxRQxjJ9epIVYafnAowZodDk6GFYEz5D5iZrJUbNKAkP0BitArVGiAFPuP5C4d6TLbN9r3lyyINjqNO_nSzHOQbeVYjaZrCQslxfZTp4Gf8wLHOirnIoFKgRHt4pAUXTYTB9NxqFfYzqtc4u5ajALjSEVePT3PLppEUSpCEl6wHS_Mr1Ql0u7O3u7ZbE3u4VltZ4n6nNHRZU8Z_4YsG-ujS9epcsQulS8ghtjoN8LkmaIQ',
  avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1WRuzEfKKdHLkFhg1EjUAA74XSjB8KmTiZc6P_VcxizJAYpzDqjdHvKkonxkfMdBYdFyjK_JedE_LnWJD5ngApB2CDxCKUdLFud34JLVnbgb9pejnjgwPz2_nH7bQYjTrIZ8gGYViv5T-hDSv2M1nmHDJabUeQB522PpGQdZFdlbYu4ITLR-7omlYfwsfg1XopOpL4DnmTi0QUJl1ZDCAehg277rBknaAAdSx1oVKzx2uYG8JT45xM2qJU',
  loginHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbxsGGs0-FnVmftjT9KFLiH9bFkoP2EO4T9MWJ_YqtbPmdUWaB52NeD73M1Loz-MPLmAVL2XqxHuXibBUMIjkhlpL52khvx9gwkvUSOnb3txhMPOE_iqWpTKoIeI2JiDHPZ-Jc1UHKWKPTUG0yVp2SPpaAxHpR-cAPMeyeyD46_khdWLSnFDS7szpy0YLKqTYAM8KBeGIQUdx0cc79FO97T_f7CfqxZ9N2qAD9XM_uyU8WdlCMHk7DQQ',
  videoPoster: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsm8DL8BHrlDkuwHgSFT9tTycfPXNPU4Yw2SDwzscTgrStt9xB3lS9iccKAwtKHpQYxxk_cC3UM8zv3p-03hgP3f3GkVeYLbNWeHvB5pednuEV13SitIBnGhXD27xWHyJGq8K1xWm49YDFPTCV6T5N2QcsCEFB3UET6c8uhWLIXQ6ljmvrjUdtko9KtjAE5Tvl0jPSi2zjacvV62Zsvaia7bplFJqSxqAfveUC0qZQaGqNtRVsBZ4W8Q',
  webBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3qJkH19SOJAhp8PSI_xOfnxi0yRZQa6H9leWJA3LDQzYEWusstdgKYAG7cg6vq5-TKkvdZW5f_EXwRqVmcsprjVVfIFMIwcF33SeDAo72nP74MslGGUS_UbxjTjzkS6cbaMYd_tCUjoq_HnGzLDp0A9I3axzWinFQORUiDMEpBOKXJQr70lYsulZA-fYeZks8E3gnaOYYxadHstEV2YJRImwB8bVD6zd9RbolS-HvTU5Lbz9zow3wkg',
};

export const RECIPES_DATA: RecipeItem[] = [
  {
    id: 1,
    title: 'Tostada con Aguacate y Huevo Poché',
    subtitle: 'Pan integral con puré de aguacate y semillas',
    badge: 'Foto Seleccionada: Tostada con Aguacate y Huevo',
    description:
      'Desayuno balanceado que aporta ácidos grasos saludables, proteínas completas de alto valor biológico y fibra vegetal. Ideal para iniciar la jornada de estudio con energía sostenida.',
    kcal: '280 kcal',
    time: '10 min',
    difficulty: 'Fácil',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCFRvyKNAyHIBe5X4IHlWUqOTNsDSDjzUERJ6zTdF8EDp6fc3nT-Ps8hSpTzoAjSR9UR2cUjFhlQz9acfnCT13ziG8eI3dr--sfR-5mNDI1sA_iKAm6ZxE8uAtllLy0fS0E9L6NDVgmrP5e5ApY2ltQFWYymOnqv4Ozqy_QJkcIQvemQYGc8vVElvrXNvBH10a3d9Oe_9V7OX5DkEaw-DxeTQOQCL1TUKD_DpwYnXo_bhMRUNv7z7rFHA',
    imageAlt: 'Tostada de pan de masa madre con aguacate machacado, huevo poché y semillas',
    ingredients: [
      '2 rebanadas de pan integral o masa madre',
      '1/2 aguacate maduro machacado con limón',
      '1 huevo poché o pasado por agua',
      'Semillas de chía y sésamo tostado',
      'Pimienta negra recién molida y sal marina',
    ],
    steps: [
      'Tostar las rebanadas de pan integral hasta que estén crujientes.',
      'Extender el aguacate sazonado con unas gotas de limón y sal marina.',
      'Cocinar el huevo poché durante 3-4 minutos en agua a punto de ebullición.',
      'Montar el huevo con cuidado sobre la tostada y espolvorear semillas y pimienta.',
    ],
  },
  {
    id: 2,
    title: 'Bowl de Avena con Frutos Rojos',
    subtitle: 'Avena cocida en leche descremada con arándanos y fresas frescas',
    badge: 'Foto Seleccionada: Bowl de Avena con Frutos Rojos',
    description:
      'Avena integral cocida a fuego lento, rica en betaglucanos para el control glucémico, combinada con fresas, arándanos antioxidantes y un toque de canela ceilan.',
    kcal: '320 kcal',
    time: '8 min',
    difficulty: 'Muy Fácil',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfoDnbtyC70Tdf76YK0HEESIAYJ6_k73wPbzjITV4ZYD2MoeBAOKgHhfNVt7XWM0vvBFbICUeJZs41OgJC6JOTTFFS-hfLw6vCltYg5Yu_f94i809GqEqIKua8lvap0-9bCaWrx_1oASXEBwlosYuhjTM8BiqGRFFI_WTE6WfZqeP_ydnvOufdy0-TwrPl39ckHQrVIX1WN3zE-ij0wPtpM329rWzzlrnWvwT-XGQIC2d2L097RySuaA',
    imageAlt: 'Tazón de avena tibia con fresas laminadas, arándanos silvestres y chía',
    ingredients: [
      '40g de copos de avena integral',
      '200ml de leche o bebida de avena/almendra',
      '1 puñado de arándanos frescos',
      '3 fresas lavadas y laminadas',
      '1 cucharadita de miel pura de abejas o canela en polvo',
    ],
    steps: [
      'Calentar la leche en una cacerola pequeña a fuego medio.',
      'Incorporar la avena y remover constantemente durante 5 a 7 minutos.',
      'Servir en un tazón hondo y decorar con los frutos rojos frescos.',
      'Añadir un hilo de miel y una pizca de canela antes de degustar.',
    ],
  },
  {
    id: 3,
    title: 'Batido Verde Energético',
    subtitle: 'Espinaca, manzana verde, plátano y agua de coco',
    badge: 'Foto Seleccionada: Batido Verde Energético',
    description:
      'Bebida isotónica natural repleta de clorofila, potasio y micronutrientes esenciales. Acelera la digestión matutina y promueve una óptima hidratación celular.',
    kcal: '190 kcal',
    time: '5 min',
    difficulty: 'Fácil',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsJQWzGWwcmw4FyZdnyl6cL3ObFt4NOJwavJ0KXgjcxjhGTWMEVyRmZmmjOvf78zPkSIJrjx1qFS2P1kmYuzxAPVlnq7EJH2ouDrH4xu0A3joUkRKRwIBJlAfM6VRcpWGvZzAEscJQTuy8g0bS-rUFaAoBZ5-_C9YUcd-JqoNJhey7a53hjCJwEElCDmWRh7H4aWJ07AXRQ-ncpxJWHZ9IwK2YvDionAJZuwiFSrr-LAgpRh8WdQF1Dw',
    imageAlt: 'Vaso alto con batido verde brillante decorado con rodaja de manzana y menta',
    ingredients: [
      '1 taza de hojas de espinaca tierna fresca',
      '1/2 manzana verde cortada con piel',
      '1/2 plátano maduro congelado',
      '200ml de agua de coco natural o agua fría',
      'Hojas de menta fresca y zumo de medio limón',
    ],
    steps: [
      'Lavar meticulosamente las hojas de espinaca y la manzana.',
      'Colocar los trozos de fruta y verdura en el vaso de la licuadora.',
      'Verter el agua de coco fría y el jugo de limón.',
      'Licuar a velocidad alta durante 45 segundos hasta obtener una consistencia suave y cremosa.',
    ],
  },
  {
    id: 4,
    title: 'Parfait de Yogur Natural',
    subtitle: 'Yogur sin azúcar con nueces picadas y miel de abejas',
    badge: 'Foto Seleccionada: Parfait de Yogur Natural',
    description:
      'Capas de yogur griego desnatado con probióticos activos, nueces de nogal trituradas con omega 3 y un hilo de miel cruda pura de flores silvestres.',
    kcal: '250 kcal',
    time: '6 min',
    difficulty: 'Muy Fácil',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKirpU5hdnpeul0QZyZ1EW7_ueZbLOEM8FguUrB2U6Vcj6xpH1V9ugL30WGPLD7_iyUriB-q1tT-2HJKd0mBLdKO4MlLtVqW-LWA46YS_KIP7dGdFO7V-j6X1LNIX2zotqJi9JT8rAHm3IxnkbnwoimZ_IPvrVXUDB2NmUeRcbJc5StLrDWDqK1ewUdJyweP_FuwLKPaovSjFLclTl16GEBYKWonf9cwUsp-2FV6b56Vfb8QftWE2QcQ',
    imageAlt: 'Copa de vidrio con capas de yogur griego, nueces tostadas y miel dorada',
    ingredients: [
      '150g de yogur griego natural sin azúcar',
      '30g de nueces de nogal troceadas ligeramente',
      '1 cucharada de granola integral casera',
      '1 cucharadita de miel de flores silvestres',
    ],
    steps: [
      'Colocar una capa base de yogur griego en una copa o vaso de vidrio.',
      'Añadir una capa intermedia de granola crujiente y nueces.',
      'Cubrir con el resto del yogur y coronar con nueces picadas.',
      'Finalizar con un fino hilo de miel pura.',
    ],
  },
];
