import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaIntroducao from "./src/screens/TelaIntroducao";
import TelaHistoria from "./src/screens/TelaHistoria";
import TelaCarregamento from "./src/screens/TelaCarregamento";
import TelaTutorial from "./src/screens/TelaTutorial";
import TelaPreQuiz from "./src/screens/TelaPreQuiz";
import TelaQuiz from "./src/screens/TelaQuiz";

import TelaRanking from "./src/screens/TelaRanking";
// depois vamos criar Quiz e Ranking

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaCarregamento">
        <Stack.Screen name="TelaCarregamento" component={TelaCarregamento} options={{ headerShown: false }} />
        <Stack.Screen name="TelaHistoria" component={TelaHistoria} />
        <Stack.Screen name="TelaIntroducao" component={TelaIntroducao} />
         <Stack.Screen name="TelaTutorial" component={TelaTutorial} />
        <Stack.Screen name="TelaQuiz" component={TelaQuiz} />
        <Stack.Screen name="TelaPreQuiz" component={TelaPreQuiz} />
        <Stack.Screen name="Ranking" component={TelaRanking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
