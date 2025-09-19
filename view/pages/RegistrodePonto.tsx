import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, Vibration} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { validaCoordenada, getDeviceLocation, splitCoord} from 'controller/funcaoValidadoraCoordenada';
import { PropsScreenApps } from "../../controller/Interfaces";
import { getDistanceBetween } from 'controller/funcaoValidadoraCoordenada';

const QRCodeScanner = ({ navigation, route }: PropsScreenApps<'RegistroPonto'>) => {

  
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [leitura, setLeitura] = useState<string | null>(null);
  const latitude = route.params.latitude;
  const longitude = route.params.longitude;



  useEffect(() => {
    requestPermission();
  }, []);

  //funcao que le o qr code
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setLeitura(data);

    /*
*/
    
    
    const coordenadaLida = splitCoord(data);
    if (coordenadaLida != null){
      const distance = getDistanceBetween(latitude, longitude, coordenadaLida?.latitude, coordenadaLida?.longitude)
      Alert.alert(
        `Coordenada lida`, `Distancia de voce: ${distance}`,
      [
        {
          onPress: () => setScanned(false), // Permite nova leitura
        }
      ]
      );
    }
    else{
      Alert.alert(
      `QR Code invalido!`,
      `O QR Code lido nao e validos`,
      [
        {
          onPress: () => setScanned(false), // Permite nova leitura
        }
      ]
    );
    }
  };

  if (!permission) {
    return <View style={styles.container}><Text>Carregando...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Permissão de câmera não concedida!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // Foca apenas em QR Codes
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default QRCodeScanner;