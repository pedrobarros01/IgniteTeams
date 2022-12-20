import { FlatList } from 'react-native';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import * as S from './styles';
import { useState } from 'react';

export function Players(){
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState([]);
    return(
        <S.Container>
            <Header showBackButton />

            <HighLight 
                title="Nome da turma"
                subtitle="adicione a galera e separe os times"        
            />
            <S.Form>           
                <Input 
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                />
                <ButtonIcon  
                    icon='add' 
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
            
        </S.Container>
    );
}