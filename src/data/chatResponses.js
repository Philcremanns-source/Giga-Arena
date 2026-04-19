export const chatResponses = {
  oeffnungszeiten: {
    keywords: ['öffnungszeiten', 'oeffnungszeiten', 'geöffnet', 'offen', 'wann', 'uhrzeit'],
    response:
      'Die Giga Arena hat folgende Öffnungszeiten: Sonntag bis Donnerstag von 13:00 bis 23:00 Uhr. Freitag und Samstag von 12:00 bis 01:00 Uhr. An Feiertagen können die Zeiten abweichen.',
  },
  preise: {
    keywords: ['preis', 'preise', 'kosten', 'credit', 'credits', 'euro', 'wie viel', 'wieviel'],
    response:
      'Credits erhältst du in vier Paketen: Starter (10 Euro / 20 Credits), Standard (20 Euro / 50 Credits), Plus (50 Euro / 135 Credits) und Premium (100 Euro / 285 Credits). Es gibt keinen Eintritt — du zahlst nur, was du spielst.',
  },
  racing: {
    keywords: ['racing', 'rennen', 'simulator', 'auto', 'cockpit', 'forza', 'force feedback'],
    response:
      'Unser Racing Simulator ist einer der zwei besten in ganz Europa. Das professionelle Multi-Screen-Cockpit mit Force-Feedback eignet sich für Einsteiger und erfahrene Fahrer. Eine Session kostet je nach Dauer eine bestimmte Anzahl Credits.',
  },
  vr: {
    keywords: ['vr', 'virtual reality', 'virtual', 'headset', 'pico', 'brille'],
    response:
      'Die Giga Arena bietet vollimmersive Room-Scale VR mit aktuellen Titeln auf PICO-Headsets. Kooperative und kompetitive Szenarien für 1 bis 4 Personen. Brillenträger sind willkommen.',
  },
  geburtstag: {
    keywords: ['geburtstag', 'birthday', 'feiern', 'party', 'feier', 'geburtstagsfeier'],
    response:
      'Für Geburtstagsfeiern bieten wir Pakete ab 15 Euro pro Person an. Enthalten sind ein reservierter Gruppenbereich, Arcade-Zeit und optional VR. Schreib uns über das Kontaktformular für ein individuelles Angebot.',
  },
  firmenevent: {
    keywords: ['firma', 'firmen', 'firmenevent', 'team', 'teambuilding', 'corporate', 'kollegen'],
    response:
      'Firmenevents in der Giga Arena: exklusive Buchung des Bereichs, Racing-Simulator-Wettbewerbe, Team-VR-Challenges und individuelle Catering-Optionen. Kontaktiere uns für ein maßgeschneidertes Paket.',
  },
  adresse: {
    keywords: ['adresse', 'wo', 'standort', 'lage', 'aachen', 'holzgraben', 'ort'],
    response:
      'Die Giga Arena befindet sich im Herzen von Aachen: Holzgraben 11, 52062 Aachen. Du findest uns zentral in der Innenstadt, gut erreichbar mit öffentlichen Verkehrsmitteln.',
  },
  parken: {
    keywords: ['parken', 'parkplatz', 'auto', 'parkhaus'],
    response:
      'In unmittelbarer Nähe gibt es mehrere Parkhäuser, darunter das Parkhaus Büchel und das Parkhaus Galeria. Die Aachener Innenstadt ist auch mit Bus und Bahn sehr gut erreichbar.',
  },
  buchen: {
    keywords: ['buchen', 'buchung', 'reservieren', 'reservierung', 'anfrage', 'anmelden'],
    response:
      'Für Gruppenevents, Geburtstage und Firmenevents kannst du uns über das Kontaktformular auf der Kontakt-Seite erreichen. Wir melden uns innerhalb von 24 Stunden.',
  },
  karte: {
    keywords: ['karte', 'spielkarte', 'chipkarte', 'kundenkarte', 'registrieren'],
    response:
      'Deine persönliche Giga Arena Karte kannst du auf der Karte-Seite registrieren. Mit der Karte lädst du Credits auf, verfolgst dein Guthaben und erhältst exklusive Vorteile.',
  },
  spiele: {
    keywords: ['spiele', 'spielen', 'attraktionen', 'automaten', 'was gibt es'],
    response:
      'Die Giga Arena bietet: Racing Simulator (Nr. 2 in Europa), Room-Scale VR, Classic Arcade-Automaten, Sky Fighter, Gun Storm, Super Firing, Speed Racer und einen dedizierten VR-Bereich. Insgesamt über 50 Attraktionen.',
  },
  hallo: {
    keywords: ['hallo', 'hi', 'hey', 'guten tag', 'servus', 'moin'],
    response:
      'Hallo! Schön, dass du die Giga Arena besuchst. Ich bin der Giga Bot und helfe dir bei Fragen zu Öffnungszeiten, Preisen, Attraktionen und Events. Was möchtest du wissen?',
  },
  danke: {
    keywords: ['danke', 'dankeschön', 'vielen dank', 'super', 'toll', 'perfekt'],
    response:
      'Gern geschehen! Wenn du weitere Fragen hast, bin ich jederzeit da. Wir freuen uns auf deinen Besuch in der Giga Arena Aachen.',
  },
}

export const fallbackResponse =
  'Das kann ich leider nicht direkt beantworten. Versuch es mit Themen wie Öffnungszeiten, Preise, Racing, VR oder Events. Oder kontaktiere uns direkt: info@viwa-entertainment.de'

export const greetingMessage =
  'Willkommen bei der Giga Arena. Wie kann ich dir helfen?'

export const suggestionChips = [
  'Öffnungszeiten',
  'Preise & Credits',
  'Racing Simulator',
  'Event buchen',
  'Karte registrieren',
]
