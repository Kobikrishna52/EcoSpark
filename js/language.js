
document.addEventListener('DOMContentLoaded', function () {
    const lang = localStorage.getItem('selectedLanguage') || 'en';
    if (lang) {
        // Set the language in Google Translate
        const translateElement = new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'hi,ta,te,bn,ml,gu,mr,kn,pa,ur'
        });
        translateElement.setEnabledLanguage(lang);

    }
});
