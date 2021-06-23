import React, { useState } from "react"
import { Text, View, StyleSheet }  from "react-native"

export default function MainComponent() {

    return ( 
    <View style={styles.container}>
      <Text> Starter code </Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 15
    },
    checkbox: {
        color: "#d9d9d9"
    },
  })

export function MainComponentOptions({ route, navigation }) {

    return {
        title: "Android Me",
        headerTintColor: '#fff',
        headerStyle: { 
            backgroundColor: "#3F51B5",
        },
    }
}