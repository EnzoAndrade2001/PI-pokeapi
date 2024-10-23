import { createCard } from "./card/card.js";
import { listAllPokemons } from "./fetchApi/fetchfunctions.js";
import { pokemonList, searchInput, body } from "./constants/constants.js";
import { showError } from "./errors/errors.js";

console.log("carregou!");

const{count, results} = await listAllPokemons();

console.log("pokemons: (results) ", results);

function displayAllPokemons() {
    pokemonList.innerHTML = ''; // Limpa a lista de pokémons exibida
    results.forEach((pokemon, index) => {
        createCard(pokemon, index + 1); // Cria um card para cada Pokémon
    });
}

// Função para filtrar os Pokémons
function filterPokemons(query) {
    const filtered = results.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));
    pokemonList.innerHTML = ''; // Limpa a lista de pokémons
    if (filtered.length > 0) {
        filtered.forEach((pokemon, index) => createCard(pokemon, index + 1)); // Exibe os Pokémons filtrados
    } else {
        showError('Nenhum Pokémon foi encontrado na sua pesquisa.'); // Exibe mensagem de erro se nenhum Pokémon for encontrado
    }
}

// Exibe todos os Pokémons inicialmente
//displayAllPokemons();

// Adiciona evento de busca na barra de pesquisa
searchInput.addEventListener('input', (e) => {
    const query = e.target.value; // Captura o texto digitado pelo usuário
    if (query === '') {
        displayAllPokemons(); // Se a barra estiver vazia, exibe todos os Pokémons
    } else {
        filterPokemons(query); // Caso contrário, filtra os Pokémons
    }
});

// Escurecer o fundo quando a barra de pesquisa estiver em foco
searchInput.addEventListener('focus', () => {
    body.classList.add('dimmed-background');
});

// Remover o escurecimento quando a barra de pesquisa perder o foco
searchInput.addEventListener('blur', () => {
    body.classList.remove('dimmed-background');
});


// Adiciona as imagens ao carrossel
function populateCarousel(pokemons) {
    const carouselContent = document.getElementById('carousel-content');
    carouselContent.innerHTML = ''; // Limpa o conteúdo existente

    pokemons.forEach((pokemon, index) => {
        const id = pokemon.url.split("/")[pokemon.url.split("/").length - 2];
        const isActive = index === 0 ? 'active' : ''; // Define a primeira imagem como ativa
        
        const carouselItem = createCard(pokemon, index + 1);
        `
            <div class="carousel-item ${isActive}">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" class="d-block w-100" alt="${pokemon.name}">
            </div>
        `;
        carouselContent.innerHTML += carouselItem;
    });
}

// Popula o carrossel com os Pokémon
populateCarousel(results);

