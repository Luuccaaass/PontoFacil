import { Alert } from 'react-native';
import { cadastrarFuncionarioModel, getDadosLogin } from '../model/funcionarioModel';
import { useNavigation, NavigationProp} from '@react-navigation/native';



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
                Alert.alert(`Entrou!`, `Usuario ID: ${data.id}`);
                navigation.navigate('Painel', { id: data.id });
            }
            else{
                Alert.alert('Senha incorreta');
            }
        }
        else{
            Alert.alert('Funcionário não cadastrado! ');
        }
    }
    catch(error){

    }



}