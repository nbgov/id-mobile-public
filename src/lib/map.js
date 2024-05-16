export const upsert = (map, item, idField) => {
  const id = getId(item, idField);
  const old = map.get(id);

  if (old) {
    const newKeys = new Set(Object.keys(item));
    const oldKeys = Object.keys(old);

    for (const key of oldKeys) {
      if (!newKeys.has(key)) {
        delete old[key];
      }
    }

    Object.assign(old, item);
    return false;
  } else {
    map.set(id, item);
    return true;
  }
};

export const merge = (map, items, idField) => {
  const added = [];

  for (const item of items) {
    const isNew = upsert(map, item, idField);
    if (!isNew) continue;

    const id = getId(item, idField);
    added.push(id);
  }

  return { added };
};

export const replace = (map, items, idField) => {
  const oldKeys = keys(map);
  const newKeys = new Set(items.map(idGetter(idField)));

  return replaceItems(map, items, idField, oldKeys, newKeys);
};

export const replaceWithFilter = (map, items, filter, idField) => {
  items = items.filter(filter);
  const oldItems = values(map).filter(filter);

  const oldKeys = oldItems.map(idGetter(idField));
  const newKeys = new Set(items.map(idGetter(idField)));

  return replaceItems(map, items, idField, oldKeys, newKeys);
};

export const keys = (map) => Array.from(map.keys());

export const values = (map) => Array.from(map.values());

export const entries = (map) => Array.from(map.entries());

const getId = (item, idField = "id") => item[idField] ?? "invalid id!"();

const idGetter = (idField) => (item) => getId(item, idField);

const replaceItems = (map, items, idField, oldKeys, newKeys) => {
  const removed = [];

  for (const key of oldKeys) {
    if (!newKeys.has(key)) {
      map.delete(key);
      removed.push(key);
    }
  }

  const { added } = merge(map, items, idField);

  return { added, removed };
};
