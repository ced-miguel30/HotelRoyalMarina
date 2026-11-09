(function () {
  'use strict';

  var DEFAULT_LANG = 'en';
  var STORAGE_KEY = 'hrm_lang';
  var SUPPORTED_LANGS = ['en', 'es', 'de', 'it', 'fr'];
  // Bump on every publish so phones don't keep old texts for 10 minutes.
  var CONTENT_VERSION = '2026-11-05-3';
  window.RMS_CONTENT_VERSION = CONTENT_VERSION;

  function getScriptElement() {
    return (
      document.currentScript ||
      document.querySelector('script[src*="translations.js"]')
    );
  }

  function getLangUrl(lang) {
    var script = getScriptElement();
    if (!script || !script.src) {
      return 'lang/' + lang + '.json?v=' + CONTENT_VERSION;
    }
    return new URL('../lang/' + lang + '.json?v=' + CONTENT_VERSION, script.src).href;
  }

  function normalizeLang(lang) {
    if (!lang) {
      return null;
    }
    lang = lang.toLowerCase();
    return SUPPORTED_LANGS.indexOf(lang) !== -1 ? lang : null;
  }

  function getCurrentLang() {
    var params = new URLSearchParams(window.location.search);
    var urlLang = normalizeLang(params.get('lang'));

    if (urlLang) {
      try {
        localStorage.setItem(STORAGE_KEY, urlLang);
      } catch (error) {
        // Ignore storage errors and continue with URL language.
      }
      return urlLang;
    }

    try {
      var storedLang = normalizeLang(localStorage.getItem(STORAGE_KEY));
      if (storedLang) {
        return storedLang;
      }
    } catch (error) {
      // Ignore storage errors and fall back to default language.
    }

    // First visit: use the guest's device language when we support it.
    var browserLangs = (navigator.languages && navigator.languages.length)
      ? navigator.languages
      : [navigator.language || ''];
    for (var i = 0; i < browserLangs.length; i++) {
      var detected = normalizeLang(String(browserLangs[i]).slice(0, 2));
      if (detected) {
        return detected;
      }
    }

    return DEFAULT_LANG;
  }

  function getNestedValue(obj, key) {
    if (!obj || !key) {
      return undefined;
    }
    return key.split('.').reduce(function (current, part) {
      return current && Object.prototype.hasOwnProperty.call(current, part)
        ? current[part]
        : undefined;
    }, obj);
  }

  function containsHtml(value) {
    return typeof value === 'string' && /<\/?[a-z][\s\S]*>/i.test(value);
  }

  function applyValue(element, value) {
    if (value == null) {
      return;
    }

    if (containsHtml(value)) {
      element.innerHTML = value;
      return;
    }

    element.textContent = value;
  }

  function applyTranslations(translations, lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (element) {
      var key = element.getAttribute('data-i18n');
      applyValue(element, getNestedValue(translations, key));
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (element) {
      var key = element.getAttribute('data-i18n-html');
      var value = getNestedValue(translations, key);
      if (value != null) {
        element.innerHTML = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (element) {
      var key = element.getAttribute('data-i18n-placeholder');
      var value = getNestedValue(translations, key);
      if (value != null) {
        element.setAttribute('placeholder', value);
      }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (element) {
      var key = element.getAttribute('data-i18n-alt');
      var value = getNestedValue(translations, key);
      if (value != null) {
        element.setAttribute('alt', value);
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (element) {
      var key = element.getAttribute('data-i18n-title');
      var value = getNestedValue(translations, key);
      if (value != null) {
        element.setAttribute('title', value);
      }
    });

    var titleElement = document.querySelector('title[data-i18n]');
    if (titleElement) {
      var titleKey = titleElement.getAttribute('data-i18n');
      var titleValue = getNestedValue(translations, titleKey);
      if (titleValue != null) {
        document.title = titleValue;
      }
    }

    document.documentElement.lang = lang;
    updateLanguageSwitcher(lang);
    document.dispatchEvent(new CustomEvent('rms:translated', { detail: { lang: lang } }));
  }

  function updateLanguageSwitcher(activeLang) {
    document.querySelectorAll('.language-switcher [data-lang]').forEach(function (link) {
      var lang = normalizeLang(link.getAttribute('data-lang'));
      link.classList.toggle('active', lang === activeLang);
      link.setAttribute('aria-current', lang === activeLang ? 'true' : 'false');
    });
  }

  function setupLanguageSwitcher() {
    document.querySelectorAll('.language-switcher [data-lang]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var lang = normalizeLang(link.getAttribute('data-lang'));
        if (!lang) {
          return;
        }

        event.preventDefault();

        try {
          localStorage.setItem(STORAGE_KEY, lang);
        } catch (error) {
          // Ignore storage errors and continue with URL update.
        }

        var url = new URL(window.location.href);
        // Always keep the language in the URL so it survives browsers that
        // block storage (e.g. Safari inside the guia.royalmarinasuites.com iframe).
        url.searchParams.set('lang', lang);
        window.location.href = url.toString();
      });
    });
  }

  function init() {
    var lang = getCurrentLang();
    window.RMS_LANG = lang;
    setupLanguageSwitcher();
    updateLanguageSwitcher(lang);

    fetch(getLangUrl(lang))
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Translation file not found');
        }
        return response.json();
      })
      .then(function (translations) {
        applyTranslations(translations, lang);
      })
      .catch(function () {
        if (lang !== DEFAULT_LANG) {
          fetch(getLangUrl(DEFAULT_LANG))
            .then(function (response) {
              if (!response.ok) {
                throw new Error('Fallback translation file not found');
              }
              return response.json();
            })
            .then(function (translations) {
              applyTranslations(translations, DEFAULT_LANG);
            })
            .catch(function () {
              // Keep fallback text in HTML when translations cannot be loaded.
            });
          return;
        }
        // Keep fallback text in HTML when translations cannot be loaded.
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
