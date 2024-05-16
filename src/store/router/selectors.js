import { useEffect, useRef } from "react";
import { callback, idCallback } from "lib/selectors";
import { findPathValue } from "react-enroute";
import * as router from "store/router";
import Paths from "ui/paths";

export const paths = (app) => app.router.paths;

export const location = (app) => paths(app).at(-1);

export const root = (app) => paths(app)[0];

export const modalPaths = (app) => app.router.modalPaths;

export const modalLocation = (app) => modalPaths(app).at(-1);

export const modalOptions = (app) => app.router.modalOptions;

export const hasModal = (app) => !!modalPaths(app).length;

export const canPop = (app) =>
  hasModal(app) ? modalPaths(app).length > 1 : paths(app).length > 1;

export const screenCfg = (app, location) => {
  if (!location) return;

  const res = findPathValue(RevertedPaths, location);
  if (!res) return;

  return {
    name: res.value,
    params: res.params,
  };
};

export const screen = (fns = {}) => {
  const { shown, hidden, getDeps = () => [] } = fns;

  return (app, props) => {
    const screenLocationRef = useRef();

    useEffect(
      () => {
        screenLocationRef.current = location(app);
        shown?.(app, props);
      },
      getDeps?.(app, props),
    );

    useEffect(
      () =>
        router.on(app, "changed", (app, location) => {
          const fn = location === screenLocationRef.current ? shown : hidden;
          fn?.(app, props);
        }),
      [],
    );
  };
};

export const routeCallback = (name, path, params = {}, action = "push") =>
  callback(name, (app) => {
    router[action](app, path, params);
  });

export const idRouteCallback = (name, path, action = "push") =>
  idCallback(name, (app, id) => {
    router[action](app, path, { id });
  });

const RevertedPaths = Object.entries(Paths).reduce((res, [name, path]) => {
  res[path] = name;
  return res;
}, {});
