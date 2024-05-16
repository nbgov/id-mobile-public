import { memo } from "react";
import Issuing from "ui/views/issuing";
import CredCard from "./cred-card";
import { CredType } from "const";
import { common as ct } from "i18n";
import s from "ui/styles";

export default memo(StatusCred);

// TODO: real info
function StatusCred() {
  const title = ct.credName[CredType.passport];
  const icon = "passport";
  const countryCode = "BY";

  return (
    <CredCard {...{ title, icon, countryCode }}>
      <Issuing style={s`f1`} />
    </CredCard>
  );
}
