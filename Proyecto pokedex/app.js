/**
 * A partir del siguiente archivo: https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json
Crea un pokédex, es decir una página web donde puedas consultar pokemones, y leer información sobre cada pokemon que se muestre.
La página web debe:
Mostrar una lista en tarjetas de todos los pokemones en el json. Las tarjetas deben mostrar el nombre y tipo de cada Pokémon (tipo agua, tipo fuego, tipo venenoso, etc.)
Permitir que, al hacer click sobre la tarjeta de un pokemon, se despliegue más información, como el peso, sus movimientos (ataques), etc. De preferencia empleando un modal.
El sitio web debe tener un buscador de pokemones, donde puedas filtrar pokemones por nombre.
Cosas a tener en cuenta:
Diseño libre (Bootstrap, materialize, o tu propio css)
Uso de clases e instancias.
EcmaScript 6
Repo en Github (Github pages es un plus)
 */

//paso 1 crea variables que llamen a elementos de html con queryselector

const form = document.querySelector('form');
const inputText = document.querySelector('input[type="text"]');
const main = document.querySelector('main');
const conteinerTarjet = document.querySelector('conteinerTarjet');

// crear variables con las URL para buscar el elemento en este caso un pokemon

const URL_BASE = 'https://pokeapi.co/api/v2/pokemon/';

function renderError(status) {
    main.innerHTML = (`
      <h1>
      <span class="country">Error ${status}</span>
      </h1>
      <p>No encontramos ese pokemon. Intenta de nuevo</p>
        `)
}

function renderPokemon(data) {
    main.innerHTML = (`
       <h1>
            <span class="pokemon">${data.forms[0].name}</span>
            <span class="tipo">${data.types[0].type.name}</span>
        </h1>
        <div class="tarjet" id="dex">
            <div class="dates" id="conteinerTarjet">
                <p>Name:${data.name}</p>
                <p>Principal ability:${data.abilities[0].ability.name}</p>
                <p>Moves:${data.moves[0].move.name},${data.moves[1].move.name},${data.moves[2].move.name}</p>
                <p>Weight:${data.weight} kg</p>
            </div>
        <img src=${data.sprites.front_default} alt="image, pokemon pikachu" id="imagePokemon">
        </div>
     
        `);
 
}

async function getPokemon(url) {
    const response = await fetch(url);
    console.log(response)

    if(!response.ok){
        renderError(response.status);
        return undefined;
    }
    const data = await response.json();
    return data;
   
    
}

async function submitHandler(e) {
    // para solucionar que cada que se da enter se recargue la pagina automaticamente, utilizamos un prevent default
    e.preventDefault();
    const inputValue = inputText.value;
    const pokeName = inputValue.toLowerCase();
    const url = `${URL_BASE}${pokeName}`;

    const pokeData = await getPokemon(url);
    if(!pokeData) return;

    renderPokemon(pokeData);


    
}



form.addEventListener('submit', (e) => submitHandler(e));

