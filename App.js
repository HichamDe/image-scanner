import React, { useState, useEffect } from 'react'
import Svg, { Path, Circle, Rect, ClipPath, Defs } from 'react-native-svg';
import { View, Image, PanResponder } from 'react-native'

export default () => {
  const [points, setPoints] = useState([
    { x: 50, y: 50 },
    { x: 250, y: 50 },
    { x: 250, y: 250 },
    { x: 50, y: 250 },
  ]);

  const [clippingPath, setClippingPath] = useState(`M${points[0].x},${points[0].y} L${points[1].x},${points[1].y} L${points[2].x},${points[2].y} L${points[3].x},${points[3].y} Z`);


  const handleCirclePanResponder = (index) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const { dx, dy } = gestureState;

        const newPoints = [...points];
        newPoints[index] = {
          x: newPoints[index].x + dx,
          y: newPoints[index].y + dy,
        };
        setClippingPath(`M${newPoints[0].x},${newPoints[0].y} L${newPoints[1].x},${newPoints[1].y} L${newPoints[2].x},${newPoints[2].y} L${newPoints[3].x},${newPoints[3].y} Z`);
        setPoints(newPoints);

      },
    });

  return (
    <View style={{ flex: 1, borderColor: "white", borderWidth: 1 }}>
      <Image
        source={{ uri: "https://png.pngtree.com/png-clipart/20220829/ourmid/pngtree-indoor-plant-png-image_6129530.png" }}
        style={{ width: '100%', height: '100%', position: 'absolute' }}
        resizeMode="cover"
      />
      <Svg width="100%" height="100%" viewBox="0 0 300 300" style={{ position: 'absolute' }}>
        <Defs>
          <ClipPath id="clip">
            <Rect x="0" y="0" width="300" height="300" fill="transparent" />
            <Path d={clippingPath} fill="none" stroke="none" />
          </ClipPath>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="black" stroke="red" clipPath="url(#clip)" />
      </Svg>


      <Svg width="100%" height="100%" viewBox="0 0 300 300" style={{ position: 'absolute' }}>
        <Path d={clippingPath} fill="none" stroke="gray" />
        {points.map((point, index) => (
          <Circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={8}
            fill="gray"
            {...handleCirclePanResponder(index).panHandlers}
          />
        ))}

      </Svg>
    </View>
  )
}