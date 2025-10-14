import { Alert } from 'react-native';
import { cadastrarFuncionarioModel, getDadosModel, getDadosLogin, getCollabListModel, updateCollabInfoModel, deleteCollabModel } from '../model/FuncionarioModel';

export interface Employee {
    id: number,
    nome: string,
};

export interface LoginResults {
    success: boolean;
    userId?: number;
    userType?: 'funcionario' | 'supervisor';
    returnError?: 'invalid_credentials' | 'database_error';
};

export const registerEmployee = async (
    cpf: string,
    name: string,
    role: string,
    salary: string,
    password: string) => {
    if (cpf.length != 9) {
        return('Preencha um CPF válido!')
    }
    else if (!name){
        return('Preencha o campo nome!')
    }
    else if (!password){
        return('Preencha o campo senha!')
    }
    else if (role === ''){
        return('Selecione o cargo!')
    }
    else {
        try {
            const { data, error } = await cadastrarFuncionarioModel(parseInt(cpf), name, role, parseInt(salary), password);

            if (error) {
                return ('Erro ao conectar-se. Tente novamente!');
            }
            else {
                return ('success');
            }
        }
        catch (error) {
            return ('Erro ao conectar-se. Tente novamente!');
        }
    }
};

export const userValidation = async (
    cpf: number,
    senha: string): Promise<LoginResults> => {
    try {
        const { data, error } = await (getDadosLogin(cpf));
        if (data) {
            if (data.senha == senha && data.cargo != 'supervisor') {
                return {
                    success: true,
                    userType: 'funcionario',
                    userId: data.id
                };
            }
            else if (data.senha == senha && data.cargo === 'supervisor') {
                return {
                    success: true,
                    userType: 'supervisor',
                    userId: data.id
                };
            }
            else if (data.senha != senha) {
                return {
                    success: false,
                    returnError: 'invalid_credentials'
                }
            }
        }
        else if (error) {
            return {
                success: false,
                returnError: 'database_error'
            };
        }
    }
    catch (warning) {
        return { success: false, returnError: 'database_error' }
    }
    return { success: false };
};

export const getUserData = async (id: number) => {
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

export const getEmployeeList = async (): Promise<Employee[] | null> => {
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



export const updateEmployeeInfo = async (
    collabId: number,
    cpf: number,
    nome: string,
    cargo: string,
    salario: number): Promise<boolean> => {
    try {
        const { data, error } = await updateCollabInfoModel(collabId, cpf, nome, cargo, salario);
        if (data) {
            return true;
        }
        else {
            return false
        }
    }
    catch {
        return false;
    }
    return false;
};

export const deleteEmployee = async (collabId: number): Promise<boolean> => {
    try {
        const { data, error } = await deleteCollabModel(collabId);
        if (!error) {
            return true;
        }
        else if (error) {
            return false
        }
    }
    catch {
        return false;
    }
    return false;
};