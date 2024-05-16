export default class Pin {
  set = true;
  attempts = 0;
  blockTimeLeft = 0;
  ask;

  get blocked() {
    return !!this.blockTimeLeft;
  }
}
