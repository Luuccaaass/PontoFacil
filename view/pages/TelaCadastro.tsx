import React from "react";
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image} from 'react-native';
import { cadastrarFuncionarioController } from "../../controller/funcionarioControler";
import { NavigationProp } from "@react-navigation/native";
import { PropsScreenApps } from "../../controller/Interfaces";

//provisório
import '../styles/TelaLoginStyles'
import TelaLoginStyles from "../styles/TelaLoginStyles";
import GlobalStyles from "../styles/GlobalStyles";



// type Props = {
//   navigation: NavigationProp<any>;
// }

const Cadastro = ({ navigation }:PropsScreenApps<'Cadastro'>) => {
    //criação das variáveis const para armazenar os valores que serão inseridos no banco
    const [cpf, setCpf] = useState("");
    const [usuario, setUsuario] = useState("");
    const [cargo, setCargo] = useState("");
    const [salario, setSalario] = useState("");
    const [senha, setSenha] = useState("");

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Ajusta o comportamento dependendo da plataforma
        
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={GlobalStyles.container}>
            <Text
              style={TelaLoginStyles.textoTitulo}
              >PontoFácil!</Text>
              <Image
            source={require('../../src/images/iconeSemFundo.png')}
            style={TelaLoginStyles.iconeAplicativo}
            >

            </Image>

            {/* nome */}
            <TextInput 
              style={TelaLoginStyles.textInput}
              placeholder="Nome"
              onChangeText={(text) => setUsuario(text)}
              value={usuario}
            />

            {/* CPF */}
            <TextInput 
              keyboardType='numeric'
              style={TelaLoginStyles.textInput}
              placeholder="CPF"
              onChangeText={(text) => setCpf(text)}
              value={cpf}
            />

            {/* cargo */}
            <TextInput 
              style={TelaLoginStyles.textInput}
              placeholder="Cargo"
              onChangeText={(text) => setCargo(text)}
              value={cargo}
            />
        
            {/*salario */}
            <TextInput 
              keyboardType='numeric'
              style={TelaLoginStyles.textInput}
              placeholder="Salario"
              onChangeText={(text) => setSalario(text)}
              value={salario}
            />

            {/*senha */}
            <TextInput 
              style={TelaLoginStyles.textInput}
              placeholder="Senha"
              secureTextEntry={true}
              onChangeText={(text) => setSenha(text)}
              value={senha}
            />

            <TouchableOpacity
              style={GlobalStyles.botao}
              onPress={() => cadastrarFuncionarioController(parseInt(cpf), usuario, cargo, parseFloat(salario), senha, navigation)}
            >
              <Text style={GlobalStyles.textoBotao}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={GlobalStyles.botaoLink}
            onPress={() => navigation.navigate('Login')}
            >
              <Text
              style={GlobalStyles.textLink}
              >
                Ja possui cadastro? Clique aqui!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
}

export default Cadastro;