import { u8aToHex } from "@polkadot/util";
import MsgType from "store/crypto/msg-type";

export const createPresentation = async (app, nonce, cfg) => {
  let { credAsks, equals = [] } = cfg;

  const { creds, indexes } = getCreds(app, credAsks);
  equals = getEquals(equals, indexes);

  const args = { nonce, creds, equals };

  return app.cryptoBridge.rpc(MsgType.CreatePresentation, args);
};

const getCreds = (app, credAsks) =>
  credAsks.reduce(
    (res, credAsk) => {
      const { id, ask } = credAsk;

      const cred = app.creds.get(id) || throwNoCred(id);
      const { type } = cred;

      const key = app.issuer.types.get(type)?.publicKey || throwNoPk(type);
      const pk = u8aToHex(key, -1, false);

      res.indexes[id] = res.creds.length;
      res.creds.push({ cred, pk, ask });

      return res;
    },
    {
      indexes: {},
      creds: [],
    },
  );

const getEquals = (equals, indexes) =>
  equals.map((equal) =>
    Object.entries(equal.items).map((item) => [
      indexes[item.id] || throwNoCredForEqual(item.id),
      item.attribute,
    ]),
  );

const throwNoCred = (id) => {
  throw new Error(`crypto: no cred '${id}'`);
};

const throwNoPk = (type) => {
  throw new Error(`crypto: no key for type '${type}'`);
};

const throwNoCredForEqual = (id) => {
  throw new Error(`crypto: no cred '${id}' for equal`);
};
