import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View, KeyboardAvoidingView, Platform, Image, TextComponent, Alert} from 'react-native';
import PainelStyles from "./PainelStyles";
import { RouteProp } from '@react-navigation/native';
import GlobalStyles from "./GlobalStyles";
import { getDadosFuncionario } from "../../controller/funcionarioControler";
import { FunctionsFetchError } from "@supabase/supabase-js";
 


const PainelFuncionario = ({ route }: any) =>{
    const id = route.params.id;
    const [ dados, setDados ] = useState<any>(null);
    

    useEffect(() => {
        const buscarDados = async() => {
            const resposta = await (getDadosFuncionario(id));
            if (resposta){
                setDados(resposta);
            }
            else{

            }
        }

        buscarDados();

    }, [id])

    return(
        <View
        style={[GlobalStyles.container, { padding: 0 }]}
        >
            <View
                style={PainelStyles.boxDadosFunc}
            >
                <Image
                source={require('../../src/images/UserIcon.png')}
                style={PainelStyles.iconeFuncionario}
                ></Image>
                <View
                style={PainelStyles.boxInformacoes}
                >
                    <Text style={{ fontSize: 25 }}>{dados?.nome || "Carregando..."}</Text>
                    <Text style={{ fontSize: 18 }}>{dados?.cargo || "Carregando..."}</Text>
                </View>

            </View>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            style={{flex: 1}}
            >
                

            </KeyboardAvoidingView>
        </View>
    )

}


export default PainelFuncionario;