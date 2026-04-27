import React, { useEffect, useState } from 'react';
import { Card, List, Label, Button } from 'semantic-ui-react';
import axios from 'axios';
import { POKE_API, POKE_CARD } from '../AppConfig';

const typeColors = {
  grass: 'green',
  poison: 'purple',
  fire: 'red',
  water: 'blue',
  electric: 'yellow',
  psychic: 'pink',
  ice: 'teal',
  dragon: 'violet',
  dark: 'black',
  fairy: 'pink',
  normal: 'grey',
  fighting: 'orange',
  flying: 'blue',
  ground: 'brown',
  rock: 'grey',
  bug: 'olive',
  ghost: 'violet',
  steel: 'grey'
};

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState(null);
  const [spriteIndex, setSpriteIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`${POKE_API}/pokemon/${POKE_CARD}`)
      .then((res) => {
        setPokemon(res.data);
        setSpriteIndex(0);
      })
      .catch((err) => console.error('Pokemon API error:', err));
  }, []);

  if (!pokemon) return <div>Loading...</div>;

  const sprites = [
    pokemon.sprites.front_default,
    pokemon.sprites.back_default,
    pokemon.sprites.front_shiny,
    pokemon.sprites.back_shiny
  ].filter(Boolean);

  const currentSprite = sprites[spriteIndex];

  return (
    <Card centered>
      <Card.Content textAlign="center" style={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
        <img
          src={currentSprite}
          alt={pokemon.name}
          style={{
            width: '180px',
            height: '180px',
            objectFit: 'contain'
          }}
        />
      </Card.Content>

      <Card.Content>
        <Card.Header>{pokemon.name}</Card.Header>
        <Card.Meta>
          #{pokemon.id} | Height: {pokemon.height} | Weight: {pokemon.weight}
        </Card.Meta>

        <div style={{ marginTop: '10px' }}>
          {pokemon.types.map((t) => (
            <Label
              key={t.type.name}
              color={typeColors[t.type.name] || 'grey'}
            >
              {t.type.name}
            </Label>
          ))}
        </div>
      </Card.Content>

      <Card.Content>
        <strong>Stats</strong>
        <List divided relaxed>
          {pokemon.stats.map((stat) => (
            <List.Item key={stat.stat.name}>
              <List.Content floated="right" style={{ fontWeight: 'bold' }}>
                {stat.base_stat}
              </List.Content>
              <List.Content>
                {stat.stat.name.toUpperCase()}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Card.Content>

      <Card.Content extra>
        <Button
          fluid
          onClick={() => setSpriteIndex((spriteIndex + 1) % sprites.length)}
        >
          View Next Sprite
        </Button>
      </Card.Content>
    </Card>
  );
};

export { PokemonCard };