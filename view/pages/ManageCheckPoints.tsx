import React, { useState, useCallback } from 'react';
import { PropsScreenApps } from 'controller/Interfaces';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import GlobalStyles from 'view/styles/GlobalStyles';
import EmployeeListView from 'view/styles/ListView';
import { useFocusEffect } from '@react-navigation/native';
import { getCheckpointList, Checkpoint, CurrentLocation, getDeviceLocation } from 'controller/CheckPointController';


export const ManageCheckpoints = ({ navigation, route }: PropsScreenApps<'ManageCheckpoints'>) => {
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    const [currentCoordinate, setCurrentCoordinate] = useState<CurrentLocation>();

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                try {
                    const checkpointListData = await getCheckpointList();
                    if (checkpointListData) {
                        setCheckpoints(checkpointListData);
                    }
                    const coordinateData = await getDeviceLocation();
                    if (coordinateData) {
                        setCurrentCoordinate(coordinateData);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            loadData();
        }, [])
    );

    const sortedCheckpoints = [...checkpoints].sort((a, b) => a.id - b.id);

    const renderCheckpoint = ({ item }: { item: Checkpoint }) => {
        return (
            <TouchableOpacity
                style={EmployeeListView.Row}
                onPress={() => { navigation.navigate('EditCheckpoint', { checkpointId: item.id }) }}
            >
                <Text style={EmployeeListView.CellId}>{item.id}</Text>
                <Text style={EmployeeListView.CellSeparator}>|</Text>
                <Text style={EmployeeListView.CellName}>{item.identificador}</Text>
            </TouchableOpacity>
        );
    };

    const handleRegisterNewCheckpoint = () => {
        if (currentCoordinate?.latitude && currentCoordinate.longitude) {
            navigation.navigate('NewCheckpoint', { latitude: currentCoordinate.latitude, longitude: currentCoordinate.longitude });
        }
    };

    return (
        <View style={GlobalStyles.ScreenView}>
            <View style={GlobalStyles.HeaderLabel}>
                <Text style={GlobalStyles.HeaderTitleText}>Gerenciar pontos</Text>
            </View>
            <View style={GlobalStyles.Container}>

                <View style={EmployeeListView.CheckPointList}>
                    <View style={EmployeeListView.Row}>
                        <Text style={EmployeeListView.CellId}>ID</Text>
                        <Text style={EmployeeListView.CellSeparator} />
                        <Text style={EmployeeListView.CellName}>Nome</Text>
                    </View>
                    <FlatList
                        data={sortedCheckpoints}
                        renderItem={renderCheckpoint}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
                <TouchableOpacity
                    style={GlobalStyles.Button}
                    onPress={handleRegisterNewCheckpoint}
                >
                    <Text style={GlobalStyles.ButtonText}>Registrar novo ponto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
