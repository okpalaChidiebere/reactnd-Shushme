import { loadAllPlaceIDs } from "../utils/AppDatabase"


export const RECEIVE_PLACE_IDS = "RECEIVE_PLACE_IDS" //receive datas from our PreferenceUtilities (AsyncStorage)
export const ADD_PLACE_ID = "ADD_PLACE_ID"

export function receivePlaceIDs(placeIds) {
    return {
      type: RECEIVE_PLACE_IDS,
      placeIds,
    }
  }
  
export function addPlaceID(placeId) {
    return {
      type: ADD_PLACE_ID,
      placeId,
    }
}

export const handleInitialData = () => async (dispatch) => {

    try {
        const placeIds = await loadAllPlaceIDs()
        dispatch(receivePlaceIDs(placeIds))
    }catch(e){
        console.warn('handleInitialData ERROR!', e)
    }
}