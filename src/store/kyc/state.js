import { KycStatus } from "const";

export default class Kyc {
  state = null;
  active = false;

  get submitted() {
    return this.state?.status === KycStatus.submitted;
  }

  get approved() {
    return this.state?.status === KycStatus.approved;
  }
}
