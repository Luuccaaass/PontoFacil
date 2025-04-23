import React, { useEffect, useState } from "react";
import { Text, View, Alert, Image, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import GlobalStyles from "../styles/GlobalStyles";
import PainelStyles from "../styles/PainelStyles";
import { getDadosFuncionario } from "../../controller/funcionarioControler";
import { PropsScreenApps } from "../../controller/Interfaces";




const PainelFuncionario = ({ navigation, route }: PropsScreenApps<'Painel'>) =>{
    const id = route.params.id;
    const [dados, setDados] = useState<any>(null);

    useEffect(() => {
        const buscarDados = async () => {
            const resposta = await getDadosFuncionario(id);
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

                <TouchableOpacity
                    style={GlobalStyles.botao}
                    onPress={()=>navigation.navigate('RegistroPonto')}
                    
                >
                    <Text style={GlobalStyles.textoBotao}>Registrar Ponto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PainelFuncionario;
