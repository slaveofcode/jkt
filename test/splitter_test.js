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
  it("should be able to splitting for class types", () => {
    const splitter = Splitter();

    class Person {}
    class Friend {}

    const struct = splitter`
      name: String
      email: String
      phone: String
      friend: ${Friend}
      age: Number
      birthday: Date
      isMarried: Boolean
      gift: Object
      hobby: Array
      skills: Function
      person: ${Person}
    `;

    const comparator = {
      name: types.STRING,
      email: types.STRING,
      phone: types.STRING,
      friend: Friend,
      age: types.NUMBER,
      birthday: types.DATE,
      isMarried: types.BOOLEAN,
      gift: types.OBJECT,
      hobby: types.ARRAY,
      skills: types.FUNCTION,
      person: Person
    };

    for (const [key, val] of Object.entries(struct)) {
      expect(val).to.equal(comparator[key]);
    }
  });
  it("should be able to splitting for function types", () => {
    const splitter = Splitter();

    let fn = () => "some function";

    const struct = splitter`
      name: String
      age: Number
      say: ${fn}
    `;

    const comparator = {
      name: types.STRING,
      age: types.NUMBER,
      say: fn
    };

    for (const [key, val] of Object.entries(struct)) {
      expect(val).to.equal(comparator[key]);
    }
  });
  it("should be able to splitting for static value", () => {
    const splitter = Splitter();

    const name = "Aditya Kresna";
    const addr = "Bekasi";
    const grad = 2014;

    const struct = splitter`
      name: ${name}
      age: Number
      address: ${addr}
      graduationYear: ${grad} 
    `;

    console.log(struct)

    const comparator = {
      name: "Aditya Kresna",
      age: types.NUMBER,
      address: addr,
      graduationYear: grad
    };

    for (const [key, val] of Object.entries(struct)) {
      expect(val).to.equal(comparator[key]);
    }
  });
});
