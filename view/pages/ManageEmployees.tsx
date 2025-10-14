import React, { useState, useCallback } from 'react';
import { PropsScreenApps } from 'controller/Interfaces';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import GlobalStyles from 'view/styles/GlobalStyles';
import { getEmployeeList, Employee } from 'controller/EmployeeController';
import CollabListView from 'view/styles/ListView';
import { useFocusEffect } from '@react-navigation/native';

export const ManageEmployees = ({ navigation, route }: PropsScreenApps<'ManageEmployees'>) => {
    const userId = route.params.userId;
    const [employee, setEmployee] = useState<Employee[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const data = await getEmployeeList();
                    if (data) {
                        setEmployee(data);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }, [])
    );

    const sortedEmployees = [...employee].sort((a, b) => a.id - b.id);

    const renderEmployee = ({ item }: { item: Employee }) => {
        if (userId != item.id) {
            return (
                <TouchableOpacity
                    style={CollabListView.Row}
                    onPress={() => navigation.navigate('EmployeeOverview', { employeeId: item.id })}
                >
                    <Text style={CollabListView.CellId}>{item.id}</Text>
                    <Text style={CollabListView.CellSeparator}>|</Text>
                    <Text style={CollabListView.CellName}>{item.nome}</Text>
                </TouchableOpacity>
            );
        }
        return null;
    };
    return (
        <View style={GlobalStyles.ScreenView}>
            <View style={GlobalStyles.HeaderLabel}>
                <Text style={GlobalStyles.HeaderTitleText}>Gerenciar funcionários</Text>
            </View>
            <View style={GlobalStyles.Container}>
            <View style={CollabListView.EmployeeList}>
                <View style={CollabListView.Row}>
                    <Text style={CollabListView.CellId}>ID</Text>
                    <Text style={CollabListView.CellSeparator} />
                    <Text style={CollabListView.CellName}>Nome</Text>
                </View>
                <FlatList
                    data={sortedEmployees}
                    renderItem={renderEmployee}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </View>
        </View>
    );

}