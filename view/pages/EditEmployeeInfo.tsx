import React, { useEffect } from 'react';
import { useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import { deleteEmployee, updateEmployeeInfo } from '../../controller/EmployeeController';
import { PropsScreenApps } from '../../controller/Interfaces';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';

//provisório
import '../styles/TelaLoginStyles'
import TelaLoginStyles from '../styles/TelaLoginStyles';
import GlobalStyles from '../styles/GlobalStyles';


export const EditEmployeeInfo = ({ navigation, route }: PropsScreenApps<'EditEmployeeInfo'>) => {
    const employeeId = route.params.CollabId;
    //criação das variáveis const para armazenar os valores que serão inseridos no banco
    const [cpf, setCpf] = useState(route.params.cpf);
    const [name, setName] = useState(route.params.name);
    const [role, setRole] = useState(route.params.role);
    const [salary, setSalary] = useState(route.params.salary);

    const handleUpdateEmployeeInfo = async () => {
        const result = await updateEmployeeInfo(employeeId, cpf, name, role, salary);
        if (result){
            Alert.alert('Sucesso!', 'Dados atualizados com sucesso!');
        }
        else{
            Alert.alert('Erro', 'Não foi possível atualizar os dados do funcionário. Tente novamente!')
        }
    };

    const handleDeleteEmployee = async () => {
        const result = await deleteEmployee(employeeId);
        if (result){
            Alert.alert('Sucesso!', 'Funcionario desligado com sucesso!',
                [
                    {
                        onPress: () => navigation.pop(2)
                    }
                ]
            )
        }
        else{
            Alert.alert('Erro!', 'Não foi possível desligar o funcionário. Tente novamente!')
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1 }}
            //extraScrollHeight={100}
            enableOnAndroid={true}
            keyboardShouldPersistTaps='handled'
        >
            <View style={GlobalStyles.HeaderLabel}>
                        <Text style={GlobalStyles.HeaderTitleText}>Editar informações</Text>
                    </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                
                <View style={GlobalStyles.Container}>
                    

                    {/* nome */}
                    <TextInput
                        style={GlobalStyles.TextInput}
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />

                    {/* CPF */}
                    <TextInput
                        keyboardType='numeric'
                        style={GlobalStyles.TextInput}
                        placeholder='CPF'
                        onChangeText={(text) => setCpf(parseFloat(text))}
                        value={cpf?cpf.toString():''}
                    />

                    {/* cargo */}
                    <View style={TelaLoginStyles.DropDownContainer}>
                        <Picker
                            selectedValue={role}
                            onValueChange={(text) => setRole(text)}>
                            <Picker.Item label='Cargo' value='' />
                            <Picker.Item label='Supervisor' value='supervisor' />
                            <Picker.Item label='Vigilante' value='vigilante' />
                            <Picker.Item label='Administrativo' value='administrativo' />
                        </Picker>
                    </View>


                    {/*salario */}
                    <TextInput
                        keyboardType='numeric'
                        style={GlobalStyles.TextInput}
                        placeholder='Salario'
                        onChangeText={(text) => setSalary(parseFloat(text))}
                        value={salary?salary.toString():''}
                    />



                    <TouchableOpacity
                        style={GlobalStyles.Button}
                        onPress={handleUpdateEmployeeInfo}
                    >
                        <Text style={GlobalStyles.ButtonText}>Confirmar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={GlobalStyles.Button}
                        onPress={handleDeleteEmployee}
                    >
                        <Text style={GlobalStyles.ButtonText}>Desligar funcionário</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}