import { View } from "react-native";
import { select } from "picofly/react";
import Processing from "ui/views/processing";
import Text from "ui/views/text";
import { credExport as t } from "i18n";
import s from "ui/styles";

export default select((app) => ({
  data: app.ui.credExport.data,
  exporting: app.ui.credExport.exporting,
}))(CredsExportData);

function CredsExportData({ data, exporting, style }) {
  return (
    <View style={s("row ph16 pv8 bgBack br12", style)}>
      {data && (
        <Text multiline numberOfLines={3} ellipsizeMode="tail" style={s`fs12`}>
          {data}
        </Text>
      )}
      {!exporting && !data && (
        <View style={s`f1 aic`}>
          <Text style={s`fs16 fw500 primary`}>{t.errorExporting}</Text>
        </View>
      )}
      {exporting && (
        <View style={s`f1 aic`}>
          <Text style={s`mb16 fs16 fw500 primary`}>{t.title}</Text>
          <Processing />
        </View>
      )}
    </View>
  );
}
