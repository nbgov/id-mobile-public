import { memo } from "react";
import { View } from "react-native";
import Processing from "ui/views/processing";
import s from "ui/styles";

export default memo(Loading);

function Loading() {
  return (
    <View style={s`f1 aic jcc`}>
      <Processing />
    </View>
  );
}
