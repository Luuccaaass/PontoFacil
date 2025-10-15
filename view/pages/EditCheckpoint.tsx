import React, { useEffect, useRef, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Platform, ScrollView, Image, Alert } from 'react-native';
import { PropsScreenApps } from 'controller/Interfaces';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import '../styles/TelaLoginStyles'
import TelaLoginStyles from '../styles/TelaLoginStyles';
import GlobalStyles from '../styles/GlobalStyles';
import { getCheckPointInfo, editCheckpointInfo, formatCheckpointQRData, deleteCheckpoint } from 'controller/CheckPointController';
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { CheckpointStyle } from 'view/styles/CheckpointStyle';

export const EditCheckpoint = ({ navigation, route }: PropsScreenApps<'EditCheckpoint'>) => {
    const checkpointId = route.params.checkpointId;

    // Estados para os dados do ponto
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [identifier, setIdentifier] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);
    const [qrCodeData, setQrCodeData] = useState('');
    const qrCodeRef = useRef(null);
    const qrData: string = formatCheckpointQRData(latitude, longitude, checkpointId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCheckPointInfo(checkpointId);
                if (data) {
                    setLatitude(data.latitude);
                    setLongitude(data.longitude);
                    setIdentifier(data.identificador);
                    setQrCodeData(qrData);
                } else {
                    console.log('Nenhum dado encontrado');
                }
            } catch (error) {
                console.log('Erro ao carregar dados:', error);
            }
        };
        fetchData();
    }, [checkpointId]);

    const handleGenerateQRCode = async () => {
        try {
            setQrCodeData(qrData);
            setTimeout(async () => {
                try {
                    if (qrCodeRef.current) {
                        const uri = await captureRef(qrCodeRef.current, {
                            format: 'png',
                            quality: 1,
                        });
                        const { status } = await MediaLibrary.requestPermissionsAsync();
                        if (status !== 'granted') {
                            Alert.alert(
                                'Permissão necessária',
                                'Precisamos de permissão para salvar a imagem na sua galeria.',
                                [{ text: 'OK' }]
                            );
                            return;
                        }
                        const asset = await MediaLibrary.createAssetAsync(uri);
                        await MediaLibrary.createAlbumAsync('QRCodes', asset, false);

                        Alert.alert(
                            'QR Code Salvo!',
                            `QR Code do ponto '${identifier}' foi salvo na sua galeria!`,
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

    const handlePreviewQRCode = () => {
        const currentData = `${latitude},${longitude},${checkpointId}`;
        setQrCodeData(currentData);
        setShowQRCode(!showQRCode);
    };

    const handleEditCheckpoint = async () => {
        const result = await editCheckpointInfo(
            checkpointId,
            identifier,
            latitude,
            longitude
        );
        if (result) {
            Alert.alert('Sucesso!', 'As informações do ponto foram atualizadas!',
                [
                    {
                        onPress: () => navigation.pop(1)
                    }
                ]
            )
        }
        else {
            Alert.alert('Erro!', 'Não foi possível realizar a operação. Tente novamente!')
        }
    };

    const handleDeleteCheckpoint = async() => {
        const result = await deleteCheckpoint(checkpointId);
        if (result){
            Alert.alert('Sucesso!', 'Ponto excluido com sucesso!',
                [
                    {
                        onPress: () => navigation.pop(1)
                    }
                ]
            )
        }
        else{
            Alert.alert('Erro!', 'Não foi possível realizar a operação. Tente novamente!')
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            enableOnAndroid={true}
            keyboardShouldPersistTaps='handled'
        >
            <View style={GlobalStyles.HeaderLabel}>
                <Text style={GlobalStyles.HeaderTitleText}>Editar informações</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={GlobalStyles.Container}>

                    <TextInput
                        keyboardType='default'
                        style={GlobalStyles.TextInput}
                        placeholder='Identificador'
                        onChangeText={(text) => setIdentifier(text)}
                        value={identifier}
                    />

                    <TextInput
                        keyboardType='numeric'
                        style={GlobalStyles.TextInput}
                        placeholder='Latitude'
                        onChangeText={(text) => setLatitude(parseFloat(text) || 0)}
                        value={latitude ? latitude.toString() : ''}
                    />

                    <TextInput
                        keyboardType='numeric'
                        style={GlobalStyles.TextInput}
                        placeholder='Longitude'
                        onChangeText={(text) => setLongitude(parseFloat(text) || 0)}
                        value={longitude ? longitude.toString() : ''}
                    />

                    {showQRCode && qrCodeData && (
                        <View style={CheckpointStyle.QRCodePreview}>
                            <Text style={CheckpointStyle.QRLabelText}>
                                QR Code do Ponto
                            </Text>

                            <View style={{ position: 'absolute', left: -1000 }}>
                                <QRCode
                                    value={qrCodeData}
                                    size={300}
                                    getRef={(ref) => (qrCodeRef.current = ref)}
                                />
                            </View>

                            <QRCode
                                value={qrCodeData}
                                size={200}
                            />

                            <Text style={CheckpointStyle.QRInfoText}>
                                {qrCodeData}
                            </Text>
                            <TouchableOpacity
                                style={CheckpointStyle.Button}
                                onPress={handleGenerateQRCode}
                            >
                                <Text style={GlobalStyles.ButtonText}>Baixar QR Code</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={CheckpointStyle.Button}
                                onPress={() => setShowQRCode(false)}
                            >
                                <Text style={GlobalStyles.ButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity
                        style={GlobalStyles.Button}
                        onPress={handlePreviewQRCode}
                    >
                        <Text style={GlobalStyles.ButtonText}>
                            {showQRCode ? 'Ocultar QR Code' : 'Visualizar QR Code'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={GlobalStyles.Button}
                        onPress={handleEditCheckpoint}
                    >
                        <Text style={GlobalStyles.ButtonText}>Atualizar ponto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={GlobalStyles.Button}
                        onPress={handleDeleteCheckpoint}
                    >
                        <Text style={GlobalStyles.ButtonText}>Excluir ponto</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}