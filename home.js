document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.onsubmit = function(event) {
        // Opțional: Aici poți adăuga validare client-side
        alert('Formularul a fost trimis. Te vom contacta în curând!');
    };
});