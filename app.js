const pokedex = document.getElementById('pachadex');

const fetchPokemon = () => {
    const promesas = [];
    for (let i = 1; i <= 20; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promesas.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promesas).then((results) => {
        const pokemon = results.map((result) => ({
            nombre: result.name,
            imagen: result.sprites['front_default'],
            // tipo: result.types.map((type) => type.type.name).join(', '),
            altura: result.height,
            peso: result.weight,
            habilidades: result.abilities.map((hab) => hab.ability.name),
            id: result.id
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map((poke) =>
    `
        <li class="tarjeta">
            <img class="tarjeta-imagen" src="${poke.imagen}"/>
            <h2 class="tarjeta-titulo">${poke.id}. ${poke.nombre}</h2>
            <!--<p class="tarjeta-subtitulo">Tipo: ${poke.tipo}</p>-->
            <p class="tarjeta-subtitulo">Altura: ${poke.altura}</p>
            <p class="tarjeta-subtitulo">Peso: ${poke.peso}</p>
            <p class="tarjeta-subtitulo">Habilidades: ${poke.habilidades}</p>
        </li>
    `
        ).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
