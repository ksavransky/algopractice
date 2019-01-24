var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

// console.log(hero.getSecretIdentity()); // John Doe
// (because hero object is calling it's own getSecretIdentity -- i.e. getSecretIdentity () already bound to hero object)

// console.log(stoleSecretIdentity()); // undefinied (we are using strict mode so throws an error)

// stoleSecretIdentity() prints undefined because we are extracting the method from the hero object,
// so stoleSecretIdentity() is being invoked in the global context (i.e., the window object)
// where the _name property does not exist.
//
// One way to fix the stoleSecretIdentity() function is as follows:
//
var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);
// console.log(stoleSecretIdentity()); //John Doe

// ------------------------------------------------


// (function(x) {
//     return (function(y) {
//         console.log(x);
//     })(2)
// })(1);

// The output will be 1, even though the value of x is never set in the inner function. Here’s why:
//
// As explained in our JavaScript Hiring Guide, a closure is a function,
// along with all variables or functions that were in-scope at the time that the closure was created.
// In JavaScript,  a closure is implemented as an “inner function”;
// i.e., a function defined within the body of another function.
// An important feature of closures is that an inner function STILL HAS ACCESS TO OUTER FUNCTION'S VARIABLES.
// Therefore, in this example, since x is not defined in the inner function, the scope of the outer function is searched for a defined variable x, which is found to have a value of 1.


// ------------------------------------------------


var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            // this is node, so we are using strict mode,
            // so this will throw and error since it is undefined
            // console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
// myObject.func();

// The above code will output the following to the console:
//
// outer func:  this.foo = bar
// outer func:  self.foo = bar
// inner func:  this.foo = undefined
// inner func:  self.foo = bar
// In the outer function, both this and self refer to myObject and therefore both can properly reference and access foo.
//
// In the inner function, though, this no longer refers to myObject. As a result, this.foo is undefined in the inner function,
// whereas the reference to the local variable self remains in scope and is accessible there.

// ------------------------------------------------


var myObj = {

    specialFunction: function () {
      console.log("you're so special!")
    },

    getAsyncData: function (cb) {
        cb();
    },

    render: function () {
        var that = this; // this refers to myObj
        this.getAsyncData(function () {   // could use fat arrow here instead of that-this dance
            // in here -- 'this' refers to global
            // this.specialFunction() // throws an error
            // 'that' is passed down and refers to myObj
            that.specialFunction();
        });
    }
};

myObj.render(); // you're so special

// If we had left our function calls as this.specialFunction(), then we would have received the following error:
// Uncaught TypeError: Object [object global] has no method 'specialFunction'

// ------------------------------------------------

var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) { // reason we have 10 output is fn is passed in with param and fn this is already bound to global
    fn();
    arguments[0](); // arguments is calling fn -- so this is arguments, and this.length is length of arguments
  }
};

obj.method(fn, 1);

// Output:

// 10
// 2
// Why isn’t it 10 and 5?
//
// In the first place, as fn is passed as a parameter to the function method, the scope (this) of the function fn is window. var length = 10; is declared at the window level. It also can be accessed as window.length or length or this.length (when this === window.)
//
// method is bound to Object obj, and obj.method is called with parameters fn and 1. Though method is accepting only one parameter, while invoking it has passed two parameters; the first is a function callback and other is just a number.
//
// When fn() is called inside method, which was passed the function as a parameter at the global level, this.length will have access to var length = 10 (declared globally) not length = 5 as defined in Object obj.
//
// Now, we know that we can access any number of arguments in a JavaScript function using the arguments[] array.
//
// Hence arguments[0]() is nothing but calling fn(). Inside fn now, the scope of this function becomes the arguments array, and logging the length of arguments[] will return 2.
//
// Hence the output will be as above.


// ------------------------------------------------
// BINDING

let jimbot = {
  name: 'Jimbot',
  greet: function (){
    console.log('Say hello to' + ' ' + this.name);
  }
};

// jimbot.greet() //=> 'Say hello to Jimbot'

let bobBot = { name: 'Bobbot' }

let greetBob = jimbot.greet.bind(bobBot)

// greetBob() // 'Say hello to Bobbot'

// ------------------------------------------------

