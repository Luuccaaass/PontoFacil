import { getDadosFuncionario } from "./FuncionarioController";
import { getDeviceLocation, getCheckpointsByFunc } from "./CheckPointController";
import { formatarData, formatarHora } from "./ContentFormatController";

export interface Ponto {
    data: string;
    hora: string;
    local_id: number;
}

export interface PontoAgrupado {
    data: string;
    dataFormatada: string;
    horarios: string[];
}

export interface Coordenadas {
    latitude: string;
    longitude: string;
}

export class PainelController {
    static async carregarDadosPainel(id: number) {
        const resposta = await getDadosFuncionario(id);
        const coords = await getDeviceLocation();
        const tempData = await getCheckpointsByFunc(id);

        let localizacao: Coordenadas = { latitude: '0', longitude: '0' };
        if (coords) {
            localizacao = {
                latitude: coords.latitude.toFixed(4),
                longitude: coords.longitude.toFixed(4)
            };
        }

        let pontosAgrupados: PontoAgrupado[] = [];
        if (tempData) {
            pontosAgrupados = this.agruparPontosPorData(tempData);
        }

        return {
            dadosFuncionario: resposta,
            localizacao,
            pontosAgrupados
        };
    }

    private static agruparPontosPorData(pontos: Ponto[]): PontoAgrupado[] {
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

        return Object.values(agrupados)
            .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    }
}