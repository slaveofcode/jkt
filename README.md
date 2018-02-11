# jkt

A little salt to your json structure.

This small library provides you a simple utility to parse and serialize json data, it can manages the structure and types of your json.
The library handles the exact value to strictly follow the defined types, so you don't have to worry about the conversion or checking your json value & structure every time you passed it as an argument.

## Enough Talking and Take My Money

This library was inspired when every time I check the type of arguments to pass into some function. With that idea in my mind I try to figure out what I can build to handle the situation, so my time wasn't spent too much doing repetitive action.

So **JKT** is coming onto my head, sorry I named it `jkt` because it's simple and the abbreviation of "Jakarta" the city where I'm working on (and I am struggle of).

### The Concept of Struct

You just have to define the JKT struct once and then you could rely on them for the rest of the day. The struct is defined by using template literal so you don't have to writing json structure every time (I don't like to write json for that actually).

Here's the example of the struct

```
const person = jkt`
  name: String
  age: Number
  birthday: Date
`
```

### The Instance

You can assume the `person` as a structure for your json data, then every time you do parsing for json, you just have to pass an argument into the `person` like below.

```
const John = person({
  name: "John Doe",
  age: '26'
})

// it makes John a person object like
// You can call it by
console.log(John.name, John.age, John.birthday) // produces "John Doe" in string, 26 in number and null
```

Once you define the `person` structure, you could use it everywhere, make an instance of it and also consume the parsed values. The value that produces is converted safely following the type defined before, if it's `String` it will converted to string, if the type is `Number` it will be converted to following int or float (based on the provided value). If the supplied value is undefined or doen's match it's type, in this example is `birthday` would produce as a `null` value.

### Serializing

The next feature is serializing, when you already have the instance of `person` (the `John`) sometimes it would be boring to checking and makes the values safely parsed into pure json, because you may returning it as a pure json or as a response API (for example). The example below show you how you get the fresh json data without checking and manipulating it instead calling a function.

```
const John = person({
  name: "John Doe",
  age: '26'
})

console.log(John.toJSON()) // { name: "John Doe", age: 26, birthday: null }
console.log(John.j()) // the shorthand method
```

### One Liner VS Multi Liner

There is a few method you can follow while making a struct, **One Line** and **Multi Line**. If you found it very short struct and don't wanna make more space with using multi lines, you could simply create a struct separated by comma `,` like this

```
const Animal = jkt`type: String, color: String, isWild: Boolean`
```

or by multiple lines like this

```
const Animal = jkt`
  type: String
  color: String
  isWild: Boolean
`
```

Don't worry about the both statement above. Those two example are valid to use.

### Custom Predefined Value

When you need to setup custom value upfront, without checking it's type or doing some validations, You could use it as a predefined value. Predefined value is the value you define when defining the struct.

```
const mother = jkt`
  name: String
  birthday: Date
  isMarried: ${true}
`

const angela = mother({ name: "Angela", "Birthday": "1990-06-06" })

console.log(angela.isMarried) // true
```

You could pass anything you want into this, but if you pass a `function` for example, it will not showing on the output when you calling `toJSON` or `j` function on the instance, because the value wasn't a valid json type.

### Extending The Struct

Once you define a struct it possible to extend into another struct, so your new struct would be a child of the parent struct.

```
const person = jkt`
  name: String
  age: Number
  hobby: Array
  birthday: Date
`

const driver = person`
  useBike: Boolean
  useCar: Boolean
`

const doctor = person`
  specialist: String
  hospitalLocation: String
`
```

Both of `driver` and `doctor` is a child of `person` struct, so you will get the `name`, `age`, `hobby` and `birthday` when you do parse of the `driver` and `doctor` instance.

### Deleting The Parent Property

Sometimes we want to extend from existing struct but on a few situation we don't wanna include some properties. By using `!DELETE` type we can exclude the property when extending from existing struct.

```
const person = jkt`
  name: String
  age: Number
  hobby: Array
  drinkBeer: Boolean
`

const child = person`
  toys: Array
  drinkBeer: !DELETE   // this "drinkBeer" will be deleted on child struct
`
```

### Checking Instance and Child

