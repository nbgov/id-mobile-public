export const Mode = {
  Set: "set",
  Confirm: "confirm",
};

export default class UIPinSetState {
  static Name = "pinSet";

  mode = Mode.Set;
  pin = "";
  pinConfirm = "";

  get activeCount() {
    return this.mode === Mode.Set ? this.pin.length : this.pinConfirm.length;
  }

  get notMatch() {
    return (
      this.mode === Mode.Confirm &&
      this.pin.length === this.pinConfirm.length &&
      this.pin !== this.pinConfirm
    );
  }
}
