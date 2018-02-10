"use strict";

const extendBuilder = require("./extender");
const Splitter = require("./splitter");
const utils = require("./utils");
const { isEnum, makeEnum, isDeleteProperty } = require("./datatypes");
const {
  hasReservedKeys,
  triggerErrorReservedKeys
} = require("./reserved_keys");
const { isJKTObject, isArray } = require("./utils/detector");

const splitter = Splitter();

const descendantChecker = descendantsIds => {
  return struct => descendantsIds.includes(struct.__id[struct.__id.length - 1]);
};

const inst = (__id, schema, utils) => {
  const structId = isArray(__id) ? __id : [__id];
  const cleanSchema = {}; // pure schema
  const dirtySchema = {}; // impure schema because it's including builtin jkt function
  const descentChecker = descendantChecker(structId);

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
        toString: () => JSON.stringify(utils.serialize(parsed)),
        instanceOf: struct => descentChecker(struct)
      };
    } else {
      return extendBuilder(structId, dirtySchema)(...vals);
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
  struct.childOf = struct => descentChecker(struct);

  struct.__id = structId;
  struct.__schema = dirtySchema;

  return struct;
};

const jkt = (strings, ...bindings) => {
  const __id = utils.generator.generateId();
  const schema = splitter(strings, bindings);
  if (hasReservedKeys(schema)) triggerErrorReservedKeys();
  return inst(__id, schema, utils.makeUtils(schema));
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
