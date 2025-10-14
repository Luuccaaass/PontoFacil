import { getUserData } from "./EmployeeController";
import { getDeviceLocation, getCheckpointsByFunc } from "./CheckPointController";
import { formatDate, formatTime } from "./ContentFormatController";

export interface Ponto {
    data: string;
    hora: string;
    local_id: number;
}

export interface DailyCheckpoints {
    data: string;
    formattedDate: string;
    checkInTimes: string[];
}

export interface Coordenadas {
    latitude: string;
    longitude: string;
}

export class DashboardController {
    static async loadDashboardData(id: number) {
        const userData = await getUserData(id);
        const coords = await getDeviceLocation();
        const tempData = await getCheckpointsByFunc(id);

        let localizacao: Coordenadas = { latitude: '0', longitude: '0' };
        if (coords) {
            localizacao = {
                latitude: coords.latitude.toFixed(4),
                longitude: coords.longitude.toFixed(4)
            };
        }

        let groupedCheckpoints: DailyCheckpoints[] = [];
        if (tempData) {
            groupedCheckpoints = this.checkpointsByData(tempData);
        }

        return {
            dadosFuncionario: userData,
            localizacao,
            pontosAgrupados: groupedCheckpoints
        };
    }

    private static checkpointsByData(pontos: Ponto[]): DailyCheckpoints[] {
        const agrupados: { [key: string]: DailyCheckpoints } = {};

        pontos.forEach(ponto => {
            if (ponto.data && ponto.hora) {
                if (!agrupados[ponto.data]) {
                    agrupados[ponto.data] = {
                        data: ponto.data,
                        formattedDate: formatDate(ponto.data),
                        checkInTimes: []
                    };
                }
                agrupados[ponto.data].checkInTimes.push(formatTime(ponto.hora));
            }
        });

        return Object.values(agrupados)
            .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    }
}