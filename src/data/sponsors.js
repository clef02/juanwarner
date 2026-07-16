import youngla1 from '../assets/youngla1.webp'
import youngla11 from '../assets/youngla1.1.webp'
import youngla3 from '../assets/youngla3.webp'
import younglaGale from '../assets/younglaGale.webp'
import younglaGale2 from '../assets/younglaGale2.webp'
import younglaGale3 from '../assets/younglaGale3.webp'
import younglaGale4 from '../assets/younglaGale4.webp'
import younglaGale5 from '../assets/younglaGale5.webp'
import galeri2 from '../assets/galeri2.webp'
import youngLaLogo from '../assets/youngla-logo.webp'
import dragonLogo from '../assets/dragon-logo.webp'
import dragonImg from '../assets/dragon.webp'
import dragonfarma from '../assets/dragonfarma.webp'
import dragonmed from '../assets/dragonmed.webp'
import galeriDra1 from '../assets/galeriDra1.webp'
import galeriDra2 from '../assets/galeriDra2.webp'
import galeriDra3 from '../assets/galeriDra3.webp'
import galeriDra4 from '../assets/galeriDra4.webp'
import galeriDra5 from '../assets/galeriDra5.webp'

// Un patrocinio = una página. Imágenes = PLACEHOLDER (faltan fotos reales de producto).
export const SPONSORS = [
  {
    slug: 'youngla',
    name: 'YoungLA',
    category: 'Ropa deportiva y lifestyle',
    logo: youngLaLogo,
    heroImg: younglaGale2,
    heroPos: 'object-[center_30%]',
    introImg: younglaGale,
    introAlt: 'Juan Wagner vistiendo ropa de YoungLA',
    introPos: 'object-center',
    introHeading: 'La marca número uno en fitness y lifestyle',
    introParagraphs: [
      'YoungLA es la marca de ropa número uno en fitness y lifestyle. En 2024 abrieron sus puertas para construir algo a largo plazo conmigo.',
      'Desde entonces hemos viajado juntos a eventos como el Arnold Sports, Fexpocruz y el Block Party de Miami. Sigo usando su ropa no solo para entrenar, sino también para el día a día, porque combina calidad, estilo y comodidad.',
    ],
    discount: {
      code: 'JUANWAGNER',
      url: 'https://www.youngla.com/discount/JUANWAGNER',
    },
    products: [
      { img: youngla1, name: 'Colección entrenamiento', pos: 'object-[center_30%]' },
      { img: youngla11, name: 'Hoodie oversized', pos: 'object-[center_30%]' },
    ],
    gallery: [youngla3, younglaGale3, younglaGale4, younglaGale5, galeri2],
  },
  {
    slug: 'dragon-pharma',
    name: 'Dragon Pharma',
    category: 'Suplementación deportiva',
    logo: dragonLogo,
    heroImg: galeriDra4,
    heroPos: 'object-[center_35%]',
    introImg: dragonImg,
    introAlt: 'Juan Wagner con productos de Dragon Pharma',
    introPos: 'object-center',
    introHeading: 'Mi primer gran patrocinio',
    introParagraphs: [
      'Dragon Pharma fue mi primer patrocinio grande, cuando apenas estaba arrancando como atleta y creador de contenido.',
      'Desde ese momento no he dejado de crecer con ellos, no solo a nivel personal, sino físicamente: el cambio y progreso que he tenido son la mejor prueba de sus productos.',
    ],
    supplements: {
      heading: 'Así me suplemento yo',
      imgMain: dragonmed,
      imgMainAlt: 'Juan Wagner tomando su suplementación de Dragon Pharma',
      imgSide: dragonfarma,
      imgSideAlt: 'Línea de suplementos de Dragon Pharma que utiliza Juan Wagner',
      items: [
        {
          name: 'Creatina',
          text: 'En la mañana, junto con la glutamina. Se puede tomar a cualquier hora del día, pero esa es mi rutina fija.',
        },
        {
          name: 'Pre-entreno',
          text: 'Antes de entrenar, para llegar con toda la energía. Es de los pocos suplementos con horario específico.',
        },
        {
          name: 'Greens and Reds',
          text: 'Con dos de mis comidas al día, para cubrir los vegetales que a veces no alcanzo a consumir.',
        },
        {
          name: 'Proteína',
          text: 'En el desayuno, mezclada con crema de arroz. No hace falta tomarla justo después de entrenar, como muchos creen.',
        },
        {
          name: 'Aminoácidos',
          text: 'Durante el entrenamiento, para mantenerme con energía y rendir de principio a fin.',
        },
      ],
    },
    outro:
      'En Dragon Pharma vas a encontrar proteínas, aminoácidos, creatinas, pre-entrenos y toda una línea de vitaminas y suplementos pensados para acompañarte tanto dentro como fuera del gimnasio.',
    discount: {
      code: 'JUANWAGNER',
      url: 'https://dragonpharmalabs.com/JUANWAGNER',
    },
    products: [
      { img: galeriDra2, name: 'Proteína', pos: 'object-[center_72%]' },
      { img: galeriDra5, name: 'Pre-entreno', pos: 'object-center' },
    ],
    gallery: [galeriDra1, galeriDra2, galeriDra3, galeriDra5, dragonfarma],
  },
]

export const getSponsor = (slug) => SPONSORS.find((s) => s.slug === slug)
