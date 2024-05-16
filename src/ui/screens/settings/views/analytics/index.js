import { memo } from "react";
import Section from "../section";
import Analytics from "./analytics";
import CrashReport from "./crash-report";
import { settings as t } from "i18n";

export default memo(AnalyticsSection);

function AnalyticsSection({ style }) {
  return (
    <Section title={t.analytics.title} style={style}>
      <Analytics />
      <CrashReport />
    </Section>
  );
}
