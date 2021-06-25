import React from "react"
import { View, StyleSheet, Image, Text } from "react-native"
import { connect } from "react-redux"
import PlaceCardItem from "./PlaceCardItem"
import { handleInitialData } from "../actions"


function PlaceCardItems({ places, dispatch }){

  React.useEffect(() => {
    dispatch(handleInitialData())
    
  }, [ places ]);

  if (places === null || places.length === 0) {
    return null;
  }
  
    return (
        <View style={styles.sectionContainer}>
        {places.map(({ placeID }, index) => (
          <PlaceCardItem key={index} placeId={placeID}/>
        ))}
        </View>
    )
}

const mapStateToProps = (places) => ({ places })

const connectedPlaceCardItems = connect(mapStateToProps)
export default connectedPlaceCardItems(PlaceCardItems)

const styles = StyleSheet.create({
  sectionContainer: {
      flex: 1,
      marginBottom: 16,
      marginHorizontal: 16,
    },
  });