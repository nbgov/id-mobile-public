import { View, Text } from "react-native";
import { select } from "picofly/react";
import Processing from "ui/views/processing";
import { keyCreating as t } from "i18n";
import s from "ui/styles";

export default select((app) => ({
  mnemonic: app.ui.keyCreate.mnemonic,
  creating: app.ui.keyCreate.creating,
}))(Mnemonic);

function Mnemonic({ mnemonic, creating, style }) {
  const words = mnemonic?.split(" ") ?? [];
  const wordsInCol = Math.ceil(Math.sqrt(words.length));
  const cols = [];

  while (words.length > 0) {
    const colWords = words.splice(0, wordsInCol);

    cols.push(
      <Col
        key={cols.length}
        words={colWords}
        startIndex={cols.length * wordsInCol + 1}
      />,
    );
  }

  return (
    <View style={s("row jcc aic bgBack br12", style)}>
      <View style={s`f1 maxw360 h160 row aic jcsb p8 pl_4`}>
        {cols}
        {!creating && !mnemonic && (
          <View style={s`ml12 f1 aic`}>
            <Text style={s`fs16 fw500 primary`}>{t.errorCreating}</Text>
          </View>
        )}
        {creating && (
          <View style={s`ml12 f1 aic`}>
            <Text style={s`mb16 fs16 fw500 primary`}>{t.title}</Text>
            <Processing />
          </View>
        )}
      </View>
    </View>
  );
}

const Col = ({ words, startIndex }) => (
  <View>
    {words.map((word, i) => (
      <View key={word + i} style={s`m8 row`}>
        <Text style={s`minw24 tr primary fs16 fw500`}>{startIndex + i}.</Text>
        <Text style={s`ml8 primary fs16 fw500`}>{word}</Text>
      </View>
    ))}
  </View>
);
