import { pokemonList } from "./constants/constants.js";
import { createCard } from "./card/card.js";

// Seleciona todos os ícones de tipos
const typeIcons = document.querySelectorAll('.type');

// Adiciona o evento de clique para cada ícone de tipo
typeIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        // Extrai o tipo do Pokémon da classe do ícone (ex.: "ghost", "poison")
        const type = icon.classList[1]; 
        if (type === 'all') {
            // Mostra todos os Pokémon se o tipo "all" for clicado
            displayAllPokemons();
        } else {
            // Filtra por tipo
            filterPokemonsByType(type);
        }
    });
});

// Função para buscar e exibir os Pokémon de um tipo específico
async function filterPokemonsByType(type) {
    try {
        // Faz a requisição para buscar Pokémon de um tipo específico
        const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await response.json();

        // Limpa a lista atual
        pokemonList.innerHTML = '';
        pokemonList.classList.add('list-view'); // Aplica o estilo list-view

        // Itera sobre os Pokémon do tipo especificado e cria os cards
        const pokemonDataPromises = data.pokemon.map(async (pokemonEntry) => {
            // Busca os detalhes de cada Pokémon individual
            const pokemonResponse = await fetch(pokemonEntry.pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return pokemonData;
        });

        // Aguarda todas as requisições dos Pokémon e cria os cards
        const pokemonDataList = await Promise.all(pokemonDataPromises);
        pokemonDataList.forEach(pokemonData => {
            createCard(pokemonData); // Gera um card para cada Pokémon
        });
    } catch (error) {
        console.error("Erro ao buscar Pokémon pelo tipo:", error);
    }
}

// Função para exibir todos os Pokémon, caso o ícone "all" seja clicado
async function displayAllPokemons() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
        const data = await response.json();

        // Limpa a lista atual
        pokemonList.innerHTML = '';
        pokemonList.classList.add('list-view');

        // Itera sobre todos os Pokémon e cria os cards
        const pokemonDataPromises = data.results.map(async (pokemonEntry) => {
            const pokemonResponse = await fetch(pokemonEntry.url);
            const pokemonData = await pokemonResponse.json();
            return pokemonData;
        });

        // Aguarda todas as requisições dos Pokémon e cria os cards
        const pokemonDataList = await Promise.all(pokemonDataPromises);
        pokemonDataList.forEach(pokemonData => {
            createCard(pokemonData);
        });
    } catch (error) {
        console.error("Erro ao buscar todos os Pokémon:", error);
    }
}

/*
Bulbasaur
"types":[{"slot":1,"type":{"name":"grass","url":"https://pokeapi.co/api/v2/type/12/"}},{"slot":2,"type":{"name":"poison","url":"https://pokeapi.co/api/v2/type/4/"}}],"weight":69}

---- GRASS
{"name":"grass","url":"https://pokeapi.co/api/v2/type/12/"}
---- POISON
{"name":"poison","url":"https://pokeapi.co/api/v2/type/4/"}
*/