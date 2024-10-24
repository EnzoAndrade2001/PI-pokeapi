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
displayAllPokemons();

// Adiciona evento de busca na barra de pesquisa
searchInput.addEventListener('input', (e) => {
    const query = e.target.value; // Captura o texto digitado pelo usuário
    //pokemonList.style.animationPlayState = 'paused';
    if (query === '') {
        displayAllPokemons(); // Se a barra estiver vazia, exibe todos os Pokémons
    } else {
        filterPokemons(query); // Caso contrário, filtra os Pokémons
        pokemonList.style.animationPlayState = 'paused';
    }
});

// Escurecer o fundo quando a barra de pesquisa estiver em foco
searchInput.addEventListener('focus', () => {
    body.classList.add('dimmed-background');
    //pokemonList.style.animation = 'none';
    pokemonList.style.animationPlayState = 'paused';
});

// Remover o escurecimento quando a barra de pesquisa perder o foco
searchInput.addEventListener('blur', () => {
    body.classList.remove('dimmed-background');
    pokemonList.style.animation = 'scroll 70s linear infinite';
});

// Carrossel para com mouse em cima
pokemonList.addEventListener('mouseover', () => {
    //const carrossel = event.target;
    pokemonList.style.animationPlayState = 'paused';
});

// Carrossel retoma com mouse fora
pokemonList.addEventListener('mouseleave', () => {
    //const carrossel = event.target;
    pokemonList.style.animation = 'scroll 70s linear infinite';
    pokemonList.style.animationPlayState = 'running';
});

//Controle da direção do slide
pokemonList.addEventListener('wheel', (event) => {
    event.preventDefault(); // Evita o comportamento padrão de scroll vertical

    if (event.deltaY > 0) {
        console.log('Rodinha do mouse rolando para baixo'); // Scroll para baixo
        pokemonList.style.animation = 'scroll 20s linear infinite reverse';
        
    } else {
        console.log('Rodinha do mouse rolando para cima'); // Scroll para cima
        pokemonList.style.animation = 'scroll 20s linear infinite';
    }
});