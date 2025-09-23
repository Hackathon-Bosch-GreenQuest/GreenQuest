import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaIntroducao from "./src/screens/TelaIntroducao";
import TelaHistoria from "./src/screens/TelaHistoria";
import TelaCarregamento from "./src/screens/TelaCarregamento";
// depois vamos criar Quiz e Ranking
function Quiz() {
  return null;
}
function Ranking() {
  return null;
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaCarregamento">
        <Stack.Screen name="TelaCarregamento" component={TelaCarregamento} options={{ headerShown: false }} />
        <Stack.Screen name="TelaHistoria" component={TelaHistoria} />
        <Stack.Screen name="TelaIntroducao" component={TelaIntroducao} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Ranking" component={Ranking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
