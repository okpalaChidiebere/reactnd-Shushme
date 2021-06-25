import { GOOGLE_PLACES_API_KEY } from "./strings"

const  GEOCODE_BASE_URL = "https://maps.googleapis.com/maps/api/place/details/json"


//More about this API here https://stackoverflow.com/questions/25928948/get-lat-lang-from-a-place-id-returned-by-autocomplete-place-api
export const getPlaceByID = (placeID) =>
fetch(`${GEOCODE_BASE_URL}?placeid=${placeID}&key=${GOOGLE_PLACES_API_KEY}`)
  .then(res => res.json())
