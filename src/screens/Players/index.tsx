import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import * as S from './styles';

export function Players(){

    return(
        <S.Container>
            <Header showBackButton />

            <HighLight 
                title="Nome da turma"
                subtitle="adicione a galera e separe os times"        
            />


        </S.Container>
    );
}