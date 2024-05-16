import { spec, uiState } from "lib/selectors";
import { select } from "picofly/react";
import State from "./state";
import { steps } from "./selectors";
import { init } from "./actions";
import Screen from "ui/views/screen";
import Info from "./views/info";
import Pin from "./views/pin";
import Cm from "./views/cm";
import Key from "./views/key";
import Verify from "./views/verify";
import { credIssue as t } from "i18n";
import s from "ui/styles";

export default select(uiState(State, { init }), spec({ steps }))(CredIssue);

function CredIssue({ steps }) {
  steps = steps.map((step, i) => {
    const Step = Steps[step];
    return <Step key={step} stepNo={i} style={s`mt12`} />;
  });

  return (
    <Screen title={t.title} scrollable contentContainerStyle={s`pv8 ph16`}>
      <Info />
      {steps}
    </Screen>
  );
}

const Steps = { Pin, Cm, Key, Verify };
