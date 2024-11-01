import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./controller/AppNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator></AppNavigator>
    </NavigationContainer>
  )

}

export default App;