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
    </div>`;

  const cardContainer = document.getElementById("content");
  cardContainer.innerHTML = card;
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
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error(`PokeAPI pokemonSpeciesUrl is not working`);
    //   }
    //   return response.json();
    // })
    // .then((data) => {
    //   console.log(data);
    //   const evolution_chain = data.evolution_chain.url;
    //   return fetch(evolution_chain);
    // })
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error(`PokeApi evolution_chainURL is not working`);
    //   }
    //   return response.json();
    // })
    // .then((data) => {
    //   console.log(data);
    //   const evolutionOne = data.chain.evolves_to[0].species.name;
    //   const evolutionTwo = data.chain.evolves_to[0].evolves_to[0].species.name;
    //   return Promise.all([
    //     fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionOne}`),
    //     fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionTwo}`),
    //   ]);
    // })
    // .then((responses) => {
    //   if (!responses[0].ok || !responses[1]) {
    //     throw new Error(`pokeApi evolution data not found`);
    //   }
    //   return Promise.all([responses[0].json(), responses[1].json()]);
    // })
    // .then((data) => {
    //   const [evolutionOneData, evolutionTwoData] = data;
    //   const evolutionOne = {
    //     name: evolutionOneData.name,
    //     image: evolutionOneData.sprites.other["official-artwork"].front_default,
    //     id: evolutionOneData.id,
    //   };
    //   const evolutionTwo = {
    //     name: evolutionTwoData.name,
    //     image: evolutionTwoData.sprites.other["official-artwork"].front_default,
    //     id: evolutionTwoData.id,
    //   };
    //   console.log(evolutionOne, evolutionTwo);
    // })

    .catch((error) => console.log(error.message));
};

createPokemonCard(pokemon);
