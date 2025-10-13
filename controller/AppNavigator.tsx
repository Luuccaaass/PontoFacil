import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cadastro from '../view/pages/TelaCadastro';
import Login from "../view/pages/TelaLogin";
import PainelFuncionario from "../view/pages/PainelFuncionario";
import RegistroPonto from "../view/pages/RegistrodePonto";
import { PropsStackRoutes } from "./Interfaces";
import PainelSup from "view/pages/PainelSup";
import { ManageCheckpoints } from "view/pages/ManageCheckPoints";
import { ManageCollaborators } from "view/pages/ManageCollaborators";
import CollabCheckpointView from "view/pages/CollabCheckpointView";
import { EditCollabInfo } from "view/pages/EditCollab";
import { EditCheckpoint } from "view/pages/EditCheckpoint";
import { NewCheckpoint } from "view/pages/NewCheckpoint";

const Stack = createNativeStackNavigator<PropsStackRoutes>();


// types/navigation.ts

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{ headerShown:false }}/>
            <Stack.Screen name="PainelFunc" component={PainelFuncionario} options={{headerShown:false}}/>
            <Stack.Screen name="RegistroPonto" component={RegistroPonto} options={{headerShown:false}}/>
            <Stack.Screen name="PainelSup" component={PainelSup} options={{headerShown:false}}/>
            <Stack.Screen name="ManageCollabs" component={ManageCollaborators} options={{headerShown:false}}/>
            <Stack.Screen name="ManageCheckpoints" component={ManageCheckpoints} options={{headerShown:false}}/>
            <Stack.Screen name="CollabCheckpointView" component={CollabCheckpointView} options={{headerShown:false}}/>
            <Stack.Screen name="EditCollabInfo" component={EditCollabInfo} options={{headerShown:false}}/>
            <Stack.Screen name="EditCheckpoint" component={EditCheckpoint} options={{headerShown:false}}/>
            <Stack.Screen name="NewCheckpoint" component={NewCheckpoint} options={{headerShown:false}}/>
        </Stack.Navigator>

    )
}

export default AppNavigator;



