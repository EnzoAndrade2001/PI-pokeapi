import { pokemonList } from "../constants/constants.js"



export function createCard(pokemon, index) {

    console.log(pokemon);

    const card = `<div class="card" style="width: 18rem;">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <p class="card-text"></p>
                        <a href="${pokemon.url}" class="btn btn-primary">Ver mais</a>
                    </div>
                </div>`

    pokemonList.innerHTML += card;
}
