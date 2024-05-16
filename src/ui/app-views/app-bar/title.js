import { memo } from "react";
// import {useI18nContext} from 'contexts/I18nContext'
import Text from "ui/views/text";
import s from "ui/styles";

export default memo(AppBarTitle);

function AppBarTitle({ title, style }) {
  // const {t} = useI18nContext()

  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={s("ml8 f1 fs20", { fontWeight: 600 }, style)}
    >
      {/* {t(title, 'title')} */}
      {title}
    </Text>
  );
}
