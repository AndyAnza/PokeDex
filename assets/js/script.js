//single pokemon browser
const browserButton = document.getElementById("button");
const input = document.getElementById("input");

function addCard(id, image, pokeName, style, type, weight, height) {
  const card = `
          <div id="pokeContainer">
            <div id='pokeImage'>
              <img src=${image} />
            </div>
            <p>#${id}</p>
            <h1>${pokeName}</h1>
            <ul class='types'>
              <li style='background-color:${style}'>${type}</li>
            </ul>
            <ul class='measures'>
              <li>Weight:${weight}kg</li>
              <li>Height:${height}m</li>
            </ul>
          </div>
        `;
  const cardContainer = document.getElementById("content");
  cardContainer.innerHTML = card;
  cardContainer.style.display = "block";
}

const getValue = () => {
  let pokemon = document.getElementById("input").value;
  pokemon = pokemon.toLowerCase().split().join();
  pokemonBrowser(pokemon);
};

const pokemonBrowser = (pokemon) => {
  const cardContainer = document.getElementById("content");
  cardContainer.innerHTML = "";
  const miniCardContainer = document.getElementById("miniContainer");
  miniCardContainer.innerHTML = "";
  miniCardContainer.style.display = "none";
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`PokeAPI browser is not working`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const id = data.id;
      const image = data.sprites.other["official-artwork"].front_default;
      const pokeName = data.name;
      const type = data.types[0].type.name;
      let style;
      let weight = data.weight;
      weight = weight * 0.1;
      weight = weight.toFixed(1);
      let height = data.height;
      height = height * 0.1;
      height = height.toFixed(1);

      const pokemonSpecies = data.species.url;

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

      addCard(id, image, pokeName, style, type, weight, height);
      return fetch(pokemonSpecies);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`PokeAPI pokemonSpeciesUrl is not working`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const evolution_chain = data.evolution_chain.url;
      return fetch(evolution_chain);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`PokeApi evolution_chainURL is not working`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const evolutionOne = data.chain.evolves_to[0].species.name;
      const evolutionTwo = data.chain.evolves_to[0].evolves_to[0].species.name;
      return Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionOne}`),
        fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionTwo}`),
      ]);
    })
    .then((responses) => {
      if (!responses[0].ok || !responses[1]) {
        throw new Error(`pokeApi evolution data not found`);
      }
      return Promise.all([responses[0].json(), responses[1].json()]);
    })
    .then((data) => {
      const [evolutionOneData, evolutionTwoData] = data;
      const evolutionOne = {
        name: evolutionOneData.name,
        image: evolutionOneData.sprites.other["official-artwork"].front_default,
        id: evolutionOneData.id,
      };
      const evolutionTwo = {
        name: evolutionTwoData.name,
        image: evolutionTwoData.sprites.other["official-artwork"].front_default,
        id: evolutionTwoData.id,
      };
      console.log(evolutionOne, evolutionTwo);
    })

    .catch((error) => console.log(error.message));
};

browserButton.addEventListener("click", getValue);
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    getValue();
  }
});
