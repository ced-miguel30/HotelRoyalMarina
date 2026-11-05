/* Royal Marina Suites — shared UI: bottom navigation, contact sheet,
   compact language switcher, language-preserving links, form helpers
   and the "Today" block on the home page.
   Must be loaded AFTER js/translations.js. */
(function () {
  'use strict';

  var RECEPTION_PHONE = '+34928508915';
  var RECEPTION_PHONE_LABEL = '+34 928 508 915';
  var EMAIL = 'hotel@royalmarinasuites.com';
  var TIMEZONE = 'Atlantic/Canary';

  var T = {
    en: { home: 'Home', dining: 'Dining', services: 'Services', info: 'Stay', contact: 'Reception',
      sheetTitle: 'Reception', sheetText: 'Our team is available 24 hours a day.',
      room: 'From your room', roomSub: 'Press 9 on the room phone',
      call: 'Call reception', email: 'Email', close: 'Close',
      today: 'Today at the hotel', openNow: 'Open now', closed: 'Closed', opensAt: 'Opens at', until: 'until',
      breakfast: 'Breakfast', poolBar: 'Pool Bar', snacks: 'Snacks & Lunch', pool: 'Pool & Jacuzzi', gym: 'Fitness Centre',
      friday: 'Friday special — Marina Restaurant open until 21:00', fridayCta: 'See the menu',
      quick: 'Quick access', wifi: 'Wi-Fi', transfer: 'Airport transfer', suiteBreakfast: 'Breakfast in suite', lateCheckout: 'Late check-out' },
    es: { home: 'Inicio', dining: 'Restaurante', services: 'Servicios', info: 'Estancia', contact: 'Recepción',
      sheetTitle: 'Recepción', sheetText: 'Nuestro equipo está disponible las 24 horas.',
      room: 'Desde su habitación', roomSub: 'Pulse el 9 en el teléfono de la habitación',
      call: 'Llamar a recepción',
      email: 'Correo electrónico', close: 'Cerrar',
      today: 'Hoy en el hotel', openNow: 'Abierto ahora', closed: 'Cerrado', opensAt: 'Abre a las', until: 'hasta las',
      breakfast: 'Desayuno', poolBar: 'Pool Bar', snacks: 'Snacks y almuerzo', pool: 'Piscina y jacuzzi', gym: 'Gimnasio',
      friday: 'Especial de los viernes — Marina Restaurant abierto hasta las 21:00', fridayCta: 'Ver la carta',
      quick: 'Accesos rápidos', wifi: 'Wi-Fi', transfer: 'Traslado al aeropuerto', suiteBreakfast: 'Desayuno en la suite', lateCheckout: 'Salida tardía' },
    de: { home: 'Start', dining: 'Restaurant', services: 'Services', info: 'Aufenthalt', contact: 'Rezeption',
      sheetTitle: 'Rezeption', sheetText: 'Unser Team ist rund um die Uhr für Sie da.',
      room: 'Von Ihrem Zimmer', roomSub: 'Wählen Sie die 9 am Zimmertelefon',
      call: 'Rezeption anrufen',
      email: 'E-Mail', close: 'Schließen',
      today: 'Heute im Hotel', openNow: 'Jetzt geöffnet', closed: 'Geschlossen', opensAt: 'Öffnet um', until: 'bis',
      breakfast: 'Frühstück', poolBar: 'Poolbar', snacks: 'Snacks & Mittagessen', pool: 'Pool & Whirlpool', gym: 'Fitnesscenter',
      friday: 'Freitags-Special — Marina Restaurant bis 21:00 Uhr geöffnet', fridayCta: 'Zur Speisekarte',
      quick: 'Schnellzugriff', wifi: 'WLAN', transfer: 'Flughafentransfer', suiteBreakfast: 'Frühstück in der Suite', lateCheckout: 'Später Check-out' },
    it: { home: 'Home', dining: 'Ristorante', services: 'Servizi', info: 'Soggiorno', contact: 'Reception',
      sheetTitle: 'Reception', sheetText: 'Il nostro team è a vostra disposizione 24 ore su 24.',
      room: 'Dalla vostra camera', roomSub: 'Premete il 9 sul telefono della camera',
      call: 'Chiamate la reception',
      email: 'E-mail', close: 'Chiudi',
      today: 'Oggi in hotel', openNow: 'Aperto ora', closed: 'Chiuso', opensAt: 'Apre alle', until: 'fino alle',
      breakfast: 'Colazione', poolBar: 'Pool Bar', snacks: 'Snack e pranzo', pool: 'Piscina e idromassaggio', gym: 'Centro fitness',
      friday: 'Speciale del venerdì — Marina Restaurant aperto fino alle 21:00', fridayCta: 'Vedi il menù',
      quick: 'Accesso rapido', wifi: 'Wi-Fi', transfer: 'Transfer aeroporto', suiteBreakfast: 'Colazione in suite', lateCheckout: 'Check-out posticipato' },
    fr: { home: 'Accueil', dining: 'Restaurant', services: 'Services', info: 'Séjour', contact: 'Réception',
      sheetTitle: 'Réception', sheetText: 'Notre équipe est à votre disposition 24 h/24.',
      room: 'Depuis votre chambre', roomSub: 'Composez le 9 sur le téléphone de la chambre',
      call: 'Appeler la réception',
      email: 'E-mail', close: 'Fermer',
      today: 'Aujourd’hui à l’hôtel', openNow: 'Ouvert', closed: 'Fermé', opensAt: 'Ouvre à', until: 'jusqu’à',
      breakfast: 'Petit-déjeuner', poolBar: 'Pool Bar', snacks: 'Snacks et déjeuner', pool: 'Piscine et jacuzzi', gym: 'Salle de fitness',
      friday: 'Spécial vendredi — Marina Restaurant ouvert jusqu’à 21h00', fridayCta: 'Voir la carte',
      quick: 'Accès rapide', wifi: 'Wi-Fi', transfer: 'Transfert aéroport', suiteBreakfast: 'Petit-déjeuner en suite', lateCheckout: 'Départ tardif' }
  };

  // Weather, UV and culture strings
  var T2 = {
    en: { weatherTitle: 'Puerto Calero today', maxMin: 'Max / min', uv: 'UV index today', sea: 'Sea', sunset: 'Sunset', wind: 'Wind',
      uvLow: 'Low', uvModerate: 'Moderate', uvHigh: 'High', uvVeryHigh: 'Very high', uvExtreme: 'Extreme',
      uvTipLow: 'Sunglasses are enough.', uvTipModerate: 'Use SPF 30+ and seek shade at midday.', uvTipHigh: 'SPF 50, a hat and shade between 12:00 and 16:00.',
      uvTipVeryHigh: 'Avoid direct sun from 12:00 to 16:00. SPF 50, reapply often.', uvTipExtreme: 'Stay in the shade at midday. SPF 50, hat and sunglasses.',
      w0: 'Clear sky', w1: 'Mostly sunny', w2: 'Partly cloudy', w3: 'Cloudy', w45: 'Fog', w51: 'Drizzle', w61: 'Rain', w80: 'Showers', w95: 'Thunderstorm',
      cultureTitle: 'Culture & events', cultureText: 'Concerts, exhibitions and island traditions during your stay.',
      cactTitle: 'Art & Culture Centres', cactText: 'Jameos del Agua, Cueva de los Verdes, Timanfaya: concerts and exhibitions.',
      yaizaTitle: 'Yaiza local events', yaizaText: 'Agenda and news from our municipality (in Spanish).', askConcierge: 'Reception will gladly help with tickets and transport.' },
    es: { weatherTitle: 'Hoy en Puerto Calero', maxMin: 'Máx. / mín.', uv: 'Índice UV hoy', sea: 'Mar', sunset: 'Puesta de sol', wind: 'Viento',
      uvLow: 'Bajo', uvModerate: 'Moderado', uvHigh: 'Alto', uvVeryHigh: 'Muy alto', uvExtreme: 'Extremo',
      uvTipLow: 'Basta con gafas de sol.', uvTipModerate: 'Use protección 30+ y busque la sombra a mediodía.', uvTipHigh: 'Protección 50, gorra y sombra entre las 12:00 y las 16:00.',
      uvTipVeryHigh: 'Evite el sol directo de 12:00 a 16:00. Protección 50, renuévela a menudo.', uvTipExtreme: 'Permanezca a la sombra a mediodía. Protección 50, gorra y gafas.',
      w0: 'Despejado', w1: 'Mayormente soleado', w2: 'Parcialmente nublado', w3: 'Nublado', w45: 'Niebla', w51: 'Llovizna', w61: 'Lluvia', w80: 'Chubascos', w95: 'Tormenta',
      cultureTitle: 'Cultura y eventos', cultureText: 'Conciertos, exposiciones y tradiciones de la isla durante su estancia.',
      cactTitle: 'Centros de Arte, Cultura y Turismo', cactText: 'Jameos del Agua, Cueva de los Verdes, Timanfaya: conciertos y exposiciones.',
      yaizaTitle: 'Agenda de Yaiza', yaizaText: 'Actividades y noticias de nuestro municipio.', askConcierge: 'En recepción le ayudamos con entradas y transporte.' },
    de: { weatherTitle: 'Heute in Puerto Calero', maxMin: 'Max. / Min.', uv: 'UV-Index heute', sea: 'Meer', sunset: 'Sonnenuntergang', wind: 'Wind',
      uvLow: 'Niedrig', uvModerate: 'Mäßig', uvHigh: 'Hoch', uvVeryHigh: 'Sehr hoch', uvExtreme: 'Extrem',
      uvTipLow: 'Eine Sonnenbrille genügt.', uvTipModerate: 'LSF 30+ verwenden und mittags Schatten suchen.', uvTipHigh: 'LSF 50, Kopfbedeckung und Schatten zwischen 12 und 16 Uhr.',
      uvTipVeryHigh: 'Direkte Sonne von 12 bis 16 Uhr meiden. LSF 50, oft nachcremen.', uvTipExtreme: 'Mittags im Schatten bleiben. LSF 50, Hut und Sonnenbrille.',
      w0: 'Klarer Himmel', w1: 'Überwiegend sonnig', w2: 'Teilweise bewölkt', w3: 'Bewölkt', w45: 'Nebel', w51: 'Nieselregen', w61: 'Regen', w80: 'Schauer', w95: 'Gewitter',
      cultureTitle: 'Kultur & Veranstaltungen', cultureText: 'Konzerte, Ausstellungen und Inseltraditionen während Ihres Aufenthalts.',
      cactTitle: 'Kunst- und Kulturzentren', cactText: 'Jameos del Agua, Cueva de los Verdes, Timanfaya: Konzerte und Ausstellungen.',
      yaizaTitle: 'Veranstaltungen in Yaiza', yaizaText: 'Programm und Neuigkeiten unserer Gemeinde (auf Spanisch).', askConcierge: 'Die Rezeption hilft Ihnen gerne mit Tickets und Transport.' },
    it: { weatherTitle: 'Oggi a Puerto Calero', maxMin: 'Max / min', uv: 'Indice UV oggi', sea: 'Mare', sunset: 'Tramonto', wind: 'Vento',
      uvLow: 'Basso', uvModerate: 'Moderato', uvHigh: 'Alto', uvVeryHigh: 'Molto alto', uvExtreme: 'Estremo',
      uvTipLow: 'Bastano gli occhiali da sole.', uvTipModerate: 'Usate protezione 30+ e cercate l’ombra a mezzogiorno.', uvTipHigh: 'Protezione 50, cappello e ombra tra le 12:00 e le 16:00.',
      uvTipVeryHigh: 'Evitate il sole diretto dalle 12:00 alle 16:00. Protezione 50, da riapplicare spesso.', uvTipExtreme: 'Restate all’ombra a mezzogiorno. Protezione 50, cappello e occhiali.',
      w0: 'Sereno', w1: 'Prevalentemente soleggiato', w2: 'Parzialmente nuvoloso', w3: 'Nuvoloso', w45: 'Nebbia', w51: 'Pioggerella', w61: 'Pioggia', w80: 'Rovesci', w95: 'Temporale',
      cultureTitle: 'Cultura ed eventi', cultureText: 'Concerti, mostre e tradizioni dell’isola durante il vostro soggiorno.',
      cactTitle: 'Centri d’Arte, Cultura e Turismo', cactText: 'Jameos del Agua, Cueva de los Verdes, Timanfaya: concerti e mostre.',
      yaizaTitle: 'Eventi a Yaiza', yaizaText: 'Agenda e notizie del nostro comune (in spagnolo).', askConcierge: 'La reception vi aiuta volentieri con biglietti e trasporto.' },
    fr: { weatherTitle: 'Aujourd’hui à Puerto Calero', maxMin: 'Max. / min.', uv: 'Indice UV du jour', sea: 'Mer', sunset: 'Coucher du soleil', wind: 'Vent',
      uvLow: 'Faible', uvModerate: 'Modéré', uvHigh: 'Élevé', uvVeryHigh: 'Très élevé', uvExtreme: 'Extrême',
      uvTipLow: 'Des lunettes de soleil suffisent.', uvTipModerate: 'Utilisez un indice 30+ et cherchez l’ombre à midi.', uvTipHigh: 'Indice 50, chapeau et ombre entre 12h et 16h.',
      uvTipVeryHigh: 'Évitez le soleil direct de 12h à 16h. Indice 50, à renouveler souvent.', uvTipExtreme: 'Restez à l’ombre à midi. Indice 50, chapeau et lunettes.',
      w0: 'Ciel dégagé', w1: 'Plutôt ensoleillé', w2: 'Partiellement nuageux', w3: 'Nuageux', w45: 'Brouillard', w51: 'Bruine', w61: 'Pluie', w80: 'Averses', w95: 'Orage',
      cultureTitle: 'Culture et événements', cultureText: 'Concerts, expositions et traditions de l’île pendant votre séjour.',
      cactTitle: 'Centres d’Art, Culture et Tourisme', cactText: 'Jameos del Agua, Cueva de los Verdes, Timanfaya : concerts et expositions.',
      yaizaTitle: 'Agenda de Yaiza', yaizaText: 'Programme et actualités de notre commune (en espagnol).', askConcierge: 'La réception vous aide volontiers pour les billets et le transport.' }
  };
  Object.keys(T2).forEach(function (l) { Object.keys(T2[l]).forEach(function (k) { T[l][k] = T2[l][k]; }); });

  // Assistant strings
  var T3 = {
    en: { contact: 'Help', askTitle: 'How can we help?', askPlaceholder: 'e.g. breakfast, gym, taxi…', suggested: 'Frequently asked',
      results: 'Questions about this', related: 'You may also want to know', back: 'All questions', copy: 'Copy password', copied: 'Copied ✓',
      noResults: 'We could not find that question. Our team will gladly help you:', talkToUs: 'Prefer to talk to us?' },
    es: { contact: 'Ayuda', askTitle: '¿En qué le ayudamos?', askPlaceholder: 'Ej.: desayuno, gimnasio, taxi…', suggested: 'Preguntas frecuentes',
      results: 'Preguntas sobre esto', related: 'También le puede interesar', back: 'Todas las preguntas', copy: 'Copiar contraseña', copied: 'Copiada ✓',
      noResults: 'No hemos encontrado esa pregunta. Nuestro equipo le ayudará encantado:', talkToUs: '¿Prefiere hablar con nosotros?' },
    de: { contact: 'Hilfe', askTitle: 'Wie können wir helfen?', askPlaceholder: 'z. B. Frühstück, Fitness, Taxi…', suggested: 'Häufige Fragen',
      results: 'Fragen dazu', related: 'Das könnte Sie auch interessieren', back: 'Alle Fragen', copy: 'Passwort kopieren', copied: 'Kopiert ✓',
      noResults: 'Diese Frage haben wir nicht gefunden. Unser Team hilft Ihnen gerne:', talkToUs: 'Lieber persönlich sprechen?' },
    it: { contact: 'Aiuto', askTitle: 'Come possiamo aiutarvi?', askPlaceholder: 'Es.: colazione, palestra, taxi…', suggested: 'Domande frequenti',
      results: 'Domande su questo', related: 'Potrebbe interessarvi anche', back: 'Tutte le domande', copy: 'Copia la password', copied: 'Copiata ✓',
      noResults: 'Non abbiamo trovato questa domanda. Il nostro team vi aiuterà volentieri:', talkToUs: 'Preferite parlare con noi?' },
    fr: { contact: 'Aide', askTitle: 'Comment pouvons-nous vous aider ?', askPlaceholder: 'Ex. : petit-déjeuner, fitness, taxi…', suggested: 'Questions fréquentes',
      results: 'Questions à ce sujet', related: 'Cela peut aussi vous intéresser', back: 'Toutes les questions', copy: 'Copier le mot de passe', copied: 'Copié ✓',
      noResults: 'Nous n’avons pas trouvé cette question. Notre équipe vous aidera volontiers :', talkToUs: 'Vous préférez nous parler ?' }
  };
  Object.keys(T3).forEach(function (l) { Object.keys(T3[l]).forEach(function (k) { T[l][k] = T3[l][k]; }); });

  // Puerto Calero coordinates for the weather block (Open-Meteo, no API key).
  var LAT = 28.917, LON = -13.704;
  var CACT_URL = { en: 'https://cactlanzarote.com/en/events', es: 'https://cactlanzarote.com/es/eventos',
    de: 'https://cactlanzarote.com/de/veranstaltungen', fr: 'https://cactlanzarote.com/fr/evenements', it: 'https://cactlanzarote.com/en/events' };
  var YAIZA_URL = 'https://yaiza.es/';

  // Opening hours shown in the "Today" block (keep in sync with the guide pages).
  var SCHEDULE = [
    { key: 'breakfast', from: '07:30', to: '10:30', href: 'MarinaRestaurant/breakfast.html' },
    { key: 'gym', from: '08:00', to: '20:00', href: 'facilities-wellness.html' },
    { key: 'pool', from: '09:00', to: '19:00', href: 'facilities-wellness.html' },
    { key: 'poolBar', from: '11:30', to: '19:00', href: 'MarinaRestaurant/pool-bar.html' },
    { key: 'snacks', from: '12:00', to: '15:30', href: 'MarinaRestaurant/snacks.html' }
  ];

  var ICONS = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    dining: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10"/><path d="M17 3c-2 1-3 4-3 7h3v11"/>',
    services: '<path d="M4 18h16"/><path d="M6 18a6 6 0 0 1 12 0"/><path d="M12 9V7"/><path d="M10 7h4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    room: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    bell: '<path d="M4 18h16"/><path d="M6 18a6 6 0 0 1 12 0"/><path d="M12 9V7"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'
  };

  function svg(name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + '</svg>';
  }

  function scriptBase() {
    var s = document.querySelector('script[src*="js/ui.js"]');
    return s ? new URL('../', s.src).href : new URL('./', location.href).href;
  }

  function currentLang() {
    return window.RMS_LANG || document.documentElement.lang || 'en';
  }

  function t(key) {
    var lang = currentLang();
    return (T[lang] && T[lang][key]) || T.en[key] || key;
  }

  function withLang(href) {
    try {
      var url = new URL(href, location.href);
      if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname)) {
        return href;
      }
      url.searchParams.set('lang', currentLang());
      return url.href;
    } catch (e) {
      return href;
    }
  }

  /* ---------------- Bottom navigation + contact sheet ---------------- */

  function buildNav(base) {
    if (document.querySelector('.rms-nav')) {
      return;
    }
    var items = [
      { id: 'home', href: base + 'index.html', icon: 'home' },
      { id: 'dining', href: base + 'MarinaRestaurant/restaurant.html', icon: 'dining',
        match: /MarinaRestaurant\// },
      { id: 'services', href: base + 'reception.html', icon: 'services', match: /reception\.html|transfer\.html|guide\.html/ },
      { id: 'info', href: base + 'hotel-info.html', icon: 'info', match: /hotel-info\.html|wifi\.html|facilities-wellness\.html/ }
    ];
    var path = location.pathname;
    var isHome = /\/$|index\.html$/.test(path) && !/MarinaRestaurant\//.test(path);

    var nav = document.createElement('nav');
    nav.className = 'rms-nav';
    nav.setAttribute('aria-label', 'Main');
    var html = '';
    items.forEach(function (it) {
      var active = it.id === 'home' ? isHome : (it.match && it.match.test(path));
      html += '<a href="' + it.href + '" data-nav="' + it.id + '"' + (active ? ' aria-current="page"' : '') + '>' +
        svg(it.icon) + '<span data-ui="' + it.id + '"></span></a>';
    });
    html += '<button type="button" class="rms-nav-contact" aria-haspopup="dialog">' +
      '<span class="rms-dot">' + svg('bell') + '</span><span class="rms-label" data-ui="contact"></span></button>';
    nav.innerHTML = html;
    document.body.appendChild(nav);

    var backdrop = document.createElement('div');
    backdrop.className = 'rms-sheet-backdrop';
    var sheet = document.createElement('div');
    sheet.className = 'rms-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.innerHTML =
      '<div class="rms-grabber"></div>' +
      '<div class="ast">' +
        '<h3 data-ui="askTitle"></h3>' +
        '<label class="ast-search">' + svg('search') +
          '<input type="search" enterkeyhint="search" autocomplete="off" data-ui-placeholder="askPlaceholder">' +
        '</label>' +
        '<div class="ast-body" aria-live="polite"></div>' +
      '</div>' +
      '<p class="ast-contact-title" data-ui="talkToUs"></p>' +
      '<div class="rms-actions">' +
        '<div class="rms-static">' + svg('room') +
          '<span><strong data-ui="room"></strong><small data-ui="roomSub"></small></span></div>' +
        '<a href="tel:' + RECEPTION_PHONE + '">' + svg('phone') +
          '<span><strong data-ui="call"></strong><small>' + RECEPTION_PHONE_LABEL + '</small></span></a>' +
        '<a href="mailto:' + EMAIL + '">' + svg('mail') +
          '<span><strong data-ui="email"></strong><small>' + EMAIL + '</small></span></a>' +
      '</div>' +
      '<button type="button" class="rms-close" data-ui="close"></button>';
    document.body.appendChild(backdrop);
    document.body.appendChild(sheet);

    function open() {
      sheet.classList.add('open'); backdrop.classList.add('open');
      document.documentElement.classList.add('rms-sheet-open');
      setupAssistant(sheet, base);
    }
    function close() {
      sheet.classList.remove('open'); backdrop.classList.remove('open');
      document.documentElement.classList.remove('rms-sheet-open');
    }
    nav.querySelector('.rms-nav-contact').addEventListener('click', open);
    backdrop.addEventListener('click', close);
    sheet.querySelector('.rms-close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { close(); } });
    document.querySelectorAll('[data-open-contact]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault(); open();
        var c = sheet.querySelector('.ast-contact-title');
        if (c) { setTimeout(function () { c.scrollIntoView({ block: 'start', behavior: 'smooth' }); }, 260); }
      });
    });
  }

  /* ---------------- Assistant (phase A: predefined questions) ----------------
     Content lives in data/assistant.json. Typing filters the questions by
     keywords in any language; each answer shows actions + related questions.
     It never submits forms: actions only link to the existing pages. */

  var astData = null;
  var astState = { view: 'list', id: null };

  function norm(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s-]/g, ' ');
  }

  function astSearch(query) {
    var tokens = norm(query).split(/\s+/).filter(function (w) { return w.length >= 2; });
    if (!tokens.length) {
      return astData.featured.map(astById).filter(Boolean);
    }
    var lang = currentLang();
    return astData.questions.map(function (q) {
      var score = 0;
      var kws = (q._kw || (q._kw = q.keywords.map(norm)));
      var own = norm(q.q[lang] || q.q.en);
      var all = q._all || (q._all = norm(Object.keys(q.q).map(function (l) { return q.q[l]; }).join(' ')));
      tokens.forEach(function (tk) {
        var hit = kws.some(function (k) {
          return k === tk || k.indexOf(tk) === 0 || (k.length >= 4 && tk.indexOf(k) === 0) ||
            k.split(/\s+/).some(function (part) { return part.indexOf(tk) === 0; });
        });
        if (hit) { score += 3; }
        if (own.indexOf(tk) !== -1) { score += 2; } else if (all.indexOf(tk) !== -1) { score += 1; }
      });
      return { q: q, score: score };
    }).filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 6)
      .map(function (r) { return r.q; });
  }

  function astById(id) {
    for (var i = 0; i < astData.questions.length; i++) {
      if (astData.questions[i].id === id) { return astData.questions[i]; }
    }
    return null;
  }

  function astText(obj) { return pick(obj); }

  function astQuestionButtons(list) {
    return list.map(function (q) {
      return '<button type="button" class="ast-q" data-q="' + q.id + '"><span>' + escapeHtml(astText(q.q)) + '</span>' +
        '<span aria-hidden="true">›</span></button>';
    }).join('');
  }

  function astRender(sheet, base) {
    var body = sheet.querySelector('.ast-body');
    if (!astData) {
      body.innerHTML = '';
      return;
    }
    if (astState.view === 'answer') {
      var q = astById(astState.id);
      if (!q) { astState.view = 'list'; return astRender(sheet, base); }
      var actions = (q.actions || []).map(function (a) {
        if (a.type === 'call') {
          return '<a class="ast-action" href="tel:' + RECEPTION_PHONE + '">' + svg('phone') + '<span>' + t('call') + '</span></a>';
        }
        var external = /^https:\/\//.test(a.href);
        var href = external ? a.href : withLang(base + a.href);
        return '<a class="ast-action" href="' + escapeHtml(href) + '"' + (external ? ' target="_blank" rel="noopener"' : '') + '>' +
          '<span>' + escapeHtml(astText(a.label)) + '</span><span aria-hidden="true">' + (external ? '↗' : '→') + '</span></a>';
      }).join('');
      if (q.copy) {
        actions = '<button type="button" class="ast-action ast-copy" data-copy="' + escapeHtml(q.copy) + '"><span>' + t('copy') + '</span></button>' + actions;
      }
      var related = (q.related || []).map(astById).filter(Boolean);
      body.innerHTML =
        '<button type="button" class="ast-back">‹ ' + t('back') + '</button>' +
        '<div class="ast-answer"><p class="ast-answer-q">' + escapeHtml(astText(q.q)) + '</p>' +
          '<div class="ast-answer-a">' + astText(q.a) + '</div>' +  // trusted content from data/assistant.json
          (actions ? '<div class="ast-actions">' + actions + '</div>' : '') +
        '</div>' +
        (related.length ? '<p class="ast-label">' + t('related') + '</p><div class="ast-list">' + astQuestionButtons(related) + '</div>' : '');
      return;
    }
    var input = sheet.querySelector('.ast-search input');
    var query = input ? input.value : '';
    var results = astSearch(query);
    body.innerHTML =
      '<p class="ast-label">' + (query.trim() ? t('results') : t('suggested')) + '</p>' +
      (results.length
        ? '<div class="ast-list">' + astQuestionButtons(results) + '</div>'
        : '<p class="ast-empty">' + t('noResults') + '</p>');
  }

  function setupAssistant(sheet, base) {
    if (sheet._astReady) {
      astRender(sheet, base);
      return;
    }
    sheet._astReady = true;
    var input = sheet.querySelector('.ast-search input');
    var body = sheet.querySelector('.ast-body');

    input.addEventListener('input', function () {
      astState.view = 'list';
      astRender(sheet, base);
    });
    body.addEventListener('click', function (e) {
      var qb = e.target.closest('[data-q]');
      if (qb) {
        astState = { view: 'answer', id: qb.getAttribute('data-q') };
        astRender(sheet, base);
        sheet.scrollTop = 0;
        return;
      }
      if (e.target.closest('.ast-back')) {
        astState = { view: 'list', id: null };
        astRender(sheet, base);
        return;
      }
      var cp = e.target.closest('.ast-copy');
      if (cp) {
        var done = function () { cp.querySelector('span').textContent = t('copied'); };
        try {
          navigator.clipboard.writeText(cp.getAttribute('data-copy')).then(done, function () {});
        } catch (err) { /* clipboard unavailable */ }
      }
    });

    fetch(base + 'data/assistant.json')
      .then(function (r) { return r.json(); })
      .then(function (d) { astData = d; astRender(sheet, base); })
      .catch(function () {
        body.innerHTML = '<p class="ast-empty">' + t('noResults') + '</p>';
      });
  }

  /* ---------------- Compact language switcher ---------------- */

  function setupLangSwitcher() {
    var sw = document.querySelector('.language-switcher');
    if (!sw) {
      return;
    }
    // Capture phase: runs before translations.js' own click handlers.
    sw.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) {
        return;
      }
      if (!sw.classList.contains('open')) {
        e.preventDefault();
        e.stopPropagation();
        sw.classList.add('open');
      } else if (link.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        sw.classList.remove('open');
      }
    }, true);
    document.addEventListener('click', function (e) {
      if (!sw.contains(e.target)) {
        sw.classList.remove('open');
      }
    });
  }

  /* ---------------- Keep language when following internal links ---------------- */

  function propagateLang() {
    document.querySelectorAll('a[href]').forEach(function (a) {
      if (a.closest('.language-switcher')) {
        return;
      }
      var raw = a.getAttribute('href');
      if (!raw || raw.charAt(0) === '#' || /^(mailto|tel|https?):/i.test(raw) && raw.indexOf(location.origin) !== 0) {
        return;
      }
      a.setAttribute('href', withLang(raw));
    });
  }

  /* ---------------- Forms going to reception (Formspree) ---------------- */
  // Only adds hidden metadata; never changes action URLs or field names.

  function setupForms() {
    document.querySelectorAll('form.rms-request-form').forEach(function (form) {
      form.addEventListener('submit', function () {
        var lang = form.querySelector('input[name="guest_language"]');
        if (lang) {
          lang.value = currentLang().toUpperCase();
        }
        var subject = form.querySelector('input[name="_subject"]');
        if (subject) {
          var room = form.querySelector('[name="room_number"], [name="Room Number"]');
          var name = form.querySelector('[name="guest_name"], [name="Passenger Name"]');
          var parts = [form.getAttribute('data-subject') || subject.value];
          if (room && room.value) { parts.push('Room ' + room.value.trim()); }
          if (name && name.value) { parts.push(name.value.trim()); }
          parts.push(currentLang().toUpperCase());
          subject.value = parts.join(' – ');
        }
      });
    });
  }

  /* ---------------- "Today" block (home page) ---------------- */

  function nowInCanary() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: TIMEZONE, hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false
      }).formatToParts(new Date());
      var get = function (type) {
        for (var i = 0; i < parts.length; i++) { if (parts[i].type === type) { return parts[i].value; } }
        return '';
      };
      return { minutes: parseInt(get('hour'), 10) % 24 * 60 + parseInt(get('minute'), 10), weekday: get('weekday') };
    } catch (e) {
      var d = new Date();
      return { minutes: d.getHours() * 60 + d.getMinutes(), weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()] };
    }
  }

  function toMin(hhmm) {
    var p = hhmm.split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }

  function renderToday(base) {
    var box = document.getElementById('rms-today');
    if (!box) {
      return;
    }
    var now = nowInCanary();
    var rows = SCHEDULE.map(function (s) {
      var open = now.minutes >= toMin(s.from) && now.minutes < toMin(s.to);
      var later = now.minutes < toMin(s.from);
      var status = open
        ? '<span class="today-status is-open">' + t('openNow') + '</span>'
        : later
          ? '<span class="today-status">' + t('opensAt') + ' ' + s.from + '</span>'
          : '<span class="today-status is-closed">' + t('closed') + '</span>';
      return '<a class="today-row' + (open ? ' is-open' : '') + '" href="' + withLang(base + s.href) + '">' +
        '<span class="today-name">' + t(s.key) + '</span>' +
        '<span class="today-time">' + s.from + ' – ' + s.to + '</span>' + status + '</a>';
    }).join('');

    var friday = now.weekday === 'Fri'
      ? '<a class="today-promo" href="' + withLang(base + 'MarinaRestaurant/friday-evening.html') + '">' +
        '<span>' + t('friday') + '</span><strong>' + t('fridayCta') + ' →</strong></a>'
      : '';

    box.innerHTML = '<h2>' + t('today') + '</h2>' + friday + '<div class="today-list">' + rows + '</div>';
  }

  /* ---------------- Weather & UV (home page) ---------------- */

  var weatherData = null;

  function weatherKey(code) {
    if (code === 0) { return 'w0'; }
    if (code === 1) { return 'w1'; }
    if (code === 2) { return 'w2'; }
    if (code === 3) { return 'w3'; }
    if (code === 45 || code === 48) { return 'w45'; }
    if (code >= 51 && code <= 57) { return 'w51'; }
    if (code >= 61 && code <= 77) { return 'w61'; }
    if (code >= 80 && code <= 86) { return 'w80'; }
    if (code >= 95) { return 'w95'; }
    return 'w2';
  }

  function uvLevel(uv) {
    if (uv < 3) { return 'Low'; }
    if (uv < 6) { return 'Moderate'; }
    if (uv < 8) { return 'High'; }
    if (uv < 11) { return 'VeryHigh'; }
    return 'Extreme';
  }

  function weatherIcon(code, isDay) {
    var sun = '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
    var moon = '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>';
    var cloud = '<path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.5 2A3 3 0 0 0 7 18z"/>';
    var rain = cloud + '<path d="M9 21l1-2M13 21l1-2"/>';
    var body = code >= 51 ? rain : code >= 3 ? cloud : (isDay ? sun : moon);
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + body + '</svg>';
  }

  function loadWeather() {
    var CACHE = 'rms_weather_v1';
    try {
      var cached = JSON.parse(sessionStorage.getItem(CACHE) || 'null');
      if (cached && Date.now() - cached.t < 30 * 60 * 1000) {
        return Promise.resolve(cached.d);
      }
    } catch (e) { /* storage unavailable */ }

    var tz = encodeURIComponent(TIMEZONE);
    var forecast = 'https://api.open-meteo.com/v1/forecast?latitude=' + LAT + '&longitude=' + LON +
      '&current=temperature_2m,weather_code,wind_speed_10m,is_day&daily=temperature_2m_max,temperature_2m_min,uv_index_max,sunset' +
      '&timezone=' + tz + '&forecast_days=1';
    var marine = 'https://marine-api.open-meteo.com/v1/marine?latitude=28.91&longitude=-13.70&current=sea_surface_temperature&timezone=' + tz;
    var get = function (url) {
      return fetch(url).then(function (r) { if (!r.ok) { throw new Error('weather'); } return r.json(); });
    };
    return Promise.all([get(forecast), get(marine).catch(function () { return null; })]).then(function (res) {
      var f = res[0], m = res[1];
      var d = {
        temp: f.current.temperature_2m, code: f.current.weather_code, isDay: f.current.is_day === 1,
        wind: f.current.wind_speed_10m,
        max: f.daily.temperature_2m_max[0], min: f.daily.temperature_2m_min[0],
        uv: f.daily.uv_index_max[0], sunset: (f.daily.sunset[0] || '').slice(11, 16),
        sea: m && m.current ? m.current.sea_surface_temperature : null
      };
      try { sessionStorage.setItem(CACHE, JSON.stringify({ t: Date.now(), d: d })); } catch (e) { /* ignore */ }
      return d;
    });
  }

  function renderWeather() {
    var box = document.getElementById('rms-weather');
    if (!box || !weatherData) {
      return;
    }
    var d = weatherData;
    var level = uvLevel(d.uv);
    box.innerHTML =
      '<div class="wx-head">' +
        '<div class="wx-now">' + weatherIcon(d.code, d.isDay) +
          '<div><span class="wx-temp">' + Math.round(d.temp) + '°</span>' +
          '<span class="wx-desc">' + t(weatherKey(d.code)) + '</span></div></div>' +
        '<p class="wx-title">' + t('weatherTitle') + '</p>' +
      '</div>' +
      '<div class="wx-uv uv-' + level.toLowerCase() + '">' +
        '<div class="wx-uv-badge"><strong>' + Math.round(d.uv) + '</strong><span>UV</span></div>' +
        '<div><span class="wx-uv-label">' + t('uv') + ' · ' + t('uv' + level) + '</span>' +
        '<span class="wx-uv-tip">' + t('uvTip' + level) + '</span></div>' +
      '</div>' +
      '<div class="wx-grid">' +
        '<div><small>' + t('maxMin') + '</small><span>' + Math.round(d.max) + '° / ' + Math.round(d.min) + '°</span></div>' +
        (d.sea != null ? '<div><small>' + t('sea') + '</small><span>' + Math.round(d.sea) + '°</span></div>' : '') +
        '<div><small>' + t('wind') + '</small><span>' + Math.round(d.wind) + ' km/h</span></div>' +
        (d.sunset ? '<div><small>' + t('sunset') + '</small><span>' + d.sunset + '</span></div>' : '') +
      '</div>';
    box.hidden = false;
  }

  function setupWeather() {
    var box = document.getElementById('rms-weather');
    if (!box) {
      return;
    }
    loadWeather().then(function (d) { weatherData = d; renderWeather(); })
      .catch(function () { box.hidden = true; }); // fail silently: the guide works without it
  }

  /* ---------------- Culture & events (home page) ---------------- */
  // Optional hotel-curated highlights live in data/events.json (see README).

  var curatedEvents = [];

  function loadEvents(base) {
    return fetch(base + 'data/events.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; })
      .then(function (list) {
        var today = new Date().toISOString().slice(0, 10);
        curatedEvents = (Array.isArray(list) ? list : []).filter(function (e) {
          return e && e.date && (e.endDate || e.date) >= today;
        }).sort(function (a, b) { return a.date < b.date ? -1 : 1; }).slice(0, 4);
      });
  }

  function pick(obj) {
    if (!obj) { return ''; }
    if (typeof obj === 'string') { return obj; }
    return obj[currentLang()] || obj.en || obj.es || '';
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderCulture() {
    var box = document.getElementById('rms-culture');
    if (!box) {
      return;
    }
    var lang = currentLang();
    var dateFmt;
    try { dateFmt = new Intl.DateTimeFormat(lang, { day: 'numeric', month: 'short' }); } catch (e) { dateFmt = null; }
    var events = curatedEvents.map(function (e) {
      var d = new Date(e.date + 'T12:00:00');
      var day = dateFmt ? dateFmt.format(d) : e.date;
      var inner = '<span class="ev-date">' + escapeHtml(day) + '</span>' +
        '<span class="ev-body"><strong>' + escapeHtml(pick(e.title)) + '</strong>' +
        '<small>' + escapeHtml([e.time, pick(e.place)].filter(Boolean).join(' · ')) + '</small></span>';
      return e.url && /^https:\/\//.test(e.url)
        ? '<a class="ev" href="' + escapeHtml(e.url) + '" target="_blank" rel="noopener">' + inner + '</a>'
        : '<div class="ev">' + inner + '</div>';
    }).join('');

    box.innerHTML =
      '<h2>' + t('cultureTitle') + '</h2><p class="culture-intro">' + t('cultureText') + '</p>' +
      (events ? '<div class="ev-list">' + events + '</div>' : '') +
      '<div class="culture-links">' +
        '<a href="' + (CACT_URL[lang] || CACT_URL.en) + '" target="_blank" rel="noopener"><strong>' + t('cactTitle') + '</strong><small>' + t('cactText') + '</small><span aria-hidden="true">↗</span></a>' +
        '<a href="' + YAIZA_URL + '" target="_blank" rel="noopener"><strong>' + t('yaizaTitle') + '</strong><small>' + t('yaizaText') + '</small><span aria-hidden="true">↗</span></a>' +
      '</div>' +
      '<p class="culture-note">' + t('askConcierge') + '</p>';
  }

  /* ---------------- Labels ---------------- */

  function applyLabels() {
    document.querySelectorAll('[data-ui]').forEach(function (el) {
      el.textContent = t(el.getAttribute('data-ui'));
    });
    document.querySelectorAll('[data-ui-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-ui-placeholder')));
    });
    var sheet = document.querySelector('.rms-sheet');
    if (sheet && sheet._astReady) {
      astRender(sheet, scriptBase());
    }
  }

  function init() {
    var base = scriptBase();
    buildNav(base);
    setupLangSwitcher();
    setupForms();
    applyLabels();
    propagateLang();
    renderToday(base);
    setupWeather();
    if (document.getElementById('rms-culture')) {
      renderCulture();
      loadEvents(base).then(renderCulture);
    }
    document.addEventListener('rms:translated', function () {
      applyLabels();
      propagateLang();
      renderToday(base);
      renderWeather();
      renderCulture();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
