import { select } from "picofly/react";
import { spec, callback } from "lib/selectors";
import { hasPassport } from "store/cred/selectors";
import { issue } from "../actions";
import { issuing } from "store/kyc/selectors";
import Button from "ui/views/buttons/button";
import Processing from "ui/views/processing";
import ProcessingButton from "ui/views/buttons/processing-button";
import Text from "ui/views/text";
import WebLink from "ui/views/web-link";
import Step from "./step";
import HowWorksLink from "./how-works-link";
import { credIssue as t } from "i18n";
import s from "ui/styles";

const vt = t.verify;

// TODO: move texts to i18n
export default select(
  (app) => ({
    complete: hasPassport(app),
    processing: app.kyc.active,
  }),
  spec({ issuing }),
  callback("onVerify", issue),
)(Verify);

function Verify({ complete, issuing, processing, onVerify, ...props }) {
  return (
    <Step title={vt.title} {...{ complete }} {...props}>
      <Text style={s`mb24 lh18`}>
        Для верыфікацыі асобы вам патрэбен існуючы пашпарт РБ.{"\n\n"}
        Ён будзе правераны ў аўтаматычным рэжыме сэрвісам{" "}
        <WebLink uri="https://www.veriff.com">Veriff</WebLink>. Падчас валідацыі
        мы <HowWorksLink>нідзе не захоўваем дадзеныя</HowWorksLink> і
        выкарыстоўваем іх толькі для выпуску лічбавага пашпарта, які мы адразу ж
        перадаем вам.
      </Text>
      {complete && (
        <Button title={vt.see} action="pop" style={s`asc minw256`} />
      )}
      {!complete && issuing && <Processing style={s`asc`} />}
      {!complete && !issuing && (
        <ProcessingButton
          title={vt.action}
          processing={processing}
          onPress={onVerify}
          style={s`asc minw256`}
        />
      )}
    </Step>
  );
}
