# jkt

A little salt to your json data.

This small library provides you a simple utility to parse and serialize json data, it can manages the structure and types of your json.
The library handles the exact value to strictly follow the defined types, so you don't have to worry about the conversion or checking your json value & structure every time you passed it as an argument.

## Enough Talking and Take My Money

This library was inspired when every time I check the type of arguments to pass into some function. With that idea in my mind I try to figure out what I can build to handle the situation, so my time wasn't spent too much doing repetitive action.

So **JKT** is coming onto my head, because it's an abbreviation of "Jakarta" the city where I'm working (when I struggle of).

### The Concept of Struct

You just have to define the JKT struct once and then you could rely on them for the rest of your life. The struct is defined by using template literal so you don't have to writing json structure every time (I don't like to write json for that actually).

Here's the example of the struct

```
const person = jkt`
  name: String
  age: Number
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
console.log(John.name, John.age) // produces "John Doe" in string and 26 in number
```

Once you define the `person` structure, you could use it everywhere, make an instance of it and also consume the parsed values. The value that produces is converted safely following the type defined before, if it's `String` it will converted to string, if the type is `Number` it will be converted to following int or float (based on the provided value).

### Serializing

The next feature is serializing, when you already have the instance of `person` (the `John`) sometimes it would be boring to checking and makes the values safely parsed into pure json, because you may returning it as a pure json or as a response API (for example). the example below show you how you get the fresh json data without touching it instead calling a function.

```
const John = person({
  name: "John Doe",
  age: '26'
})

console.log(John.toJSON()) // produce a pure json data
console.log(John.j()) // the shorthand
```

### One Liner VS Multi Liner

### Custom Predefined Value

### Extending The Struct

### Checking Instance and Parent

### Deleting The Parent Property

### Makes Value Strict to The Type

### ENUM Value and Utility

### Nested Values

### Container (Array)

## Test

## LICENSE
