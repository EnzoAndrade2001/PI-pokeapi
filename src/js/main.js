import { createCard } from "./card/card.js";
import { listAllPokemons } from "./fetchApi/fetchfunctions.js";
import { pokemonList, searchInput, body } from "./constants/constants.js";
import { showError } from "./errors/errors.js";

console.log("carregou!");

const { count, results } = await listAllPokemons();
console.log("pokemons: (results) ", results);

function displayAllPokemons() {
    pokemonList.innerHTML = '';
    results.forEach((pokemon, index) => {
        createCard(pokemon, index + 1);
    });
}

// Função para filtrar os Pokémons
function filterPokemons(query) {
    const filtered = results.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));
    pokemonList.innerHTML = '';
    if (filtered.length > 0) {
        filtered.forEach((pokemon, index) => createCard(pokemon, index + 1));
    } else {
        showError('Nenhum Pokémon foi encontrado na sua pesquisa.');
    }
}

// Exibe todos os Pokémons inicialmente
displayAllPokemons();

// Eventos de controle de pesquisa
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query === '') {
        displayAllPokemons();
    } else {
        filterPokemons(query);
        pokemonList.style.animationPlayState = 'paused';
    }
});

searchInput.addEventListener('focus', () => {
    body.classList.add('dimmed-background');
    pokemonList.style.animationPlayState = 'paused';
});

searchInput.addEventListener('blur', () => {
    body.classList.remove('dimmed-background');
    pokemonList.style.animation = 'scroll 70s linear infinite';
});

// Variável para rastrear a posição atual
let currentPosition = 0;

// Função para pausar e mover o carrossel durante a rolagem do mouse
pokemonList.addEventListener('wheel', (event) => {
    event.preventDefault();

    const scrollAmount = event.deltaY * 0.5; // Ajusta a sensibilidade do scroll
    currentPosition -= scrollAmount; // Atualiza a posição
    
    pokemonList.style.animation = 'none'; // Pausa a animação CSS
    pokemonList.style.transform = `translateX(${currentPosition}px)`; // Aplica a nova posição
});

// Função para retomar a animação do ponto atual após o mouse sair
pokemonList.addEventListener('mouseleave', () => {
    // Define uma nova animação personalizada com `currentPosition` como ponto de partida
    pokemonList.style.animation = `scrollFrom ${1000}s linear infinite`;
    pokemonList.style.setProperty('--start-position', `${currentPosition}px`);
    pokemonList.style.animationPlayState = 'running';
});

pokemonList.addEventListener('mouseover', () => {
    pokemonList.style.animationPlayState = 'paused';
});

window.addEventListener('load', () => {
    // Define a posição inicial para garantir o início correto da animação
    pokemonList.style.transform = 'translateX(0px)';
    pokemonList.style.setProperty('--start-position', '0px');

    // Aguarda 3 segundos antes de iniciar a animação
    setTimeout(() => {
        pokemonList.style.animation = `scrollFrom 1000s linear infinite`;
        pokemonList.style.animationPlayState = 'running';
    }, 3000); // 3000 ms = 3 segundos
});
