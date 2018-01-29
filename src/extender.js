"use strict";

const Splitter = require("./splitter");
const {
  hasReservedKeys,
  triggerErrorReservedKeys
} = require("./reserved_keys");

const extendBuilder = (baseSchema, strict) => {
  const splitter = Splitter(strict);
  return (childStrings, ...childBindings) => {
    const { makeUtils } = require("./utils");
    const { Inst } = require("./index");
    const childSchema = splitter(childStrings, childBindings);
    const newSchema = { ...baseSchema, ...childSchema };

    if (hasReservedKeys(newSchema)) triggerErrorReservedKeys();

    return Inst(newSchema, makeUtils(newSchema));
  };
};

module.exports = extendBuilder;
