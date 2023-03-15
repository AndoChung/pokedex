const pokemonCount = 151;
let pokedex = {};

let hpBar = document.getElementById("hp-bar-graph");
let attackBar = document.getElementById("attack-bar-graph");
let defenseBar = document.getElementById("defense-bar-graph");
let spAttackBar = document.getElementById("sp-attack-bar-graph");
let spDefenseBar = document.getElementById("sp-defense-bar-graph");
let speedBar = document.getElementById("speed-bar-graph");

const hpMax = 250;
const attackMax = 134;
const defenseMax = 180;
const spAttackMax = 154;
const spDefenseMax = 125;
const speedMax = 150;
let pokemonList = document.getElementById("pokemon-list")

window.onload = async function() {
    hpBar.style.width = (45 * 600/hpMax).toString() + "px";
    attackBar.style.width = (49 * 600/attackMax).toString() + "px";
    defenseBar.style.width = (49 * 600/defenseMax).toString() + "px";
    spAttackBar.style.width = (49 * 600/spAttackMax).toString() + "px";
    spDefenseBar.style.width = (49 * 600/spDefenseMax).toString() + "px";
    speedBar.style.width = (49 * 600/speedMax).toString() + "px";
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);
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
        "name": name,
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
    pokedex[id] = {
        "name": name,
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
    }

    if (type2 !== undefined) {
        pokedex[name]["type2"] = type2;
    }
}

let body = document.querySelector("body");
let leftArrow = document.getElementById("left-arrow-div");
let rightArrow = document.getElementById("right-arrow-div");
let input = document.querySelector("input");
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
let type1 = document.getElementById("pokemon-type");
let typeImage = document.getElementById("pokemon-type-image");



let previousPokemon3 = document.getElementById("3-previous-pokemon");
let previousPokemon2 = document.getElementById("2-previous-pokemon");
let previousPokemon1 = document.getElementById("1-previous-pokemon");
let currPokemon = document.getElementById("current-pokemon");
let nextPokemon1 = document.getElementById("1-next-pokemon");
let nextPokemon2 = document.getElementById("2-next-pokemon");
let nextPokemon3 = document.getElementById("3-next-pokemon");

rightArrow.addEventListener("click", () => {
    generatePokemon(nextPokemon1.innerText.toLowerCase())
})

leftArrow.addEventListener("click", () => {
    generatePokemon(previousPokemon1.innerText.toLowerCase())
})


button.addEventListener("click" , () => {
    generatePokemon(input.value.toLowerCase())
    input.value = "";
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        generatePokemon(input.value.toLowerCase())
        input.value = "";
    }
})


previousPokemon1.addEventListener("click", () => {
    generatePokemon(previousPokemon1.innerText.toLowerCase())
})
previousPokemon2.addEventListener("click", () => {
    generatePokemon(previousPokemon2.innerText.toLowerCase())
})
previousPokemon3.addEventListener("click", () => {
    generatePokemon(previousPokemon3.innerText.toLowerCase())
})
currPokemon.addEventListener("click", () => {
    generatePokemon(currPokemon.innerText.toLowerCase())
})
nextPokemon1.addEventListener("click", () => {
    generatePokemon(nextPokemon1.innerText.toLowerCase())
})
nextPokemon2.addEventListener("click", () => {
    generatePokemon(nextPokemon2.innerText.toLowerCase())
})
nextPokemon3.addEventListener("click", () => {
    generatePokemon(nextPokemon3.innerText.toLowerCase())
})


