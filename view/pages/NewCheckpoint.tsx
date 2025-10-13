import React, { useState, useEffect } from "react";
import { PropsScreenApps } from "controller/Interfaces";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import GlobalStyles from "view/styles/GlobalStyles";
import { getCollabList, Collab } from "controller/FuncionarioController";
import { CollabStyle } from "view/styles/CollabListView";
import { useFocusEffect } from "@react-navigation/native";
import { getCheckpointList, Checkpoint, newCheckpoint } from "controller/CheckPointController";
import { CheckpointStyle } from "view/styles/CheckpointStyle";
import { local_ponto } from "controller/CheckPointController";
import { Alert } from "react-native";
import { getCurrentCoordinates } from "controller/CheckPointController";
import { Image } from "@rneui/base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Map, { Marker, MapPressEvent } from "react-native-maps";
import { currentCoordinates } from "controller/CheckPointController";


export const NewCheckpoint = ({ navigation, route }: PropsScreenApps<'NewCheckpoint'>) => {
    const [latitude, setLatitude] = useState<string>('');
    const [longitude, setLongitude] = useState<string>('');
    const [checkPointName, setCheckpointName] = useState<string>('');
    const [currentPosition, setCurrentPosition] = useState<currentCoordinates>({ latitude: route.params.latitude, longitude: route.params.longitude });

    const handleGetCurrentLocation = async () => {
        setLatitude(currentPosition.latitude.toFixed(6).toString());
        setLongitude(currentPosition.longitude.toFixed(6).toString());
    };


    const handleMapPress = (event: MapPressEvent) => {
        const { coordinate } = event.nativeEvent;
        setLatitude(coordinate.latitude.toFixed(6).toString());
        setLongitude(coordinate.longitude.toFixed(6).toString());
        setCurrentPosition({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude
        });
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            extraScrollHeight={100}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
        >
            <View style={GlobalStyles.container}>
                <View style={[GlobalStyles.headerInfoContent, { height: 120 }]}>
                    <Text style={GlobalStyles.headerTitleText}>Novo ponto</Text>
                </View>
                <View style={CheckpointStyle.MapPreview}>
                    <Map
                        style={{ height: '100%', width: '100%' }}
                        initialRegion={{
                            latitude: currentPosition?.latitude ?? 0,
                            longitude: currentPosition?.longitude ?? 0,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,

                        }}
                        onPress={handleMapPress}>
                        <Marker
                            coordinate={{
                                latitude: currentPosition?.latitude ?? 0,
                                longitude: currentPosition?.longitude ?? 0
                            }}></Marker>
                    </Map>
                </View>
                <TextInput style={GlobalStyles.textInput}
                    placeholder="Nome do ponto"
                    value={checkPointName}
                    onChangeText={(Text) => setCheckpointName(Text)}
                ></TextInput>
                <View style={CheckpointStyle.chekcpointInfoContainer}>
                    <TextInput
                        style={CheckpointStyle.checkPointinfo}
                        placeholder="Latitude"
                        value={latitude}
                        onChangeText={setLatitude}
                        keyboardType="numeric"
                        editable={true}
                    />
                    <TextInput
                        style={CheckpointStyle.checkPointinfo}
                        placeholder="Longitude"
                        value={longitude}
                        onChangeText={setLongitude}
                        keyboardType="numeric"
                        editable={true}
                    />
                    <TouchableOpacity style={CheckpointStyle.getCurrentCoordsButton}
                        onPress={handleGetCurrentLocation}>
                        <Image
                            source={require('../../src/images/getCurrentLocationIcon.png')}
                            style={CheckpointStyle.getCurrentLocationIconButton}
                        ></Image>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity
                    style={GlobalStyles.botao}
                    onPress={() => { newCheckpoint(checkPointName, latitude, longitude) }}
                >
                    <Text style={GlobalStyles.textoBotao}>Registrar novo ponto</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
} 