import { memo } from "react";
import Section from "../section";
import Export from "./export";
import { settings as t } from "i18n";

export default memo(CredSection);

function CredSection({ style }) {
  return (
    <Section title={t.creds.title} style={style}>
      <Export />
    </Section>
  );
}
