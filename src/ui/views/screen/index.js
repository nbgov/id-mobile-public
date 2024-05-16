import { forwardRef, memo } from "react";
import { ScrollView, View } from "react-native";
import AppBar from "ui/app-views/app-bar";
import s from "ui/styles";

function Screen({ scrollable, title, appBar, style, children, ...props }, ref) {
  children = scrollable ? (
    <ScrollView
      alwaysBounceVertical={false}
      keyboardShouldPersistTaps="handled"
      style={s("f1 bgBack", style)}
      {...{ children, ref }}
      {...props}
    />
  ) : (
    <View style={s("f1 bgBack", style)} {...{ children, ref }} {...props} />
  );

  if (appBar || title) {
    children = (
      <>
        <AppBar {...{ title }} {...appBar} />
        {children}
      </>
    );
  }

  return children;
}

export default memo(forwardRef(Screen));
