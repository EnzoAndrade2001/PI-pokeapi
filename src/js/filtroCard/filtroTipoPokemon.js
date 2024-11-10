import { pokemonList, typeIcons, favList } from "../constants/constants.js";
import { createCard } from "../card/card.js";
import { scrollHandler } from "../main.js";

const typeIdMap = {
    bug: 7,
    dark: 17,
    dragon: 16,
    electric: 13,
    fairy: 18,
    fighting: 2,
    fire: 10,
    flying: 3,
    ghost: 8,
    grass: 12,
    ground: 5,
    ice: 15,
    normal: 1,
    poison: 4,
    psychic: 14,
    rock: 6,
    steel: 9,
    water: 11,
    // Adicione outros tipos conforme necessário
};

// Atribui o evento de clique para cada ícone
export async function pokemonsTipo(){
    await typeIcons.forEach(icon => {
        icon.addEventListener('click',async () => {
            
            console.log("clicou");
            // Extrai o tipo da segunda classe do ícone
            const typeName = icon.classList[1]; 
            const typeId = typeIdMap[typeName]; // Obtém o ID do tipo usando o mapeamento
    
            if (typeId) {
                console.log(`Filtrando Pokémon do tipo: ${typeName} (ID: ${typeId})`);
                await filterPokemonsByType(typeId); // Chama a função com o ID correto
            }
        });
    });
}


// Função para buscar e exibir os Pokémon de um tipo específico
async function filterPokemonsByType(typeId) {
    try {
        // Faz a requisição para buscar Pokémon de um tipo específico
        const response = await fetch(`https://pokeapi.co/api/v2/type/${typeId}/`);
        console.log("filterPokemonsByType", response);
        const data = await response.json();
        console.log("data: ", data)
        // Limpa a lista atual
        pokemonList.innerHTML = '';
        pokemonList.style = '';
        pokemonList.style.animationPlayState = 'paused';
        pokemonList.removeEventListener('wheel', scrollHandler);
        favList.style.display = 'none';
        pokemonList.classList.add('list-view'); // Aplica o estilo list-view
        data.pokemon.forEach(pokemonData => {
            console.log("pokemonData: ", pokemonData.pokemon)
            createCard(pokemonData.pokemon); // Gera um card para cada Pokémon
        });
    } catch (error) {
        console.error("Erro ao buscar Pokémon pelo tipo:", error);
    }
}


/*
Bulbasaur
"types":[{"slot":1,"type":{"name":"grass","url":"https://pokeapi.co/api/v2/type/12/"}},{"slot":2,"type":{"name":"poison","url":"https://pokeapi.co/api/v2/type/4/"}}],"weight":69}

---- GRASS
{"name":"grass","url":"https://pokeapi.co/api/v2/type/12/"}
---- POISON
{"name":"poison","url":"https://pokeapi.co/api/v2/type/4/"}
---- ELECTRIC
{"name":"electric","url":"https://pokeapi.co/api/v2/type/13/"}
*/