"use strict";

const {
  STRING,
  ARRAY,
  BOOLEAN,
  DATE,
  FUNCTION,
  NUMBER,
  OBJECT
} = require(`./datatypes`);

const deepClone = (cln, obj) => {
  for (const i in obj)
    cln[i] =
      typeof obj[i] == "object" ? x(obj[i].constructor(), obj[i]) : obj[i];
  return cln;
};

const splitter = (strict = false) => {
  return (strings, ...bindings) => {
    const pairs = {};
    let bindIdx = 0;

    
    strings.forEach(stmt => {
      console.log(stmt)
      // Place a new line marker and Removing all spaces
      const cleaned = stmt.replace(/\r?\n|\r/g, "|").replace(/\s/g, "");
      const splitLines = cleaned.split("|").filter(itm => itm.length > 0);

      splitLines.forEach(block => {
        const [key, val] = block.split(":");
        pairs[key] =
          val.length > 0
            ? val
            : typeof bindings[bindIdx] !== "undefined"
              ? deepClone(bindings[bindIdx])
              : bindings[bindIdx];
        if (val.length === 0) bindIdx++;
      });
    });

    const pairVals = Object.values(pairs);
    const countUndefTypes = pairVals.map(
      typeVal => typeof typeVal === "undefined"
    ).length;

    if (countUndefTypes > 0 && strict)
      throw new Error(
        "Invalid Schema Detected, please define right value types"
      );

    return pairs;
  };
};

module.exports = splitter;
