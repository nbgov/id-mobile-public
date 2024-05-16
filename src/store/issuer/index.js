import { common as ct } from "i18n";
import { tpl } from "lib/tpl";
import { Alert } from "react-native";
import * as router from "store/router";
import * as confirm from "store/confirm";
import * as creds from "store/cred";
import * as analytics from "store/analytics";
import * as map from "lib/map";
import { hasPassport } from "store/cred/selectors";
import { CredType, IssueResult, ProofType } from "const";
import Paths from "ui/paths";

export const init = async (app) => {
  const { did, issueTypes } = await app.api.issuer.info.get();

  app.issuer.did = did;
  map.replace(app.issuer.types, issueTypes, "type");

  watchIssued(app);
};

export const tryToIssue = async (app) => {
  if (hasPassport(app)) return;
  if (!app.kyc.approved) return;

  analytics.credIssueStart(app);

  const result = await app.api.issuer.issuer.create({
    type: ProofType.kyc,
    credentialType: CredType.passport,
  });

  analytics.credIssueResult(app, result);

  switch (result) {
    case IssueResult.alreadyIssuedForDid:
      return Alert.alert(ct.error, ct.issuerAlreadyIssuedForDid);

    case IssueResult.alreadyIssuedForPersonId:
      return Alert.alert(ct.error, ct.issuerAlreadyIssuedForPersonId);

    case IssueResult.invalidPersonData: {
      const ok = await confirm.ask(app, {
        title: ct.kycResubmitTitle,
        text: tpl(ct.kycResubmitText, { reason: "" }),
      });
      if (!ok) return;

      router.reset(app, Paths.CredList);
      router.push(app, Paths.CredIssue);
    }
  }
};

const watchIssued = (app) =>
  app.api.issuer.issuer.onIssued(async (cred) => {
    await creds.add(app, cred);

    const { id, issuer, type } = cred;
    analytics.credIssued(app, { issuer, id, type });
  });
