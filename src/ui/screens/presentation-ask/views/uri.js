import { memo } from "react";
import Text from "ui/views/text";
import { presentationAsk as t } from "i18n";
import s from "ui/styles";

export default memo(Uri);

function Uri({ uri }) {
  uri = new URL(uri);

  return (
    <>
      <Text>{t.service}</Text>
      <Text style={s`mt8 mb16 note`}>
        <Text style={s`textDisabled`}>
          {uri.protocol}
          {uri.href.startsWith(`${uri.protocol}//`) ? "//" : ""}
        </Text>
        {uri.username || uri.password
          ? `${uri.username}${uri.password ? ":###" : ""}@`
          : ""}
        <Text style={s`primary b`}>{uri.host}</Text>
        {uri.port ? ":" + uri.port : ""}
        {uri.pathname}
        {(uri.search || uri.hash) && (
          <Text style={s`textDisabled`}>
            {uri.search}
            {uri.hash}
          </Text>
        )}
      </Text>
    </>
  );
}
