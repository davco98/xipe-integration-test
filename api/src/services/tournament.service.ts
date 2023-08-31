import { CreateUserDto } from "../dtos/users.dto";
import HttpException from "../exceptions/HttpException";
import trainerModel from "../models/trainer.model";
import tournamentModel from "../models/tournament.model";
import pokemonModel from "../models/pokemon.model";
import {Tournament} from "../models/tournament.model";
import {CreateTournamentDto} from "../dtos/tournament.dto";


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
    public async startTournament(): Promise<Tournament> {
        //TODO: Create 4 random trainers with their 6 random pokemon consuming pokeapi.co and random data


        //TODO: Create tournament with 4 random trainers


        //TODO: Fight 4 trainers until we get a winner


        //TODO: Save and return Tournament


        //not implemented
        throw new HttpException(409, "Not implemented");
    }

}

export default TournamentService;
