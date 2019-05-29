import { UserPokemonsPipe } from './user-pokemons.pipe';

describe('UserPokemonsPipe', () => {
  it('create an instance', () => {
    const pipe = new UserPokemonsPipe();
    expect(pipe).toBeTruthy();
  });
});
