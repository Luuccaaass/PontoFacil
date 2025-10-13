import React, { useEffect, useRef, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Platform, ScrollView, Image, Alert } from 'react-native';
import { PropsScreenApps } from "controller/Interfaces";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import '../styles/TelaLoginStyles'
import TelaLoginStyles from "../styles/TelaLoginStyles";
import GlobalStyles from "../styles/GlobalStyles";
import { getCheckPointInfo, editCheckpointInfo } from "controller/CheckPointController";
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

export const EditCheckpoint = ({ navigation, route }: PropsScreenApps<'EditCheckpoint'>) => {
    const checkpointId = route.params.checkPpointId;
    
    // Estados para os dados do ponto
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [identificador, setIdentificador] = useState('');
    
    // Estados para o QR Code
    const [showQRCode, setShowQRCode] = useState(false);
    const [qrCodeData, setQrCodeData] = useState('');
    const qrCodeRef = useRef(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const dados = await getCheckPointInfo(checkpointId);
                if (dados) {
                    setLatitude(dados.latitude);
                    setLongitude(dados.longitude);
                    setIdentificador(dados.identificador);
                    
                    // Prepara os dados para o QR Code
                    const dataString = `${dados.latitude},${dados.longitude},${checkpointId}`;
                    setQrCodeData(dataString);
                } else {
                    console.log('Nenhum dado encontrado');
                }
            } catch (error) {
                console.log('Erro ao carregar dados:', error);
            }
        };
        loadData();
    }, [checkpointId]);

    // Função para gerar e salvar o QR Code
    const handleGenerateQRCode = async () => {
        try {
            // Atualiza os dados do QR Code com os valores atuais
            const currentData = `${latitude},${longitude},${checkpointId}`;
            setQrCodeData(currentData);
            setShowQRCode(true);
            
            // Pequeno delay para garantir que o QR Code foi renderizado
            setTimeout(async () => {
                try {
                    if (qrCodeRef.current) {
                        // 1. Captura o QR Code como imagem
                        const uri = await captureRef(qrCodeRef.current, {
                            format: 'png',
                            quality: 1,
                        });

                        // 2. Solicita permissão para salvar na galeria
                        const { status } = await MediaLibrary.requestPermissionsAsync();
                        if (status !== 'granted') {
                            Alert.alert(
                                'Permissão necessária', 
                                'Precisamos de permissão para salvar a imagem na sua galeria.',
                                [{ text: 'OK' }]
                            );
                            return;
                        }

                        // 3. Salva na galeria do dispositivo
                        const asset = await MediaLibrary.createAssetAsync(uri);
                        await MediaLibrary.createAlbumAsync('QRCodes', asset, false);

                        Alert.alert(
                            'QR Code Salvo!', 
                            `QR Code do ponto "${identificador}" foi salvo na sua galeria!`,
                            [{ text: 'OK', onPress: () => setShowQRCode(false) }]
                        );
                    }
                } catch (error) {
                    console.error('Erro ao salvar QR Code:', error);
                    Alert.alert('Erro', 'Não foi possível salvar o QR Code na galeria');
                }
            }, 500);
            
        } catch (error) {
            console.error('Erro ao gerar QR Code:', error);
            Alert.alert('Erro', 'Não foi possível gerar o QR Code');
        }
    };

    // Função para apenas visualizar o QR Code (sem salvar)
    const handleViewQRCode = () => {
        const currentData = `${latitude},${longitude},${checkpointId}`;
        setQrCodeData(currentData);
        setShowQRCode(!showQRCode);
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={GlobalStyles.container}>
                    <View style={[GlobalStyles.headerInfoContent, { height: 120 }]}>
                        <Text style={GlobalStyles.headerTitleText}>Editar informações</Text>
                    </View>

                    {/* Identificador */}
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
                        onChangeText={(text) => setLatitude(parseFloat(text) || 0)}
                        value={latitude ? latitude.toString() : ''}
                    />

                    {/* Longitude */}
                    <TextInput
                        keyboardType='numeric'
                        style={TelaLoginStyles.textInput}
                        placeholder="Longitude"
                        onChangeText={(text) => setLongitude(parseFloat(text) || 0)}
                        value={longitude ? longitude.toString() : ''}
                    />

                    {/* QR Code Display */}
                    {showQRCode && qrCodeData && (
                        <View style={{ 
                            alignItems: 'center', 
                            marginVertical: 20,
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 10,
                            marginHorizontal: 20
                        }}>
                            <Text style={{ 
                                fontSize: 16, 
                                fontWeight: 'bold', 
                                marginBottom: 10 
                            }}>
                                QR Code do Ponto
                            </Text>
                            
                            {/* QR Code (invisível para captura) */}
                            <View style={{ position: 'absolute', left: -1000 }}>
                                <QRCode
                                    value={qrCodeData}
                                    size={300}
                                    getRef={(ref) => (qrCodeRef.current = ref)}
                                />
                            </View>
                            
                            {/* QR Code visível para o usuário */}
                            <QRCode
                                value={qrCodeData}
                                size={200}
                            />
                            
                            <Text style={{ 
                                marginTop: 10, 
                                fontSize: 12,
                                color: '#666',
                                textAlign: 'center'
                            }}>
                                {qrCodeData}
                            </Text>
                            
                            <TouchableOpacity
                                style={[GlobalStyles.botao, { marginTop: 10, backgroundColor: '#666' }]}
                                onPress={() => setShowQRCode(false)}
                            >
                                <Text style={GlobalStyles.textoBotao}>Fechar QR Code</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Botão para gerar e salvar QR Code */}
                    <TouchableOpacity
                        style={GlobalStyles.botao}
                        onPress={handleGenerateQRCode}
                    >
                        <Text style={GlobalStyles.textoBotao}>Gerar e Salvar QR Code</Text>
                    </TouchableOpacity>

                    {/* Botão para apenas visualizar QR Code */}
                    <TouchableOpacity
                        style={GlobalStyles.botao}
                        onPress={handleViewQRCode}
                    >
                        <Text style={GlobalStyles.textoBotao}>
                            {showQRCode ? 'Ocultar QR Code' : 'Visualizar QR Code'}
                        </Text>
                    </TouchableOpacity>

                    {/* Botão para atualizar ponto */}
                    <TouchableOpacity
                        style={GlobalStyles.botao}
                        onPress={() => { 
                            editCheckpointInfo(checkpointId, identificador, latitude, longitude);
                            Alert.alert('Sucesso', 'Ponto atualizado com sucesso!');
                        }}
                    >
                        <Text style={GlobalStyles.textoBotao}>Atualizar ponto</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}