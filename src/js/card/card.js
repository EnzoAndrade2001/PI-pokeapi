import { pokemonList } from "../constants/constants.js";
import { createModal } from "../modal/modal.js"; // Certifique-se de que está importando corretamente

// Função para buscar os detalhes do Pokémon, incluindo o texto de descrição
async function fetchPokemonDetails(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const data = await response.json();
    
    // Filtra o texto em português (ou pode usar inglês caso preferir)
    const flavorText = data.flavor_text_entries.find(entry => entry.language.name === 'en');
    
    return flavorText ? flavorText.flavor_text : 'No description available';
}

export function createCard(pokemon) {
    const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2];

    const card = `
        <div class="card" style="width: 18rem;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
                <h5 class="card-title">${pokemon.name}</h5>
                <a href="#" class="btn btn-primary" id="view-more-${id}">Ver mais</a>
            </div>
        </div>
    `;

    // Usando insertAdjacentHTML para adicionar o card ao DOM
    pokemonList.insertAdjacentHTML('beforeend', card);

    // Agora o elemento existe no DOM, podemos adicionar o event listener
    const viewMoreButton = document.getElementById(`view-more-${id}`);
    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', async (event) => {
            event.preventDefault();
            
            try {
                const description = await fetchPokemonDetails(id);
                createModal(pokemon, description); // Passa o Pokémon e sua descrição para o modal
            } catch (error) {
                console.error(`Erro ao buscar detalhes do Pokémon ${pokemon.name}:`, error);
            }
        });
    } else {
        console.error(`Botão "Ver mais" para o Pokémon ${pokemon.name} não encontrado.`);
    }
}
