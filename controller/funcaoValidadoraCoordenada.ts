import { Text, Alert } from "react-native"
import * as Location from 'expo-location'
import { ColorProperties } from "react-native-reanimated/lib/typescript/Colors";


function toRadians (degrees:number): number {
    return degrees * (Math.PI/180);

}



export const splitCoord = (valor:string) => {
    const partes = valor.trim().split(/\s*,\s*/);
    if (partes.length != 2) {
      return null;
    }
    const latitude = parseFloat(partes[0]);
    const longitude = parseFloat(partes[1]);
    // Verifica se a conversão para número foi bem-sucedida
    if (isNaN(latitude) || isNaN(longitude)) {
        return null;
    }
    else{
      return{
        latitude: latitude,
        longitude: longitude
      }
    }
};

export const validaCoordenada = (valorLido: string): boolean => {
    const coordenada = splitCoord(valorLido);
    
    // Se splitCoord retornar null, a coordenada é inválida
    if (coordenada === null) {
        return false;
    }

    // Agora podemos acessar diretamente os valores pois são números válidos
    return (
        coordenada.latitude >= -90 && 
        coordenada.latitude <= 90 &&
        coordenada.longitude >= -180 &&
        coordenada.longitude <= 180
    );
};
    







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
  
  return d; // Retorna a distância calculada
};
