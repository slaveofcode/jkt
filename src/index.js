"use strict";

const extendBuilder = require("./extender");
const Splitter = require("./splitter");
const utils = require("./utils");
const { isEnum, makeEnum, isDeleteProperty } = require('./datatypes')
const {
  hasReservedKeys,
  triggerErrorReservedKeys
} = require("./reserved_keys");

const splitter = Splitter();

const inst = (schema, utils) => {
  const cleanSchema = {}
  const propList = Object.keys(schema)

  propList.forEach(key => {
    if (!isDeleteProperty(schema[key])) cleanSchema[key] = schema[key]
  })

  const struct = function (...vals) {
    if (utils.detect.isObject(vals[0])) {
      const parsed = utils.parse(vals[0]);
      return {
        ...parsed,
        j: () => utils.serialize(parsed),
        getSchema: () => cleanSchema,
        toJSON: () => utils.serialize(parsed),
        toString: () => JSON.stringify(utils.serialize(parsed))
      };
    } else {
      return extendBuilder(cleanSchema)(...vals);
    }
  };

  propList.forEach(key => {
    if (isEnum(schema[key])) {
      const enums = makeEnum(schema[key])
      Object.keys(enums).forEach(propEnum => struct[propEnum] = enums[propEnum])
    }
  })

  return struct
};

const jkt = (strings, ...bindings) => {
  const schema = splitter(strings, bindings);
  if (hasReservedKeys(schema)) triggerErrorReservedKeys();
  return inst(schema, utils.makeUtils(schema));
};

module.exports = jkt;
module.exports.Inst = inst;
