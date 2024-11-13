# PI-pokeapi

Este projeto é uma aplicação de visualização de cartas de Pokémon que inclui funcionalidades para exibir um carrossel de cartas, realizar filtragens por tipo de Pokémon e manipular o carrossel com várias interações.

## Funcionalidades

### 1. Carrossel de Pokémons
- O carrossel exibe cartas de Pokémon que se movem automaticamente da direita para a esquerda.
- **Controle de Parada e Retomada**:
  - O carrossel pausa ao passar o mouse sobre ele e retoma automaticamente ao remover o cursor.
  - O carrossel também para quando o modal (detalhes do Pokémon) é aberto e é retomado após o modal ser fechado.
  - A rolagem pode ser controlada pelo scroll do mouse.

### 2. Filtro de Pokémon por Tipo
- **Seleção de Tipo**: Ao clicar em ícones de tipo (ex.: `Grass`, `Fire`, `Water`), os Pokémon do tipo selecionado são exibidos.
- **Listagem Filtrada**: Os Pokémon aparecem em um layout de lista (`list-view`) para facilitar a visualização após a filtragem.
- **Requisição Dinâmica**: A aplicação busca os dados de Pokémon diretamente da API, exibindo apenas os Pokémon correspondentes ao tipo selecionado.

### 3. Modal com Detalhes do Pokémon
- Ao clicar em "Ver mais" em uma carta de Pokémon, um modal é exibido com detalhes específicos, incluindo:
  - Imagem do Pokémon.
  - Informações detalhadas como altura, peso, habilidades e tipos.
  - Descrição básica.
- **Ajuste do Carrossel**: A exibição do modal pausa automaticamente o carrossel.

### 4. Favoritar Cartas de Pokémon
- **Botão Favoritar**: Cada carta de Pokémon possui um botão "Favoritar" que permite adicionar o Pokémon à lista de favoritos.
- **Armazenamento Local**: Os Pokémon favoritos são armazenados no `localStorage` para persistência entre sessões.
- **Exibição de Favoritos**: Os Pokémon favoritados aparecem em uma seção separada com um ícone de estrela para fácil identificação. Há também uma opção para remover Pokémon dos favoritos.

### 5. Pesquisa de Pokémon
- **Barra de Pesquisa**: A barra de pesquisa permite buscar Pokémon por nome.
- **Resultado em Lista**: Os resultados da pesquisa são exibidos no estilo `list-view`, sem rolagem automática.
- **Escurecimento da Tela**: Quando o foco está na barra de pesquisa, o fundo da página é escurecido para dar ênfase à barra de busca.
- **Mensagem de Erro**: Se nenhum Pokémon correspondente for encontrado, uma mensagem de erro é exibida.

## Requisitos para Execução

- **Node.js** (para gerenciamento de dependências e execução de servidores locais, se necessário).
- **Fetch API**: A aplicação usa a Fetch API para obter dados da PokéAPI.

## Configuração e Uso

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/EnzoAndrade2001/PI-pokeapi.git

