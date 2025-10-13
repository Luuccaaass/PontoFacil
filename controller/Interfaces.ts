import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { currentCoordinates } from "./CheckPointController";

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
        salario:number,
    };
    EditCheckpoint: {
        checkPpointId: number,
    };

    NewCheckpoint:{
        latitude:number,
        longitude:number,
    };

};

export type PropsScreenApps <T extends keyof PropsStackRoutes>= NativeStackScreenProps<PropsStackRoutes, T>