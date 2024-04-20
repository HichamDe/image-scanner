import React, { useState, useEffect, useLayoutEffect } from 'react'
import Svg, { Path, Circle, Rect, ClipPath, Defs, Mask, Image as SvgImage } from 'react-native-svg';
import MaskedView from '@react-native-masked-view/masked-view';
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
        setPoints(newPoints);

      },
    });

  useLayoutEffect(() => {
    setClippingPath(`M${points[0].x},${points[0].y} L${points[1].x},${points[1].y} L${points[2].x},${points[2].y} L${points[3].x},${points[3].y} Z`);
  }, [points]);

  return (
    <View style={{ flex: 1, borderColor: "white", borderWidth: 1 }}>
      <Svg width="100%" height="100%">
        <Defs key={clippingPath}>
          <ClipPath id="myMask">
            <Path d={clippingPath} fill="black" />
          </ClipPath>
        </Defs>
        <SvgImage
          href={{ uri: "https://png.pngtree.com/png-clipart/20220829/ourmid/pngtree-indoor-plant-png-image_6129530.png" }}
          width="100%"
          height="100%"
          clipPath="url(#myMask)"
        />
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