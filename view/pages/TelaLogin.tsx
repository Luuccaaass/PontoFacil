import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import './TelaLogin.Styles';
import TelaLoginStyles from './TelaLogin.Styles';
import { validarFuncionario } from '../../controller/funcionarioControler';
import { NavigationProp } from '@react-navigation/native';

type Props={
  navigation: NavigationProp<any>;

}


const Login:React.FC<Props> = ({ navigation }) =>{
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');


  
  return (
    <View  
    style= {TelaLoginStyles.container}>
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
        style={TelaLoginStyles.textInput}
        onChangeText={(text) => setCpf(text)}
        value={cpf}
        >
        </TextInput>


        <TextInput 
        placeholder='Senha'
        style={TelaLoginStyles.textInput}
        onChangeText={(text) => setSenha(text)}
        value={senha}
        >
        </TextInput>

        <TouchableOpacity
        style={TelaLoginStyles.botao}
        onPress={() => validarFuncionario(parseInt(cpf), senha, navigation)}
        >
          <Text style={TelaLoginStyles.textoBotao}>Entrar</Text>

        </TouchableOpacity>
        <TouchableOpacity
        style={TelaLoginStyles.botaoLink}
        onPress={() => navigation.navigate('Cadastro')}
        >
          <Text
          style={TelaLoginStyles.textLink}
          >
            Ainda não possui uma conta? Cadastre-se aqui!
          </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
      
      
    </View>

  );

}

export default Login;
