import { Pin } from "const";
import * as pin from "store/pin";
import * as router from "store/router";
import { Mode } from "./state";

export const addDigit = async (app, props, digit) => {
  const ui = app.ui.pinSet;

  if (ui.notMatch) {
    reset(app);
  }

  switch (ui.mode) {
    case Mode.Set:
      return addPinDigit(app, digit);
    case Mode.Confirm:
      return addConfirmDigit(app, digit);
  }
};

export const removeDigit = (app) => {
  const { mode } = app.ui.pinSet;

  switch (mode) {
    case Mode.Set:
      return removePinDigit(app);
    case Mode.Confirm:
      return removeConfirmDigit(app);
  }
};

export const reset = (app) => {
  const ui = app.ui.pinSet;
  ui.pin = "";
  ui.pinConfirm = "";
  ui.mode = Mode.Set;
};

const addPinDigit = (app, digit) => {
  const ui = app.ui.pinSet;

  if (ui.pin.length >= Pin.length) {
    return;
  }

  ui.pin += digit;

  if (ui.pin.length >= Pin.length) {
    ui.mode = Mode.Confirm;
  }
};

const addConfirmDigit = async (app, digit) => {
  const ui = app.ui.pinSet;

  if (ui.pinConfirm.length >= Pin.length) {
    return;
  }

  ui.pinConfirm += digit;

  if (ui.pinConfirm.length < Pin.length) {
    return;
  }

  if (ui.pin !== ui.pinConfirm) {
    return;
  }

  await pin.set(app, ui.pin);
  reset(app);

  router.pop(app);
};

const removePinDigit = (app) => {
  const ui = app.ui.pinSet;
  ui.pin = ui.pin.slice(0, -1);
};

const removeConfirmDigit = (app) => {
  const ui = app.ui.pinSet;
  ui.pinConfirm = ui.pinConfirm.slice(0, -1);
};
