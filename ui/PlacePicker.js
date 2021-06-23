import React from "react";
import { View, StyleSheet } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { GOOGLE_PLACES_API_KEY } from "../utils/strings"
import { component_main } from "../utils/strings"


export default function PlacePicker({ route, navigation }) {
  return (
      <View style={styles.container}>
            <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                navigation.navigate(component_main, {
                    placeID: data.place_id,
                    details,
                })
            }}
            onFail={(error) => console.error(error)}
            query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en',
            }}
            />
      </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#ecf0f1',
    },
});

export function PlacePickerOptions({ route, navigation }) {

    return {
        title: "",
        headerTintColor: '#fff',
        headerStyle: { 
            backgroundColor: "#3F51B5",
        },
    }
}