import { pokemonList } from "../constants/constants.js";
import { createModal } from "../modal/modal.js";

// Contêiner dos favoritos
const favoritesContainer = document.getElementById('favorites-container');
const favoritePokemons = new Set(); // Para evitar duplicatas

export function createCard(pokemon) {
    const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2];
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const card = `
        <div class="card" style="width: 15rem; position: relative;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" class="card-img-top" alt="${pokemonName}">
            <div class="card-body" style="text-align: center;">
                <h5 class="card-title pokemon-name">${pokemonName}</h5>
                <a href="#" class="btn btn-primary" id="view-more-${id}">Ver mais</a>
                <a href="#" class="btn btn-favorite" id="favorite-${id}">Favoritar</a>
            </div>
            <span class="favorite-icon" style="display: none; position: absolute; top: 5px; left: 5px; font-size: 1.5rem; color: gold;">★</span>
        </div>
    `;

    pokemonList.insertAdjacentHTML('beforeend', card);

    const viewMoreButton = document.getElementById(`view-more-${id}`);
    const favoriteButton = document.getElementById(`favorite-${id}`);
    const favoriteIcon = document.querySelector(`#view-more-${id}`).closest(".card").querySelector(".favorite-icon");

    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', (event) => {
            event.preventDefault();
            createModal(pokemon);
        });
    }

    if (favoriteButton) {
        favoriteButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Se o Pokémon já for favorito, remova-o
            if (favoritePokemons.has(id)) {
                favoritePokemons.delete(id);
                favoriteIcon.style.display = 'none'; // Remove a estrela no card do carrossel
                const favoritedCard = document.getElementById(`favorited-${id}`);
                favoritedCard.remove();
            } else {
                // Adicione o Pokémon aos favoritos
                favoritePokemons.add(id);
                favoriteIcon.style.display = 'inline'; // Mostra a estrela no card do carrossel
                addFavoriteCard(pokemon, id);
            }
        });
    }
}

function addFavoriteCard(pokemon, id) {
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    const favoriteCard = `
        <div id="favorited-${id}" class="card" style="width: 15rem;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" class="card-img-top" alt="${pokemonName}">
            <div class="card-body" style="text-align: center;">
                <h5 class="card-title pokemon-name">${pokemonName}</h5>
            </div>
        </div>
    `;

    favoritesContainer.insertAdjacentHTML('beforeend', favoriteCard);
}
