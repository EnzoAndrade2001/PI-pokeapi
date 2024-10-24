import { pokemonList } from "../constants/constants.js";
import { createModal } from "../modal/modal.js"; // Certifique-se de que está importando corretamente

export function createCard(pokemon) {
    const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2];

    // Tornar a primeira letra do nome maiúscula
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const card = `
        <div class="card" style="width: 18rem;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" class="card-img-top" alt="${pokemonName}">
            <div class="card-body">
                <h5 class="card-title">${pokemonName}</h5>
                <a href="#" class="btn btn-primary" id="view-more-${id}">Ver mais</a>
            </div>
        </div>
    `;

    // Usando insertAdjacentHTML para adicionar o card ao DOM
    pokemonList.insertAdjacentHTML('beforeend', card);

    // Agora o elemento existe no DOM, podemos adicionar o event listener
    const viewMoreButton = document.getElementById(`view-more-${id}`);
    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', (event) => {
            event.preventDefault();
            createModal(pokemon); // Chama a função que abre o modal com os detalhes do Pokémon
        });
    } else {
        console.error(`Botão "Ver mais" para o Pokémon ${pokemonName} não encontrado.`);
    }
}
