import React, { useEffect, useState, useCallback } from "react";
import { Text, View, Alert, Image, TouchableOpacity, ScrollView } from "react-native";
import GlobalStyles from "view/styles/GlobalStyles";"../styles/GlobalStyles";
import PainelStyles from "view/styles/PainelStyles"; "../styles/PainelStyles"
import { PropsScreenApps } from "../../controller/Interfaces";
import { PainelController, PontoAgrupado, Coordenadas } from "../../controller/PainelController";
import { useFocusEffect } from "@react-navigation/native";

const PainelFuncionario = ({ navigation, route }: PropsScreenApps<'PainelSup'>) => {
    const userId = route.params.userId;
    const [dadosFuncionario, setDadosFuncionario] = useState<any>(null);
    const [localizacao, setLocalizacao] = useState<Coordenadas>({ latitude: '0', longitude: '0' });
    const [pontosAgrupados, setPontosAgrupados] = useState<PontoAgrupado[]>([]);



    useFocusEffect(
    useCallback(() => {
        const loadData = async() => {
            try {
                const dados = await PainelController.carregarDadosPainel(userId);
                
                setDadosFuncionario(dados.dadosFuncionario);
                setLocalizacao(dados.localizacao);
                setPontosAgrupados(dados.pontosAgrupados);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                Alert.alert("Erro ao buscar dados do funcionário!");

            }
        };
        loadData();
    }, [userId])
);


    return (
        <View style={GlobalStyles.container}>
            <View style={PainelStyles.headerUserInfo}>
                <Image
                    source={require('../../src/images/UserIcon.png')}
                    style={PainelStyles.iconeFuncionario}
                />
                <View style={PainelStyles.boxInformacoes}>
                    <Text style={{ fontSize: 25 }}>{dadosFuncionario?.nome || "Carregando..."}</Text>
                    <Text style={{ fontSize: 18 }}>{dadosFuncionario?.cargo || "Carregando..."}</Text>
                </View>
            </View>


            <View style={PainelStyles.boxPontosView}>
                <TouchableOpacity
                    style={GlobalStyles.botao}
                    onPress={() => navigation.navigate('ManageCollabs', {userId: userId})}
                >
                    <Text style={GlobalStyles.textoBotao}>Gerenciar funcionarios</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.botao}
                    onPress={() => navigation.navigate('ManageCheckpoints', {userId:userId})}
                >
                    <Text style={GlobalStyles.textoBotao}>Gerenciar pontos</Text>
                </TouchableOpacity>
                
                
            </View>
        </View>
    );
};

export default PainelFuncionario;