export function initFilterByType() {
    const carouselTrack = document.getElementById('carousel-track');
    const typeLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function filterPokemonsByType(type) {
        const cards = carouselTrack.querySelectorAll('.card');
        cards.forEach(card => {
            const cardTypes = card.getAttribute('data-types').split(',');
            if (type === 'all' || cardTypes.includes(type)) {
                card.style.display = 'inline-block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    typeLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const type = event.target.getAttribute('data-type');
            filterPokemonsByType(type);
        });
    });
}
