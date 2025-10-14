import React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Platform, ScrollView, Image, Alert } from 'react-native';
import { registerEmployee } from '../../controller/EmployeeController';
import { PropsScreenApps } from '../../controller/Interfaces';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import '../styles/TelaLoginStyles'
import TelaLoginStyles from '../styles/TelaLoginStyles';
import GlobalStyles from '../styles/GlobalStyles';

const SignUpScreen = ({ navigation }: PropsScreenApps<'SignUp'>) => {
  //criação das variáveis const para armazenar os valores que serão inseridos no banco
  const [cpf, setCpf] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterEmployee = async () => {
    const result = await registerEmployee(cpf, name, role, salary, password);
    if (result === 'success') {
      Alert.alert('Sucesso!', 'Funcionario cadastrado com sucesso!', [
        {
          onPress: () => navigation.navigate('Login')
        }
      ]);
    }
    else {
      Alert.alert('Erro!', result);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={GlobalStyles.ScreenView}
      enableOnAndroid={true}
      keyboardShouldPersistTaps='handled'
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%' }}>
        <View style={GlobalStyles.Container}>
          <Text
            style={TelaLoginStyles.LabelText}
          >PontoFácil!</Text>
          <Image
            source={require('../../src/images/pngIcon.png')}
            style={TelaLoginStyles.AppIcon}
          >

          </Image>

          {/* nome */}
          <TextInput
            style={GlobalStyles.TextInput}
            placeholder='Nome'
            onChangeText={(text) => setName(text)}
            value={name}
          />

          {/* CPF */}
          <TextInput
            keyboardType='numeric'
            style={GlobalStyles.TextInput}
            placeholder='CPF'
            onChangeText={(text) => setCpf(text)}
            value={cpf}
          />

          {/* cargo */}
          <View style={TelaLoginStyles.DropDownContainer}>
            <Picker
              selectedValue={role}
              onValueChange={(text) => setRole(text)}>
              <Picker.Item label='Cargo' value='' />
              <Picker.Item label='Vigilante' value='vigilante' />
              <Picker.Item label='Administrativo' value='administrativo' />
            </Picker>
          </View>


          {/*salario */}
          <TextInput
            keyboardType='numeric'
            style={GlobalStyles.TextInput}
            placeholder='Salario'
            onChangeText={(text) => setSalary(text)}
            value={salary}
          />

          {/*senha */}
          <TextInput
            style={GlobalStyles.TextInput}
            placeholder='Senha'
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />


          <TouchableOpacity
            style={GlobalStyles.Button}
            onPress={handleRegisterEmployee}
          >
            <Text style={GlobalStyles.ButtonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={GlobalStyles.LinkButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text
              style={GlobalStyles.TextLink}
            >
              Ja possui cadastro? Clique aqui!
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>


  )
}

export default SignUpScreen;