import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';

export default () => {

  const [scannedImage, setScannedImage] = useState("");

  function scan() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setScannedImage(image.path);
    }).catch(err => console.log(err));
  }

  return (
    <View style={{ flex: 1, borderWidth: 1, backgroundColor: "black", justifyContent: "center", alignContent: "center" }}>
      { scannedImage ? <Image resizeMode='contain' source={{ uri: scannedImage }} style={{ height: "50%", width: "100%" }} /> : ""}
      <TouchableOpacity
        onPress={scan}
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