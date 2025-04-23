import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cadastro from '../view/pages/TelaCadastro';
import Login from "../view/pages/TelaLogin";
import PainelFuncionario from "../view/pages/PainelFuncionario";
import RegistroPonto from "../view/pages/RegistrodePonto";
import { PropsStackRoutes } from "./Interfaces";

const Stack = createNativeStackNavigator<PropsStackRoutes>();


// types/navigation.ts

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{ headerShown:false }}/>
            <Stack.Screen name="Painel" component={PainelFuncionario} options={{headerShown:false}}/>
            <Stack.Screen name="RegistroPonto" component={RegistroPonto} options={{headerShown:false}}/>
        </Stack.Navigator>

    )
}

export default AppNavigator;



