import { useEffect, useRef, useCallback } from "react";
import { isLocked, lock, unlock } from "picofly";

export const spec = (spec) => (app, props) =>
  Object.entries(spec).reduce(
    (res, [name, selector]) =>
      Object.assign(res, { [name]: selector(app, props) }),
    {},
  );

export const item = (name, cfg = {}) => {
  const { idField = "id", map = name + "s" } = cfg;

  const idGetter = dotPathGetter(idField);
  const getter = (app, props) => app[map].get(idGetter(props));

  return (app, props) => {
    const item = getter(app, props);
    return item && { [name]: item };
  };
};

export const effect = (fns = {}) => {
  let { init, clean, getDeps } = fns;

  return (app, props) =>
    useEffect(
      () => {
        const possibleClean = init?.(app, props);

        if (typeof possibleClean === "function") {
          clean ??= possibleClean;
        }

        return clean && (() => clean(app, props));
      },
      getDeps?.(app, props),
    );
};

export const life = (fns = {}) =>
  effect({
    init: fns.created,
    clean: fns.removed,
    getDeps: () => [],
  });

export const instantInit = (fns = {}) => {
  const { init, clean, getDeps = () => [] } = fns;

  return (app, props) => {
    const initRef = useRef();

    const doInit = () => {
      if (initRef.current) return;
      initRef.current = 1;
      init?.(app, props);
    };

    const doClean = () => {
      clean?.(app, props);
      initRef.current = 0;
    };

    doInit();

    effect({
      init: doInit,
      clean: doClean,
      getDeps,
    })(app, props);
  };
};

export const uiState = (State, cfg = {}) => {
  const { name = State.Name, init, getDeps } = cfg;

  if (!name) {
    throw new Error("UI state must have name!");
  }

  return instantInit({
    init(app, props) {
      const locked = isLocked(app);
      locked && unlock(app);

      app.ui ??= {};
      app.ui[name] = new State();

      init?.(app, props, name);

      locked && lock(app);
    },
    clean(app) {
      delete app.ui[name];
    },
    getDeps(app, props) {
      const extraDeps = getDeps?.(app, props) ?? [];
      return [].concat(State, extraDeps);
    },
  });
};

export const callback = (name, fn, getDeps) => (app, props) => ({
  [name]: useCallback(
    (...args) => fn(app, props, ...args),
    getDeps?.(app, props) ?? [],
  ),
});

export const idCallback = (name, fn, getDeps) => (app, props) => ({
  [name]: useCallback(
    (...args) => fn(app, props.id, ...args),
    [props.id, ...(getDeps?.(app, props) ?? [])],
  ),
});

export const setter = (name, path, deps) => {
  const set = dotPathSetter(path);

  return callback(
    name,
    (app, props, value) => {
      set(app, value);
    },
    deps,
  );
};

// TODO: optimize
export const toggler = (name, path, deps) => {
  const get = dotPathGetter(path);
  const set = dotPathSetter(path);

  return callback(
    name,
    (app) => {
      set(app, !get(app));
    },
    deps,
  );
};

const dotPathGetter = (dotPath) => (val) => {
  const path = dotPath.split(".");
  let obj;

  do {
    const prop = path.shift();
    obj = val;
    val = obj[prop];
  } while (val && path.length);

  return val;
};

const dotPathSetter = (dotPath) => {
  const objPathParts = dotPath.split(".");
  const prop = objPathParts.pop();
  const objPath = objPathParts.join(".");
  const objGetter = dotPathGetter(objPath);

  if (!objPath || !prop) {
    throw new Error(`invalid path ${dotPath}`);
  }

  return (to, val) => {
    const obj = objGetter(to);
    if (!obj || typeof obj !== "object") {
      throw new Error(`can't set value to ${dotPath}`);
    }

    obj[prop] = val;
  };
};
