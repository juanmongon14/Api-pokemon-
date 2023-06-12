const express = require('express');
const axios = require('axios');

const app = express();

app.get('/pokemon/:id', async (req, res) => {
    try {
        const pokemonId = req.params.id;
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemon = response.data;

        const speciesResponse = await axios.get(pokemon.species.url);
        const speciesData = speciesResponse.data;
        const description = speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === 'es'
        ).flavor_text;

        const types = pokemon.types.map((type) => type.type.name);

        const pokemonInfo = {
            name: pokemon.name,
            id: pokemon.id,
            height: pokemon.height,
            weight: pokemon.weight,
            types: types,
            description: description,
        };

        res.json(pokemonInfo);
    } catch (error) {
        res.status(404).json({ error: 'Pokémon not found' });
    }
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

