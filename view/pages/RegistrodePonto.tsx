import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, Vibration } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { isValidCoordinate, getDeviceLocation, splitCoord, recordCheckPoint } from 'controller/CheckPointController';
import { PropsScreenApps } from "../../controller/Interfaces";
import { getDistanceBetween } from 'controller/CheckPointController';
import { recognizePrefixSuffix } from 'react-native-reanimated/lib/typescript/animation/util';

export const QRCodeScanner = ({ navigation, route }: PropsScreenApps<'RegistroPonto'>) => {

  const func_id = route.params.func_id;
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
  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    setLeitura(data);

    if (await recordCheckPoint(data, func_id)) {
      Alert.alert(`Sucesso!`, `Ponto registrado com sucesso!`, 
        [
          {
            onPress: () => {setScanned(false)}
          }
        ]

      );
    }
    else{
      Alert.alert(`Erro!`, `Erro ao registrar ponto!`, 
        [
          {
            onPress: () => {setScanned(false)}
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