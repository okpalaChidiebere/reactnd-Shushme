import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Image, Alert, ActivityIndicator, Switch, Button, ScrollView }  from "react-native"
import * as Location from "expo-location"
import { component_place_picker } from "../utils/strings"
import db, { TABLE_NAME, COLUMN_PLACE_ID } from "../utils/AppDatabase"
import PlaceCardItems from "./PlaceCardItems"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { registerAllGeofences, unRegisterAllGeofences, updateGeofencesList } from "../utils/Geofencing"

const SUSHME_APP_STORAGE_KEY = "SushMe:PreferenceManager"
const GEOFENCE_ENABLED = "GeofenceEnabled"
const DEFAULT_GEOFENCE_PREF_VALUE = true //we set it to true because we want to initialize geoFences as sonn as the app is installed :)

export default function MainComponent({ route, navigation }) {

    if(route.params){
        db.transaction(
            (tx) => {
                tx.executeSql("INSERT INTO "+TABLE_NAME+"("+COLUMN_PLACE_ID+") values (?)", [route.params.placeID]);
                /*tx.executeSql("select * from "+TABLE_NAME, [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
                );*/
            },
            null,
            updateGeofencesList
            /**
             * When we navigate back to this screen from the PlacePicker, this component will be re-rendered(PlaceCardItems gets re-rendered)
             * So we can get the newly added place in the database uodated in screen right away
             */
        );
    }

    const [state, setState ] = useState({
        locationPermissionIsEnabled: null,
        geoFencingIsEnabled: null,
    })

    useEffect(() => {
        (async () => {
            const { status: fgGranted } =
            await Location.getForegroundPermissionsAsync();

            const { status: bgGranted } =
            await Location.getBackgroundPermissionsAsync();

            if(fgGranted === 'granted' && bgGranted === 'granted'){
                setState(previousSate => ({
                    ...previousSate,
                    locationPermissionIsEnabled: true
                }))
            }else{
                setState(previousSate => ({
                    ...previousSate,
                    locationPermissionIsEnabled: false
                }))
            }

            const isEnabled = await getDefaultSharedPreferences(GEOFENCE_ENABLED)
            setState(previousSate => ({
                ...previousSate,
                geoFencingIsEnabled: isEnabled
            }))

            registerAllGeofences()
        })()
    }, [])

    const askPermission = async () => {

        try{
            const { status: fgGranted } =
            await Location.requestForegroundPermissionsAsync();

            const { status: bgGranted } =
            await Location.requestBackgroundPermissionsAsync();
            console.log(fgGranted, bgGranted)

            if(fgGranted === 'granted' && bgGranted === 'granted'){
                setState(previousSate => ({
                    ...previousSate,
                    locationPermissionIsEnabled: true
                }))
            }else{
                setState(previousSate => ({
                    ...previousSate,
                    locationPermissionIsEnabled: false,
                }))
                Alert.alert(
                    "Location Access Required",
                    "App requires location even the App is backgrounded and Foreground."+
                    " You can fix this by visiting your settings and enabling location services for this app"
                );
            }

        }catch(e){
            console.warn("Error asking location permission", e);
            setState(previousSate => ({
                ...previousSate,
                locationPermissionIsEnabled: false
            }))
        }
        /*setState(previousSate => ({
            locationPermissionIsEnabled: !previousSate.locationPermissionIsEnabled
        }))*/
    }

    const setOnSwitchChangeListener = async (isOn) => {
        
        setState(previousSate => ({
            ...previousSate, 
            geoFencingIsEnabled: isOn
        }))

        await AsyncStorage.mergeItem(SUSHME_APP_STORAGE_KEY, JSON.stringify({
            [GEOFENCE_ENABLED]: isOn
        }))

        if (isOn) registerAllGeofences() //whenever the user turns back geofences on, we register all the locations they have saved if any
        else unRegisterAllGeofences() //we stop listening for geofences
    }


    const { locationPermissionIsEnabled, geoFencingIsEnabled } = state

    if (locationPermissionIsEnabled === null) { //user hans't given us any permission yet
        return <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}><ActivityIndicator style={{marginTop: 30}} size="large" color="#d9d9d9"/></View> //we just show a loading indicator
    }

    return ( 
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: "column", alignItems:"stretch", }}>
            <View style={{
                flex: 1,
                flexGrow: 1,
                flexDirection: "column",
                alignItems:"stretch",
                justifyContent: "flex-start",
            }}>
                <Text style={{fontSize: 16}}>Settings</Text>
                <View style={{ height: 2, marginTop: 5, marginBottom: 5, backgroundColor:"red"}}/>
                <View style={{ flexDirection: "row", alignItems:"center", }}>
                    <Image
                    style={{width: 35, height: 35, marginRight: 10}}
                    source={require("../assets/ic_globe_primary_24dp.png")}
                    />
                    <Text style={{ flexGrow: 2, fontSize: 16 }}>Enable Fences</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ffccdd" }}
                        thumbColor={geoFencingIsEnabled ? "#FF4081" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(v) => setOnSwitchChangeListener(v)}
                        value={geoFencingIsEnabled}
                    />
                </View>
                <View style={{ flexDirection: "row", alignItems:"center", }}>
                    <Image
                    style={{width: 35, height: 35, marginRight: 10}}
                    source={require("../assets/ic_my_location_primary_24dp.png")}
                    />
                    <Text style={{ flexGrow: 2, fontSize: 16 }}>Location Permissions</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#767577" }}
                        thumbColor={locationPermissionIsEnabled ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        disabled={locationPermissionIsEnabled ? true : false }
                        onValueChange={() => askPermission()}
                        value={locationPermissionIsEnabled}
                    />
                </View>
                <View style={{ marginTop: 15, marginBottom: 15 }}>
                    <Button title="ADD NEW LOCATION" onPress={() => navigation.navigate(component_place_picker)} />
                </View>
                <Text style={{ flexGrow: 2, fontSize: 16 }}>Locations</Text>
                <View style={{ height: 2, marginTop: 5, marginBottom: 5, backgroundColor:"red"}}/>
            </View>
            <View style={{
                flex: 1,
                flexGrow: 2.5,
            }}>
                <ScrollView style={styles.listArea}>
                    <PlaceCardItems />
                </ScrollView>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 15
    },
  })

export function MainComponentOptions({ route, navigation }) {

    return {
        title: "ShushMe",
        headerTintColor: '#fff',
        headerStyle: { 
            backgroundColor: "#3F51B5",
        },
    }
}

async function getDefaultSharedPreferences(prefKey){
    const prefs = await AsyncStorage.getItem(SUSHME_APP_STORAGE_KEY)

    if(!prefs)
        return DEFAULT_GEOFENCE_PREF_VALUE //early return

    //due to the value is boolen, we just have to check if it null or not
    return JSON.parse(prefs)[prefKey] !== null ? JSON.parse(prefs)[prefKey] : DEFAULT_GEOFENCE_PREF_VALUE
}