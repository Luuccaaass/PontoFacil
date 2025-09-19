import {supabaseConnection} from '../services/supabase';

export const registrarPonto = async (loc_id: number, func_id:number) => {
    const { data, error } = await supabaseConnection
    .from(`local_pontos`)
    .insert({local_id: loc_id, func_id: func_id});

    return ({ data, error });
}