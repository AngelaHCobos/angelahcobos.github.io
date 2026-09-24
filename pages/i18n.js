(function () {
    function setLang(lang) {
        lang = lang === 'en' ? 'en' : 'es';
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-en]').forEach(function (el) {
            if (lang === 'en') {
                if (el.dataset.es === undefined) el.dataset.es = el.textContent;
                el.textContent = el.dataset.en;
            } else if (el.dataset.es !== undefined) {
                el.textContent = el.dataset.es;
            }
        });

        document.querySelectorAll('[data-alt-en]').forEach(function (el) {
            if (lang === 'en') {
                if (el.dataset.altEs === undefined) el.dataset.altEs = el.getAttribute('alt') || '';
                el.setAttribute('alt', el.dataset.altEn);
            } else if (el.dataset.altEs !== undefined) {
                el.setAttribute('alt', el.dataset.altEs);
            }
        });

        document.querySelectorAll('.lang-toggle').forEach(function (btn) {
            btn.textContent = lang === 'en' ? 'ES' : 'EN';
            btn.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
        });

        try { localStorage.setItem('idioma', lang); } catch (e) { }
    }

    function initLang() {
        var saved = 'es';
        try { saved = localStorage.getItem('idioma') || 'es'; } catch (e) { }
        setLang(saved);

        document.querySelectorAll('.lang-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var current = document.documentElement.lang === 'en' ? 'en' : 'es';
                setLang(current === 'en' ? 'es' : 'en');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLang);
    } else {
        initLang();
    }
})();
