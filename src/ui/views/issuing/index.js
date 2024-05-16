import { memo } from "react";
import { View } from "react-native";
import Text from "ui/views/text";
import Processing from "ui/views/processing";
import { common as ct } from "i18n";
import s from "ui/styles";

export default memo(Issuing);

function Issuing({ style }) {
  return (
    <View {...{ style }}>
      <Text style={s`asc tc fs18`}>{ct.issuing}</Text>
      <Processing style={s`mt24 asc`} />
    </View>
  );
}
