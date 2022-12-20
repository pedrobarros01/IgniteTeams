import { Header } from "@components/Header";
import { HighLight } from "@components/HighLight";
import { GroupCard } from "@components/GroupCard";
import * as S from "./styles";

export function Groups(){
    return(
        <S.Container>
            <Header  />
            <HighLight 
                title="Turmas"
                subtitle="Jogue com a sua turma"
            />
            <GroupCard 
                title="Galera do Ignite"
                
            />
        </S.Container>
    );
}
