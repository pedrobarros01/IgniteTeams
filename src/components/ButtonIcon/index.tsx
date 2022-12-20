import { TouchableOpacityProps } from "react-native";
import * as S from './styles';
import {MaterialIcons} from '@expo/vector-icons';

type Props = TouchableOpacityProps &{
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: S.ButtonIconTypeStyleProps;
}

export function ButtonIcon({icon, type = 'PRIMARY'} : Props){
    return(
        <S.Container>
            <S.Icon 
                name={icon}
                type={type}
            />
        </S.Container>
    );
}

