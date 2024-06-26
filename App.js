import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import DocumentScanner from 'react-native-document-scanner-plugin'

export default () => {
  const [scannedImage, setScannedImage] = useState("");

  const scanDocument = async () => {
    // start the document scanner
    const { scannedImages } = await DocumentScanner.scanDocument({
    })

    // get back an array with scanned image file paths
    if (scannedImages.length > 0) {
      // set the img src, so we can view the first scanned image
      setScannedImage(scannedImages[0])
    }
  }

  return (
    <View style={{ flex: 1, borderWidth: 1, backgroundColor: "black", justifyContent: "center", alignContent: "center" }}>
      <Image resizeMode='contain' source={{ uri: scannedImage }} style={{ height: "50%", width: "100%" }} />
      <TouchableOpacity
        onPress={scanDocument}
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 20,
          alignSelf: "center"
        }}>
        <Text style={{ color: "black" }}>Scann</Text>
      </TouchableOpacity>
    </View>
  )
}