"use strict";

const extendBuilder = require("./extender");
const Splitter = require("./splitter");
const utils = require("./utils");
const {
  hasReservedKeys,
  triggerErrorReservedKeys
} = require("./reserved_keys");

const splitter = Splitter();

const inst = (schema, utils) => {
  const struct = function (...vals) {
    if (utils.detect.isObject(vals[0])) {
      const parsed = utils.parse(vals[0]);
      return {
        ...parsed,
        j: () => utils.serialize(parsed),
        getSchema: () => schema,
        toJSON: () => utils.serialize(parsed),
        toString: () => JSON.stringify(utils.serialize(parsed))
      };
    } else {
      return extendBuilder(schema)(...vals);
    }
  };

  // Checking enum type
  

  return struct
};

const jkt = (strings, ...bindings) => {
  const schema = splitter(strings, bindings);
  if (hasReservedKeys(schema)) triggerErrorReservedKeys();
  return inst(schema, utils.makeUtils(schema));
};

module.exports = jkt;
module.exports.Inst = inst;
