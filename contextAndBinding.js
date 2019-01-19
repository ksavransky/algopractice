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
// As explained in our JavaScript Hiring Guide, a closure is a function, along with all variables or functions that were in-scope at the time that the closure was created. In JavaScript, a closure is implemented as an “inner function”; i.e., a function defined within the body of another function. An important feature of closures is that an inner function still has access to the outer function’s variables.
//
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

var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0](); // arguments is calling fn -- so this is arguments, and this.length is length of arguments
  }
};

// obj.method(fn, 1);

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