There will be no fun if we could extend the struct but we cannot check if the struct is the parent or the instance of the another object. The example below will be useful if you want to checking the instance and child.

```
const person = jkt`
  name: String
  age: Number
  hobby: Array
`
const child = person`
  toys: Array
  doingHomework: Boolean
`

const mother = person`
  singleParent: Boolean
`

const John = child({
  name: "John Doe"
})

console.log(child.childOf(person)) // true
console.log(mother.childOf(person)) // true
console.log(John.instanceOf(person)) // true
console.log(John.instanceOf(child)) // true
```

### Makes Value Strict to The Type

As mentioned before, every unsupplied value or invalid type of value would be produce null when you do parsing or serializing. But how if you don't want to have it all. If you better to not gaining any values rather than null value, you could simply add an exclamation mark(`!`) on it. For example for the `Number` type you just add `!` on the end of the statement which would be `Number!`.

```
const person = jkt`
  name: String
  age: Number!
  hobby: Array!
`

const John = person({ name: "John Doe", age: "not sure"})

console.log(John.j()) // { name: "John Doe" }
```

### ENUM Value and Utility

So you have been reading through the basic of jkt library, but somehow we need to referrence some value based on it's own defined types. This method could be done with `ENUM`. ENUM is another feature that you can use when you need to strictly follow the type as you defined if before.

```
const Colors = jkt.ENUM`
  RED: Maroon
  WHITE
  BLUE: ${'just blue'}
`

const TSize = jkt.ENUM`small, medium, large, extra_large: ${'EXTRA-LARGE'}`

const t_shirt = jkt`
  model: String
  brand: Number!
  color: ${Colors}
  size: ${TSize}
`

console.log(Colors()) // { RED: 'Maroon', WHITE: 'WHITE', BLUE: 'just blue' }
console.log(TSize()) // { SMALL: 'SMALL', MEDIUM: 'MEDIUM', LARGE: 'LARGE', EXTRA_LARGE: 'EXTRA-LARGE' }
```

By using ENUM your value on `color` and `size` property (on the example), those properties just accept the value defined in that `ENUM`. Important to you to know that `ENUM` will convert all the words described into an **upper cased** value, using it as a **key** and **value** if you're not supply the value before. ENUM doesn't accept any special characters except underscore `_`. If you want to add special character just put in as an expression by the dollar sign and curly braces `${yourExpression}`.

Once you create the ENUM you could use it by calling as a function, and when the ENUM type is used on the struct you could simply call it directly from the struct. The property that have enum type would be converted to an **upper-cased** property.

```
const Colors = jkt.ENUM`
  RED: Maroon
  WHITE
  BLUE: ${'just blue'}
`

const t_shirt = jkt`
  model: String
  brand: Number!
  color: ${Colors}
`

console.log(t_shirt.E.COLOR.RED) // Maroon
```

The `E` stands for the collection of the ENUM on `t_shirt` struct. If you want to see the complete values of ENUM just take the `E` property and you will get it.

### Nested Values

You may wonder about how if we got a nested structure, and how to use it with struct. Every single struct we define is an independent structure that could be used as a nested structure. By this point you got a very reusable component as you may need the same structure on the future.

```
const Person = jkt`
  name: String
  age: Number
  birthday: Date
`

const SchoolClass = jkt`
  name: String
  grade: Number
  teacher: ${Person}
`

console.log(SchoolClass.schema)

/**
{
  name: 'String',
  grade: 'Number',
  teacher: {
    name: 'String',
    age: 'Number',
    birthday: 'Date'
  }
}
*/
```

As you can see the schema completely include the struct of the person. So when you do parse or serialize the value inside `teacher` it will simply follow the exact schema.

```
// ... following the previous code

const mySchoolClass = SchoolClass({
  name: 'Awesome Class',
  grade: '10',
  teacher: {
    name: 'Amelia',
    age: 25,
    birthday: '1992-05-31'
  }
})

console.log(mySchoolClass.j())
/**
{ name: 'Awesome Class',
  grade: 10,
  teacher: {
    name: 'Amelia',
    age: 25,
    birthday: '1992-05-30T17:00:00.000Z'
  }
}
*/
```

### Container (Array)

### Reserved Keywords

### Types

## Test

## LICENSE
