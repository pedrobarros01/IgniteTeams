import * as S from './styles';

interface Props{
    title: string;
    subtitle: string;
}
export function HighLight({title, subtitle}: Props){
    return(
        <S.Container>
            <S.Title>{title}</S.Title>
            <S.SubTitle>{subtitle}</S.SubTitle>
        </S.Container>
    );
}