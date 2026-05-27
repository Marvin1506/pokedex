function pokeballLoaderTemplate() {
    return `
        <div class="flex-pokeball-loader">
            <img src="img/pokeball.svg" class="pokeball-loader" id="pokeball-loader">
        </div>
    `;
}

function arrowTemplate(i) {
    return `
    <div class="arrow-flex-box">
        <img onclick="prevPokemon(${i})" class="go-back-arrow" src="img/arrow-left.svg">
        <img onclick="nextPokemon(${i})" class="go-forward-arrow" src="img/arrow-right.svg">
    </div>
    `;
}

function baseStatsTemplate(i) {
    const { pokemonHp, pokemonAttack, pokemonDefense, pokemonSpecialAttack, pokemonSpecialDefense, pokemonSpeed } = allPokemons[i];
    const hp = Number(pokemonHp);
    const attack = Number(pokemonAttack);
    const defense = Number(pokemonDefense);
    const spAttack = Number(pokemonSpecialAttack);
    const spDefense = Number(pokemonSpecialDefense);
    const speed = Number(pokemonSpeed);
    const totalStatSum = hp + attack + defense + spAttack + spDefense + speed;
    return `
    <div class="base-stats-div" id="base-stats-div${i}">
        <div class="base-stats-flex">
            <p class="base-stats-description">HP:</p>
            <div class="base-stats-margin-left bold">${hp}</div>
            <progress class="base-stats-progress-bar-hp" value="${hp}" max="100"></progress>
        </div>
        <div class="base-stats-flex">
            <p class="base-stats-description">Attack:</p>
            <div class="base-stats-margin-left bold">${attack}</div>
            <progress class="base-stats-progress-bar-attack" value="${attack}" max="100"></progress>
        </div>
        <div class="base-stats-flex">
            <p class="base-stats-description">Defense:</p>
            <div class="base-stats-margin-left bold">${defense}</div>
            <progress class="base-stats-progress-bar-defense" value="${defense}" max="100"></progress>
        </div>
        <div class="base-stats-flex">
            <p class="base-stats-description">Sp.Atk:</p>
            <div class="base-stats-margin-left bold">${spAttack}</div>
            <progress class="base-stats-progress-bar-specialatk" value="${spAttack}" max="100"></progress>
        </div>
        <div class="base-stats-flex">
            <p class="base-stats-description">Sp.Def:</p>
            <div class="base-stats-margin-left bold">${spDefense}</div>
            <progress class="base-stats-progress-bar-specialdef" value="${spDefense}" max="100"></progress>
        </div>
        <div class="base-stats-flex">
            <p class="base-stats-description">Speed:</p>
            <div class="base-stats-margin-left bold">${speed}</div>
            <progress class="base-stats-progress-bar-speed" value="${speed}" max="100"></progress>
        </div>
        <div class="base-stats-flex">
            <p class="base-stats-description">Total:</p>
            <div class="base-stats-margin-left bold">${totalStatSum}</div>
            <progress class="base-stats-progress-bar-total" value="${totalStatSum}" max="1000"></progress>
        </div>
    </div>
    `;
}

function aboutOneAbilityTemplate(i) {
    const { pokemonName, pokemonHeight, pokemonWeight, pokemonAbilitieOne } = allPokemons[i];
    return `
    <div class="pokemon-ability-container" id="pokemon-ability-container${i}">
        <div class="pokemon-ability-container-flex">
            <p class="specs-padding-sytle bold">Species</p>
            <div class="ability-style bold">${pokemonName}</div>
        </div>
        <div class="pokemon-ability-container-flex">
            <p class="specs-padding-sytle bold">Height</p>
            <div class="ability-style bold">${pokemonHeight} cm</div>
        </div>
        <div class="pokemon-ability-container-flex">
            <p class="specs-padding-sytle bold">Weight</p>
            <div class="ability-style bold">${pokemonWeight} kg</div>
        </div>
        <div class="pokemon-ability-container-flex">
            <p class="specs-padding-sytle bold">Abilities</p>
            <div class="ability-style bold">${pokemonAbilitieOne}</div>
        </div>
    </div>
    `;
}

function aboutTwoAbilitiesTemplate(i) {
    const { pokemonName, pokemonHeight, pokemonWeight, pokemonAbilitieOne, pokemonAbilitieTwo } = allPokemons[i];
    return `
    <div class="pokemon-ability-container" id="pokemon-ability-container${i}">
        <div class="pokemon-ability-container-flex">
            <p class="specs-padding-sytle bold">Species</p>
            <div class="ability-style bold">${pokemonName}</div>
        </div>
        <div class="pokemon-ability-container-flex">
            <p class="specs-padding-sytle bold">Height</p>
            <div class="ability-style bold">${pokemonHeight} cm</div>
        </div>
        <div class="pokemon-ability-container-flex">
            <p class="specs-padding-sytle bold">Weight</p>
            <div class="ability-style bold">${pokemonWeight} kg</div>
        </div>
        <div class="pokemon-ability-container-flex">
            <p class="specs-padding-sytle bold">Abilities</p>
            <div class="ability-style bold">${pokemonAbilitieOne} ${pokemonAbilitieTwo}</div>
        </div>
    </div>
    `;
}

