import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import * as S from './styles';


export function NewGroup(){
    return(
        <S.Container>
            <Header showBackButton/>
            <S.Content>
                <S.Icon />
                <HighLight 
                    title="Nova turma"
                    subtitle="Crie a turma para adicionar as pessoas"
                
                />
                <Button 
                    title="Criar"
                />
            </S.Content>
        </S.Container>
    );
}