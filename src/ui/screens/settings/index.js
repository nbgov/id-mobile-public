import { memo } from "react";
import Screen from "ui/views/screen";
import Header from "./views/header";
import Creds from "./views/creds";
import Security from "./views/security";
import Analytics from "./views/analytics";
import Contact from "./views/contact";
import { settings as t } from "i18n";
import s from "ui/styles";

export default memo(Settings);

function Settings() {
  return (
    <Screen
      title={t.title}
      scrollable
      bounces={false}
      contentContainerStyle={s`pb12`}
    >
      <Header />
      {/* <Creds style={s`mt12`}/> */}
      <Security style={s`mt12`} />
      <Analytics style={s`mt12`} />
      <Contact style={s`mt12`} />
    </Screen>
  );
}
