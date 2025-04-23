import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, KeyboardAvoidingView, Platform, Image, TextComponent, Alert, TouchableOpacity} from 'react-native';
import PainelStyles from "../styles/PainelStyles";
import { NavigationProp } from '@react-navigation/native';
import { PropsScreenApps } from "../../controller/Interfaces";
import GlobalStyles from "../styles/GlobalStyles";

const RegistroPonto = ({ navigation }:PropsScreenApps<'RegistroPonto'>) =>{
    return(
        <View style={GlobalStyles.container}>
            <Text>olá</Text>
        </View>
    )

}
export default RegistroPonto;