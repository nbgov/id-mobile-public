export default class UIPinAskState {
  static Name = "pinAsk";

  pin = "";
  checking = false;
  wrongPin = false;

  get activeCount() {
    return this.pin.length;
  }
}
