import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PlayersGetByGroup } from "./playersGetByGroup";


export async function PlayerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
    try {
        const storedPlayers = await PlayersGetByGroup(group);

        const playerAlredyExists = storedPlayers.filter(player => player.name === newPlayer.name);
        if(playerAlredyExists.length > 0){
            throw new AppError('Essa pessoa ja esta adicionada em um time aqui');
        }
        const storage = JSON.stringify([...storedPlayers, newPlayer]);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
    } catch (error) {
        throw error
    }
}



