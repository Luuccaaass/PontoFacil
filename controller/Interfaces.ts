import { NativeStackScreenProps } from "@react-navigation/native-stack";


export type PropsStackRoutes = {
    Cadastro:undefined;
    Login:undefined;
    Painel: {
        id: number;
    };
    RegistroPonto: {
        latitude: number;
        longitude: number;
    }
}

export type PropsScreenApps <T extends keyof PropsStackRoutes>= NativeStackScreenProps<PropsStackRoutes, T>