export function createModal(pokemon) {
    const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2];

    // Buscar detalhes do Pokémon na PokeAPI
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => response.json())
        .then(data => {
            // Preencher os detalhes no modal
            document.getElementById('pokemon-img').src = data.sprites.front_default;
            document.getElementById('pokemon-name').textContent = data.name;
            document.getElementById('pokemon-height').textContent = `${data.height / 10} m`;
            document.getElementById('pokemon-weight').textContent = `${data.weight / 10} kg`;

            const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
            document.getElementById('pokemon-types').textContent = types;

            const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
            document.getElementById('pokemon-abilities').textContent = abilities;

            const stats = data.stats.map(stat => `<p><strong>${stat.stat.name}:</strong> ${stat.base_stat}</p>`).join('');
            document.getElementById('pokemon-stats').innerHTML = stats;

            // Inicializar o modal Bootstrap
            const modalElement = document.getElementById('pokemonModal');
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
            modalInstance.show(); // Exibir o modal
        })
        .catch(error => console.error('Erro ao buscar detalhes do Pokémon:', error));
}
