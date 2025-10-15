import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, Vibration } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { recordCheckPoint } from 'controller/CheckPointController';
import { PropsScreenApps } from '../../controller/Interfaces';
import RegistroPonto from 'view/styles/RegistroPonto';
import { CheckpointStyle } from 'view/styles/CheckpointStyle';
import { checkPointRegisterResults } from 'controller/CheckPointController';

export const CheckPointScanScreen = ({ navigation, route }: PropsScreenApps<'CheckPointScan'>) => {

  const userId = route.params.userId;
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);


  useEffect(() => {
    requestPermission();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    const result = await recordCheckPoint(data, userId)
    if (result.success === true) {
      Alert.alert('Sucesso!', 'Ponto registrado com sucesso!',
        [
          {
            onPress: () => { setScanned(false) }
          }
        ]

      );
    }
    else{
      if (result.returnError === 'far'){
        Alert.alert('Erro!', 'O ponto está muito distante!',
        [
          {
            onPress: () => { setScanned(false) }
          }
        ]

      );
      }
      else if (result.returnError === 'invalid_code'){
        Alert.alert('Erro!', 'O código não é válido!',
        [
          {
            onPress: () => { setScanned(false) }
          }
        ]

      );
      }
      else{
        Alert.alert('Erro!', 'Erro ao registrar ponto. Tente novamente!',
        [
          {
            onPress: () => { setScanned(false) }
          }
        ]

      );
      }
    }
  };

  if (!permission) {
    return <View style={RegistroPonto.QRCodeScannerContainer}><Text>Carregando...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={RegistroPonto.QRCodeScannerContainer}>
        <Text style={RegistroPonto.QRCodeScannerText}>Permissão de câmera não concedida!</Text>
      </View>
    );
  }

  return (
    <View style={RegistroPonto.qrScanContainer}>
      <CameraView
        style={{ flex: 1 }}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
    </View>
  );
};


export default CheckPointScanScreen;