// Implementing bind
// https://medium.com/@mrjimbot/function-bind-implementation-a69d60c5a17e

const bind = function(func, context) {
  // get arguments besides caller func we are binding and the context (hence slice from 2) e.g. ; 'foo' in example below
  // note: arguments are array-like (really and object) that's why we can't call slice directly on them
  let previousArgs = [].slice.call(arguments, 2);
  return function() {
    // get a copy of arguments passed into bound function; e.g. 'bar' in example below
    let currentArgs = [].slice.call(arguments);
    // combine previous (i.e. bound arguments) and arguments used when bound function is called; e.g. ['foo', 'bar'] in example
    let combinedArgs = previousArgs.concat(currentArgs)
    // call the function using apply, passing in the context and an array of the combined pre and post binding arguments
    return func.apply(context, combinedArgs);
  }
};

// using es6 an passing in args instead of not passing in args above (using arguments instead above)
const es6bind = (func, context, ...initialArgs) => {
  return (...newArgs) => {
    return func.apply(context, initialArgs.concat(newArgs));
  }
};

// Using bind to bind a first argument to a function (similar to what you can do with a closure)

var addFunc = function(a, b, c = ''){ return a + b + c }; // method

// binding (with previous arguments, i.e. 'foo')
// var boundAddFunc = bind(addFunc, null, 'foo'); // note: no context passed because this not used;
var boundAddFunc = es6bind(addFunc, null, 'foo'); // note: no context passed because this not used;

// same as
// var boundAddFunc = addFunc.bind(null, 'foo')

console.log(boundAddFunc('bar', 'cat')); //=> 'foobar' // output (with current arguments)


const boundGreet = bind(jimbot.greet, { name: 'Janice' });

boundGreet() //=> 'Say hello to Janice'
// ------------------------------------------------

//
// Function.prototype.bind = function(context) {
//   // method is attached to the prototype, so just refer to it as this.
//   let func = this;
//   let previousArgs = [].slice.call(arguments, 1);
//
//   return function(){
//     let currentArgs = [].slice.call(arguments);
//     let combinedArgs = [].concat(previousArgs, currentArgs);
//     return func.apply(context, combinedArgs);
//   };
// };

// ------------------------------------------------

// https://javascript.info/bind
// Bind related puzzles


// A function cannot be re-bound.
function f() {
  console.log(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

// f(); // John
//
// The exotic bound function object returned by f.bind(...) remembers the context
// (and arguments if provided) only at creation time.
// A function cannot be re-bound.


// The result of bind is another object. Properties don't get carried over.
function sayHi() {
  console.log( this.name );
}
sayHi.test = 5;

console.log('sayHi.test', sayHi.test) // 5

let boundHi = sayHi.bind({
  name: "John"
});

console.log( 'boundHi.test', boundHi.test ); // what will be the output? why?
// The answer: undefined.
//
// The result of bind is another object. It does not have the test property.

// ------------------------------------------------

// Call function

function showProfileMessage(message, secondMessage = '') {
 console.log(message, this.name, secondMessage);
}
const obj2 = {
 name: "Ankur Anand"
};
showProfileMessage.call(obj2, "Welcome", 'you fool'); // Welcome Ankur Anand you fool

// Implement call -- probably too much for an interview
// https://blog.usejournal.com/implement-your-own-call-apply-and-bind-method-in-javascript-42cc85dba1b

Function.prototype.myOwnCall = function(someOtherThis) {
  // 'this' is the function that will be called
  // 'someOtherThis' is the context, i.e. object that will be passed in to the call/myOwnCall method
  // so we literally add the function 'this' to the context object and call it 'fnName'
  someOtherThis.fnName = this;
  let args = [];

  // arguments are saved in strings, using args
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }

  // console.log('argsssss', args) // [arguments[1],argument[2]]

  // strings are reparsed into statements in the eval method
  // Here args automatically calls the Array.toString() method.
  // console.log('eval call:', "someOtherThis.fnName(" + args + ")") // "someOtherThis.fnName(arguments[1],argument[2])"

  // eval executes strings as code
  eval("someOtherThis.fnName(" + args + ")");
};

showProfileMessage.myOwnCall(obj2, "Welcome", "you fool"); // Welcome Ankur Anand
