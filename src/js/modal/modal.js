//import { pokemonList } from "../constants/constants.js";
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

            // Tipos do Pokémon
            const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
            document.getElementById('pokemon-types').textContent = types;

            // Habilidades do Pokémon
            const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
            document.getElementById('pokemon-abilities').textContent = abilities;

            // Estatísticas do Pokémon
            const stats = data.stats.map(stat => `<p><strong>${stat.stat.name}:</strong> ${stat.base_stat}</p>`).join('');
            document.getElementById('pokemon-stats').innerHTML = stats;

            // Inicializar o modal Bootstrap (usando a instância global do Bootstrap já carregada via CDN)
            const modalElement = document.getElementById('pokemonModal');
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
            
            modalInstance.show(); // Abre o modal

            //Para o carrossel para não distrair a visão do modal
            //pokemonList.style.animationPlayState = 'paused';
        })
        .catch(error => console.error('Erro ao buscar detalhes do Pokémon:', error));
}
