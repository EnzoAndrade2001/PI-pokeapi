import { pokemonList } from "../constants/constants.js";
import { createModal } from "../modal/modal.js"; // Certifique-se de que está importando corretamente

export function createCard(pokemon) {
    const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2];
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const card = `
        <div class="card" style="width: 15rem;"> <!-- Diminuindo a largura -->
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" class="card-img-top" alt="${pokemonName}">
            <div class="card-body" style="text-align: center;">
                <h5 class="card-title pokemon-name">${pokemonName}</h5>
                <a href="#" class="btn btn-primary" id="view-more-${id}">Ver mais</a>
                <a href="#" class="btn btn-favorite" id="favorite-${id}">Favoritar</a>
            </div>
        </div>
    `;

    // Usando insertAdjacentHTML para adicionar o card ao DOM
    pokemonList.insertAdjacentHTML('beforeend', card);

    // Adicionando eventos aos botões
    const viewMoreButton = document.getElementById(`view-more-${id}`);
    const favoriteButton = document.getElementById(`favorite-${id}`);

    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', (event) => {
            event.preventDefault();
            createModal(pokemon);
        });
    }

    if (favoriteButton) {
        favoriteButton.addEventListener('click', (event) => {
            event.preventDefault();
            alert(`${pokemonName} adicionado aos favoritos!`);
        });
    }
}

