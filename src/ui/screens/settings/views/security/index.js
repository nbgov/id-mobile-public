import { memo } from "react";
import Section from "../section";
import PinSetChange from "./pin-set-change";
import RemoveAllData from "./remove-all-data";
import { settings as t } from "i18n";

export default memo(SecuritySection);

function SecuritySection({ style }) {
  return (
    <Section title={t.security.title} style={style}>
      <PinSetChange />
      <RemoveAllData />
    </Section>
  );
}
