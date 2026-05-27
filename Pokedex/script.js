const body = document.getElementById('body'); 
const listWrapper = document.getElementById('list-wrapper');
const searchInput = document.getElementById('search-input');
const numberFilter = document.getElementById('number');
const nameFilter = document.getElementById('name');
const notFoundMessage = document.getElementById('not-found-message');
const imgWrapInnerHtml = document.getElementById('img-wrap');
let bigCardBackgroundContainer = document.getElementById('big-card-background-container');
const bigCardContainer = document.getElementById('big-card-container');
const bigPokemonCardHead = document.getElementById('big-card-container-card-head');
const bigPokemonCardBody = document.getElementById('big-card-container-card-body');
const bigPokemonCardHeaderDetails = document.getElementById('big-card-headline-wrap');
const bigPokemonCardDetails = document.getElementById('big-card-details-div');
const arrowDiv = document.getElementById('arrow-forward-backward-div');
let searchTimeout;
let allPokemons = [];

function init() {
    fetchPokemonData();
}

async function fetchPokemonData() {
    try {
        showPokeballLoader();
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${allPokemons.length}`);
        let data = await response.json();
        let newPokemons = data.results;
        await displayPokemons(newPokemons);
        const lastIndex = allPokemons.length - 1;
        let lastItem = document.getElementById(`list-item${lastIndex}`);
        if (lastItem) {
            setTimeout(() => { hidePokeballLoader(); }, 100);
        }
    } catch (error) {
        console.error("Could not fetch Pokemon Data");
    }
}

async function displayPokemons(newPokemons) {
    for (let i = 0; i < newPokemons.length; i++) {
        const pokemon = newPokemons[i];
        const fullData = await getPokemonData(pokemon.url);
        allPokemons.push(fullData);
        // Hier wird nur der Index übergeben
        listWrapper.innerHTML += createPokemonTemplates(allPokemons.length - 1);
    }
    checkPokemonTypeForCssStyleAll();
}

async function getPokemonData(pokemonUrl) {
    const response = await fetch(pokemonUrl);
    const data = await response.json();
    const PokemonData = {
        pokemonID: data.id,
        pokemonName: data.name,
        pokemonImage: data.sprites.other.dream_world.front_default || "placeholder.png",
        pokemonType: data.types[0].type.name,
        pokemonTypeSecond: data.types[1]?.type.name || "unknown",
        pokemonHeight: data.height,
        pokemonWeight: data.weight,
        pokemonAbilitieOne: data.abilities[0].ability.name,
        pokemonAbilitieTwo: data.abilities[1]?.ability.name || "unknown",
        pokemonHp: data.stats[0].base_stat,
        pokemonAttack: data.stats[1].base_stat,
        pokemonDefense: data.stats[2].base_stat,
        pokemonSpecialAttack: data.stats[3].base_stat,
        pokemonSpecialDefense: data.stats[4].base_stat,
        pokemonSpeed: data.stats[5].base_stat,
        heldItems: data.held_items[0]?.item.name || "No Item in this inventory space",
        heldItemsSecond: data.held_items[1]?.item.name || "No Item in this inventory space",
        pokemonImageShinyFront: data.sprites.front_shiny,
        pokemonImageShinyBack: data.sprites.back_shiny
    };
    return PokemonData;
}

async function displayPokemonsBig(i) {
    let pokemonData = allPokemons[i];
    if (!pokemonData.pokemonID) {
        pokemonData = await getPokemonData(pokemonData.url);
        allPokemons[i] = pokemonData;
    }
    body.classList.add('overflow-hidden');
    clearBigCardContent();
    bigCardAndArrowDivRemoveDisplayNoneFunction();
    bigPokemonCardHead.innerHTML += createPokemonTemplatesBig(i);
    bigPokemonCardHeaderDetails.innerHTML += await createPokemonTemplateHeaderDetails(i);
    bigPokemonCardDetails.innerHTML += createPokemonTemplateAbout(i);
    arrowDiv.innerHTML += arrowTemplate(i);
    setTimeout(() => { checkPokemonTypeForCssStyleAllBig(); }, 10);
}

async function fetchMorePokemonData() {
    fetchPokemonData();
}

function showPokeballLoader() {
    const loadContainer = document.getElementById('loader-container');
    loadContainer.classList.remove('display-none');
    body.classList.add('overflow-hidden');
    loadContainer.innerHTML = pokeballLoaderTemplate();
}

function hidePokeballLoader() {
    const loadContainer = document.getElementById('loader-container');
    loadContainer.classList.add('display-none');
    loadContainer.innerHTML = "";
    body.classList.remove('overflow-hidden');
}

function searchPokemonByName() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let found = false;
    for (let i = 0; ; i++) {
        const listItem = document.getElementById(`list-item${i}`);
        const nameElement = document.getElementById(`pokemon-headline${i}`);
        if (!listItem || !nameElement) break;
        const pokemonName = nameElement.textContent.toLowerCase();
        if (searchTerm.length < 3) {
            listItem.classList.remove('display-none');
            found = true;
        } else {
            if (pokemonName.startsWith(searchTerm)) {
                listItem.classList.remove('display-none');
                found = true;
            } else {
                listItem.classList.add('display-none');
            }
        }
    }
    if (!found) {
        notFoundMessage.classList.remove('display-none');
    } else {
        notFoundMessage.classList.add('display-none');
    }
}

function clearBigCardContent() {
    bigPokemonCardHead.innerHTML = "";
    bigPokemonCardHeaderDetails.innerHTML = "";
    bigPokemonCardDetails.innerHTML = "";
    arrowDiv.innerHTML = "";
}

function bigCardAndArrowDivRemoveDisplayNoneFunction() {
    bigCardBackgroundContainer.classList.remove('display-none');
    bigCardContainer.classList.remove('display-none');
    arrowDiv.classList.remove('display-none');
}

async function nextPokemon(i) {
    const newIndex = (i + 1) % allPokemons.length;
    clearPokemonDivContainer();
    displayPokemonsBig(newIndex);
}

async function prevPokemon(i) {
    let newIndex;
    if (i - 1 < 0) {
        newIndex = allPokemons.length - 1;
    } else {
        newIndex = i - 1;
    }
    clearPokemonDivContainer();
    displayPokemonsBig(newIndex);
}

function disableDisplayPokemonsBig() {
    bigCardBackgroundContainer.classList.add('display-none');
    bigCardContainer.classList.add('display-none');
    body.classList.remove('overflow-hidden');
    clearBigCardContent();
}

function createPokemonTemplateAbout(i) {
    const { pokemonAbilitieTwo } = allPokemons[i];
    if (pokemonAbilitieTwo === "unknown") {
        return aboutOneAbilityTemplate(i);
    } else {
        return aboutTwoAbilitiesTemplate(i);
    }
}

function createPokemonTemplateAboutRefresh(i) {
    bigPokemonCardDetails.innerHTML = createPokemonTemplateAbout(i);
}

function createTemplateShinyPokemon(i) {
    bigPokemonCardDetails.innerHTML = shinyPokemonTemplate(i);
}

function createTemplateItems(i) {
    bigPokemonCardDetails.innerHTML = itemsTemplate(i);
}

function createPokemonTemplateBaseStats(i) {
    bigPokemonCardDetails.innerHTML = baseStatsTemplate(i);
}

async function createPokemonTemplateHeaderDetails(i) {
    return headerDetailsTemplate(i);
}

function createPokemonTemplatesBig(i) {
    const { pokemonTypeSecond } = allPokemons[i];
    if (pokemonTypeSecond === "unknown") {
        return pokemonOneTypeBigTemplate(i);
    } else {
        return pokemonTwoTypesBigTemplate(i);
    }
}

function createPokemonTemplates(i) {
    const { pokemonTypeSecond } = allPokemons[i];
    if (pokemonTypeSecond === "unknown") {
        return pokemonOneTypeTemplate(i);
    } else {
        return pokemonTwoTypesTemplate(i);
    }
}

function checkPokemonTypeForCssStyle(i) {
    const pokemonTypDivs = document.getElementById(`pokemon-typ${i}`);
    const listItem = document.getElementById(`list-item${i}`);
    const type = pokemonTypDivs.textContent.trim().toLowerCase();
    if (type) {
        listItem.classList.add(type);
    }
}

function checkPokemonTypeForCssStyleAll() {
    const listItems = document.getElementsByClassName('list-item');
    for (let i = 0; i < listItems.length; i++) {
        const listItem = listItems[i];
        const index = listItem.id.replace('list-item', '');
        checkPokemonTypeForCssStyle(index);
    }
}

function checkPokemonTypeForCssStyleBig(i) {
    const pokemonTypDivs = document.getElementById(`pokemon-big-picture-type-wrap${i}`);
    const headPokemonCard = document.getElementById(`head-pokemon-card${i}`);
    if (!pokemonTypDivs || !headPokemonCard) return;
    const type = pokemonTypDivs.textContent.trim().toLowerCase();
    if (type) {
        headPokemonCard.classList.add(type);
    }
}

function checkPokemonTypeForCssStyleAllBig() {
    for (let i = 0; i < allPokemons.length; i++) {
        checkPokemonTypeForCssStyleBig(i);
    }
}

function clearPokemonDivContainer() {
    bigPokemonCardHeaderDetails.innerHTML = "";
    bigPokemonCardDetails.innerHTML = "";
    bigPokemonCardHead.innerHTML = "";
    arrowDiv.innerHTML = "";
}