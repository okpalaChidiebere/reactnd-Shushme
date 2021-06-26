import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import uuid from "react-native-uuid"
import { loadAllPlaceIDs } from "./AppDatabase"
import { getPlaceByID } from "./PlaceAPIUtils"

const GEOFENCE_TASK_NAME = "geofencing"
const GEOFENCE_RADIUS = 50 // 50 meters

/** We specify the callback method that will be executed, when geofence entry or exit event triggers */
TaskManager.defineTask(GEOFENCE_TASK_NAME, async ({ data: { eventType, region }, error }) => {
    if (error) {
        console.log(`Unknown transition : ${error}`)
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (eventType === Location.LocationGeofencingEventType.Enter) {
        console.log("You've entered region:", region)
        /** You can do whatever logic you want here, like send local notification, put phone on silent( :( i did not see expo sdk on this ), etc */
    } else if (eventType === Location.LocationGeofencingEventType.Exit) {
        console.log("You've left region:", region)
        /** 
         * Whatever code you want to run in background or foreground goes here :)
        */
    }
});


/***
* Updates the local ArrayList of Geofences using data from the passed in list
*
* Uses the {@code #getPlaceByID} method to get the longitude and latitiude of places by placeID

* Build list of Geofence objects called regoins by expo.

* Add or remove regions from already running geofencing task by calling startGeofencingAsync again
* with the new array of regions or geofence objects.
*/
export async function updateGeofencesList(){

    const mGeofenceList = []

    const placeIDsFromDB = await loadAllPlaceIDs()
    if (placeIDsFromDB == null || placeIDsFromDB.length === 0) return;

    const promises = placeIDsFromDB.map(async ({ placeID }) => {
        let latitude, longitude

        const { result } = await getPlaceByID(placeID)
        latitude = result.geometry.location.lat
        longitude = result.geometry.location.lng

        return { latitude, longitude }
    })

    const places = await Promise.all(promises)

    /** 
     * Build Geofence objects using their longitude and latitude and a predefined radius. 
     * Then, store all these geofences in a list 
     * */
    for (const place of places) {
        const placeLat = place.latitude
        const placeLng = place.longitude

        const geofence = {
            identifier: uuid.v4(),
            latitude: placeLat,
            longitude: placeLng,
            radius: GEOFENCE_RADIUS,
            notifyOnEnter: true,
            notifyOnExit: true,
        }
        mGeofenceList.push(geofence)
    }

    console.log("updating GeofenceList")
    //register those geofences in the list
    return await Location.startGeofencingAsync(GEOFENCE_TASK_NAME, mGeofenceList)
}

async function getGeofencingRequest(){
    return await Location.hasStartedGeofencingAsync(GEOFENCE_TASK_NAME)
}

/***
* Registers the list of Geofences specified in mGeofenceList with Google Place Services
*/
export async function registerAllGeofences(){
    const isGeoFenceRegistered = await getGeofencingRequest()

    if(isGeoFenceRegistered) 
        return

    console.log("reginstering geofence")
    try{
        await updateGeofencesList()
    }catch(e){
        // Catch exception generated if the app does not use location(access and fine) and background location permission.
        console.log(e)
    }

    return 
}

/***
* Unregisters all the Geofences created by this app from Google Place Services
*/
export async function unRegisterAllGeofences(){
    const isGeoFenceRegistered = await getGeofencingRequest()

    if(isGeoFenceRegistered)
        return await Location.stopGeofencingAsync(GEOFENCE_TASK_NAME)

    return
}