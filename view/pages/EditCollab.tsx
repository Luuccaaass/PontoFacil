import React, { useEffect } from "react";
import { useState } from 'react';
import { Text, View, TextInput, Button, TouchableOpacity, Platform, ScrollView, Image } from 'react-native';
import { registerCollaborator, updateCollabInfo } from "../../controller/FuncionarioController";
import { NavigationProp } from "@react-navigation/native";
import { PropsScreenApps } from "../../controller/Interfaces";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";

//provisório
import '../styles/TelaLoginStyles'
import TelaLoginStyles from "../styles/TelaLoginStyles";
import GlobalStyles from "../styles/GlobalStyles";


export const EditCollabInfo = ({ navigation, route }: PropsScreenApps<'EditCollabInfo'>) => {
    const collabId = route.params.CollabId;
    //criação das variáveis const para armazenar os valores que serão inseridos no banco
    const [cpf, setCpf] = useState(route.params.cpf);
    const [usuario, setUsuario] = useState(route.params.usuario);
    const [cargo, setCargo] = useState(route.params.cargo);
    const [salario, setSalario] = useState(route.params.salario);

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            //extraScrollHeight={100}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={GlobalStyles.container}>
                    <View style={[GlobalStyles.headerInfoContent, { height: 120 }]}>
                        <Text style={GlobalStyles.headerTitleText}>Editar informações</Text>
                    </View>

                    {/* nome */}
                    <TextInput
                        style={TelaLoginStyles.textInput}
                        onChangeText={(text) => setUsuario(text)}
                        value={usuario}
                    />

                    {/* CPF */}
                    <TextInput
                        keyboardType='numeric'
                        style={TelaLoginStyles.textInput}
                        placeholder="CPF"
                        onChangeText={(text) => setCpf(parseFloat(text))}
                        value={cpf?cpf.toString():''}
                    />

                    {/* cargo */}
                    <View style={TelaLoginStyles.dropDownContainer}>
                        <Picker
                            selectedValue={cargo}
                            onValueChange={(text) => setCargo(text)}>
                            <Picker.Item label="Cargo" value="" />
                            <Picker.Item label="Supervisor" value="supervisor" />
                            <Picker.Item label="Vigilante" value="vigilante" />
                            <Picker.Item label="Administrativo" value="administrativo" />
                        </Picker>
                    </View>


                    {/*salario */}
                    <TextInput
                        keyboardType='numeric'
                        style={TelaLoginStyles.textInput}
                        placeholder="Salario"
                        onChangeText={(text) => setSalario(parseFloat(text))}
                        value={salario?salario.toString():''}
                    />



                    <TouchableOpacity
                        style={GlobalStyles.botao}
                        onPress={() => updateCollabInfo(collabId, cpf, usuario, cargo, salario)}
                    >
                        <Text style={GlobalStyles.textoBotao}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}