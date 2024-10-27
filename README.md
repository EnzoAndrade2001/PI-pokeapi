

# PI Poke API

Este é um projeto de uma *Pokedex em carrossel* que exibe cards de Pokémons, permite pesquisar por nome, apresenta informações adicionais ao clicar em "Ver Mais", e é controlado de forma dinâmica com animações e transições. A interface responsiva e interativa foi criada para ser usada como referência para projetos de animação e manipulação de DOM com CSS e JavaScript.

## Funcionalidades

### 1. Exibição Contínua de Cards no Carrossel
   - O carrossel exibe uma lista de cards de Pokémons, cada um contendo uma imagem e um botão “Ver Mais” para mais detalhes.
   - A rolagem é contínua, permitindo que os cards se movam automaticamente da direita para a esquerda, criando uma animação infinita.

#### Código Principal de Animação
   css
   /* Animação de rolagem do carrossel */
   
   @keyframes scroll {
   
       0% {
           transform: translateX(0);
       }
       100% {
           transform: translateX(-100%);
       }
   }

   .carousel-track {
   
       display: inline-flex;
       animation: scroll 80s linear infinite;
       animation-play-state: running;
   }
   
   - *animation-play-state: running;*: A animação inicia automaticamente, permitindo a rotação contínua dos cards.

### 2. Controle Dinâmico da Animação
   - A animação do carrossel é pausada ao clicar no botão “Ver Mais” ou ao focar na barra de pesquisa.
   - Quando o foco sai da barra de pesquisa ou o modal é fechado, a animação do carrossel retoma do ponto onde parou.

#### Pausa e Retomada da Animação
   js
   const searchInput = document.querySelector('input[type="search"]');
   
   const track = document.getElementById('carousel-track');

   // Pausa a animação ao focar na barra de pesquisa
   searchInput.addEventListener('focus', () => {
       track.style.animationPlayState = 'paused';
   });

   // Retoma a animação ao perder o foco
   searchInput.addEventListener('blur', () => {
       track.style.animationPlayState = 'running';
   });
   

### 3. Barra de Pesquisa com Filtro Dinâmico
   - Ao digitar o nome de um Pokémon na barra de pesquisa, a lista de cards é filtrada em tempo real.
   - Se nenhum Pokémon correspondente for encontrado, uma mensagem de erro aparece.

#### Código de Filtragem da Pesquisa
   js
   function filterPokemons(query) {
   
       const filtered = results.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));
       pokemonList.innerHTML = '';
       if (filtered.length > 0) {
           filtered.forEach(createCard);
       } else {
           showError('Nenhum Pokémon foi encontrado.');
       }
   }

   searchInput.addEventListener('input', (e) => {
   
       const query = e.target.value;
       if (query === '') {
           displayAllPokemons();
       } else {
           filterPokemons(query);
       }
   });
   

### 4. Modal com Detalhes do Pokémon
   - Ao clicar no botão “Ver Mais” de qualquer card, um modal é exibido com detalhes do Pokémon, incluindo uma imagem maior e mais informações.
   - O modal possui um botão de fechar que permite retornar ao carrossel sem perder o ponto de rolagem.

#### Código Principal do Modal
   js
   function createModal(pokemon) {
   
       const modal = document.createElement('div');
       modal.classList.add('modal');
       modal.innerHTML = `
           <div class="modal-content">
               <span class="close-modal">&times;</span>
               <img src="${pokemon.image}" alt="${pokemon.name}">
               <h2>${pokemon.name}</h2>
               <p>${pokemon.details}</p>
           </div>
       `;
       
       document.body.appendChild(modal);
       modal.querySelector('.close-modal').addEventListener('click', () => {
           modal.remove();
           track.style.animationPlayState = 'running';
       });
   }
   

### 5. Controle da Rolagem do Carrossel com o Scroll do Mouse
   - O movimento do scroll do mouse é capturado para mover o carrossel horizontalmente: rolar para cima move os cards para a direita, e rolar para baixo move para a esquerda.
   - A velocidade da rotação do mouse também controla a velocidade do movimento dos cards.

#### Código de Controle do Scroll Horizontal
   js
   let currentPosition = 0;
   pokemonList.addEventListener('wheel', (event) => {
       event.preventDefault();
       const scrollAmount = event.deltaY * 0.5;
       currentPosition += (event.deltaY > 0 ? -scrollAmount : scrollAmount);
       track.style.transform = `translateX(${currentPosition}px)`;
   });
   

## Como Rodar o Projeto

### Pré-requisitos

- *Node.js* e *npm* (caso haja necessidade de dependências)
- Editor de texto (como *VSCode*)

### Instalação

1. Clone o repositório:
   bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   
2. Navegue até o diretório do projeto:
   bash
   cd nome-do-repositorio
   

3. Abra o arquivo index.html em um navegador para visualizar a aplicação.

## Tecnologias Usadas
- *HTML5* para a estrutura da página.
- *CSS3* para estilização e animações.
- *JavaScript* para manipulação de DOM e controle das animações.




## Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch para a feature ou correção: git checkout -b minha-feature.
3. Faça commit das suas mudanças: git commit -m 'Adiciona nova feature'.
4. Envie para o GitHub: git push origin minha-feature.
5. Abra um Pull Request.