function generatePokemon(currentPokemon) {
    heightDecimeter = pokedex[currentPokemon]["height"];
    height.innerText = (heightDecimeter / 10).toString() + " m";
    
    weightHectogram = pokedex[currentPokemon]["weight"];
    weight.innerText = (weightHectogram / 10).toString() + " kg";
    ability.innerText = pokedex[currentPokemon]["ability"][0].toUpperCase() + pokedex[currentPokemon]["ability"].slice(1);
    id.innerText = pokedex[currentPokemon]["id"];

    if (Number(id.innerText) < 10) {
        id.innerText = "#00" + id.innerText.toString();
    } else if (Number(id.innerText) < 100) {
        id.innerText = "#0" + id.innerText.toString();
    } else {
        id.innerText = "#" + id.innerText.toString();
    }
    pokeName.innerText = pokedex[currentPokemon]["name"][0].toUpperCase() + pokedex[currentPokemon]["name"].slice(1);

    image.src = pokedex[currentPokemon]["image"];

    hp.innerText = pokedex[currentPokemon]["hp"];
    attack.innerText = pokedex[currentPokemon]["attack"];
    defense.innerText = pokedex[currentPokemon]["defense"];
    spAttack.innerText = pokedex[currentPokemon]["spAttack"];
    spDefense.innerText = pokedex[currentPokemon]["spDefense"];
    speed.innerText = pokedex[currentPokemon]["speed"];
    type1.innerText = pokedex[currentPokemon]["type1"].toUpperCase();

    typeImage.src = `imgs/type-${type1.innerText}.png`

    let hpBarWidth = ((hp.innerText/hpMax) * 600)
    hpBar.style.width = hpBarWidth.toString() + "px";

    let attackBarWidth = ((attack.innerText/attackMax) * 600)
    attackBar.style.width = attackBarWidth.toString() + "px";

    let defenseBarWidth = ((defense.innerText/defenseMax) * 600)
    defenseBar.style.width = defenseBarWidth.toString() + "px";

    let spAttackBarWidth = ((spAttack.innerText/spAttackMax) * 600)
    spAttackBar.style.width = spAttackBarWidth.toString() + "px";

    let spDefenseBarWidth = ((spDefense.innerText/spDefenseMax) * 600)
    spDefenseBar.style.width = spDefenseBarWidth.toString() + "px";

    let speedBarWidth = ((speed.innerText/speedMax) * 600)
    speedBar.style.width = speedBarWidth.toString() + "px";

    switch (type1.innerText) {
        case("BUG"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(196, 231, 130), rgb(52, 105, 45))"
            break;
        case("DARK"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(78, 75, 73), rgb(24, 18, 10))"
            break;
        case("DRAGON"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(113, 55, 219), rgb(44, 18, 105))"
            break;
        case("ELECTRIC"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(219, 223, 164), rgb(110, 109, 33))"
            break;
        case("FAIRY"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(225, 193, 238), rgb(121, 84, 146))"
            break;
        case("FIGHTING"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(231, 143, 71), rgb(107, 27, 13))"
            break;
        case("FIRE"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(204, 116, 94), rgb(126, 24, 24))"
            break;
        case("FLYING"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(207, 207, 207), rgb(87, 87, 87))"
            break;
        case("GHOST"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(80, 4, 131), rgb(41, 12, 58))"
            break;
        case("GRASS"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(133, 194, 138), rgb(31, 70, 25))"
            break;
        case("GROUND"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(119, 77, 37), rgb(49, 24, 7))"
            break;
        case("ICE"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(162, 209, 231), rgb(70, 167, 180))"
            break;
        case("NORMAL"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(207, 207, 207), rgb(87, 87, 87))"
            break;
        case("POISON"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(141, 8, 112), rgb(56, 11, 58))"
            break;
        case("PSYCHIC"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(236, 120, 240), rgb(110, 46, 110))"
            break;
        case("ROCK"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(235, 185, 121), rgb(97, 73, 22))"
            break;
        case("STEEL"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(109, 109, 109), rgb(44, 44, 44))"
            break;
        case("WATER"):
            body.style.backgroundImage = "linear-gradient(180deg, rgb(108, 153, 236), rgb(37, 56, 138))"
            break;
    }

    let currPokemonString = pokedex[currentPokemon]["name"];
    currPokemon.innerText = currPokemonString[0].toUpperCase() + currPokemonString.slice(1);

    if (pokedex[currentPokemon]["id"] < 151) {
        let nextPokemon1String = pokedex[pokedex[currentPokemon]["id"] + 1]["name"];
        nextPokemon1.innerText = nextPokemon1String[0].toUpperCase() + nextPokemon1String.slice(1);
    } else {
        nextPokemon1.innerText = "";
    }

    if (pokedex[currentPokemon]["id"] < 150) {
        let nextPokemon2String = pokedex[pokedex[currentPokemon]["id"] + 2]["name"];
        nextPokemon2.innerText = nextPokemon2String[0].toUpperCase() + nextPokemon2String.slice(1);
    } else {
        nextPokemon2.innerText = "";
    }

    if (pokedex[currentPokemon]["id"] < 149) {
        let nextPokemon3String = pokedex[pokedex[currentPokemon]["id"] + 3]["name"];
        nextPokemon3.innerText = nextPokemon3String[0].toUpperCase() + nextPokemon3String.slice(1);
    } else {
        nextPokemon3.innerText = "";
    }

    if (pokedex[currentPokemon]["id"] > 1) {
        let previousPokemon1String = pokedex[pokedex[currentPokemon]["id"] - 1]["name"];
        previousPokemon1.innerText = previousPokemon1String[0].toUpperCase() + previousPokemon1String.slice(1);
    } else {
        previousPokemon1.innerText = "";
    }
    
    if (pokedex[currentPokemon]["id"] > 2) {
        let previousPokemon2String = pokedex[pokedex[currentPokemon]["id"] - 2]["name"];
        previousPokemon2.innerText = previousPokemon2String[0].toUpperCase() + previousPokemon2String.slice(1);
    } else {
        previousPokemon2.innerText = "";
    }
    
    if (pokedex[currentPokemon]["id"] > 3) {
        let previousPokemon3String = pokedex[pokedex[currentPokemon]["id"] - 3]["name"];
        previousPokemon3.innerText = previousPokemon3String[0].toUpperCase() + previousPokemon3String.slice(1);
    } else {
        previousPokemon3.innerText = "";
    }
}
