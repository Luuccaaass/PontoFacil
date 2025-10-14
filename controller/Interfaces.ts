import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CurrentLocation } from "./CheckPointController";

export type PropsStackRoutes = {
    SignUp:undefined;

    Login:undefined;
    
    EmployeeDashboard: {
        userId: number;
    };

    CheckPointScan: {
        userId:number;
    };

    SupDashboard: {
        userId: number;
    };

    ManageEmployees: {
        userId:number;
    };

    ManageCheckpoints: {

    };

    EmployeeOverview:{
        employeeId:number,
    };

    EditEmployeeInfo: {
        CollabId:number,
        cpf:number,
        name:string,
        role:string,
        salary:number,
    };

    EditCheckpoint: {
        checkpointId: number,
    };

    NewCheckpoint:{
        latitude:number,
        longitude:number,
    };

};

export type PropsScreenApps <T extends keyof PropsStackRoutes>=NativeStackScreenProps<PropsStackRoutes, T>