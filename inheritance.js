// https://medium.com/javascript-scene/common-misconceptions-about-inheritance-in-javascript-d5d9bab29b0a

// Javascript uses prototypal inheritance

// 1. NOT JAVASCRIPT: In class inheritance, instances inherit from a blueprint (the class),
// and create sub-class relationships.
// In other words, you can’t use the class like you would use an instance.
// You can’t invoke instance methods on a class definition itself.
// You must first create an instance and then invoke methods on that instance.

// 2. JAVASCRIPT: In prototypal inheritance, instances inherit from other instances.
//Using delegate prototypes (setting the prototype of one instance to refer to an examplar object),
//it’s literally Objects Linking to Other Objects, or OLOO, as Kyle Simpson calls it.

function Dog(name) {
  this.name = name
}

// By placing bark on Dog.prototype, we made it available to all instances of Dog.

Dog.prototype.bark = function() {
 console.log(this.name + ' says woof!');
};

let fido = new Dog('fido')
fido.bark()

// 3. JAVASCRIPT: Using concatenative inheritance, you just copy properties from an exemplar object to a new instance.
// Concatenative inheritance: The process of inheriting features directly from one object to another by copying the source objects properties.
// In JavaScript, source prototypes are commonly referred to as mixins.
// Since ES6, this feature has a convenience utility in JavaScript called `Object.assign()

// Composition (using Concatenative inheritance) Example

// http://codepen.io/ericelliott/pen/XXzadQ?editors=001
// https://gist.github.com/ericelliott/fed0fd7a0d3388b06402

const distortion = { distortion: 1 };
const volume = { volume: 1 };
const cabinet = { cabinet: 'maple' };
const lowCut = { lowCut: 1 };
const inputLevel = { inputLevel: 1 };

const GuitarAmp = (options) => {
  return Object.assign({}, distortion, volume, cabinet, options);
};

const BassAmp = (options) => {
  return Object.assign({}, lowCut, volume, cabinet, options);
};

const ChannelStrip = (options) => {
  return Object.assign({}, inputLevel, lowCut, volume, options);
};



// TL;DR:
//
// A class is a blueprint.
// A prototype is an object instance.

// Does `new` mean that code is using classical inheritance?
// No.
// The `new` keyword is used to invoke a constructor. What it actually does is:
//
// Create a new instance
// Bind `this` to the new instance
// Reference the new object’s delegate [[Prototype]] to the object referenced by the constructor function’s `prototype` property.
// Reference the new object’s .constructor property to the constructor that was invoked.
// Names the object type after the constructor, which you’ll notice mostly in the debugging console. You’ll see `[Object Foo]`, for example, instead of `[Object object]`.
// Allows `instanceof` to check whether or not an object’s prototype reference is the same object referenced by the .prototype property of the constructor.

// ------------------------------------------------

// Factories (alternative to constructor function like Dog example above)

// Any function can create and return objects. When it’s not a constructor function, it’s called a factory function.

let animal = {
  animalType: 'animal',

  describe () {
    return `An ${this.animalType} with ${this.furColor} fur,
      ${this.legs} legs, and a ${this.tail} tail.`;
  }
};

// Object.create(animal) makes a copy of the animal object
// OTHERWISE after Object.assign call, the animal object  will have the new assigned properties e.g. animalType
// we don't want that, we only want the new mouse object created by the factory to have that property

// Object.assign, takes the cloned animal object as it's first argument, and then assigns new parameters to it

let mouseFactory = function mouseFactory () {
  return Object.assign(Object.create(animal), {
    animalType: 'mouse',
    furColor: 'brown',
    legs: 4,
    tail: 'long, skinny'
  });
};

let mickey = mouseFactory();
console.log(animal)
console.log(mickey.describe())


// ------------------------------------------------

// Deep dive into prototypal inheritance
// https://medium.com/@kevincennis/prototypal-inheritance-781bccc97edb

// Here’s a fun fact: In JavaScript, all functions are also objects,
//which means that they can have properties. And as it so happens,
//they all have a property called `prototype`, which is also an object.

function foo() {
}
typeof foo.prototype // ‘object’
//
// In JavaScript, there’s really no difference between a “regular” function and a constructor function.
// They’re actually all the same. But as a convention, functions that are meant to
// be used as constructors are generally capitalized.

// If I want to make an instance of Dog, I use the new keyword. That’s really what I mean when I talk about constructors 
// — I’m using the function to construct a new object!!!
// Any time you see the new keyword, it means that the following function is being used as a constructor.

function Doggy(name) {
  this.name = name
}

// By placing bark on Dog.prototype, we made it available to all instances of Dog.

