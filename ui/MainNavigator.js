import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import MainComponent, { MainComponentOptions } from "./MainComponent"
import PlacePicker, { PlacePickerOptions } from "./PlacePicker"
import { component_main, component_place_picker } from "../utils/strings"

const Stack = createStackNavigator()
const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="screen" initialRouteName={component_main}>
        <Stack.Screen
          name={component_main}
          component={MainComponent}
          options={MainComponentOptions}
        />
        <Stack.Screen
          name={component_place_picker}
          component={PlacePicker}
          options={PlacePickerOptions}
        />
    </Stack.Navigator>
  </NavigationContainer>
)

export default MainNavigator
