import { Alert } from 'react-native';
import { cadastrarFuncionarioModel, getDadosModel, getDadosLogin } from '../model/funcionarioModel';
import { useState } from 'react';
// import { useNavigation, NavigationProp} from '@react-navigation/native';



export const cadastrarFuncionarioController = async(cpf: number, nome:string, cargo:string, salario:number, senha:string) => {
    try {
        const { data, error } = await cadastrarFuncionarioModel(cpf, nome, cargo, salario, senha);

        if (error){
            Alert.alert("Erro", error.message);
        }
        else{
            Alert.alert("Sucesso", "Funcionário cadastrado com sucesso!");
        }
    }
    catch (error){

    }
}

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
}

//função para solicitar todos os dados do funcionário
// export const getDadosFuncionario = async(id:number) => {
//     const [dados, setDados] = useState({});
//     try {
//         const { data, error } = await (getDadosModel(id))
//         if (data){
//             setDados(data);
//             return {dados};
//         }
//         else{
//             Alert.alert("Erro", `{error}`);
//         }
//     }
//     catch{
        
//     }
//     return {dados}
// }


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
