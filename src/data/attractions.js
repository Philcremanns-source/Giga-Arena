const BASE = 'https://www.giga-arena.de'

export const attractions = [
  {
    id: 'racing-simulator',
    name: 'Racing Simulator',
    description:
      'Unser Racing Simulator gehört zu den zwei besten in ganz Europa. Professionelles Multi-Screen-Cockpit, authentisches Fahrgefühl und präzise Force-Feedback-Technik — für Einsteiger und erfahrene Fahrer.',
    image: `${BASE}/photos/racing-sim.jpg`,
    alt: 'Profi-Racing-Simulator mit Multi-Screen-Cockpit',
    players: '1–4 Spieler · Alle Schwierigkeitsgrade',
    badge: 'Nr. 2 in Europa',
    badgeColor: 'yellow',
    category: 'Racing',
    featured: true,
  },
  {
    id: 'vr-experience',
    name: 'VR Experience',
    description:
      'Vollimmersive Room-Scale VR mit aktuellen Titeln auf PICO-Headsets. Kooperativ oder gegeneinander — die virtuelle Realität wartet.',
    image: `${BASE}/photos/vr-headset.jpg`,
    alt: 'VR-Headset für immersive Room-Scale-Erlebnisse',
    players: '1–4 Spieler',
    category: 'VR',
  },
  {
    id: 'classic-arcade',
    name: 'Classic Arcade',
    description:
      'Echte Arcade-Automaten aus der goldenen Ära der Gaming-Kultur. Beat-em-ups, Racing-Klassiker und Shoot-em-ups in authentischer Spielhallen-Atmosphäre.',
    image: `${BASE}/photos/joystick.jpg`,
    alt: 'Klassische Arcade-Automaten mit Joystick',
    players: '1–2 Spieler',
    category: 'Arcade Klassiker',
  },
  {
    id: 'sky-fighter',
    name: 'Sky Fighter',
    description:
      'Retro-Luftkampf-Shooter auf zwei Plätzen. Dogfights in klassischer Pixeloptik — Reaktion und Präzision entscheiden.',
    image: `${BASE}/photos/sky-fighter.jpg`,
    alt: 'Sky Fighter Luft­kampf-Shooter-Automat',
    players: '1–2 Spieler',
    category: 'Shooter',
  },
  {
    id: 'gun-storm',
    name: 'Gun Storm',
    description:
      'Intensiver Shooter-Automat mit realistischen Lichtgewehren. Schnelle Szenarien, exakte Zielpräzision, pure Adrenalin.',
    image: `${BASE}/photos/gun-storm.jpg`,
    alt: 'Gun Storm Lichtgewehr-Shooter',
    players: '1–2 Spieler',
    category: 'Shooter',
  },
  {
    id: 'super-firing',
    name: 'Super Firing',
    description:
      'Schnelle Reaktionen gefragt: Ziele erscheinen in immer kürzeren Intervallen. Trainiere dein Auge und deine Hand-Augen-Koordination.',
    image: `${BASE}/photos/super-firing.jpg`,
    alt: 'Super Firing Reaktions-Shooter',
    players: '1–2 Spieler',
    category: 'Shooter',
  },
  {
    id: 'speed-racer',
    name: 'Speed Racer',
    description:
      'Motorrad-Rennsimulator mit realistischem Fahrgefühl und physikalisch korrekten Kurven. Für alle, die auf zwei Rädern Gas geben wollen.',
    image: `${BASE}/photos/speed-racer.jpg`,
    alt: 'Speed Racer Motorrad-Rennsimulator',
    players: '1 Spieler',
    category: 'Racing',
  },
  {
    id: 'vr-area',
    name: 'VR Area',
    description:
      'Dedizierter VR-Bereich für Gruppen: Mehrere Headsets, kuratierte Spielauswahl, kooperative und kompetitive Erlebnisse.',
    image: `${BASE}/photos/vr-area.jpg`,
    alt: 'Dedizierter VR-Bereich mit mehreren Headsets',
    players: '1–4 Spieler',
    category: 'VR',
  },
]

export const attractionCategories = ['Alle', 'Racing', 'VR', 'Arcade Klassiker', 'Shooter']
