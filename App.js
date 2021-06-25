import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"
import MainNavigator from "./ui/MainNavigator"
import db, { createTable } from "./utils/AppDatabase"
import { Provider as StoreProvider } from "react-redux"
import store from "./store/configureStore"

export default function App() {

  useEffect(() => {
    createTable(db)
  }, []);


  return (
    <StoreProvider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" backgroundColor="#303F9F"/>
        <MainNavigator />
      </SafeAreaView>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
