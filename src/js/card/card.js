import { pokemonList } from "../constants/constants.js";
import { createModal } from "../modal/modal.js";

// Contêiner dos favoritos
const favoritesContainer = document.getElementById('favorites-container');
const favoritePokemons = new Set(getFavoritePokemonsFromLocalStorage()); // Para evitar duplicatas
const favoritesTitle = document.getElementById('favorites-title'); // Título dos favoritos

// Carregar favoritos do localStorage
function getFavoritePokemonsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('favoritePokemons')) || [];
}

// Salvar favoritos no localStorage
function saveFavoritePokemonsToLocalStorage() {
    localStorage.setItem('favoritePokemons', JSON.stringify(Array.from(favoritePokemons)));
}

// Verifica se o contêiner de favoritos está vazio e oculta o título se necessário
function updateFavoritesTitleVisibility() {
    favoritesTitle.style.display = favoritesContainer.childElementCount === 0 ? 'none' : 'block';
}

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
            <span class="favorite-icon" style="display: ${favoritePokemons.has(id) ? 'inline' : 'none'}; position: absolute; top: 5px; left: 5px; font-size: 1.5rem; color: gold;">★</span>
        </div>
    `;

    pokemonList.insertAdjacentHTML('beforeend', card);

    const viewMoreButton = document.getElementById(`view-more-${id}`);
    const favoriteButton = document.getElementById(`favorite-${id}`);
    const favoriteIcon = document.querySelector(`#view-more-${id}`).closest(".card").querySelector(".favorite-icon");

    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', (event) => {
            event.preventDefault();
            pokemonList.style.animationPlayState = 'paused';
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
                if (favoritedCard) {
                    favoritedCard.remove();
                }
                saveFavoritePokemonsToLocalStorage();
                updateFavoritesTitleVisibility();
            } else {
                // Adicione o Pokémon aos favoritos
                favoritePokemons.add(id);
                favoriteIcon.style.display = 'inline'; // Mostra a estrela no card do carrossel
                addFavoriteCard(pokemon, id);
                saveFavoritePokemonsToLocalStorage();
                updateFavoritesTitleVisibility();
            }
        });
    }
}

function addFavoriteCard(pokemon, id) {
    const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
    const favoriteCard = `
        <div id="favorited-${id}" class="card card-fav" style="width: 15rem; position: relative;">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" class="card-img-top" alt="${pokemonName}">
            <div class="card-body" style="text-align: center;">
                <h5 class="card-title pokemon-name">${pokemonName}</h5>
                <a href="#" class="btn btn-primary view-more-fav" id="view-more-fav-${id}">Ver mais</a>
                <a href="#" class="btn btn-primary remove-favorite" id="remove-favorite-${id}">Excluir</a>
                 
            </div>
            <span class="favorite-icon" style="position: absolute; top: 5px; left: 5px; font-size: 1.5rem; color: gold;">★</span>
        </div>
    `;

    favoritesContainer.insertAdjacentHTML('beforeend', favoriteCard);
    updateFavoritesTitleVisibility();

    // Configurar evento de clique para o botão "Ver mais" no card de favoritos
    const viewMoreFavButton = document.getElementById(`view-more-fav-${id}`);
    if (viewMoreFavButton) {
        viewMoreFavButton.addEventListener('click', (event) => {
            event.preventDefault();
            createModal(pokemon);
        });
    }

// Configurar evento de clique para remover o favorito
const removeButton = document.getElementById(`remove-favorite-${id}`);
if (removeButton) {
    removeButton.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Remove o Pokémon do Set de favoritos
        favoritePokemons.delete(id);
        saveFavoritePokemonsToLocalStorage();

        // Remove o card de favoritos da interface
        const favoriteCard = document.getElementById(`favorited-${id}`);
        if (favoriteCard) {
            favoriteCard.remove();
        }

        // Remover a estrela no card correspondente no carrossel
        const carouselCard = document.getElementById(`favorite-${id}`).closest(".card");
        if (carouselCard) {
            const favoriteIcon = carouselCard.querySelector(".favorite-icon");
            if (favoriteIcon) {
                favoriteIcon.style.display = 'none'; // Ocultar a estrela no card do carrossel
            }
        }
        updateFavoritesTitleVisibility();
    });
}
}

// Função para buscar dados do Pokémon pela API
async function fetchPokemonDataById(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return { name: data.name, url: `https://pokeapi.co/api/v2/pokemon/${id}/` };
    } catch (error) {
        console.error(`Erro ao buscar dados do Pokémon com ID ${id}:`, error);
    }
}

// Função para remover Pokémon dos favoritos
function removeFavoritePokemon(id) {
    favoritePokemons.delete(id); // Remove do Set
    document.getElementById(`favorited-${id}`).remove(); // Remove o card da interface
    saveFavoritePokemonsToLocalStorage(); // Atualiza o localStorage
}



// Exibir os favoritos salvos no localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    const favoriteIds = getFavoritePokemonsFromLocalStorage();

    // Buscar dados de cada Pokémon favoritado e adicionar ao contêiner de favoritos
    for (const id of favoriteIds) {
        const pokemon = await fetchPokemonDataById(id);
        if (pokemon) {
            addFavoriteCard(pokemon, id);
        }
    }
    updateFavoritesTitleVisibility(); // Ocultar o título se não houver favoritos carregados
});
