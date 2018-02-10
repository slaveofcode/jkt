"use strict";

const { isUndefined, isArray } = require("./utils/detector");

const deepClone = (cln, obj) => {
  for (const i in obj)
    cln[i] =
      typeof obj[i] == "object"
        ? deepClone(obj[i].constructor(), obj[i])
        : obj[i];
  return cln;
};

const splitter = (strict = false) => {
  return (strings, ...bindings) => {
    const pairs = {};
    let bindIdx = 0;

    if (isUndefined(strings)) throw new Error("You need to supply argument");

    if (isArray(bindings) && bindings.length > 0) bindings = bindings[0];

    strings.filter(s => s.length > 0).forEach(stmt => {
      const delimiter = ",";

      // Replacing all new lines with comma
      const preparedStr = stmt.replace(/(\r\n|\n|\r)/gm, delimiter);

      const rex = /\s*([a-zA-Z0-9\_]+\s*\:\s*[\!a-zA-Z]*\s*\,*[\r\n]*)/g;
      const splittedStr = preparedStr.split(rex);

      const removedTrailSpcs = splittedStr.map(s =>
        s.replace(/\,/g, "").trim()
      );

      const cleanedBlocks = removedTrailSpcs.filter(
        s => s.length > 0 && s !== delimiter
      );

      cleanedBlocks.forEach(block => {
        const [key, typeName] = block.split(":");
        pairs[key] =
          typeName.length > 0
            ? typeName.trim()
            : !isUndefined(bindings[bindIdx])
              ? deepClone(bindings[bindIdx])
              : bindings[bindIdx];

        // normalize array binding values
        if (isArray(pairs[key]) && pairs[key].length > 0)
          pairs[key] = pairs[key][0];

        if (typeName.length === 0) bindIdx++;
      });
    });

    const pairVals = Object.values(pairs);
    const countUndefTypes = pairVals.filter(
      typeVal => typeof typeVal === "undefined"
    ).length;

    if (countUndefTypes > 0 && strict)
      throw new Error(
        "Invalid Schema Detected, please define the right value types"
      );

    return pairs;
  };
};

const enumSplitter = () => {};

module.exports = splitter;
