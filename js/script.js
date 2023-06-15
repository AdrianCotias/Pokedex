const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

// configuração de pesquisa dos pokemons e condição para resposta
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}

// configuração de renderização de pokemon pesquisado e pokemon não encontrado
const renderPokemon = async (pokemon) => {
 
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    // configuraçaõ de locaização de pokemons no site da API
    if (data)  {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        
    }
}
// configuração de transformação de formas erradas de pesquisa para a forma correta
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

// configurações do botão anterior
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
})

// configuração do botão proximo
buttonNext.addEventListener('click', () => {
   searchPokemon += 1;
   renderPokemon(searchPokemon);

})
 

renderPokemon(searchPokemon);
