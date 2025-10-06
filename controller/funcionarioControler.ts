import { Alert } from 'react-native';
import { cadastrarFuncionarioModel, getDadosModel, getDadosLogin } from '../model/FuncionarioModel';
import { useState } from 'react';
// import { useNavigation, NavigationProp} from '@react-navigation/native';
import { NavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



export const registerCollaborator = async(cpf: number, nome:string, cargo:string, salario:number, senha:string, navigation:any) => {
    try {
        const { data, error } = await cadastrarFuncionarioModel(cpf, nome, cargo, salario, senha);

        if (error){
            Alert.alert("Erro", error.message);
        }
        else{
            Alert.alert("Sucesso", "Funcionário cadastrado com sucesso!");
            navigation.navigate('Login')
        }
    }
    catch (error){

    }
};

//função que recebe o CPF, a senha e valida para entrar no
export const validarFuncionario = async(cpf:number, senha:string, navigation:any) => {
    try{
    
        const {data, error} = await (getDadosLogin(cpf));
        if (data){
            if (data.senha == senha){
                navigation.navigate('Painel', { id: data.id });
            }
            else{
                Alert.alert('Senha incorreta');
            }
        }
        else{
            Alert.alert('Funcionário não cadastrado!');
        }
    }
    catch(error){
        
    }
};


//função para solicitar os dados do funcionário para a camada model
export const getDadosFuncionario = async (id: number) => {
    try {
        const { data, error } = await getDadosModel(id);
        
        if (error) {
            Alert.alert(`Erro ao buscar funcionario`);
            return null; // Retorne `null` ou uma estrutura apropriada em caso de erro
        }
        else{
            return(data);
        }

    } catch (err) {
        console.error("Erro inesperado:", err);
        return null;
    }
};
