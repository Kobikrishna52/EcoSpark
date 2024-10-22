window.gtranslateSettings = { "default_language": "en", "detect_browser_language": true, "languages": ["en", "ta", "ml", "hi", "ur", "ja", "te", "kn"], "wrapper_selector": ".gtranslate_wrapper", "switcher_horizontal_position": "inline", "float_switcher_open_direction": "left", "alt_flags": { "en": "usa" } }

function setLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    window.location.href = window.location.pathname + '?lang=' + lang; // Redirect with language parameter
}

// On page load, check for language in localStorage and apply it
document.addEventListener('DOMContentLoaded', function () {
    const storedLanguage = localStorage.getItem('selectedLanguage');

    if (storedLanguage) {
        // Set the selected language in GTranslate
        window.gtranslateSettings.selected_language = storedLanguage;
        // Redirect to the same language if the page is loaded without a lang parameter
        if (!window.location.search.includes('lang=')) {
            window.location.href = window.location.pathname + '?lang=' + storedLanguage;
        }
    }
});