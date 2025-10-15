import { supabaseConnection } from "services/supabase";

export const getCheckpointListModel = async() => {
    const { data, error } = await supabaseConnection
    .from('local_pontos')
    .select('id, identificador');

    return { data, error };
};

export const getCheckpointInfo = async(checkpointId:number) => {
    const { data, error } = await supabaseConnection
    .from('local_pontos')
    .select('*')
    .eq('id', checkpointId)
    .single();

    return { data, error };
};

export const editCheckpointModel = async (checkpointId:number, identificador:string, latitude:number, longitude:number) => {
    const { data, error } = await supabaseConnection
    .from('local_pontos')
    .update({
        identificador:identificador,
        latitude:latitude,
        longitude:longitude,
    })
    .eq('id', checkpointId);

    return { data, error };
};

export const registerNewCheckpointModel = async(identificador:string, latitude:number, longitude:number) => {
    const { data, error } = await supabaseConnection
    .from('local_pontos')
    .insert({
        identificador: identificador,
        latitude: latitude,
        longitude: longitude,
    });
    return { data, error };
};

export const deleteCheckpointModel = async(checkpointId:number) =>  {
    const { data, error } = await supabaseConnection
    .from('local_pontos')
    .delete()
    .eq('id', checkpointId);

    return {data, error};
};