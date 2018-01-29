"use strict";

const Splitter = require("./splitter");
const utils = require("./utils");
const {
  hasReservedKeys,
  triggerErrorReservedKeys
} = require("./utils/reserved_keys");

const splitter = Splitter();

const inst = (schema, utils) => {
  return (...vals) => {
    if (utils.detect.isObject(vals[0])) {
      const parsed = utils.parse(vals);
      return {
        ...parsed,
        getSchema: () => schema,
        j: () => utils.serialize(parsed),
        toJSON: () => utils.serialize(parsed),
        toString: () => JSON.stringify(utils.serialize(parsed))
      };
    } else {
      return utils.ext(...vals);
    }
  };
};

const jkt = (strings, ...bindings) => {
  // do validations of reserved words like toJSON, toString, getSchema
  const schema = splitter(strings, bindings);
  if (hasReservedKeys(schema)) triggerErrorReservedKeys();
  return inst(schema, utils.makeUtils(schema));
};

module.exports = jkt;
module.exports.Inst = inst;
