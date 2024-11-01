import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from 'react-native';
import TelaLoginStyles from './TelaLogin.Styles';
import { RouteProp } from '@react-navigation/native';
 


const PainelFuncionario = ({ route }: any) =>{
    const { id } = route.params;
    return(
        <View
        style={TelaLoginStyles.container}
        >
            <Text>
                id: {id}
            </Text>
        </View>
    )

}

export default PainelFuncionario;