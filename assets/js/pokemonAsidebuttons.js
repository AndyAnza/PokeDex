// all pokemon
const pokedexButton = document.getElementById("buttonPokeDex");
const cardContainer = document.getElementById("content");
const normalBtn = document.getElementById("normalBtn");
const fireBtn = document.getElementById("fireBtn");
const waterBtn = document.getElementById("waterBtn");
const electricBTn = document.getElementById("electricBTn");
const grassBtn = document.getElementById("grassBtn");
const iceBtn = document.getElementById("iceBtn");
const fightingBtn = document.getElementById("fightingBtn");
const poisonBtn = document.getElementById("poisonBtn");
const groundBtn = document.getElementById("groundBtn");
const flyingBtn = document.getElementById("flyingBtn");
const psychicBtn = document.getElementById("psychicBtn");
const bugBtn = document.getElementById("bugBtn");
const rockBtn = document.getElementById("rockBtn");
const ghostBtn = document.getElementById("ghostBtn");
const dragonBtn = document.getElementById("dragonBtn");
const darkBtn = document.getElementById("darkBtn");
const steelBtn = document.getElementById("steelBtn");
const fairyBtn = document.getElementById("fairyBtn");
let firstGenPokeNumber = 151;

function addMiniCards(image, id, pokeName, rawPokeName, type) {
  const miniCard = document.createElement("div"); //mini tarjetas
  miniCard.classList.add("mini-card");
  miniCard.classList.add(`pokemonTypeColor-${type}`);

  miniCard.innerHTML = `
    <img src=${image} class="pokemonContainer" data-pokemon-name=${rawPokeName}/>
    <h1><span>#${id}</span> ${pokeName}</h1>
    `;

  const miniCardContainer = document.getElementById("miniContainer");
  miniCardContainer.appendChild(miniCard);
  const pokemonContainer = miniCard.querySelector(".pokemonContainer");
  pokemonContainer.addEventListener("click", redirectToPokemonInfo);
}

//Fetch All pokemon Generation 1
let getFirstGen = async (pokemon) => {
  const miniCardContainer = document.getElementById("miniContainer");
  miniCardContainer.innerHTML = "";
  for (let i = 1; i <= pokemon; i++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      if (!response.ok) {
        throw new Error(`Something went wrong with PokeApi`);
      }
      const data = await response.json();
      function addLeadingZeros(number, length) {
        return String(number).padStart(length, 0);
      }
      let id = data.id;
      id = addLeadingZeros(id, 3);
      let rawPokeName = data.name;
      let pokeName = data.name;
      const image = data.sprites.other["official-artwork"].front_default;
      const type = data.types[0].type.name;

      addMiniCards(image, id, pokeName, rawPokeName, type);
    } catch (error) {
      console.error(error.message);
    }
  }
};
pokedexButton.addEventListener("click", () => getFirstGen(firstGenPokeNumber));

//Fetch all pokemon by type Function
const getPokemonByType = async (typeNum) => {
  const miniCardContainer = document.getElementById("miniContainer");
  miniCardContainer.innerHTML = "";
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${typeNum}`);
    if (!response.ok) {
      throw new Error(`pokeApi type is not working`);
    }
    const data = await response.json();
    let pokemonList = data.pokemon;
    console.log(pokemonList);
    const pokemonNames = pokemonList.map((pokemon) => pokemon.pokemon.name);
    console.log(pokemonNames);
    for (let i = 0; i < pokemonNames.length; i++) {
      const pokemonName = pokemonNames[i];
      console.log(pokemonName);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
        );
        if (!response.ok) {
          throw new Error(`Something went wrong with PokeApi`);
        }
        const data = await response.json();

        function addLeadingZeros(number, length) {
          return String(number).padStart(length, 0);
        }
        let id = data.id;
        id = addLeadingZeros(id, 3);
        let rawPokeName = data.name;
        let pokeName = data.name;
        const image = data.sprites.other["official-artwork"].front_default;
        const type = data.types[0].type.name;
        addMiniCards(image, id, pokeName, rawPokeName, type);
      } catch (error) {
        console.error(error.message);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

normalBtn.addEventListener("click", () => getPokemonByType(1));
fightingBtn.addEventListener("click", () => getPokemonByType(2));
flyingBtn.addEventListener("click", () => getPokemonByType(3));
poisonBtn.addEventListener("click", () => getPokemonByType(4));
groundBtn.addEventListener("click", () => getPokemonByType(5));
rockBtn.addEventListener("click", () => getPokemonByType(6));
bugBtn.addEventListener("click", () => getPokemonByType(7));
ghostBtn.addEventListener("click", () => getPokemonByType(8));
steelBtn.addEventListener("click", () => getPokemonByType(9));
fireBtn.addEventListener("click", () => getPokemonByType(10));
waterBtn.addEventListener("click", () => getPokemonByType(11));
grassBtn.addEventListener("click", () => getPokemonByType(12));
electricBTn.addEventListener("click", () => getPokemonByType(13));
psychicBtn.addEventListener("click", () => getPokemonByType(14));
iceBtn.addEventListener("click", () => getPokemonByType(15));
dragonBtn.addEventListener("click", () => getPokemonByType(16));
darkBtn.addEventListener("click", () => getPokemonByType(17));
fairyBtn.addEventListener("click", () => getPokemonByType(18));

const redirectToPokemonInfo = (event) => {
  const pokemonName = event.currentTarget.dataset.pokemonName;
  const modifiedName = pokemonName.slice(0, -1);
  localStorage.setItem("Name", modifiedName);
  window.location.href = `pokemonInfo.html?name=${pokemonName}`;
};

getFirstGen(firstGenPokeNumber);
