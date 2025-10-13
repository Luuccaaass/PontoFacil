import React, { useEffect } from "react";
import { useState } from 'react';
import { Text, View, TextInput, Button, TouchableOpacity, Platform, ScrollView, Image } from 'react-native';
import { deleteCollab, registerCollaborator, updateCollabInfo } from "../../controller/FuncionarioController";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { PropsScreenApps } from "controller/Interfaces";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";

//provisório
import '../styles/TelaLoginStyles'
import TelaLoginStyles from "../styles/TelaLoginStyles";
import GlobalStyles from "../styles/GlobalStyles";
import { getCheckpointInfo } from "model/CheckPointManage";
import { getCheckPointInfo, editCheckpointInfo } from "controller/CheckPointController";

export const EditCheckpoint = ({ navigation, route }: PropsScreenApps<'EditCheckpoint'>) => {
    const checkpointId = route.params.checkPpointId;
    //criação das variáveis const para armazenar os valores que serão inseridos no banco
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [identificador, setIdentificador] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const dados = await getCheckPointInfo(checkpointId);
                if (dados) {
                    setLatitude(dados.latitude);
                    setLongitude(dados.longitude);
                    setIdentificador(dados.identificador);
                } else {
                    console.log('Nenhum dado encontrado');
                }
            } catch (error) {
                console.log('Erro ao carregar dados:', error);
            }
        };
        loadData(); // ← FALTANDO: Chamar a função
    }, [checkpointId]); // ← FALTANDO: Dependência


    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            //extraScrollHeight={100}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={GlobalStyles.container}>
                    <View style={[GlobalStyles.headerInfoContent, { height: 120 }]}>
                        <Text style={GlobalStyles.headerTitleText}>Editar informações</Text>
                    </View>

                    {/* Latitude */}
                    <TextInput
                        keyboardType='default'
                        style={TelaLoginStyles.textInput}
                        placeholder="Identificador"
                        onChangeText={(text) => setIdentificador(text)}
                        value={identificador}
                    />

                    {/* Latitude */}
                    <TextInput
                        keyboardType='numeric'
                        style={TelaLoginStyles.textInput}
                        placeholder="Latitude"
                        onChangeText={(text) => setLatitude(parseFloat(text))}
                        value={latitude ? latitude.toString() : ''}
                    />

                    {/* Longitude */}
                    <TextInput
                        keyboardType='numeric'
                        style={TelaLoginStyles.textInput}
                        placeholder="Longitude"
                        onChangeText={(text) => setLongitude(parseFloat(text))}
                        value={longitude ? longitude.toString() : ''}
                    />
                    <TouchableOpacity
                        style={GlobalStyles.botao}
                        onPress={() => {}}
                    >
                        <Text style={GlobalStyles.textoBotao}>Gerar QR Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={GlobalStyles.botao}
                        onPress={() => { editCheckpointInfo(checkpointId, identificador, latitude, longitude) }}
                    >
                        <Text style={GlobalStyles.textoBotao}>Atualizar ponto</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}