Doggy.prototype.bark = function() {
 console.log('woof!');
};

let fido2 = new Doggy('fido')
// console.log(fido2) // Doggy {name: 'fido'}
// fido2.bark() // woof

//
// JavaScript uses an inheritance model called “differential inheritance”.
// What that means is that methods aren’t copied from parent to child. Instead, children have an “invisible link” back to their parent object.
//
// For example, fido doesn’t actually have its own method called bark()
// (in other words, fido.hasOwnProperty(‘bark’) === false).
//
// What actually happens when I write fido.bark() is this:
//
// 1. The JS engine looks for a property called bark on our fido object.
// 2. It doesn’t find one, so it looks “up the prototype chain” to fido’s parent, which is Dog.prototype.
// 3. It finds Dog.prototype.bark, and calls it with this bound to fido.
//
// That part is really important, so I’m going to repeat it:
//
// There’s really no such property as fido.bark. It doesn’t exist.
// Instead, fido has access to the bark() method on Dog.prototype because it’s an instance of Dog. This is the “invisible link” I mentioned.
// More commonly, it’s referred to as the “PROTOTYPE CHAIN”.


// If you remember from earlier, we can use Object.create() to create an empty object that inherits
// from another object. In the case of Square, that means all we need to do is this:
//
function Rectangle( width, height ) {
 this.width = width;
 this.height = height;
}
Rectangle.prototype.area = function() {
 return this.width * this.height;
};
// Subclassing
function Square( length ) {
 this.width = this.height = length;
}
// console.log(Rectangle.prototype)
Square.prototype = Object.create(Rectangle.prototype); // use Object.create to clone Rectangle.prototype or else will set new Square properties on both
// console.log(Square.prototype)
let sq1 = new Square(2)
console.log(sq1.area()) // 4



// ------------------------------------------------


// https://medium.com/ecmascript-2015/es6-classes-and-inheritance-607804080906

// Overview — an example of ES6 class syntax and ES5 equivalent

// ES6 class syntax:
// class Vehicle {
//   constructor (name, type) {
//     this.name = name;
//     this.type = type;
//   }
//
//   getName () {
//     return this.name;
//   }
//
//   getType () {
//     return this.type;
//   }
//
// }
// let car = new Vehicle('Tesla', 'car');
// console.log(car.getName()); // Tesla
// console.log(car.getType()); // car

// ES5 equivalent could be something like this:

// function Vehicle (name, type) {
//   this.name = name;
//   this.type = type;
// };
//
// Vehicle.prototype.getName = function getName () {
//   return this.name;
// };
//
// Vehicle.prototype.getType = function getType () {
//   return this.type;
// };
// var car = new Vehicle('Tesla', 'car');
// console.log(car.getName()); // Tesla
// console.log(car.getType()); // car


// Inheritance

function Vehicle (name, type) {
  this.name = name;
  this.type = type;
};

Vehicle.prototype.getName = function getName () {
  return this.name;
};

Vehicle.prototype.getType = function getType () {
  return this.type;
};


function Car (name) {
  // to set name to car i.e. like super(name, 'car');
  // calling Vehicle's constructor and passing in name param from Car constructor and 'car' as type param
  Vehicle.call(this, name, 'car'); // first param to call function is context 'this'
}

// Car to inherit Vehicles methods
Car.prototype = Object.create(Vehicle.prototype);
// Car to use own constructor
Car.prototype.constructor = Car;
// ??
Car.parent = Vehicle.prototype;
// override parents getName
Car.prototype.getName = function () {
  return 'It is a car: '+ this.name;
};
var car = new Car('Tesla');
console.log(car.getName()); // It is a car: Tesla
console.log(car.getType()); // car

//es6
// class Vehicle {
//
//   constructor (name, type) {
//     this.name = name;
//     this.type = type;
//   }
//
//   getName () {
//     return this.name;
//   }
//
//   getType () {
//     return this.type;
//   }
//
// }

// class Car extends Vehicle {
//
//   constructor (name) {
//     super(name, 'car');
//   }
//
//   getName () {
//     return 'It is a car: ' + super.getName();
//   }
//
// }
// let car = new Car('Tesla');
// console.log(car.getName()); // It is a car: Tesla
// console.log(car.getType()); // car

// static

// class Vehicle {
//
//   constructor (name, type) {
//     this.name = name;
//     this.type = type;
//   }
//
//   getName () {
//     return this.name;
//   }
//
//   getType () {
//     return this.type;
//   }
//
//   static create (name, type) {
//     return new Vehicle(name, type);
//   }
//
// }
// let car = Vehicle.create('Tesla', 'car');
// console.log(car.getName()); // Tesla
// console.log(car.getType()); // car
