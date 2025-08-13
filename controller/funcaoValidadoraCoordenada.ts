import { Text } from "react-native"
import * as Location from 'expo-location'



export const validaCoordenada = (valorLido:string) => {
    const partes = valorLido.trim().split(/\s*,\s*/)
    const latitude = parseFloat(partes[0])
    const longitude = parseFloat(partes[1])

    if (partes.length !== 2) return false;

    //se ambas as variáveis possuírem valor numérico e estiver dentro dos valores aceitos para uma coordenada, é retornado true
    if (!isNaN(latitude) && !isNaN(longitude) &&
    latitude >= -90 && latitude <=90 &&
    longitude>= -180 && longitude <=180
    ){
        return true;
    }
    else{
        return false;
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


