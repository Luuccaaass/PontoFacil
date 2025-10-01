import React, { useEffect, useState } from "react";
import { Text, View, Alert, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import GlobalStyles from "../styles/GlobalStyles";
import PainelStyles from "../styles/PainelStyles";
import { getDadosFuncionario } from "../../controller/funcionarioControler";
import { PropsScreenApps } from "../../controller/Interfaces";
import { getDeviceLocation, getDistanceBetween, validaPonto } from "controller/checkPointController";
import { setShouldAnimateExitingForTag } from "react-native-reanimated/lib/typescript/core";
import { registrarPonto } from "model/registroPontoModel";




const PainelFuncionario = ({ navigation, route }: PropsScreenApps<'Painel'>) =>{
    type Coordenadas = {
        latitude: string,
        longitude: string
    };

    const id = route.params.id;
    const [dados, setDados] = useState<any>(null);
    const [localizacao, setLocalizacao] = useState  <Coordenadas>({latitude:'0', longitude:'0'});

    useEffect(() => {
        const buscarDados = async () => {
            const resposta = await getDadosFuncionario(id);
            const coords = await getDeviceLocation();
            if (coords){
                setLocalizacao({
                    latitude: coords.latitude.toFixed(4),
                    longitude: coords.longitude.toFixed(4)
                });
            }
            else{
                console.log('Nao foi possivel obter a localizacao')
            }
            if (resposta) {
                setDados(resposta);
            } else {
                Alert.alert("Erro ao buscar dados do funcionário!");
            }
        };
        buscarDados();
    
    }, [id]);
    

    return (
        <View style={[GlobalStyles.container, { padding: 0 }]}>
            <View style={PainelStyles.boxDadosFunc}>
                <Image
                    source={require('../../src/images/UserIcon.png')}
                    style={PainelStyles.iconeFuncionario}
                />
                <View style={PainelStyles.boxInformacoes}>
                    <Text style={{ fontSize: 25 }}>{dados?.nome || "Carregando..."}</Text>
                    <Text style={{ fontSize: 18 }}>{dados?.cargo || "Carregando..."}</Text>
                </View>
            </View>

            <View style={PainelStyles.boxPontosView}>
                {/* ... seus pontos aqui ... */}


                {/* registrar ponto */}
                <TouchableOpacity
                    style={GlobalStyles.botao}
                    onPress={()=>navigation.navigate('RegistroPonto', {latitude: parseFloat(localizacao.latitude), longitude: parseFloat(localizacao.longitude), func_id:id})}
                    
                >
                <Text style={GlobalStyles.textoBotao}>Registrar ponto</Text>
                </TouchableOpacity>





                {/* Obter localizacao */}
                <TouchableOpacity
                    style={GlobalStyles.botao}
                    onPress={()=> Alert.alert('A', `${localizacao?.latitude},${localizacao?.longitude}`)
                }
                >
                    <Text style={GlobalStyles.textoBotao}>Obter localizacao</Text>
                </TouchableOpacity>


                {/* Obter localizacao */}
                <TouchableOpacity
                    style={GlobalStyles.botao}
                    
                
                >
                    <Text 
                    style={GlobalStyles.textoBotao}
                    onPress={() => validaPonto(1, -23.2048, -47.2576)}
                    
                    >Registro teste</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default PainelFuncionario;
