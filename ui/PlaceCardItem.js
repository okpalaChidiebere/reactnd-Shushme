import React from "react"
import { View, StyleSheet, Image, Text } from "react-native"
import { getPlaceByID } from "../utils/PlaceAPIUtils"


export default function PlaceCardItem({ placeId }){

  const [item, setItems] = React.useState({
    placeName: "",
    placeAddress: ""
  });

  React.useEffect(() => {
    (async () => {
        const { result } = await getPlaceByID(placeId)
        setItems({
            placeName: result.name,
            placeAddress: result.formatted_address,
        })
    })()
  }, [])


  const { placeName, placeAddress } = item
  
    return (
        <View style={styles.row} >
            <Image
                style={{width: 35, height: 35}}
                source={require("../assets/ic_place_accent_24dp.png")}
            />
            <View style={{flexDirection: "column", marginLeft: 16}}>
                <Text style={{fontSize: 16,}} >{placeName}</Text>
                <Text style={{fontSize: 14}}>{placeAddress}</Text>
              </View>
        </View>
    )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingBottom: 12,
    paddingTop: 12,
    flex: 1,
    alignItems:"center",
    justifyContent: "space-between",
  },
});