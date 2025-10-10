import { NativeStackScreenProps } from "@react-navigation/native-stack";


export type PropsStackRoutes = {
    Cadastro:undefined;
    Login:undefined;
    PainelFunc: {
        userId: number;
    };
    RegistroPonto: {
        userId:number;
    };
    PainelSup: {
        userId: number;
    };
    ManageCollabs: {
        userId:number;
    };
    ManageCheckpoints: {

    };
    CollabCheckpointView:{
        CollabId:number,
    };
    EditCollabInfo: {
        CollabId:number,
        cpf:number,
        usuario:string,
        cargo:string,
        salario:number
        
    }

}

export type PropsScreenApps <T extends keyof PropsStackRoutes>= NativeStackScreenProps<PropsStackRoutes, T>