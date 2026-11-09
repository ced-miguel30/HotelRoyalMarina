# HotelRoyalMarina

Guía digital para huéspedes de Royal Marina Suites (GitHub Pages).

## Formularios conectados a recepción (no tocar)

- `transfer.html` → Formspree `meewgnrn`
- `MarinaRestaurant/breakfast-in-suite.html` → Formspree `xgojoqkj`

No cambiar el `action` ni los atributos `name` de los campos. Los `value` de los desplegables
están en inglés a propósito: el huésped ve su idioma y recepción recibe siempre el mismo texto.

## Agenda cultural destacada (`data/events.json`)

La portada muestra hasta 4 eventos futuros de este archivo, además de los enlaces a la
agenda de los CACT y del Ayuntamiento de Yaiza. Si el archivo está vacío (`[]`) solo se ven los enlaces.
Los eventos pasados se ocultan solos.

```json
[
  {
    "date": "2026-11-07",
    "endDate": "2026-11-07",
    "time": "19:00",
    "title": { "es": "Concierto al atardecer", "en": "Sunset concert", "de": "...", "it": "...", "fr": "..." },
    "place": { "es": "Mirador de Femés", "en": "Femés viewpoint" },
    "url": "https://..."
  }
]
```

`endDate`, `time`, `place` y `url` son opcionales. Si falta un idioma se usa el inglés.

## Tiempo e índice UV

Datos en directo de Open-Meteo (sin clave). Si la API no responde, el bloque no se muestra.

## Asistente de preguntas (`data/assistant.json`)

Se abre con el botón **Ayuda** de la barra inferior. Sin IA: solo muestra respuestas escritas aquí.

- `featured`: preguntas que se ven al abrir (ids).
- Cada pregunta: `id`, `q` (pregunta en en/es/de/it/fr), `a` (respuesta, admite `<strong>` y `<br>`),
  `keywords` (palabras en cualquier idioma con las que debe aparecer al escribir),
  `actions` (botones: `{"href": "pagina.html", "label": {...}}` o `{"type": "call"}`),
  `related` (ids de las preguntas sugeridas después de responder) y `copy` opcional (texto a copiar).
- Si cambia un horario o un precio, actualízalo también aquí.

## Al publicar cambios de textos

Sube el valor de `CONTENT_VERSION` en `js/translations.js` (por ejemplo `2026-11-05-3`).
Así los móviles descargan enseguida los textos nuevos de `lang/` y `data/` en lugar de usar la copia guardada.
