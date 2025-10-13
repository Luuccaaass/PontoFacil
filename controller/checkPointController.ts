import { Text, Alert } from "react-native"
import * as Location from 'expo-location'
import { ColorProperties } from "react-native-reanimated/lib/typescript/Colors";
import { getDataPonto, registrarPonto, getPontos } from "model/RegistroPontoModel";
import { registerLoggerConfig } from "react-native-reanimated/lib/typescript/logger";
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

export interface currentCoordinates {
  latitude: number,
  longitude: number
};


//converte graus para radianos
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);

};

//recebe a string do QR Code e transforma em um vetor com [ latitude, longitude, id ]
export const splitCoord = (valor: string): local_ponto | null => {
  // Remove espaços no início/fim e divide apenas por vírgula (sem espaços opcionais)
  const partes = valor.trim().split(',');

  // Esperamos exatamente 3 partes
  if (partes.length !== 3) {
    return null;
  }

  const latitude = parseFloat(partes[0]);
  const longitude = parseFloat(partes[1]);
  const id = parseInt(partes[2], 10);

  // Verifica se todas as conversões foram bem-sucedidas
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
export const isValidCheckpoint = async (id: number, lat: number, long: number) => {
  const { data, error } = await getDataPonto(id);
  if (error) {
    console.log(error);
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
export const recordCheckPoint = async (data: string, func_id: number) => {
  const content = splitCoord(data);
  const local = await getDeviceLocation();
  const date = new Date();
  const fDate = date.toLocaleDateString(`pt-BR`);
  const fHour = date.toLocaleTimeString(`pt-BR`);
  if (content && local) {
    const distance = getDistanceBetween(content?.latitude, content?.longitude, local?.latitude, local?.longitude)
    if (await isValidCheckpoint(content.id, content.latitude, content.longitude)) {
      if (distance <= maxDistanceAccepted) {
        const { data, error } = await registrarPonto(content.id, func_id, fDate, fHour);
        if (!error) {
          return true;
          console.log(`Registrado!`);

        }
        else {
          console.log(error); //a ser retirado na ultima versao
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
    // 1. Verifica permissões
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log("Permissão de localização negada");
      return null;
    }

    // 2. Obtém a localização atual
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High, // Precisão alta
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

  } catch (error) {
    console.error("Erro ao obter localização:", error);
    return null;
  }
};

export const getDistanceBetween = (latA: number, longA: number, latB: number, longB: number) => {
  const r = 6371000; // Raio da Terra em metros

  // Converter todas as coordenadas para radianos
  const latRadA = toRadians(latA);
  const latRadB = toRadians(latB);
  const deltaLat = toRadians(latB - latA);
  const deltaLong = toRadians(longB - longA);

  // Fórmula de Haversine:
  // a = sin²(deltaLat/2) + cos(latRadA) × cos(latRadB) × sin²(deltaLong/2)
  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(latRadA) * Math.cos(latRadB) *
    Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);

  // c = 2 × atan2(√a, √(1−a))
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distância = Raio × Ângulo Central
  const d = r * c;
  return parseFloat(d.toFixed(6)); // Retorna a distância calculada
};

export const getCheckpointsByFunc = async (id: number) => {
  try {
    const { data, error } = await getPontos(id);
    if (!error) {
      return (data);
    }
    else {
      console.log(error);
    }
  }
  catch {
    console.log('Nao foi possivel conectar com o banco de dados!');
  }
};

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


export const getCheckPointInfo = async (checkpointId: number) => {
  try {
    const { data, error } = await getCheckpointInfo(checkpointId);
    if (data) {
      return data;
    }
    else {
      console.log(error);
    }
    console.log(data);
  }
  catch (error) {
    console.log(error);
  }
};

export const editCheckpointInfo = async (checkpointId: number, identificador: string, latitude: number, longitude: number) => {
  try {
    const { data, error } = await editCheckpointModel(checkpointId, identificador, latitude, longitude);
    if (!error) {
      Alert.alert('Sucesso!', 'Ponto atualizado com sucesso!');
    }
    else {
      Alert.alert('Erro!', 'Erro, tente novamente!');
    }
  }
  catch {

  }
};

export const getCurrentCoordinates = async (): Promise<{ latitude: number; longitude: number } | null> => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.error('Permissão de localização negada');
      return null;
    }

    let location = await Location.getCurrentPositionAsync({});
    const coordinates: currentCoordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    return coordinates;

  } catch (error) {
    console.error('Erro ao obter localização:', error);
    return null;
  }
};

export const newCheckpoint = async (identificador: string, latitude: string, longitude: string) => {
  try {
    const { data, error } = await registerNewCheckpointModel(identificador, parseFloat(latitude), parseFloat(longitude));
    if (error) {
      Alert.alert('Erro ao registrar novo ponto!');
    }
    else {
      Alert.alert('Sucesso!', 'Novo ponto registrado com sucesso!');
    }
  }
  catch (error) {
    console.log(error);
  }

};