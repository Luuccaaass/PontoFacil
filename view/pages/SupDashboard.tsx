import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import GlobalStyles from 'view/styles/GlobalStyles'; '../styles/GlobalStyles';
import PainelStyles from 'view/styles/DashboardStyles'; '../styles/PainelStyles'
import { PropsScreenApps } from '../../controller/Interfaces';
import { DashboardController, DailyCheckpoints, Coordenadas } from '../../controller/DashboardController';
import { useFocusEffect } from '@react-navigation/native';

const SupDashboard = ({ navigation, route }: PropsScreenApps<'SupDashboard'>) => {
    const userId = route.params.userId;
    const [employeeData, setDadosFuncionario] = useState<any>(null);
    const [currentLocation, setCurrentLocation] = useState<Coordenadas>({ latitude: '0', longitude: '0' });
    const [groupedCheckpoints, setGroupedCheckpoints] = useState<DailyCheckpoints[]>([]);

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                try {
                    const data = await DashboardController.loadDashboardData(userId);
                    setDadosFuncionario(data.dadosFuncionario);
                    setCurrentLocation(data.localizacao);
                    setGroupedCheckpoints(data.pontosAgrupados);
                } catch (error) {
                    console.error('Erro ao carregar dados:', error);
                    Alert.alert('Erro ao buscar dados do funcionário!');

                }
            };
            fetchData();
        }, [userId])
    );


    return (
        <View style={GlobalStyles.ScreenView}>
            <View style={PainelStyles.HeaderUserInfo}>
                <Image
                    source={require('../../src/images/userIcon.png')}
                    style={PainelStyles.UserIcon}
                />
                <View style={PainelStyles.InfoBox}>
                    <Text style={{ fontSize: 25 }}>{employeeData?.nome || 'Carregando...'}</Text>
                    <Text style={{ fontSize: 18 }}>{employeeData?.cargo || 'Carregando...'}</Text>
                </View>
            </View>
            <View style={GlobalStyles.Container}>
                <TouchableOpacity
                    style={GlobalStyles.Button}
                    onPress={() => navigation.navigate('ManageEmployees', { userId: userId })}
                >
                    <Text style={GlobalStyles.ButtonText}>Gerenciar funcionarios</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={GlobalStyles.Button}
                    onPress={() => navigation.navigate('ManageCheckpoints', { userId: userId })}
                >
                    <Text style={GlobalStyles.ButtonText}>Gerenciar pontos</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default SupDashboard;