import React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, Alert, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import '../styles/TelaLoginStyles';
import TelaLoginStyles from '../styles/TelaLoginStyles';
import GlobalStyles from '../styles/GlobalStyles';
import { userValidation } from '../../controller/EmployeeController';
import { PropsScreenApps } from '../../controller/Interfaces';
import { LoginResults } from '../../controller/EmployeeController';

const Login = ({ navigation }: PropsScreenApps<'Login'>) => {
  const [cpf, setCpf] = useState('');
  const [password, setSenha] = useState('');


  const haandleUserValidation = async () => {
    const results: LoginResults = await userValidation(parseInt(cpf), password);
    if (results.success == true && results.userId != null) {
      if (results.userType === 'supervisor') {
        navigation.navigate('SupDashboard', { userId: results.userId });
      }
      else {
        navigation.navigate('EmployeeDashboard', { userId: results.userId });
      }
    }
    else {
      if (results.returnError === 'database_error') {
        Alert.alert('Erro!', 'Erro ao buscar dados!')
      }
      else if (results.returnError === 'invalid_credentials') {
        Alert.alert('Erro!', 'Dados incorretos!')
      }
    }
  }

  return (
    <View
      style={GlobalStyles.Container}>
      <Text
        style={TelaLoginStyles.LabelText}
      >PontoFácil!</Text>
      <Image
        source={require('../../src/images/pngIcon.png')}
        style={TelaLoginStyles.AppIcon}
      ></Image>


      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={GlobalStyles.ScreenView}
      >
        <TextInput
          placeholder='CPF'
          keyboardType='numeric'
          style={GlobalStyles.TextInput}
          onChangeText={(text) => setCpf(text)}
          value={cpf}
        >
        </TextInput>


        <TextInput
          placeholder='Senha'
          secureTextEntry={true}
          style={GlobalStyles.TextInput}
          onChangeText={(text) => setSenha(text)}
          value={password}
        >
        </TextInput>

        <TouchableOpacity
          style={GlobalStyles.Button}
          onPress={haandleUserValidation}
        >
          <Text style={GlobalStyles.ButtonText}>Entrar</Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={GlobalStyles.LinkButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text
            style={GlobalStyles.TextLink}
          >
            Ainda não possui uma conta? Cadastre-se aqui!
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>


    </View>

  );

}

export default Login;
