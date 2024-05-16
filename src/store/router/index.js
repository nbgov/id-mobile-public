import { partial } from "lib/fns";
import { loc } from "react-enroute";
import { BackHandler, Keyboard } from "react-native";

export const init = (app) =>
  BackHandler.addEventListener("hardwareBackPress", () => {
    pop(app);
    return true;
  });

export const push = (app, location, params) =>
  stateAction(app, (router) => {
    location = getLoc(location, params);
    const paths = getPaths(router);

    paths.push(location);
    router.events.emit("changed", location);
  });

export const pop = (app) =>
  stateAction(app, (router) => {
    const isHasModal = hasModal(router);

    if (!isHasModal) {
      if (router.paths.length < 2) return;

      router.paths.pop();
      router.events.emit("changed", router.paths.at(-1));
      return;
    }

    router.modalPaths.pop();

    if (router.modalPaths.length) {
      router.events.emit("changed", router.modalPaths.at(-1));
    } else {
      router.events.emit("changed", router.paths.at(-1));
      router.events.emit("modalClosed");
    }
  });

export const popRoot = (app) =>
  stateAction(app, (router) => {
    const paths = getPaths(router);
    if (paths.length < 2) return;

    paths.splice(1);
    router.events.emit("changed", paths.at(-1));
  });

export const reset = (app, location, params) =>
  stateAction(app, (router) => {
    location = getLoc(location, params);
    const paths = getPaths(router);

    if (paths.length === 1 && paths[0] === location) {
      return;
    }

    paths.splice(0, Infinity, location);
    router.events.emit("changed", location);
  });

export const modal = (app, location, params, options) =>
  stateAction(app, (router) => {
    if (hasModal(router)) {
      modalCancel(app);
    }

    location = getLoc(location, params);
    router.modalOptions = options;
    router.modalPaths.push(location);

    router.events.emit("changed", location);
    router.events.emit("modalOpened", location);
  });

export const modalClose = (app, canceled = false) =>
  stateAction(app, (router) => {
    if (!hasModal(router)) return;

    router.modalPaths.splice(0);
    router.events.emit("modalClosed", canceled);
  });

export const modalCancel = (app) => modalClose(app, true);

export const on = (app, event, cb) =>
  app.router.events.on(event, partial(cb, app));

export const once = (app, event, cb) => {
  const unsub = app.router.events.on(event, (...args) => {
    unsub();
    cb(app, ...args);
  });
  return unsub;
};

const getLoc = (location, params) =>
  params ? loc(location, params) : location;

const stateAction = (app, action) => {
  Keyboard.dismiss();
  action(app.router);
};

const hasModal = (router) => !!router.modalPaths.length;

const getPaths = (router) =>
  hasModal(router) ? router.modalPaths : router.paths;
