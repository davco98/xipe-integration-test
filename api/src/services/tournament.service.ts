import { CreateUserDto } from "../dtos/users.dto";
import HttpException from "../exceptions/HttpException";
import trainerModel from "../models/trainer.model";
import tournamentModel from "../models/tournament.model";
import pokemonModel from "../models/pokemon.model";
import {Tournament} from "../models/tournament.model";
import {CreateTournamentDto} from "../dtos/tournament.dto";
import TrainerService from "./trainer.service";
import PokemonService from "./pokemon.service";
import ApiService from "./api.service";
import { CreateTrainerDto } from "../dtos/trainer.dto";


class TournamentService {
    public trainer = trainerModel;
    public tournament = tournamentModel;
    public pokemon = pokemonModel;

    public async saveTournament(tournamentData: CreateTournamentDto): Promise<Tournament> {
        return await (new this.tournament({
            trainerOne: tournamentData.trainerOneId,
            trainerTwo: tournamentData.trainerTwoId,
            trainerThree: tournamentData.trainerThreeId,
            trainerFour: tournamentData.trainerFourId,
            champ: tournamentData.champId,
        })).save() as unknown as Tournament;
    }

	public getRandomTrainerNames() {
		const allTrainerNames = ["Ash", "Misty", "Brock", "Dawn", "May", "Gary", "Lance", "Jessie", "James", "Serena", "Lillie", "Clemont", "Iris", "Cilan", "Giovanni"];
	
		let randomIndex = Math.floor(Math.random() * allTrainerNames.length);
	
		return allTrainerNames[randomIndex];
	}

    public async startTournament(): Promise<Tournament> {
		const apiService = new ApiService();
		const trainerService = new TrainerService();
		const pokemonService = new PokemonService();
        //TODO: Create 4 random trainers with their 6 random pokemon consuming pokeapi.co and random data
		let trainers = [];
		for(let trainerCount = 0; trainerCount<= 3; trainerCount++){
			let pokemon = [];
			for(let pokeCount = 0; pokeCount<= 5; pokeCount++){
				pokemon.push(apiService.getPokemon(Math.floor(Math.random() * 100)))
			}
			let trainer: CreateTrainerDto = {
				name: this.getRandomTrainerNames(),
				isChamp: false,
				pokemonOneId: (await pokemon[0])._id,
				pokemonTwoId: (await pokemon[1])._id,
				pokemonThreeId: (await pokemon[2])._id,
				pokemonFourId: (await pokemon[3])._id,
				pokemonFiveId: (await pokemon[4])._id,
				pokemonSixId: (await pokemon[5])._id,
			};
			trainers.push(trainerService.createTrainer(trainer))
		}

		
        //TODO: Create tournament with 4 random trainers
		let tournamentData: Pick<CreateTournamentDto, "trainerOneId" | "trainerTwoId" | "trainerThreeId" | "trainerFourId"> = {
			trainerOneId: (await trainers[0])._id,
			trainerTwoId: (await trainers[1])._id,
			trainerThreeId: (await trainers[2])._id,
			trainerFourId: (await trainers[3])._id,
		}

        //TODO: Fight 4 trainers until we get a winner
		await Promise.all(trainers);

		while (trainers.length > 1) {
			let nextRoundContestants = [];
			for (let i = 0; i < trainers.length; i += 2) {
				const winner = trainerService.fightTrainer(trainers[i]._id, trainers[i+1]._id);
				nextRoundContestants.push(winner);
			}
			trainers.length = 0; // Clear the current list of trainers
			trainers.push(...nextRoundContestants); // Populate with the winners for the next round
		}
		let finalTournament: Pick<CreateTournamentDto, "champId"> = {
			champId: (await trainers[0])._id,
		}
        //TODO: Save and return Tournament
		let tournament: CreateTournamentDto = {
			...tournamentData,
			...finalTournament
		};

		return this.saveTournament(tournament);

        //not implemented
        throw new HttpException(409, "Not implemented");
    }

}

export default TournamentService;
