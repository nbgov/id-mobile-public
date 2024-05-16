import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { select } from "picofly/react";
import Processing from "ui/views/processing";
import Text from "ui/views/text";
import s from "ui/styles";
import { votingList as t } from "i18n";

export default select((app) => ({
  loading: app.votingLoading,
}))(NoVotings);

function NoVotings({ loading }) {
  return (
    <View style={s`f1 aic jcc`}>
      {loading ? (
        <Processing />
      ) : (
        <>
          <Icon name="person-booth" style={s`fs32`} />
          <Text style={s`mt8 fs18`}>{t.noVotings}</Text>
        </>
      )}
    </View>
  );
}
