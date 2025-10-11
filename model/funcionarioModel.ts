import { useId } from 'react';
import {supabaseConnection} from '../services/supabase';


export const cadastrarFuncionarioModel = async (cpf:number, nome:string, cargo:string, salario: number, senha:string) => {
    const { data, error } = await supabaseConnection
    .from('func')
    .insert({ CPF: cpf, nome: nome, cargo: cargo, salario: salario, senha: senha });

    return { data, error };
};

export const getDadosLogin = async (cpf: number) => {
    const { data, error } = await supabaseConnection
    .from('func')
    .select ('id, senha, cargo')
    .eq('CPF', cpf)
    .single()


    return {data, error}
};

export const getDadosModel = async (idFunc: number) => {
    const { data, error } = await supabaseConnection
    .from('func')
    .select('*')
    .eq('id', idFunc)
    .single()

    return {data, error};
};

export const getCollabListModel = async () => {
    const { data, error } = await supabaseConnection
    .from('func')
    .select('id, nome')

    return { data, error }
};

export const updateCollabInfoModel = async (collabId:number, cpf:number, nome:string, cargo:string, salario: number) => {
    const { data, error } = await supabaseConnection
    .from('func')
    .update({
        CPF:cpf,
        nome:nome,
        cargo:cargo,
        salario:salario
    })
    .eq('id', collabId)
    .select();

    return { data, error };
};

export const deleteCollabModel = async (collabId:number) => {
    const { data, error } = await supabaseConnection
    .from('func')
    .delete()
    .eq('id', collabId)

    return { data, error };
};