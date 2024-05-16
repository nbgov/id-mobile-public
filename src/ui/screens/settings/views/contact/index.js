import { memo } from "react";
import Section from "../section";
import Email from "./email";
import { settings as t } from "i18n";

export default memo(ContactSection);

function ContactSection({ style }) {
  return (
    <Section title={t.contact.title} style={style}>
      <Email />
    </Section>
  );
}
