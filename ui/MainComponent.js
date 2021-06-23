import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Image, Alert, ActivityIndicator, Switch }  from "react-native"
import * as Location from "expo-location"

export default function MainComponent() {

    const [state, setState ] = useState({
        locationPermissionIsEnabled: null,
    })

    useEffect(() => {
        (async () => {
            const { status: fgGranted } =
            await Location.getForegroundPermissionsAsync();

            const { status: bgGranted } =
            await Location.getBackgroundPermissionsAsync();

            if(fgGranted === 'granted' && bgGranted === 'granted'){
                setState({locationPermissionIsEnabled: true})
            }else{
                setState({locationPermissionIsEnabled: false})
            }

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
                setState({locationPermissionIsEnabled: true})
                setState(previousSate => ({
                    ...previousSate,
                    locationPermissionIsEnabled: true
                }))
            }else{
                setState({locationPermissionIsEnabled: false})
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


    const { locationPermissionIsEnabled } = state

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
            </View>
            <View style={{
                flex: 1,
                flexGrow: 3,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{width: 350, color:"#424242", marginLeft:70}}>Press the glass of water after you've hydrated</Text>
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
        title: "Android Me",
        headerTintColor: '#fff',
        headerStyle: { 
            backgroundColor: "#3F51B5",
        },
    }
}