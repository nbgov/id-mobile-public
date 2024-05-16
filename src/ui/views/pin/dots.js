import { Animated, Easing, View } from "react-native";
import { memo, useEffect, useMemo, useRef } from "react";
import s from "ui/styles";

export default memo(PinDots);

function PinDots({ count, activeCount, error, style }) {
  const errorAnimationStyle = useErrorAnimation(error);

  const dots = Array.from(Array(count).keys()).map((i) => (
    <View
      key={i}
      style={
        activeCount > i
          ? s`w12 h12 br6 mh13 bgPrimary`
          : s("w6 h6 br3 mh16", error ? "bgPrimary" : "bgBack")
      }
    />
  ));

  return (
    <Animated.View style={s("h12 row aic", style, errorAnimationStyle)}>
      {dots}
    </Animated.View>
  );
}

const useErrorAnimation = (error) => {
  const shake = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (!error) return;

    Animated.sequence([
      shakeAnimation(shake, 1),
      shakeAnimation(shake, -1),
      shakeAnimation(shake, 0.5),
      shakeAnimation(shake, -0.5),
      shakeAnimation(shake, 0.25),
      shakeAnimation(shake, -0.25),
      shakeAnimation(shake, 0),
    ]).start();
  }, [error]);

  const translateX = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: [-16, 16],
  });

  return useMemo(() => ({ transform: [{ translateX }] }), [translateX]);
};

const shakeAnimation = (shake, offset) =>
  Animated.timing(shake, {
    toValue: offset,
    duration: 70,
    easing: Easing.out(Easing.sin),
    useNativeDriver: true,
  });
