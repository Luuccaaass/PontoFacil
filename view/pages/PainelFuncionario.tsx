import React, { useEffect, useState } from "react";
import { Text, View, Alert, Image, TouchableOpacity, StyleSheet, FlatList, ScrollView } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GlobalStyles from "../styles/GlobalStyles";
import PainelStyles from "../styles/PainelStyles";
import { getDadosFuncionario } from "../../controller/funcionarioControler";
import { PropsScreenApps } from "../../controller/Interfaces";
import { getDeviceLocation, getDistanceBetween, getPontosFunc, validaPonto } from "controller/checkPointController";
import { setShouldAnimateExitingForTag } from "react-native-reanimated/lib/typescript/core";
import { registrarPonto } from "model/registroPontoModel";
import { formatarData, formatarHora } from "controller/contentFormatController";

// Interface para os dados agrupados
interface PontoAgrupado {
    data: string;
    dataFormatada: string;
    horarios: string[];
}

const PainelFuncionario = ({ navigation, route }: PropsScreenApps<'Painel'>) => {
    type Coordenadas = {
        latitude: string,
        longitude: string
    };

    type Ponto = {
        data: string,
        hora: string,
        local_id: number
    };

    const id = route.params.id;
    const [dados, setDados] = useState<any>(null);
    const [localizacao, setLocalizacao] = useState<Coordenadas>({ latitude: '0', longitude: '0' });
    const [data, setData] = useState<Ponto[]>([]);
    const [pontosAgrupados, setPontosAgrupados] = useState<PontoAgrupado[]>([]);





    // Função para agrupar pontos por data
    const agruparPontosPorData = (pontos: Ponto[]): PontoAgrupado[] => {
        const agrupados: { [key: string]: PontoAgrupado } = {};

        pontos.forEach(ponto => {
            if (ponto.data && ponto.hora) {
                if (!agrupados[ponto.data]) {
                    agrupados[ponto.data] = {
                        data: ponto.data,
                        dataFormatada: formatarData(ponto.data),
                        horarios: []
                    };
                }
                agrupados[ponto.data].horarios.push(formatarHora(ponto.hora));
            }
        });

        // Ordenar por data (mais recente primeiro)
        return Object.values(agrupados)
            .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    };

    useEffect(() => {
        const buscarDados = async () => {
            const resposta = await getDadosFuncionario(id);
            const coords = await getDeviceLocation();
            const tempData = await getPontosFunc(id);

            if (coords) {
                setLocalizacao({
                    latitude: coords.latitude.toFixed(4),
                    longitude: coords.longitude.toFixed(4)
                });
            } else {
                console.log('Nao foi possivel obter a localizacao')
            }

            if (resposta) {
                setDados(resposta);
            } else {
                Alert.alert("Erro ao buscar dados do funcionário!");
            }

            if (tempData) {
                setData(tempData);
                const pontosAgrupados = agruparPontosPorData(tempData);
                setPontosAgrupados(pontosAgrupados);
            }
        };
        buscarDados();
    }, [id]);

    // Componente para renderizar cada grupo de pontos por dia
    // Componente para renderizar cada grupo de pontos por dia
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
            {/* Cabeçalho com dados do funcionário */}
            <View style={PainelStyles.boxDadosFunc}>
                <Image
                    source={require('../../src/images/UserIcon.png')}
                    style={PainelStyles.iconeFuncionario}
                />
                <View style={PainelStyles.boxInformacoes}>
                    <Text style={{ fontSize: 25 }}>{dados?.nome || "Carregando..."}</Text>
                    <Text style={{ fontSize: 18 }}>{dados?.cargo || "Carregando..."}</Text>
                </View>
            </View>





            {/* Tabela de pontos */}
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






            {/* Botão registrar ponto */}
            <View style={PainelStyles.boxPontosView}>
                <TouchableOpacity
                    style={GlobalStyles.botao}
                    onPress={() => navigation.navigate('RegistroPonto', {
                        latitude: parseFloat(localizacao.latitude),
                        longitude: parseFloat(localizacao.longitude),
                        func_id: id
                    })}
                >
                    <Text style={GlobalStyles.textoBotao}>Registrar ponto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


export default PainelFuncionario;