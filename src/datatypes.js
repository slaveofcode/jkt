'use strict'

const {
  isString,
  isNumber,
  isDate,
  isStringFloat,
  isUndefined
} = require('./utils/detector')

const STRING = 'String'
const NUMBER = 'Number'
const DATE = 'Date'
const BOOLEAN = 'Boolean'
const OBJECT = 'Object'
const ARRAY = 'Array'
const FUNCTION = 'Function'
const ANY = 'Any'
const ENUM = 'ENUM'

const parserableTypes = typeName =>
  [STRING, ARRAY, BOOLEAN, DATE, FUNCTION, NUMBER, OBJECT, ANY].includes(
    typeName
  )

const isEnum = value =>
  /ENUM\[(((\s*([A-Z]+)\s*):?(\s*([A-Za-z0-9\s]+)\s*)?)\s*,*\s*)+]/g.test(value)

const isSafeEnumValue = val => isString(val) || isNumber(val)

const makeEnum = enumSchema => {
  const enums = {}
  // cleaning ENUM[] char, leaving values separated by comma 
  const cleaned = enumSchema
    .replace(/ENUM\[/g, '')
    .replace(/\]/g, '')
    .replace(/\r?\n|\r/g, ' ')
  const constList = cleaned.split(',')

  constList.forEach(keyVal => {
    const trimmed = keyVal.trim()
    const [key, val] = trimmed.split(':')
    const keyUnderscored = key.toUpperCase().replace(/\s/g, '_')
    if (isSafeEnumValue(val)) {
      // parse enum with provided value
      enums[keyUnderscored] = !isNaN(val)
        ? isStringFloat(val) ? parseFloat(val) : parseInt(val)
        : val.length > 0 ? val : keyUnderscored
    } else {
      // parse enum with value same as the key
      enums[keyUnderscored] = keyUnderscored
    }
  })

  console.log(enumSchema, enums)

  return enums
}

const isDeleteProperty = value => /\s*\!DELETE\s*/g.test(value)

module.exports = {
  STRING,
  NUMBER,
  DATE,
  BOOLEAN,
  OBJECT,
  ARRAY,
  FUNCTION,
  ANY,
  ENUM,
  parserableTypes,
  isEnum,
  makeEnum,
  isDeleteProperty
}
