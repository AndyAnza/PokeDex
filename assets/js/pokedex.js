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
let pokedex = 151;

function addMiniCards(style, image, id, pokeName) {
  const miniCard = document.createElement("div");
  miniCard.classList.add("mini-card"); // Optionally, add a class for styling

  miniCard.innerHTML = `
  <div style="background-color:${style}">
    <img src=${image} />
    <h1><span>#${id}</span> ${pokeName}</h1>
  </div>
    `;

  const miniCardContainer = document.getElementById("miniContainer");
  miniCardContainer.appendChild(miniCard);
}

const backgroundColorFunction = (type) => {
  switch (type) {
    case "normal":
      style = "#A8A878";
      break;
    case "fire":
      style = "#F08030";
      break;
    case "water":
      style = "#6890F0";
      break;
    case "electric":
      style = "#F8D030";
      break;
    case "grass":
      style = "#78C850";
      break;
    case "ice":
      style = "#98D8D8";
      break;
    case "fighting":
      style = "#C03028";
      break;
    case "poison":
      style = "#A040A0";
      break;
    case "ground":
      style = "#E0C068";
      break;
    case "flying":
      style = "#A890F0";
      break;
    case "psychic":
      style = "#F85888";
      break;
    case "bug":
      style = "#A8B820";
      break;
    case "rock":
      style = "#B8A038";
      break;
    case "ghost":
      style = "#705898";
      break;
    case "dragon":
      style = "#7038F8";
      break;
    case "dark":
      style = "#705848";
      break;
    case "steel":
      style = "#B8B8D0";
      break;
    case "fairy":
      style = "#EE99AC";
      break;
    default:
      style = "white";
      break;
  }
};

let pokedexStart = async (pokedex) => {
  cardContainer.display = "none";
  for (let i = 1; i <= pokedex; i++) {
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

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      let pokeName = data.name;
      pokeName = capitalizeFirstLetter(pokeName);

      const image = data.sprites.other["official-artwork"].front_default;
      const type = data.types[0].type.name;

      backgroundColorFunction(type);
      addMiniCards(style, image, id, pokeName);
    } catch (error) {
      console.error(error.message);
    }
  }
};
pokedexButton.addEventListener("click", () => pokedexStart(pokedex));

const pokeTypeFunction = async (typeNum) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${typeNum}`);
    if (!response.ok) {
      throw new Error(`pokeApi type is not working`);
    }
    const data = await response.json();
    console.log(data);
    console.log(data.name);
    let pokemonList = data.pokemon;
    console.log(pokemonList);
    const pokemonNames = pokemonList.map((pokemon) => pokemon.pokemon.name);
    console.log(pokemonNames);
    const pokemonUrls = pokemonList.map((pokemon) => pokemon.pokemon.url);
    console.log(pokemonUrls);
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

        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
        let pokeName = data.name;
        pokeName = capitalizeFirstLetter(pokeName);

        const image = data.sprites.other["official-artwork"].front_default;
        const type = data.types[0].type.name;

        backgroundColorFunction(type);
        addMiniCards(style, image, id, pokeName);
      } catch (error) {
        console.error(error.message);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

normalBtn.addEventListener("click", () => pokeTypeFunction(1));
fightingBtn.addEventListener("click", () => pokeTypeFunction(2));
flyingBtn.addEventListener("click", () => pokeTypeFunction(3));
poisonBtn.addEventListener("click", () => pokeTypeFunction(4));
groundBtn.addEventListener("click", () => pokeTypeFunction(5));
rockBtn.addEventListener("click", () => pokeTypeFunction(6));
bugBtn.addEventListener("click", () => pokeTypeFunction(7));
ghostBtn.addEventListener("click", () => pokeTypeFunction(8));
steelBtn.addEventListener("click", () => pokeTypeFunction(9));
fireBtn.addEventListener("click", () => pokeTypeFunction(10));
waterBtn.addEventListener("click", () => pokeTypeFunction(11));
grassBtn.addEventListener("click", () => pokeTypeFunction(12));
electricBTn.addEventListener("click", () => pokeTypeFunction(13));
psychicBtn.addEventListener("click", () => pokeTypeFunction(14));
iceBtn.addEventListener("click", () => pokeTypeFunction(15));
dragonBtn.addEventListener("click", () => pokeTypeFunction(16));
darkBtn.addEventListener("click", () => pokeTypeFunction(17));
fairyBtn.addEventListener("click", () => pokeTypeFunction(18));
