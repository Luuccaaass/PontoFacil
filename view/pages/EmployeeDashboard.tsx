import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import GlobalStyles from 'view/styles/GlobalStyles'; '../styles/GlobalStyles';
import PainelStyles from 'view/styles/DashboardStyles'; '../styles/PainelStyles'
import { PropsScreenApps } from '../../controller/Interfaces';
import { DashboardController, DailyCheckpoints, Coordenadas } from '../../controller/DashboardController';
import { useFocusEffect } from '@react-navigation/native';

const EmployeeDashboard = ({ navigation, route }: PropsScreenApps<'EmployeeDashboard'>) => {
    const userId = route.params.userId;
    const [userData, setUserData] = useState<any>(null);
    const [dailyCheckpoints, setDailyCheckpoints] = useState<DailyCheckpoints[]>([]);

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                try {
                    const data = await DashboardController.loadDashboardData(userId);
                    setUserData(data.dadosFuncionario);
                    setDailyCheckpoints(data.pontosAgrupados);
                } catch (error) {
                    Alert.alert('Erro ao buscar dados do funcionário!');
                    console.error('Erro ao carregar dados:', error);
                }
            };
            loadData();
        }, [userId])
    );

    const DayItem = ({ item }: { item: DailyCheckpoints }) => (
        <View style={PainelStyles.DayRowContainer}>
            <Text style={PainelStyles.DateText}>{item.formattedDate}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                style={PainelStyles.TimesScrollView}
                contentContainerStyle={PainelStyles.CheckInTimeContainer}
            >
                {item.checkInTimes.map((checkInTime, index) => (
                    <View key={index} style={PainelStyles.TimeItem}>
                        <Text style={PainelStyles.checkInTimeText}>{checkInTime}</Text>
                        {index < item.checkInTimes.length - 1 && (
                            <Text style={PainelStyles.Separator}> | </Text>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <View style={GlobalStyles.ScreenView}>
            <View style={PainelStyles.HeaderUserInfo}>
                <Image
                    source={require('../../src/images/userIcon.png')}
                    style={PainelStyles.UserIcon}
                />
                <View style={PainelStyles.InfoBox}>
                    <Text style={{ fontSize: 25 }}>{userData?.nome || 'Carregando...'}</Text>
                    <Text style={{ fontSize: 18 }}>{userData?.cargo || 'Carregando...'}</Text>
                </View>
            </View>
            <View style={GlobalStyles.Container}>
                <View style={PainelStyles.TableContainer}>
                    <ScrollView
                        style={PainelStyles.ScrollViewStyle}
                        showsVerticalScrollIndicator={true}
                    >
                        {dailyCheckpoints.length > 0 ? (
                            dailyCheckpoints.map((dia, index) => (
                                <DayItem key={index} item={dia} />
                            ))
                        ) : (
                            <View style={PainelStyles.EmptyState}>
                                <Text style={PainelStyles.EmptyText}>
                                    Nenhum ponto registrado ainda
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                </View>

                <TouchableOpacity
                    style={GlobalStyles.Button}
                    onPress={() => navigation.navigate('CheckPointScan', {
                        userId: userId
                    })}
                >
                    <Text style={GlobalStyles.ButtonText}>Registrar ponto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EmployeeDashboard;