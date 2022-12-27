import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import * as S from './styles';


export function NewGroup(){
    const [group, setGroup] = useState('');
    const navigation = useNavigation();
    function handleNew(){
        navigation.navigate('players', { group })
    }

    return(
        <S.Container>
            <Header showBackButton/>
            <S.Content>
                <S.Icon />
                <HighLight 
                    title="Nova turma"
                    subtitle="Crie a turma para adicionar as pessoas"
                
                />
                <Input 
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
                />
                <Button 
                    title="Criar"
                    style={{marginTop: 20}}
                    onPress={handleNew}
                />
            </S.Content>
        </S.Container>
    );
}