import React, { useEffect, useState } from "react";
import { Text, View, Alert, Image, TouchableOpacity, ScrollView, TextComponent } from "react-native";
import GlobalStyles from "view/styles/GlobalStyles"; "../styles/GlobalStyles";
import PainelStyles from "view/styles/PainelStyles"; "../styles/PainelStyles"
import { PropsScreenApps } from "../../controller/Interfaces";
import { PainelController, PontoAgrupado, Coordenadas } from "../../controller/PainelController";
import { editCollab } from "controller/FuncionarioController";

const PainelFuncionario = ({ navigation, route }: PropsScreenApps<'CollabCheckpointView'>) => {
    const collabId = route.params.CollabId;
    const [dadosFuncionario, setDadosFuncionario] = useState<any>(null);
    const [pontosAgrupados, setPontosAgrupados] = useState<PontoAgrupado[]>([]);

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const dados = await PainelController.carregarDadosPainel(collabId);
                setDadosFuncionario(dados.dadosFuncionario);
                setPontosAgrupados(dados.pontosAgrupados);
            } catch (error) {
                Alert.alert("Erro ao buscar dados do funcionário!");
                console.error('Erro ao carregar dados:', error);
            }
        };
        buscarDados();
    }, [collabId]);

    const RenderDia = ({ item }: { item: PontoAgrupado }) => (
        <View style={PainelStyles.diaContainer}>
            <Text style={PainelStyles.dataTexto}>{item.dataFormatada}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                style={PainelStyles.horariosScrollView}
                contentContainerStyle={PainelStyles.horariosContentContainer}
            >
                {item.horarios.map((horario, index) => (
                    <View key={index} style={PainelStyles.horarioItem}>
                        <Text style={PainelStyles.horarioTexto}>{horario}</Text>
                        {index < item.horarios.length - 1 && (
                            <Text style={PainelStyles.separador}> | </Text>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <View style={[GlobalStyles.container, { padding: 0 }]}>
            <View style={PainelStyles.headerUserInfo}>
                <Image
                    source={require('../../src/images/UserIcon.png')}
                    style={PainelStyles.iconeFuncionario}
                />
                <View style={[PainelStyles.boxInformacoes, {}]}>
                    <Text style={{ fontSize: 25 }}>{dadosFuncionario?.nome || "Carregando..."}</Text>
                    <Text style={{ fontSize: 18 }}>{dadosFuncionario?.cargo || "Carregando..."}</Text>
                </View>
                <TouchableOpacity
                    style={PainelStyles.editButton}
                    onPress={() => editCollab(collabId, navigation)}
                >
                    <Image
                    source={require('../../src/images/imgEditButton.png')}
                    style={PainelStyles.imageButton}></Image>
                </TouchableOpacity>

            </View>




            <View style={[PainelStyles.boxTable, PainelStyles.tableContainer]}>
                <ScrollView
                    style={PainelStyles.scrollView}
                    showsVerticalScrollIndicator={true}
                >
                    {pontosAgrupados.length > 0 ? (
                        pontosAgrupados.map((dia, index) => (
                            <RenderDia key={index} item={dia} />
                        ))
                    ) : (
                        <View style={PainelStyles.emptyState}>
                            <Text style={PainelStyles.emptyText}>
                                Nenhum ponto registrado ainda
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
};

export default PainelFuncionario;