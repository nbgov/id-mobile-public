import * as pin from "store/pin";
import { Pin } from "const";

export const addDigit = async (app, props, digit) => {
  const ui = app.ui.pinAsk;
  if (ui.checking) return;

  if (ui.pin.length >= Pin.length) {
    return;
  }

  ui.wrongPin = false;
  ui.pin += digit;

  if (ui.pin.length < Pin.length) {
    return;
  }

  ui.checking = true;

  const res = await pin.check(app, ui.pin);
  ui.wrongPin = res !== pin.Result.Ok;

  if (res !== pin.Result.Ok) {
    ui.pin = "";
    ui.checking = false;
    return;
  }

  pin.askResolve(app, res);
};

export const removeDigit = (app) => {
  const ui = app.ui.pinAsk;

  ui.wrongPin = false;
  ui.pin = ui.pin.slice(0, -1);
};

export const cancel = (app) =>
  app.pin.ask?.canCancel && pin.askResolve(app, pin.Result.Canceled);
