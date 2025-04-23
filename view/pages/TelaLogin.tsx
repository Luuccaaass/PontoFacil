import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import '../styles/TelaLoginStyles';
import TelaLoginStyles from '../styles/TelaLoginStyles';
import GlobalStyles from '../styles/GlobalStyles';
import { validarFuncionario } from '../../controller/funcionarioControler';
import { NavigationProp } from '@react-navigation/native';
import { PropsScreenApps } from '../../controller/Interfaces';

type Props={
  navigation: NavigationProp<any>;

}


const Login = ({ navigation }:PropsScreenApps<'Login'>) =>{
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');


  
  return (
    <View  
    style= {GlobalStyles.container}>
      <Text
      style={TelaLoginStyles.textoTitulo}
      >PontoFácil!</Text>
      <Image 
      source={require('../../src/images/iconeSemFundo.png')}
      style={TelaLoginStyles.iconeAplicativo}
      ></Image>


      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <TextInput 
        placeholder='CPF'
        keyboardType='numeric'
        style={TelaLoginStyles.textInput}
        onChangeText={(text) => setCpf(text)}
        value={cpf}
        >
        </TextInput>


        <TextInput 
        placeholder='Senha'
        secureTextEntry={true}
        style={TelaLoginStyles.textInput}
        onChangeText={(text) => setSenha(text)}
        value={senha}
        >
        </TextInput>

        <TouchableOpacity
        style={GlobalStyles.botao}
        onPress={() => validarFuncionario(parseInt(cpf), senha, navigation)}
        >
          <Text style={GlobalStyles.textoBotao}>Entrar</Text>

        </TouchableOpacity>
        <TouchableOpacity
        style={GlobalStyles.botaoLink}
        onPress={() => navigation.navigate('Cadastro')}
        >
          <Text
          style={GlobalStyles.textLink}
          >
            Ainda não possui uma conta? Cadastre-se aqui!
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
      
      
    </View>

  );

}

export default Login;
