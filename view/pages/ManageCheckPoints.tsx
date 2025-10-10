import React, {useState, useEffect} from "react";
import { PropsScreenApps } from "controller/Interfaces";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import GlobalStyles from "view/styles/GlobalStyles";
import { getCollabListController, Collab } from "controller/FuncionarioController";
import { CollabStyle } from "view/styles/CollabListView";

export const ManageCheckpoints = ({ navigation, route }: PropsScreenApps<'ManageCheckpoints'>) => {

    return (
        <View style={GlobalStyles.container}>
                    <View style={[GlobalStyles.headerInfoContent, { height: 120 }]}>
                        <Text style={GlobalStyles.headerTitleText}>Gerenciar pontos</Text>
                    </View>
                    
                </View>
            );
};
