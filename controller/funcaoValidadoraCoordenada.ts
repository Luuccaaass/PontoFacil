import { Text, Alert } from "react-native"
import * as Location from 'expo-location'
import { ColorProperties } from "react-native-reanimated/lib/typescript/Colors";
import { getDataPonto, registrarPonto } from "model/registroPontoModel";
import { registerLoggerConfig } from "react-native-reanimated/lib/typescript/logger";
const maxDistanceAccepted = 10;

type local_ponto = {
  latitude: number;
  longitude: number;
  id: number;
}

function toRadians (degrees:number): number {
    return degrees * (Math.PI/180);

}



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

export const validaCoordenada = (valorLido: string): boolean => {
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
export const validaPonto = async (id:number, lat:number, long:number) => {
  const { data, error } = await getDataPonto(id);
  if (error){
    console.log(error);
    return (false);
  }
  else{
    if (data.latitude === lat && data.longitude === long){
      return(true);
    }
    else{
      Alert.alert(`Ponto invalido!`, `Nao foi possivel registrar o ponto, pois o qr code escaneado esta invalido!`);
      return (false);
    }
  }
  return true;
}
    


export const recordCheckPoint = async (data:string, func_id:number) => {
  const content = splitCoord(data);
  const local = await getDeviceLocation();
  if (content && local){
    const distance = getDistanceBetween(content?.latitude, content?.longitude, local?.latitude, local?.longitude)
    if (await validaPonto(content.id, content.latitude, content.longitude)){
      if (distance <= 30){
        console.log(`Valido!`);
      }
      else{
        console.log(`Distante!`);
      }

    }
    else{
      console.log(`Invalido`);
      return (false);
    }
  }
  else{
    Alert.alert(`Erro!`, `Problema ao buscar coordenadas!`)
  }

  
  // if (!validaCoordenada(data)){
  //   Alert.alert(`Coordenada invalida!`);
  // }
  // else{
  //     Alert.alert(`local`,`${local?.latitude}`);
  //   }
    
}

export const gravar = async (local:number, id:number) => {
  const {data, error} = await registrarPonto(local, id);
  console.log(id)
  if (error){
    console.log(error.message)
  }
 
}




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
  console.log(`Distancia entre: \n ${latA} \n ${longA} \n ${latB} \n ${longB}`)
  return parseFloat(d.toFixed(4)); // Retorna a distância calculada
};
