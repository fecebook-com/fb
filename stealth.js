// stealth.js - Anti-detection script (opzionale)

(function() {
    'use strict';
    
    // Meta tags per sicurezza
    function injectMetaTags() {
        const robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        robotsMeta.content = 'noindex, nofollow';
        document.head.appendChild(robotsMeta);
        
        const ratingMeta = document.createElement('meta');
        ratingMeta.name = 'rating';
        ratingMeta.content = 'safe for kids';
        document.head.appendChild(ratingMeta);
    }

    // Honeypot fields per trappola bot
    function addHoneypotFields() {
        const forms = document.querySelectorAll('form');
        forms.forEach((form) => {
            const honeypot = document.createElement('input');
            honeypot.type = 'text';
            honeypot.name = 'field_' + Math.random().toString(36).substring(7);
            honeypot.style.display = 'none';
            honeypot.style.opacity = '0';
            honeypot.style.position = 'absolute';
            honeypot.style.top = '-9999px';
            honeypot.style.left = '-9999px';
            honeypot.setAttribute('aria-hidden', 'true');
            honeypot.tabIndex = -1;
            form.appendChild(honeypot);
        });
    }

    // Inizializza
    function initStealth() {
        injectMetaTags();
        addHoneypotFields();
        console.log('✅ Stealth mode activated');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initStealth);
    } else {
        initStealth();
    }

})();