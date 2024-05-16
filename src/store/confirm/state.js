export default class ConfirmState {
  asks = [];

  get currentAsk() {
    return this.asks[0];
  }
}
