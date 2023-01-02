import { FlatList, Alert } from 'react-native';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import * as S from './styles';
import { useState } from 'react';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useRoute } from '@react-navigation/native';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { AppError } from '@utils/AppError';
import { PlayerAddByGroup } from '@storage/player/playerAddByGroup';
import { PlayersGetByGroup } from '@storage/player/playersGetByGroup';

type RouteParams = {
    group: string;
}

export function Players(){
    const [newPlayerName, setNewPlayerName] = useState("");
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState([]);
    const route = useRoute();
    const {group} = route.params as RouteParams ;

    async function handleAddPlayer() {
        console.log("entrou");
        if(newPlayerName.trim().length === 0){
            return Alert.alert("Nova pessoa", "Informe o nome da pessoa para adicionar.");
        }
        const newPlayer: PlayerStorageDTO = {
            name: newPlayerName,
            team
        }

        try{
            await PlayerAddByGroup(newPlayer, group);
            const players = await PlayersGetByGroup(group);
            console.log(players);

        }catch(error){
            if(error instanceof AppError){
                Alert.alert("Nova pessoa", error.message);
            }else{
                Alert.alert("Nova pessoa", "Nao foi possivel cadastrar a apessoa");
                console.log(error);
            }
        }

    }

    return(
        <S.Container>
            <Header showBackButton />
            <HighLight 
                title={group}
                subtitle="adicione a galera e separe os times"        
            />
            <S.Form>           
                <Input 
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                />
                <ButtonIcon  
                    icon='add'
                    onPress={handleAddPlayer}
                />
            </S.Form>
            <S.HeaderList>
                <FlatList 
                    data={['Time A', 'Time B']}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => (
                    <Filter 
                        title={item}
                        isActive={item === team}
                        onPress={() => setTeam(item)}
                    />
                    )}
                    horizontal
                
                />

                <S.NumberOfPlayers>
                    {players.length}
                </S.NumberOfPlayers>
            </S.HeaderList>
            
            <FlatList 
                data={players}
                keyExtractor={(item) => item}
                renderItem={({item}) => (
                    <PlayerCard 
                    name={item}
                    onRemove={() => { }}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty 
                        message="Não ha pessoas nesse time"
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100}, 
                    players.length === 0 && { flex: 1}
                ]}
            />

            <Button 
                title="Remover Turma"
                type="SECONDARY"
            />
        </S.Container>
    );
}