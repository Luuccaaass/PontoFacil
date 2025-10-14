import React, { useEffect, useState } from 'react';
import { Text, View, Alert, Image, TouchableOpacity, ScrollView, TextComponent } from 'react-native';
import GlobalStyles from 'view/styles/GlobalStyles'; '../styles/GlobalStyles';
import PainelStyles from 'view/styles/DashboardStyles'; '../styles/PainelStyles'
import { PropsScreenApps } from '../../controller/Interfaces';
import { DashboardController, DailyCheckpoints, Coordenadas } from '../../controller/DashboardController';
import { getUserData } from 'controller/EmployeeController';

const EmployeeOverview = ({ navigation, route }: PropsScreenApps<'EmployeeOverview'>) => {
    const employeeId = route.params.employeeId;
    const [employeeData, setEmployeeData] = useState<any>(null);
    const [dailyCheckpoints, setDailyCheckpoints] = useState<DailyCheckpoints[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await DashboardController.loadDashboardData(employeeId);
                setEmployeeData(data.dadosFuncionario);
                setDailyCheckpoints(data.pontosAgrupados);
            } catch (error) {
                Alert.alert('Erro ao buscar dados do funcionário!');
                console.error('Erro ao carregar dados:', error);
            }
        };
        fetchData();
    }, [employeeId]);

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

    const handleCallEditEmployeeInfo = async () => {
        const data = await getUserData(employeeId)
        if (data){
            navigation.navigate('EditEmployeeInfo', {CollabId: employeeId, cpf: data.CPF, name: data.nome, role: data.cargo, salary: data.salario})
        }
    }

    return (
        <View style={GlobalStyles.ScreenView}>
            <View style={PainelStyles.HeaderUserInfo}>
                <Image
                    source={require('../../src/images/userIcon.png')}
                    style={PainelStyles.UserIcon}
                />
                <View style={[PainelStyles.InfoBox, {}]}>
                    <Text style={{ fontSize: 25 }}>{employeeData?.nome || 'Carregando...'}</Text>
                    <Text style={{ fontSize: 18 }}>{employeeData?.cargo || 'Carregando...'}</Text>
                </View>
                <TouchableOpacity
                    style={PainelStyles.EditButton}
                    onPress={handleCallEditEmployeeInfo}
                >
                    <Image
                    source={require('../../src/images/imgEditButton.png')}
                    style={PainelStyles.ImageButton}></Image>
                </TouchableOpacity>

            </View>
            <View style={[GlobalStyles.Container, { padding: 0 }]}>
            <View style={[PainelStyles.TableBox, PainelStyles.TableContainer]}>
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
        </View>
        </View>
    );
};

export default EmployeeOverview;