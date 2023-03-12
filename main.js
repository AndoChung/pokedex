const pokemonCount = 151;
let pokedex = {};

let pokemonList = document.getElementById("pokemon-list")

window.onload = async function() {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
    }
    for (let i in pokedex) {
        let listItem = document.createElement("li");
        listItem.innerText = i;
        pokemonList.appendChild(listItem)
    }
}





async function getPokemon(num) {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + num.toString();
    const response = await fetch(url);
    const pokemon = await response.json();

    // if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${pokemon.status}`)
    // }
    
    let name = pokemon.name;
    let id = pokemon.id;
    let height = pokemon.height;
    let weight = pokemon.weight
    let ability = pokemon.abilities[0].ability.name;
    let hp = pokemon.stats[0].base_stat;
    let attack = pokemon.stats[1].base_stat;
    let defense = pokemon.stats[2].base_stat;
    let spAttack = pokemon.stats[3].base_stat;
    let spDefense = pokemon.stats[4].base_stat;
    let speed = pokemon.stats[5].base_stat;
    let type1; let type2;
    if (pokemon.types.length === 2) {
        type1 = pokemon.types[0].type.name
        type2 = pokemon.types[1].type.name
    } else {
        type1 = pokemon.types[0].type.name
    }
    let image = pokemon.sprites.other["official-artwork"].front_default;
    pokedex[name] = {
        "id": id,
        "height": height,
        "weight": weight,
        "ability": ability,
        "hp": hp,
        "attack": attack,
        "defense": defense,
        "spAttack": spAttack,
        "spDefense": spDefense,
        "speed": speed,
        "type1": type1,
        "image": image
    };

    if (type2 !== undefined) {
        pokedex[name]["type2"] = type2;
    }
}


console.log(pokedex);

let input = document.querySelector("input")
let button = document.querySelector("button");

let id = document.getElementById("pokemon-id");
let pokeName = document.getElementById("pokemon-name");
let height = document.getElementById("pokemon-height");
let weight = document.getElementById("pokemon-weight");
let ability = document.getElementById("pokemon-ability");


let image = document.getElementById("pokemon-image")

let hp = document.getElementById("hp-stat");
let attack = document.getElementById("attack-stat");
let defense = document.getElementById("defense-stat");
let spAttack = document.getElementById("sp-attack-stat");
let spDefense = document.getElementById("sp-defense-stat");
let speed = document.getElementById("speed-stat");


button.addEventListener("click" , () => {
    currentPokemon = input.value.toLowerCase();
    height.innerText = pokedex[currentPokemon]["height"];
    weight.innerText = pokedex[currentPokemon]["weight"];
    ability.innerText = pokedex[currentPokemon]["ability"][0].toUpperCase() + pokedex[currentPokemon]["ability"].slice(1);
    id.innerText = pokedex[currentPokemon]["id"];

    pokeName.innerText = currentPokemon[0].toUpperCase() + currentPokemon.slice(1);

    image.src = pokedex[currentPokemon]["image"];

    hp.innerText = pokedex[currentPokemon]["hp"];
    attack.innerText = pokedex[currentPokemon]["attack"];
    defense.innerText = pokedex[currentPokemon]["defense"];
    spAttack.innerText = pokedex[currentPokemon]["spAttack"];
    spDefense.innerText = pokedex[currentPokemon]["spDefense"];
    speed.innerText = pokedex[currentPokemon]["speed"];
})


console.log(pokedex[1])