import {supabaseConnection} from '../services/supabase';

export const registrarPonto = async (loc_id: number, func_id:number) => {
    const { data, error } = await supabaseConnection
    .from(`registro_pontos`)
    .insert({local_id: loc_id, func_id: func_id, data:`12/12/2012`, hora:`12:12`});

    

    return ({ data, error });
}


export const getDataPonto = async (id:number) => {
    const { data, error } = await supabaseConnection
    .from(`local_pontos`)
    .select(`*`)
    .eq(`id`, id)
    .single()

    return{ data, error };
}
