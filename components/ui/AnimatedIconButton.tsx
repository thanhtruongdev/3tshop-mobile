import React from "react";
import {
  Animated,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type Props = TouchableOpacityProps & {
  size?: number;
  children?: React.ReactNode;
  rotateOnPress?: boolean;
  rotateDuration?: number;
  scaleOnPress?: number;
  style?: StyleProp<ViewStyle>;
};

export default function AnimatedIconButton({
  children,
  onPress,
  onPressIn,
  onPressOut,
  disabled,
  size = 56,
  rotateOnPress = false,
  rotateDuration = 500,
  scaleOnPress = 0.92,
  style,
  ...props
}: Props) {
  const scale = React.useRef(new Animated.Value(1)).current;
  const rotate = React.useRef(new Animated.Value(0)).current;

  const handlePressIn = (e?: any) => {
    Animated.spring(scale, {
      toValue: scaleOnPress,
      useNativeDriver: true,
    }).start();
    if (onPressIn) onPressIn(e);
  };

  const handlePressOut = (e?: any) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    if (onPressOut) onPressOut(e);
  };

  const handlePress = async (e?: any) => {
    if (rotateOnPress) {
      Animated.timing(rotate, {
        toValue: 1,
        duration: rotateDuration,
        useNativeDriver: true,
      }).start(() => {
        rotate.setValue(0);
      });
    }
    if (onPress) onPress(e);
  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.9}
      {...props}
    >
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            justifyContent: "center",
            alignItems: "center",
          },
          { transform: [{ scale }, { rotate: rotateInterpolate }] },
          style,
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}
