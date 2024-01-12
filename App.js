import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Inscription from './Inscription/inscription';
import Home from './Home/Home';
import Navbar from './navbar/Navbar';
import Connexion from './Connexion/Connexion';
import Savoir from './Savoirplus/savoir';

const Stack = createStackNavigator();

const MainStack = createStackNavigator();
const MainStackScreen = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,// pour qu'il affiche pas le name en haut de la page
    }}
  >
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen name="Inscription" component={Inscription} />
    <MainStack.Screen name="Connexion" component={Connexion} />
    <MainStack.Screen name="Savoirplus" component={Savoir} />
    

  </MainStack.Navigator>
);


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          header: (props) => <Navbar {...props} />,
        }}
      >
        <Stack.Screen name="Main" component={MainStackScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
