"use strict";

const chai = require("chai");
const Splitter = require(`${src}/splitter`);

const expect = chai.expect;

describe("Splitter for key-value string based on string literal", () => {
  it("should be able to splitting for built-in types", () => {
    const splitter = Splitter();

    const struct = `
      name: String
      email: String
      phone: String
      age: Number
      birthday: Date
      isMarried: Boolean
      gift: Object
      hobby: Array
      skills: Function
    `;

    const comparator = {
      name: "String",
      email: "String",
      phone: "String",
      age: "Number",
      birthday: "Date",
      isMarried: "Boolean",
      gift: "Object",
      hobby: "Array",
      skills: "Function"
    };

    const result = splitter(struct);

    for (const [key, val] of Object.entries(result)) {
      expect(val).to.equal(comparator[key]);
    }
  });
  it("should be able to splitting for class types");
  it("should be able to splitting for function types");
  it("should be able to splitting for static value");
});
