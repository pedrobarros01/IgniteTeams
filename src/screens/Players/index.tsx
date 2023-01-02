import { FlatList, Alert, TextInput } from 'react-native';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import * as S from './styles';
import { useState, useEffect, useRef } from 'react';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { AppError } from '@utils/AppError';
import { PlayerAddByGroup } from '@storage/player/playerAddByGroup';
import { PlayersGetByGroup } from '@storage/player/playersGetByGroup';
import { PlayersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { PlayerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { GroupRemoveByName } from '@storage/group/groupRemoveByNome';
import { Loading } from '@components/Loading';

type RouteParams = {
    group: string;
}





export function Players(){
    const [isLoading, setIsLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState("");
    const navigation = useNavigation();
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const route = useRoute();
    const {group} = route.params as RouteParams ;
    const newPlayerNameInput = useRef<TextInput>(null);

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
            newPlayerNameInput.current?.blur();
            setNewPlayerName("");
            fetchPlayersByTeam();

        }catch(error){
            if(error instanceof AppError){
                Alert.alert("Nova pessoa", error.message);
            }else{
                Alert.alert("Nova pessoa", "Nao foi possivel cadastrar a apessoa");
                console.log(error);
            }
        }

    }

    async function fetchPlayersByTeam(){
        try {
            setIsLoading(true);
            const playersByTeam = await PlayersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
            setIsLoading(false);
        } catch (error) {
                Alert.alert("Pessoas", "Nao foi possivel carregar as pessoas do time");
                console.log(error);
        }
    }

    async function handlePlayerRemove(playerName: string){
        try {
            await PlayerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (error) {
            Alert.alert("Remover pessoa", "Não foi possivel remover essa pessoa");
        }

    }

    async function groupRemove(){
        try {
            await GroupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            console.log(error);
            Alert.alert("Remover o grupo", "Não foi possivel remover o grupo");
        }
    }

    async function handleGroupRemove(){
        Alert.alert(
            "Remover",
            "Deseja remover o grupo ?",
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: () => groupRemove(   )}
            ]
        );
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return(
        <S.Container>
            <Header showBackButton />
            <HighLight 
                title={group}
                subtitle="adicione a galera e separe os times"        
            />
            <S.Form>           
                <Input 
                    inputRef={newPlayerNameInput}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
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
            {
                isLoading ? <Loading /> : <FlatList 
                data={players}
                keyExtractor={(item) => item.name}
                renderItem={({item}) => (
                    <PlayerCard 
                    name={item.name}
                    onRemove={() => { handlePlayerRemove(item.name) }}
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
            }
            

            <Button 
                title="Remover Turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />
        </S.Container>
    );
}