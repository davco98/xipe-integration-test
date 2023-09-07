import axios from 'axios';
import { CreatePokemonDto } from '../dtos/pokemon.dto';
import { Pokemon } from '../models/pokemon.model';
import PokemonService from './pokemon.service';

export default class ApiService {
	public apiEndpoint = 'https://pokeapi.co/api/v2/';

	public async getPokemon(id: number): Promise<Pokemon> {
		const pokemonService = new PokemonService;
		return axios.get(this.apiEndpoint+'pokemon/'+id)
			.then((response: any)=>{
				let moves: any[] = response.moves;
				let selectedMoves = [];

				for(let movesCount = 0; movesCount <= 3; movesCount++){
					let randomKey = Math.floor(Math.random() * (moves.length-1));
					selectedMoves.push(moves[randomKey]);
				}

				const pokemonObject: CreatePokemonDto = {
					name: response.name,
					moves: selectedMoves,
					types: response.types,
					level: Math.floor(Math.random() * 100)
				};

				const finishedPokemon = pokemonService.createPokemon(pokemonObject);

				return finishedPokemon;
			});
	}

	public async startTournament(): Promise<Tournament> {
		const trainerService = new TrainerService();
		const pokemonService = new PokemonService();
        //TODO: Create 4 random trainers with their 6 random pokemon consuming pokeapi.co and random data
		let trainers = [];
		for(let trainerCount = 0; trainerCount<= 3; trainerCount++){
			let pokemon = [];
			for(let pokeCount = 0; pokeCount<= 5; pokeCount++){
				pokemon.push(pokemonService.createPokemon())
			}
			trainers.push(trainerService.createTrainer())
		}

        //TODO: Create tournament with 4 random trainers


        //TODO: Fight 4 trainers until we get a winner


        //TODO: Save and return Tournament


        //not implemented
        throw new HttpException(409, "Not implemented");
    }
}
