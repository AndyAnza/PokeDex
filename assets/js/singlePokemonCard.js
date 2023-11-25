console.log(window.location.pathname);
const pokemon = localStorage.getItem("Name");
console.log(pokemon);

function addCard(id, image, pokeName, type, type2, weight, height) {
  let card = `
    <div id="pokeContainer">
      <div id='pokeImage'>
        <img src=${image} />
      </div>
      <p>#${id}</p>
      <h1>${pokeName}</h1>
      <ul class='types'>
        <li class='pokemonTypeColor-${type}'>${type}</li>`;

  if (type2 === null) {
    console.log(`This pokemon does not have a second type`);
  } else {
    card += `<li class='pokemonTypeColor-${type2}'>${type2}</li>`;
  }

  card += `
      </ul>
      <ul class='measures'>
        <li>Weight:${weight}kg</li>
        <li>Height:${height}m</li>
      </ul>
    </div>
    <div id='evolutionChainContainer'>
    </div>
    `;
  // <div class='titleContainer'>
  //   <h2>Evolutions</h2>
  // </div>
  const cardContainer = document.getElementById("content");
  cardContainer.innerHTML = card;
}

function addEvolutionCards(image, name, id, type, type2) {
  const evolutionChainContainer = document.getElementById(
    "evolutionChainContainer"
  );
  let evolutionCard = document.createElement("div");
  evolutionCard.className = "evolutionCard";
  let evolutionData = `
      <img src=${image}>
      <div class='name_id'>
        <h3>${name}</h3>
        <h4>#${id}</h4>
      </div>
      <ul class='type'>
        <li class='pokemonTypeColor-${type}'>${type}</li>`;

  if (type2 !== null) {
    evolutionData += `<li class='pokemonTypeColor-${type2}'>${type2}</li>`;
  } else {
    console.log(`this pokemon doesnt have a second type`);
  }

  evolutionData += `</ul>`;
  evolutionCard.innerHTML = evolutionData;
  evolutionChainContainer.appendChild(evolutionCard);
}

const createPokemonCard = (pokemon) => {
  const cardContainer = document.getElementById("content");
  cardContainer.innerHTML = "";

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
      let type2 = null;

      if (data.types[1] !== undefined) {
        type2 = data.types[1].type.name;
      }

      console.log(type);
      console.log(type2);
      let weight = data.weight;
      weight = weight * 0.1;
      weight = weight.toFixed(1);
      let height = data.height;
      height = height * 0.1;
      height = height.toFixed(1);

      const pokemonSpecies = data.species.url;

      addCard(id, image, pokeName, type, type2, weight, height);
      return fetch(pokemonSpecies);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`PokeAPI pokemonSpeciesUrl is not working`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("pokemon species data", data);
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
      console.log("evolution chain data", data);
      const evolutionOne = data.chain.species.name;

      let evolutionTwo = null;
      if (data.chain.evolves_to[0] !== undefined) {
        evolutionTwo = data.chain.evolves_to[0].species.name;
      } else {
        console.log("this pokemon doesnt have a second evolution");
      }

      let evolutionThree = null;
      if (data.chain.evolves_to[0].evolves_to[0] !== undefined) {
        evolutionThree = data.chain.evolves_to[0].evolves_to[0].species.name;
      } else {
        console.log("this pokemon doesnt have a third evolution");
      }
      console.log(evolutionOne);
      console.log(evolutionTwo);
      console.log(evolutionThree);

      if (evolutionTwo && evolutionThree !== null) {
        const fetchPromises = [
          fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionOne}`),
          fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionTwo}`),
          fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionThree}`),
        ];
        return Promise.allSettled(fetchPromises);
      } else if (evolutionTwo !== null) {
        const fetchPromises = [
          fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionOne}`),
          fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionTwo}`),
        ];
        return Promise.allSettled(fetchPromises);
      } else {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionOne}`);
      }
    })
    .then((responses) => {
      const parsedResponses = responses.map((response) => {
        if (response.status === "fulfilled") {
          return response.value.json(); // Parse JSON for fulfilled promises
        }
        // Handle rejected promises if needed
        return null; // For simplicity, returning null for rejected promises
      });

      return Promise.all(parsedResponses);
    })
    .then((data) => {
      console.log(data);
      function bla(num) {
        for (let i = 0; i <= num; i++) {
          const evolutionData = data[i];
          const image =
            evolutionData.sprites.other["official-artwork"].front_default;
          const name = evolutionData.name;
          function addLeadingZeros(number, length) {
            return String(number).padStart(length, 0);
          }
          let id = evolutionData.id;
          id = addLeadingZeros(id, 3);
          const type = evolutionData.types[0].type.name;
          let type2 = null;

          if (evolutionData.types[1] !== undefined) {
            type2 = evolutionData.types[1].type.name;
          }
          addEvolutionCards(image, name, id, type, type2);
        }
      }
      bla(8);
    })

    .catch((error) => console.error(error.message));
};

createPokemonCard(pokemon);
