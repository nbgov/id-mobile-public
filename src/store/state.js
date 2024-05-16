import Router from "store/router/state";
import Auth from "store/auth/state";
import Pin from "store/pin/state";
import Lock from "store/lock/state";
import MasterKey from "store/master-key/state";
import Kyc from "store/kyc/state";
import Issuer from "store/issuer/state";
import Presentation from "store/presentation/state";
import Confirm from "store/confirm/state";
import DeniedCountry from "store/denied-country/state";
import Cm from "store/cm/state";

export default class AppState {
  ready = false;
  inited = false;

  api = null;
  cryptoBridge = null;
  keyring = null;
  mmkv = null;
  segment = null;
  cfg = null;
  remoteCfg = null;
  dataVersion = null;

  router = new Router();
  pin = new Pin();
  lock = new Lock();
  auth = new Auth();
  masterKey = new MasterKey();
  kyc = new Kyc();
  issuer = new Issuer();
  presentation = new Presentation();
  confirm = new Confirm();
  deniedCountry = new DeniedCountry();
  cm = new Cm();

  creds = new Map();
  votings = new Map();

  votingLoading = false;

  crashlyticsEnabled = false;
  analyticsEnabled = false;
}
