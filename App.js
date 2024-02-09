import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import DocumentScanner from 'react-native-document-scanner-plugin'

const App = () => {
  return (
    <View style={{ flex: 1, borderWidth:1,borderColor:"red",}}>

      <TouchableOpacity
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 20,
          alignSelf:"center"
        }}>
        <Text style={{ color: "white" }}>Scan</Text>
      </TouchableOpacity>
    </View>
  )
}

export default App