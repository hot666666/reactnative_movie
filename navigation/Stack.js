import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
  <View>
    <TouchableOpacity onPress={() => navigate("two")}>
      <Text>one</Text>
    </TouchableOpacity>
  </View>
);
const ScreenTwo = ({ navigation: { navigate } }) => (
  <View>
    <TouchableOpacity onPress={() => navigate("three")}>
      <Text>two</Text>
    </TouchableOpacity>
  </View>
);
const ScreenThree = ({ navigation: { goBack, setOptions, navigate } }) => (
  <View>
    <TouchableOpacity onPress={() => goBack()}>
      <Text>three</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setOptions({ title: "changed!" })}>
      <Text>title</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigate("Tabs", { screen: "Search" })}>
      <Text>title</Text>
    </TouchableOpacity>
  </View>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
    <NativeStack.Screen name="one" component={ScreenOne} />
    <NativeStack.Screen name="two" component={ScreenTwo} />
    <NativeStack.Screen name="three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
