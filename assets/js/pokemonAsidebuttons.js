const firstGenBtn = document.getElementById("buttonPokeDex");
const cardContainer = document.getElementById("content");
const buttonSearchBar = document.getElementById("buttonSearchBar");
const inputSearchBar = document.getElementById("inputSearchBar");
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

const fetchAndCreatePokemonCard = async (pokemonNameOrId) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`
    );
    if (!response.ok) {
      throw new Error(`Something went wrong with fetching Pokemon data`);
    }
    const data = await response.json();

    function addLeadingZeros(number, length) {
      return String(number).padStart(length, 0);
    }

    const id = addLeadingZeros(data.id, 3);
    const rawPokeName = data.name;
    const pokeName = data.name;
    const image = data.sprites.other["official-artwork"].front_default;
    const type = data.types[0].type.name;

    addMiniCards(image, id, pokeName, rawPokeName, type);
  } catch (error) {
    console.error(error);
  }
};

const getSearchBarValue = () => {
  const inputSearchBar = document.getElementById("inputSearchBar");
  let inputValue = inputSearchBar.value;
  inputValue = inputValue.toLowerCase().split().join();
  console.log(`inputValiue: `, inputValue);
  return inputValue;
};
//Fetch pokemon by name or id
const filterPokemonByName = async (pokemonNameOrId) => {
  const miniCardContainer = document.getElementById("miniContainer");
  miniCardContainer.innerHTML = "";
  await fetchAndCreatePokemonCard(pokemonNameOrId);
};

buttonSearchBar.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  filterPokemonByName(getSearchBarValue());
});

inputSearchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    event.stopPropagation();
    filterPokemonByName(getSearchBarValue());
  }
});

//Fetch All pokemon Generation 1
const getFirstGen = async (pokemon) => {
  const miniCardContainer = document.getElementById("miniContainer");
  miniCardContainer.innerHTML = "";
  for (let i = 1; i <= pokemon; i++) {
    await fetchAndCreatePokemonCard(i);
  }
};
firstGenBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  getFirstGen(firstGenPokeNumber);
});

//Fetch all pokemon by type Function
const getPokemonByType = async (typeNum) => {
  try {
    const miniCardContainer = document.getElementById("miniContainer");
    miniCardContainer.innerHTML = "";
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
      await fetchAndCreatePokemonCard(pokemonName);
    }
  } catch (error) {
    console.log(error.message);
  }
};

function typeButtonConstructorAndHandler(buttonName, type) {
  const button = document.getElementById(buttonName);
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await getPokemonByType(type);
    } catch (error) {
      console.error(error);
    }
  });
}

const typeInfoArray = [
  ["normalBtn", 1],
  ["fightingBtn", 2],
  ["flyingBtn", 3],
  ["poisonBtn", 4],
  ["groundBtn", 5],
  ["rockBtn", 6],
  ["bugBtn", 7],
  ["ghostBtn", 8],
  ["steelBtn", 9],
  ["fireBtn", 10],
  ["waterBtn", 11],
  ["grassBtn", 12],
  ["electricBtn", 13],
  ["psychicBtn", 14],
  ["iceBtn", 15],
  ["dragonBtn", 16],
  ["darkBtn", 17],
  ["fairyBtn", 18],
];
typeInfoArray.forEach(([name, id]) => {
  typeButtonConstructorAndHandler(name, id);
});

//redirects to single pokemon card page
const redirectToPokemonInfo = (event) => {
  const pokemonName = event.currentTarget.dataset.pokemonName;
  const modifiedName = pokemonName.slice(0, -1);
  localStorage.setItem("Name", modifiedName);
  window.location.href = `pokemonInfo.html?name=${pokemonName}`;
};

//loads first gen card by default
getFirstGen(firstGenPokeNumber);
