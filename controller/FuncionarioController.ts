import { Alert } from 'react-native';
import { cadastrarFuncionarioModel, getDadosModel, getDadosLogin, getCollabListModel, updateCollabInfoModel, deleteCollabModel } from '../model/FuncionarioModel';

export interface Collab {
    id: number,
    nome: string,
};

export const registerCollaborator = async (cpf: number, nome: string, cargo: string, salario: number, senha: string, navigation: any) => {
    try {
        const { data, error } = await cadastrarFuncionarioModel(cpf, nome, cargo, salario, senha);

        if (error) {
            Alert.alert("Erro", error.message);
        }
        else {
            Alert.alert("Sucesso", "Funcionário cadastrado com sucesso!");
            navigation.navigate('Login')
        }
    }
    catch (error) {
        console.error(error);
    }
};

export const validarFuncionario = async (cpf: number, senha: string, navigation: any) => {
    try {
        const { data, error } = await (getDadosLogin(cpf));
        if (data) {
            if (data.senha == senha && data.cargo != 'supervisor') {
                navigation.navigate('PainelFunc', { userId: data.id });
            }
            else if (data.senha == senha && data.cargo === 'supervisor') {
                navigation.navigate('PainelSup', { userId: data.id });
            }
            else {
                Alert.alert('Dados Incorretos!');
            }
        }
        else {
            Alert.alert('Funcionário não cadastrado!');
        }
    }
    catch (error) {
        console.error(error);
    }
};

export const getDadosFuncionario = async (id: number) => {
    try {
        const { data, error } = await getDadosModel(id);

        if (error) {
            Alert.alert(`Erro ao buscar funcionario`);
            return null;
        }
        else {
            return data;
        }
    } catch (err) {
        console.error("Erro inesperado:", err);
        return null;
    }
};

export const getCollabList = async (): Promise<Collab[] | null> => {
    try {
        const { data, error } = await getCollabListModel();
        if (error) {
            console.error(error);
            return null;
        }
        return data;
    }
    catch (error) {
        console.error(`erro`, error);
        return null;
    }
};



export const editCollab = async (id: number, navigation: any) => {
    try {
        const { data, error } = await getDadosModel(id);
        if (data) {
            navigation.navigate('EditCollabInfo', { CollabId: id, cpf: data.CPF, usuario: data.nome, cargo: data.cargo, salario: data.salario })
        }
        else {
            Alert.alert('Erro!', 'Houve algum erro! Tente novamente!')
        }
    }
    catch {
        Alert.alert('Erro!', 'Erro ao buscar funcionario! Tente novamente mais tarde!');
    }

};

export const updateCollabInfo = async (collabId: number, cpf: number, nome: string, cargo: string, salario: number) => {
    try {
        const { data, error } = await updateCollabInfoModel(collabId, cpf, nome, cargo, salario);
        if (data) {
            Alert.alert('Atualizado!', 'Os dados do funcionário foram atualizados com sucesso!')
        }
        else {
            Alert.alert('Erro!', 'Houve algum erro! Tente novamente!');
        }
    }
    catch {

    }
};

export const deleteCollab = async (collabId: number) => {
    try {
        const { data, error } = await deleteCollabModel(collabId);
        if (!error) {
            Alert.alert('Sucesso!', 'Funcionario desligado com sucesso!');
        }
        else if (error) {
            console.log(error)
        }
    }
    catch {

    }

};