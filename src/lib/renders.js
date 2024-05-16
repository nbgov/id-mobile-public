import { useCallback } from "react";
import { identity } from "lib/fns";

export function listItemRender(Item, options = {}) {
  const { props, as = "id", withIndex } = options;

  return useCallback(
    ({ item, index }) => (
      <Item {...{ [as]: item }} {...(withIndex ? { index } : {})} {...props} />
    ),
    [Item, props, as],
  );
}

export function itemRender(Item, options = {}) {
  const { props, as = "id", keyExtractor = identity, withIndex } = options;

  return (item, index) => (
    <Item
      key={keyExtractor(item, index)}
      {...(as ? { [as]: item } : item)}
      {...(withIndex ? { index } : {})}
      {...props}
    />
  );
}

export function sectionHeaderRender(Header, options = {}) {
  const { props } = options;

  return useCallback(
    ({ section }) => <Header {...{ section, ...props }} />,
    [Header, props],
  );
}
