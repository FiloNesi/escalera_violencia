import { CardData, ZoneData } from './types';

export const CARDS: CardData[] = [
  {
    id: 'c1',
    text: "Me dice que prefiere que no quede con cierta amiga porque 'habla mal de nuestra relación'",
    correctZoneId: 'step-1',
    icon: '🙍'
  },
  {
    id: 'c2',
    text: "Te revisa el móvil para ver tus conversaciones de WhatsApp.",
    correctZoneId: 'step-2',
    icon: '📱'
  },
  {
    id: 'c3',
    text: "Me dice que estudiar tanto es una excusa para no estar con él/ella",
    correctZoneId: 'step-3',
    icon: '📚'
  },
  {
    id: 'c4',
    text: "Me ha borrado de grupos de WhatsApp sin mi permiso",
    correctZoneId: 'step-4',
    icon: '🚫'
  },
  {
    id: 'c5',
    text: "Me dice que no me ponga según qué ropa porque 'llamo mucho la atención'",
    correctZoneId: 'step-5',
    icon: '👗'
  },
  {
    id: 'c6',
    text: "Hace que me sienta mal cada vez que quedo con mi familia",
    correctZoneId: 'step-6',
    icon: '🏠'
  },
  {
    id: 'c7',
    text: "Me hace videollamadas para 'comprobar' dónde estoy realmente",
    correctZoneId: 'step-7',
    icon: '😰'
  },
  {
    id: 'c8',
    text: "Me ha forzado físicamente a tener relaciones",
    correctZoneId: 'step-8',
    icon: '💢'
  },
  {
    id: 'c9',
    text: "Después de gritarme, me pide perdón llorando y me dice que va a cambiar",
    correctZoneId: 'honeymoon',
    icon: '💔'
  },
  {
    id: 'c10',
    text: "Acepta un 'no' sin enfadarse",
    correctZoneId: 'healthy',
    icon: '✅'
  }
];

export const LADDER_ZONES: ZoneData[] = [
  { id: 'step-8', title: 'Escalón 8', colorClass: 'bg-red-600 border-red-700 text-white', intensityLevel: 8 },
  { id: 'step-7', title: 'Escalón 7', colorClass: 'bg-red-500 border-red-600 text-white', intensityLevel: 7 },
  { id: 'step-6', title: 'Escalón 6', colorClass: 'bg-orange-500 border-orange-600 text-white', intensityLevel: 6 },
  { id: 'step-5', title: 'Escalón 5', colorClass: 'bg-orange-400 border-orange-500 text-white', intensityLevel: 5 },
  { id: 'step-4', title: 'Escalón 4', colorClass: 'bg-amber-400 border-amber-500 text-black', intensityLevel: 4 },
  { id: 'step-3', title: 'Escalón 3', colorClass: 'bg-yellow-300 border-yellow-400 text-black', intensityLevel: 3 },
  { id: 'step-2', title: 'Escalón 2', colorClass: 'bg-yellow-200 border-yellow-300 text-black', intensityLevel: 2 },
  { id: 'step-1', title: 'Escalón 1', colorClass: 'bg-yellow-100 border-yellow-200 text-black', intensityLevel: 1 },
];

export const EXTRA_ZONES: ZoneData[] = [
  { id: 'honeymoon', title: 'Luna de Miel', colorClass: 'bg-pink-200 border-pink-300 text-pink-900', intensityLevel: 0 },
  { id: 'healthy', title: 'Relación Sana', colorClass: 'bg-green-200 border-green-300 text-green-900', intensityLevel: 0 },
];