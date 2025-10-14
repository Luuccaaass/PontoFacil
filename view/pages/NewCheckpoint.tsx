import React, { useState } from 'react';
import { PropsScreenApps } from 'controller/Interfaces';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import GlobalStyles from 'view/styles/GlobalStyles';
import { createNewCheckpoint, getDeviceLocation } from 'controller/CheckPointController';
import { CheckpointStyle } from 'view/styles/CheckpointStyle';
import { Image } from '@rneui/base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Map, { Marker, MapPressEvent } from 'react-native-maps';
import { CurrentLocation } from 'controller/CheckPointController';


export const NewCheckpoint = ({ navigation, route }: PropsScreenApps<'NewCheckpoint'>) => {
    const currentLat = route.params;
    const [latitude, setLatitude] = useState<string>('');
    const [longitude, setLongitude] = useState<string>('');
    const [checkpointName, setCheckpointName] = useState<string>('');
    const [selectedPosition, setSelectedPosition] = useState<CurrentLocation>({ latitude: route.params.latitude, longitude: route.params.longitude });

    const handleUseCurrentLocation = async () => {
        setLatitude(currentLat.latitude.toString());
        setLongitude(currentLat.longitude.toString());
        setSelectedPosition({
            latitude: currentLat.latitude,
            longitude: currentLat.longitude
        });
    };


    const handleMapPress = (event: MapPressEvent) => {
        const { coordinate } = event.nativeEvent;
        setLatitude(coordinate.latitude.toFixed(6).toString());
        setLongitude(coordinate.longitude.toFixed(6).toString());
        setSelectedPosition({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        });
    };

    const handleNewCheckpoint = async () => {
        if (checkpointName != '' && latitude != '' && longitude != '') {
            const result = await createNewCheckpoint(checkpointName, latitude, longitude);
            if (result) {
                Alert.alert('Sucesso!', 'Novo ponto criado com sucesso!',
                    [
                        {
                            onPress:()=>navigation.pop(1)
                        }
                    ]
                )
            }
            else {
                Alert.alert('Erro!', 'Não foi possível criar o ponto. Tente novamente!')
            }
        }
        else{
            Alert.alert('Erro!', 'Preencha todos os campos!')
        }

    };


    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={100}
            enableOnAndroid={true}
            keyboardShouldPersistTaps='handled'
        >
            <View style={GlobalStyles.HeaderLabel}>
                <Text style={GlobalStyles.HeaderTitleText}>Novo ponto</Text>
            </View>
            <View style={GlobalStyles.Container}>

                <View style={CheckpointStyle.MapContainer}>
                    <Map
                        style={CheckpointStyle.MapPreviewStyle}
                        initialRegion={{
                            latitude: selectedPosition?.latitude ?? 0,
                            longitude: selectedPosition?.longitude ?? 0,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,

                        }}
                        onPress={handleMapPress}>
                        <Marker
                            coordinate={{
                                latitude: selectedPosition?.latitude ?? 0,
                                longitude: selectedPosition?.longitude ?? 0
                            }}></Marker>
                    </Map>
                </View>
                <TextInput style={GlobalStyles.TextInput}
                    placeholder='Nome do ponto'
                    value={checkpointName}
                    onChangeText={(Text) => setCheckpointName(Text)}
                ></TextInput>
                <View style={CheckpointStyle.ChekcpointInfoContainer}>
                    <TextInput
                        style={CheckpointStyle.CheckPointInfoContainer}
                        placeholder='Latitude'
                        value={latitude}
                        onChangeText={setLatitude}
                        keyboardType='numeric'
                        editable={true}
                    />
                    <TextInput
                        style={CheckpointStyle.CheckPointInfoContainer}
                        placeholder='Longitude'
                        value={longitude}
                        onChangeText={setLongitude}
                        keyboardType='numeric'
                        editable={true}
                    />
                    <TouchableOpacity style={CheckpointStyle.GetCurrentCoordsButton}
                        onPress={handleUseCurrentLocation}>
                        <Image
                            source={require('../../src/images/getCurrentLocationIcon.png')}
                            style={CheckpointStyle.GetCurrentLocationIconButton}
                        ></Image>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity
                    style={GlobalStyles.Button}
                    onPress={handleNewCheckpoint}
                >
                    <Text style={GlobalStyles.ButtonText}>Registrar novo ponto</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
} 