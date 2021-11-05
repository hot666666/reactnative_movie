import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Detail } from "../screens/Detail";

const NativeStack = createNativeStackNavigator();
const isDark = true;

const Stack = () => (
  <NativeStack.Navigator
    screenContainerStyle={{ backgroundColor: isDark ? "#1e272e" : "white" }}
    screenOptions={{
      tabBarStyle: {
        backgroundColor: isDark ? "#1e272e" : "white",
      },
      tabBarActiveTintColor: isDark ? "#f1c40f" : "black",
      tabBarInactiveTintColor: isDark ? "#7f8c8d" : "#95a5a6",
      headerStyle: {
        backgroundColor: isDark ? "#1e272e" : "white",
      },
      headerTitleStyle: {
        color: isDark ? "white" : "black",
      },
    }}
  >
    <NativeStack.Screen name="Detail" component={Detail} />
  </NativeStack.Navigator>
);

export default Stack;
