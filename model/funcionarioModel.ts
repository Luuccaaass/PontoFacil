import {supabaseConnection} from '../services/supabase';


export const cadastrarFuncionarioModel = async (cpf:number, nome:string, cargo:string, salario: number, senha:string) => {
    const { data, error } = await supabaseConnection
    .from('func')
    .insert({ CPF: cpf, nome: nome, cargo: cargo, salario: salario, senha: senha });

    return { data, error };
}

export const getDadosLogin = async (cpf: number) => {
    const { data, error } = await supabaseConnection
    .from('func')
    .select ('id, senha')
    .eq('CPF', cpf)
    .single()


    return {data, error}
}

export const getDadosModel = async (idFunc: number) => {
    const { data, error } = await supabaseConnection
    .from('func')
    .select('*')
    .eq('id', idFunc)
    .single()

    return {data, error}
}