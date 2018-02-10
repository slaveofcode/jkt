"use strict";

const shortId = require("shortid");
const Splitter = require("./splitter");
const {
  hasReservedKeys,
  triggerErrorReservedKeys
} = require("./reserved_keys");

shortId.seed(1831);

const extendBuilder = (__id, baseSchema, strict) => {
  const splitter = Splitter(strict);
  return (childStrings, ...childBindings) => {
    const { makeUtils } = require("./utils");
    const { Inst } = require("./index");
    const childSchema = splitter(childStrings, childBindings);
    const newSchema = { ...baseSchema, ...childSchema };

    if (hasReservedKeys(newSchema)) triggerErrorReservedKeys();

    const childId = shortId.generate();
    const newId = __id.concat([childId]);
    return Inst(newId, newSchema, makeUtils(newSchema));
  };
};

module.exports = extendBuilder;