function headerDetailsTemplate(i) {
    return `
    <div class="pokemon-stats-container" id="pokemon-stats-container${i}">
        <p onclick="createPokemonTemplateAboutRefresh(${i})" id="pokemon-details-style-about" class="pokemon-details-style">About</p>
        <p onclick="createPokemonTemplateBaseStats(${i})" id="pokemon-details-style-basestats" class="pokemon-details-style">Base Stats</p>
        <p onclick="createTemplateItems(${i})" id="pokemon-details-style-items" class="pokemon-details-style">Items</p>
        <p onclick="createTemplateShinyPokemon(${i})" id="pokemon-details-style-about-shiny" class="pokemon-details-style">Shiny</p>
    </div>
    `;
}

function pokemonOneTypeTemplate(i) {
    const { pokemonID, pokemonName, pokemonImage, pokemonType } = allPokemons[i];
    return `
    <div onclick="displayPokemonsBig(${i})" id="list-item${i}" class="list-item">
        <div class="number-wrap">
            <p class="counter-pokemon-text">#${pokemonID}</p>
        </div>
        <div class="name-wrap">
            <p class="padding-left pokemon-name-headline" id="pokemon-headline${i}">${pokemonName}</p>
        </div>
        <div id="img-wrap" class="img-wrap">
            <div class="pokemon-typ-wrap">
                <div id="pokemon-typ${i}" class="pokemon-typ">${pokemonType}</div>
            </div>
            <img class="pokemon-picture" src="${pokemonImage}" alt="${pokemonName}">
        </div>
    </div>
    `;
}

function pokemonTwoTypesTemplate(i) {
    const { pokemonID, pokemonName, pokemonImage, pokemonType, pokemonTypeSecond } = allPokemons[i];
    return `
    <div onclick="displayPokemonsBig(${i})" id="list-item${i}" class="list-item">
        <div class="number-wrap">
            <p class="counter-pokemon-text">#${pokemonID}</p>
        </div>
        <div class="name-wrap">
            <p class="padding-left pokemon-name-headline" id="pokemon-headline${i}">${pokemonName}</p>
        </div>
        <div id="img-wrap" class="img-wrap">
            <div class="pokemon-typ-wrap">
                <div id="pokemon-typ${i}" class="pokemon-typ">${pokemonType}</div>
                <div id="pokemon-typ-second${i}" class="pokemon-typ">${pokemonTypeSecond}</div>
            </div>
            <img class="pokemon-picture" src="${pokemonImage}" alt="${pokemonName}">
        </div>
    </div>
    `;
}

function pokemonOneTypeBigTemplate(i) {
    const { pokemonID, pokemonName, pokemonImage, pokemonType } = allPokemons[i];
    return `
    <div id="head-pokemon-card${i}" class="head-pokemon-card">
        <div class="number-wrap-big-card" id="number-wrap-big-card">
            <p class="counter-pokemon-text-big">#${pokemonID}</p>
        </div>
        <div id="name-wrap-big-card" class="name-wrap-big-card">
            <p class="pokemon-name-headline-big">${pokemonName}</p>
        </div>
        <div id="type-picture-wrap-big-card" class="type-picture-wrap-big-card">
            <div class="pokemon-typ-big" id="pokemon-big-picture-type-wrap${i}">${pokemonType}</div>
            <img class="big-pokemon-picture" src="${pokemonImage}" alt="${pokemonName}">
        </div>
    </div>
    `;
}

function pokemonTwoTypesBigTemplate(i) {
    const { pokemonID, pokemonName, pokemonImage, pokemonType, pokemonTypeSecond } = allPokemons[i];
    return `
    <div id="head-pokemon-card${i}" class="head-pokemon-card">
        <div class="number-wrap-big-card" id="number-wrap-big-card">
            <p class="counter-pokemon-text-big">#${pokemonID}</p>
        </div>
        <div id="name-wrap-big-card" class="name-wrap-big-card">
            <p class="pokemon-name-headline-big">${pokemonName}</p>
        </div>
        <div id="type-picture-wrap-big-card" class="type-picture-wrap-big-card">
            <div class="pokemon-typ-big-flex-box">
                <div class="pokemon-typ-big" id="pokemon-big-picture-type-wrap${i}">${pokemonType}</div>
                <div class="pokemon-typ-big" id="pokemon-big-picture-type-wrap-second${i}">${pokemonTypeSecond}</div>
            </div>
            <img class="big-pokemon-picture" src="${pokemonImage}" alt="${pokemonName}">
        </div>
    </div>
    `;
}

function shinyPokemonTemplate(i) {
    const { pokemonImageShinyFront, pokemonImageShinyBack } = allPokemons[i];
    return `
    <div class="shiny-pokemon-div" id="shiny-pokemon-div${i}">
        <div class="shiny-pokemon-div-flex">
            <p class="shiny-pokemon-font-style">Front Picture Shiny</p>
            <img class="big-pokemon-picture-shiny" src="${pokemonImageShinyFront}" alt="Front Picture Shiny">
        </div>
        <div class="shiny-pokemon-div-flex">
            <p class="shiny-pokemon-font-style">Back Picture Shiny</p>
            <img class="big-pokemon-picture-shiny" src="${pokemonImageShinyBack}" alt="Back Picture Shiny">
        </div>
    </div>
    `;
}

function itemsTemplate(i) {
    const { heldItems, heldItemsSecond } = allPokemons[i];
    return `
    <div class="held-items-div" id="held-items-div${i}">
        <div class="item-flex">
            <p class="shiny-pokemon-font-style bold">First Item Slot:</p>
            <div class="items-font-style">${heldItems}</div>
        </div>
        <div class="item-flex">
            <p class="shiny-pokemon-font-style bold">Second Item Slot:</p>
            <div class="items-font-style padding-items-arrow">${heldItemsSecond}</div>
        </div>
    </div>
    `;
}