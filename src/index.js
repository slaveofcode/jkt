"use strict";

const extendBuilder = require("./extender");
const Splitter = require("./splitter");
const utils = require("./utils");
const { isEnum, makeEnum, isDeleteProperty } = require("./datatypes");
const {
  hasReservedKeys,
  triggerErrorReservedKeys
} = require("./reserved_keys");
const { isJKTObject } = require("./utils/detector");

const splitter = Splitter();

const inst = (schema, utils) => {
  const cleanSchema = {}; // pure JSON schema
  const dirtySchema = {}; // impure JSON schema including builtin jkt function

  Object.keys(schema).forEach(key => {
    if (!isDeleteProperty(schema[key])) {
      cleanSchema[key] = !isJKTObject(schema[key])
        ? schema[key]
        : schema[key].schema;
      dirtySchema[key] = schema[key];
    }
  });

  const struct = function(...vals) {
    if (utils.detect.isObject(vals[0])) {
      const parsed = utils.parse(vals[0]);
      return {
        ...parsed,
        j: () => utils.serialize(parsed),
        getSchema: () => cleanSchema,
        getDirtySchema: () => dirtySchema,
        toJSON: () => utils.serialize(parsed),
        toString: () => JSON.stringify(utils.serialize(parsed))
      };
    } else {
      return extendBuilder(dirtySchema)(...vals);
    }
  };

  // Object.keys(cleanSchema).forEach(key => {
  //   if (isEnum(cleanSchema[key])) {
  //     const enums = makeEnum(cleanSchema[key]);
  //     if (Object.keys(enums).length > 0) struct[key] = enums;
  //   }
  // });

  // builtin properties
  struct.isJKT = true;
  struct.schema = cleanSchema;
  struct.__schema = dirtySchema;

  return struct;
};

const jkt = (strings, ...bindings) => {
  const schema = splitter(strings, bindings);
  if (hasReservedKeys(schema)) triggerErrorReservedKeys();
  return inst(schema, utils.makeUtils(schema));
};

module.exports = jkt;
module.exports.Inst = inst;
module.exports.ENUM = "";

/**
 * const { ENUM } = require('jkt')
 * const jkt = require('jkt')
 *
 * const Colors = ENUM`
 *  RED: Merah
 *  GREEN: Hijau
 * `
 *
 * OR
 *
 * const Colors = ENUM`RED: Merah, GREEN: Hijau`
 *
 * OR
 *
 * const Colors = ENUM`RED, GREEN`
 *
 * OR
 *
 * const Colors = ENUM`
 *  RED
 *  GREEN
 * `
 *
 * const fruit = jkt`
 *  name: String!
 *  price: Number!
 *  color: String!
 *  COLOR: ${Colors}
 * `
 *
 * fruit.COLOR.RED // callable before instantiation
 *
 *
 * const basket = jkt`
 *  ownerName: String
 *  orange: ${fruit}
 *  apple: ${fruit}!
 *  COLOR: ${Colors}
 * `
 *
 * basket.COLOR.GREEN
 *
 * const basket1 = basket({
 *  ownerName: 'Adit',
 *  orange: {
 *    name: 'orange',
 *    price: '5000',
 *    color: 'yellow'
 *  }
 * })
 *
 * basket1.orange.COLOR.RED
 */
