export interface Pokemon {
        idpokemon: number;
        number: number;
        name: string;
        generation: number;
        shiny: boolean;
        img: string;
        imgShiny: string;
        shinyReleaseDate: Date;
        shinyReleaseEvent: string;
        evolutionFrom: number;
        obtainable: string;
}
