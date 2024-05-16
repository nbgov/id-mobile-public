import { memo } from "react";
import { View } from "react-native";
import Left from "./left";
import Title from "./title";
import s from "ui/styles";

export default memo(AppBar);

function AppBar({ title, canPop, Right, style }) {
  return (
    <View style={s("h56 row bgBackSecond bbw1 bcBack", style)}>
      <View style={s`f1 row aic`}>
        <Left {...{ canPop }} />
        <Title {...{ title }} />
        {Right && <Right />}
      </View>
    </View>
  );
}
