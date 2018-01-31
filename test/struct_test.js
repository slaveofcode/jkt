"use strict";

const chai = require("chai");
const jkt = require(`${src}/index`);

chai.should();
chai.use(require('chai-things'));

const expect = chai.expect;

describe("Struct", () => {
  it("should be able to extend", () => {
    const person = jkt`
      name: String
      age: Number
    `;

    const father = person`
      hasFamily: Boolean
    `

    const schema = father({}).getSchema()
    expect(schema).to.deep.equal({
      name: 'String',
      age: 'Number',
      hasFamily: 'Boolean'
    })
  });
  it("should trigger error when using reserved words", () => {});
  it("should be able to parse in-listed values", () => {});
  it("should be able to parse object values", () => {});
  it("should be able to parse function values", () => {});
});
