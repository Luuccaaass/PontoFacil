import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../view/pages/LoginScreen";
import EmployeeDashboard from "view/pages/EmployeeDashboard";
import CheckPointScanScreen from "view/pages/CheckPointScanScreen";
import { PropsStackRoutes } from "./Interfaces";
import PainelSup from "view/pages/SupDashboard";
import { ManageCheckpoints } from "view/pages/ManageCheckpoints";
import { ManageEmployees } from "view/pages/ManageEmployees";
import CollabCheckpointView from "view/pages/EmployeeOverview";
import { EditEmployeeInfo } from "view/pages/EditEmployeeInfo";
import { EditCheckpoint } from "view/pages/EditCheckpoint";
import { NewCheckpoint } from "view/pages/NewCheckpoint";
import SignUpScreen from "../view/pages/SignUpScreen";
import EmployeeOverview from "view/pages/EmployeeOverview";

const Stack = createNativeStackNavigator<PropsStackRoutes>();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{ headerShown:false }}/>
            <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} options={{headerShown:false}}/>
            <Stack.Screen name="CheckPointScan" component={CheckPointScanScreen} options={{headerShown:false}}/>
            <Stack.Screen name="SupDashboard" component={PainelSup} options={{headerShown:false}}/>
            <Stack.Screen name="ManageEmployees" component={ManageEmployees} options={{headerShown:false}}/>
            <Stack.Screen name="ManageCheckpoints" component={ManageCheckpoints} options={{headerShown:false}}/>
            <Stack.Screen name="EmployeeOverview" component={EmployeeOverview} options={{headerShown:false}}/>
            <Stack.Screen name="EditEmployeeInfo" component={EditEmployeeInfo} options={{headerShown:false}}/>
            <Stack.Screen name="EditCheckpoint" component={EditCheckpoint} options={{headerShown:false}}/>
            <Stack.Screen name="NewCheckpoint" component={NewCheckpoint} options={{headerShown:false}}/>
        </Stack.Navigator>

    )
}

export default AppNavigator;



