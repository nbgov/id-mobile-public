import {
  BBSPlusCredential,
  BBSPlusPublicKeyG2,
  initializeWasm,
  PresentationBuilder,
} from "@docknetwork/crypto-wasm-ts";
import { BytearrayWrapper } from "@docknetwork/crypto-wasm-ts/lib/bytearray-wrapper";

export const createPresentation = async (args = {}) => {
  await initializeWasm();

  const { nonce, creds = [], equals = [] } = args;

  const builder = new PresentationBuilder();
  builder.nonce = getNonce(nonce);

  creds.forEach(credAdder(builder));
  equals.forEach(equalAdder(builder));

  return builder.finalize();
};

const equalAdder = (builder) => (equal) =>
  builder.markAttributesEqual(...equal);

const credAdder = (builder) => (item, i) => {
  let { pk, cred, ask = {} } = item;
  const { attributes = [], bounds = {}, inequals = {} } = ask;

  pk = getPk(pk, i);
  cred = getCred(cred, i);

  builder.addCredential(cred, pk);
  builder.markAttributesRevealed(i, new Set(attributes));
  addEntries(builder, i, bounds, addBound);
  addEntries(builder, i, inequals, addInequal);
};

const addEntries = (builder, i, items, add) =>
  Object.entries(items).forEach((entry) => add(builder, i, entry));

const addInequal = (builder, i, [attribute, inEqualTo]) =>
  builder.enforceAttributeInequality(i, attribute, inEqualTo);

const addBound = (builder, i, [attribute, cfg]) => {
  // TODO: get defaults from schema
  const { min = -17592186044415, max = Number.MAX_SAFE_INTEGER } = cfg;
  return builder.enforceBounds(i, attribute, min, max);
};

const getNonce = (nonce) => {
  try {
    return BytearrayWrapper.fromHex(nonce).value;
  } catch {
    throw new Error("invalid nonce");
  }
};

const getPk = (pk, i) => {
  try {
    return BBSPlusPublicKeyG2.fromHex(pk);
  } catch {
    throw new Error(`invalid pk for cred at ${i}`);
  }
};

const getCred = (cred, i) => {
  try {
    return BBSPlusCredential.fromJSON(cred);
  } catch {
    throw new Error(`invalid cred at ${i}`);
  }
};
