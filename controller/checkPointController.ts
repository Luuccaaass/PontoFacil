import { Text, Alert } from "react-native"
import * as Location from 'expo-location'
import { getDataPonto, registrarPonto, getPontos } from "model/RegistroPontoModel";
import { editCheckpointModel, getCheckpointInfo, getCheckpointListModel, registerNewCheckpointModel } from "model/CheckPointManage";

const maxDistanceAccepted = 30;

export interface Checkpoint {
  id: number,
  identificador: string,
};

export interface local_ponto {
  latitude: number;
  longitude: number;
  id: number;
};

export interface CurrentLocation {
  latitude: number,
  longitude: number
};


//converte graus para radianos
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);

};

//recebe a string do QR Code e transforma em um vetor com [ latitude, longitude, id ]
export const splitCoord = (valor: string): local_ponto | null => {
  const partes = valor.trim().split(',');

  if (partes.length !== 3) {
    return null;
  }

  const latitude = parseFloat(partes[0]);
  const longitude = parseFloat(partes[1]);
  const id = parseInt(partes[2], 10);

  if (isNaN(latitude) || isNaN(longitude) || isNaN(id)) {
    return null;
  }

  return {
    latitude: latitude,
    longitude: longitude,
    id: id
  };
};

//recebe dois valores e verifica se sao uma coordenada geografica
export const isValidCoordinate = (valorLido: string): boolean => {
  const coordenadaComId = splitCoord(valorLido);

  if (coordenadaComId === null) {
    return false;
  }

  return (
    coordenadaComId.latitude >= -90 &&
    coordenadaComId.latitude <= 90 &&
    coordenadaComId.longitude >= -180 &&
    coordenadaComId.longitude <= 180
  );
};

//recebe o id, latitude e longitude e valida no banco de dados se essas coordenadas esta atrelada ao id recebido
export const isValidCheckpoint = async (
  id: number,
  lat: number,
  long: number
) => {
  const { data, error } = await getDataPonto(id);
  if (error) {
    console.log(`Erro ao buscar informacoes`, error);
    return (false);
  }
  else {
    if (data.latitude === lat && data.longitude === long) {
      return true;
    }
    else {
      return false;
    }
  }
  return false;
};

//valida o qr code --> calcula a distancia do funcionario para o ponto --> se a distancia for menor do que 30m ele registra o ponto
export const recordCheckPoint = async (
  data: string,
  func_id: number
) => {
  const content = splitCoord(data);
  const local = await getDeviceLocation();
  const date = new Date();
  const fDate = date.toISOString().split('T')[0];
  const fHour = date.toLocaleTimeString(`pt-BR`);
  if (content && local) {
    const distance = getDistanceBetween(content?.latitude, content?.longitude, local?.latitude, local?.longitude)
    if (await isValidCheckpoint(content.id, content.latitude, content.longitude)) {
      if (distance <= maxDistanceAccepted) {
        const { data, error } = await registrarPonto(content.id, func_id, fDate, fHour);
        if (!error) {
          console.log(`Registrado!`);
          return true;
        }
        else {
          console.log(`Erro ao registrar o ponto no banco de dados`, error); //a ser retirado na ultima versao
          return false;
        }

      }
      else {
        console.log(`Distante`); //a ser retirado na ultima versao
        return false;
      }
    }
    else {
      console.log(`Codigo invalido!`); //a ser retirado na ultima versao
      return false;
    }
  }
  else {
    return false;
  }
  return false;
};

//obtem a prosicao do gps retornando latitude e longitude
export const getDeviceLocation = async (): Promise<{
  latitude: number;
  longitude: number;
} | null> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Permissão de localização negada");
      return null;
    }
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High, // Precisão alta
    });
    const coordinates: CurrentLocation = {
      latitude: parseFloat(location.coords.latitude.toFixed(6)),
      longitude: parseFloat(location.coords.longitude.toFixed(6))
    }
    return coordinates;

  } catch (error) {
    console.error("Erro ao obter localização:", error);
    return null;
  }
};

//recebe duas coordenadas e calcula a distancia em metros entre elas com a formula de Haversine
export const getDistanceBetween = (
  latA: number,
  longA: number,
  latB: number,
  longB: number
) => {
  const r = 6371000;

  const latRadA = toRadians(latA);
  const latRadB = toRadians(latB);
  const deltaLat = toRadians(latB - latA);
  const deltaLong = toRadians(longB - longA);

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(latRadA) * Math.cos(latRadB) *
    Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = r * c;
  return parseFloat(d.toFixed(6));
};

export const getCheckpointsByFunc = async (id: number) => {
  try {
    const { data, error } = await getPontos(id);
    if (!error) {
      return (data);
    }
    else {
      console.log(`Erro ao buscar os pontos do funcionario`, error);
    }
  }
  catch (error) {
    console.log('Nao foi possivel conectar com o banco de dados!', error);
  }
};

//retorna uma lista com todos os pontos
export const getCheckpointList = async (): Promise<Checkpoint[] | null> => {
  try {
    const { data, error } = await getCheckpointListModel();
    if (error) {
      return null;
    }
    return data;
  }
  catch (error) {
    console.error(`erro`, error);
    return null;
  }
};

//busca as informacoes de um ponto a partir do id
export const getCheckPointInfo = async (checkpointId: number) => {
  try {
    const { data, error } = await getCheckpointInfo(checkpointId);
    if (data) {
      return data;
    }
    else {
      console.log(`Erro ao buscar informacoes do ponto`, error);
    }
    console.log(data);
  }
  catch (error) {
    console.log(`Erro inesperado`, error);
  }
};

//atualiza informacoes sobre um ponto
export const editCheckpointInfo = async (
  checkpointId: number,
  identificador: string,
  latitude: number,
  longitude: number
):Promise<boolean> => {
  try {
    const { data, error } = await editCheckpointModel(checkpointId, identificador, latitude, longitude);
    if (!error) {
      return true
    }
    else {
      return false
    }
  }
  catch {
    return false
  }
  return false
};

//cria um novo ponto
export const createNewCheckpoint = async (
  identificador: string,
  latitude: string,
  longitude: string
) => {
  try {
    const { data, error } = await registerNewCheckpointModel(identificador, parseFloat(latitude), parseFloat(longitude));
    if (error) {
      return false;
    }
    else {
      return true;
    }
  }
  catch (error) {
    return false;
  }

};

//formata as informacoees de um qr code para exibir em tela
export const formatCheckpointQRData = (
  latitude: number,
  longitude: number,
  checkpointId: number
): string => {
  return `${latitude},${longitude},${checkpointId}`;
};
