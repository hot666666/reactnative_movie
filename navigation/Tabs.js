import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import {} from 후 라이브러리 찾고 임포트시킬 객체 선택
import React from "react";
import { useColorScheme } from "react-native";

import Movie from "../screens/Movie";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = true; //useColorScheme() === "dark";
  return (
    <Tab.Navigator
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
      <Tab.Screen
        name="Movie"
        component={Movie}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="film-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="tv-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;
// return으로만 있을땐 ( )로 가능하지만
// 객체를 받거나 다른 행위들이 있을땐 { }
