import React, { useState, useEffect, useCallback } from "react";
import { PropsScreenApps } from "controller/Interfaces";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import GlobalStyles from "view/styles/GlobalStyles";
import { getCollabList, Collab } from "controller/FuncionarioController";
import { CollabStyle } from "view/styles/CollabListView";
import { useFocusEffect } from "@react-navigation/native";

export const ManageCollaborators = ({ navigation, route }: PropsScreenApps<'ManageCollabs'>) => {
    const userId = route.params.userId;
    const [func, setFunc] = useState<Collab[]>([]);

    useFocusEffect(
        useCallback(() => {
            const carregaDados = async () => {
                try {
                    const dados = await getCollabList();
                    if (dados) {
                        setFunc(dados);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            carregaDados();
        }, []) // Array de dependências vazio
    );

    const funcOrdenados = [...func].sort((a, b) => a.id - b.id);

    const renderFunc = ({ item }: { item: Collab }) => {
        if (userId != item.id) {
            return (
                <TouchableOpacity
                    style={CollabStyle.row}
                    onPress={() => navigation.navigate('CollabCheckpointView', { CollabId: item.id })}
                >
                    <Text style={CollabStyle.cellId}>{item.id}</Text>
                    <Text style={CollabStyle.cellSeparator}>|</Text>
                    <Text style={CollabStyle.cellName}>{item.nome}</Text>
                </TouchableOpacity>
            );
        }
        return null;
    };
    return (
        <View style={GlobalStyles.container}>
            <View style={[GlobalStyles.headerInfoContent, { height: 120 }]}>
                <Text style={GlobalStyles.headerTitleText}>Gerenciar funcionários</Text>
            </View>
            <View style={CollabStyle.CollabList}>
                <View style={CollabStyle.row}>
                    <Text style={CollabStyle.cellId}>ID</Text>
                    <Text style={CollabStyle.cellSeparator} />
                    <Text style={CollabStyle.cellName}>Nome</Text>
                </View>
                <FlatList
                    data={funcOrdenados}
                    renderItem={renderFunc}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </View>
    );

}