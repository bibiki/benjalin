import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as S from "./storage.js";
import { Home } from "./screens/home.js";
import { BookScreen } from "./screens/chapter.js";
import { SettingsScreen } from "./screens/settings.js";
import { About } from "./screens/about.js";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Button
} from "react-native";
import Constants from "expo-constants";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
      <Tab.Navigator
/*    screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
         let iconName;
         if (route.name === 'Home') {
            iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused
            ? 'ios-list-box'
            : 'ios-list';
          }
    
            return <Ionicons name={iconName} size={size} color={color}     />;
       },
    })}*/
    screenOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      tabBarStyle: [{"display": "flex"}, null],
    }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="About" component={About} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  virtueButton: {
    alignSelf: 'stretch',
  },
});
