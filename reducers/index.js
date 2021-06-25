import {
    RECEIVE_PLACE_IDS,
    ADD_PLACE_ID,
} from "../actions"
  
export default function places (state = [], action) {
    switch(action.type) {
      case ADD_PLACE_ID :
        return state.concat([action.placeId])
      case RECEIVE_PLACE_IDS :
        return action.placeIds
      default :
        return state
    }
}
