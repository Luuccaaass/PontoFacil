import React, { useState, useEffect, useCallback } from "react";
import { PropsScreenApps } from "controller/Interfaces";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import GlobalStyles from "view/styles/GlobalStyles";
import { getCollabList, Collab } from "controller/FuncionarioController";
import { CollabStyle } from "view/styles/CollabListView";
import { useFocusEffect } from "@react-navigation/native";
import { getCheckpointList, Checkpoint, getCurrentCoordinates, currentCoordinates } from "controller/CheckPointController";


export const ManageCheckpoints = ({ navigation, route }: PropsScreenApps<'ManageCheckpoints'>) => {
    const [checkPoint, setCheckPoint] = useState<Checkpoint[]>([]);
    const [coordinate, setCoordinate] = useState<currentCoordinates>();

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                try {
                    const checkpointListData = await getCheckpointList();
                    if (checkpointListData) {
                        setCheckPoint(checkpointListData);
                    }
                    const coordinateData = await getCurrentCoordinates();
                    if (coordinateData){
                        setCoordinate(coordinateData);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            loadData();
        }, [])
    );

    const pontosOrdenados = [...checkPoint].sort((a, b) => a.id - b.id);

    const renderFunc = ({ item }: { item: Checkpoint }) => {
        return (
            <TouchableOpacity
                style={CollabStyle.row}
                onPress={() => { navigation.navigate('EditCheckpoint', { checkPpointId: item.id }) }}
            >
                <Text style={CollabStyle.cellId}>{item.id}</Text>
                <Text style={CollabStyle.cellSeparator}>|</Text>
                <Text style={CollabStyle.cellName}>{item.identificador}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={GlobalStyles.container}>
            <View style={[GlobalStyles.headerInfoContent, { height: 120 }]}>
                <Text style={GlobalStyles.headerTitleText}>Gerenciar pontos</Text>
            </View>
            <View style={[CollabStyle.CollabList, { height: '72%' }]}>
                <View style={CollabStyle.row}>
                    <Text style={CollabStyle.cellId}>ID</Text>
                    <Text style={CollabStyle.cellSeparator} />
                    <Text style={CollabStyle.cellName}>Nome</Text>
                </View>
                <FlatList
                    data={pontosOrdenados}
                    renderItem={renderFunc}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <TouchableOpacity
                style={GlobalStyles.botao}
                onPress={() => navigation.navigate('NewCheckpoint', {latitude:coordinate?.latitude??0, longitude:coordinate?.longitude??0})}
            >
                <Text style={GlobalStyles.textoBotao}>Registrar novo ponto</Text>
            </TouchableOpacity>
        </View>
    );
};
