"use strict";

const chai = require("chai");
const Splitter = require(`${src}/splitter`);
const types = require(`${src}/datatypes`);

const expect = chai.expect;

describe("Splitter for key-value string based on string literal", () => {
  it("should be able to splitting for built-in types", () => {
    const splitter = Splitter();

    const struct = splitter`
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
      name: types.STRING,
      email: types.STRING,
      phone: types.STRING,
      age: types.NUMBER,
      birthday: types.DATE,
      isMarried: types.BOOLEAN,
      gift: types.OBJECT,
      hobby: types.ARRAY,
      skills: types.FUNCTION
    };

    for (const [key, val] of Object.entries(struct)) {
      expect(val).to.equal(comparator[key]);
    }
  });
  it("should be able to splitting for class types");
  it("should be able to splitting for function types");
  it("should be able to splitting for static value");
});
