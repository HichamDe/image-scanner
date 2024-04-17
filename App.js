import React, { useState, useEffect } from 'react'
import Svg, { Path, Circle } from 'react-native-svg';
import { View, Text, Image, PanResponder, Animated } from 'react-native'

export default () => {
  const imgPath = "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBsYW50fGVufDB8fDB8fHww"
  const [points, setPoints] = useState([
    { x: 50, y: 50 },
    { x: 250, y: 50 },
    { x: 250, y: 250 },
    { x: 50, y: 250 },
  ]);

  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { locationX, locationY } = evt.nativeEvent;
        const { dx, dy } = gestureState;

        // Find the index of the dragged point
        const index = points.findIndex(
          (point) =>
            Math.abs(locationX - point.x) < 20 &&
            Math.abs(locationY - point.y) < 20
        );

        if (index !== -1) {
          // Update the position of the dragged point
          const newPoints = [...points];
          newPoints[index] = {
            x: newPoints[index].x + dx,
            y: newPoints[index].y + dy,
          };
          setPoints(newPoints);
        }
      },
    })
  )[0];

  const path = `M${points[0].x},${points[0].y} L${points[1].x},${points[1].y} L${points[2].x},${points[2].y} L${points[3].x},${points[3].y} Z`;


  return (
    <View style={{ flex: 1, borderColor: "white" }}>
      <Image
        source={imgPath}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        resizeMode="cover"
      />
      <Svg width="100%" height="100%" viewBox="0 0 300 300" style={{ position: 'absolute' }}>
        <Path d={path} fill="white" />
        {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={8}
            fill="blue"
            {...panResponder.panHandlers}
          />
        ))}
      </Svg>
    </View>
  )
}