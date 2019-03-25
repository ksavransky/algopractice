let addMaker = (x) => {
  return (y) => {
    return x + y
  }
}

let addTwo = addMaker(2)

// console.log(addTwo(3))


let counter = () => {
  let count = 0

  return () => {
    count += 1
    return count
  }
}

let counterInstance = counter()
//
// console.log(counterInstance())
// console.log(counterInstance())
// console.log(counterInstance())

// ------------------------------------------------


// for (var i = 0; i < 3; i++) {
// 	setTimeout(function(){console.log(i);}, 1000 + i);
// }
// output: 3 3 3   :(

// for (var i = 0; i < 3; i++) {
// 	(function(i){
// 		setTimeout(function(){console.log(i);}, 1000 + i);
// 	})(i)
// }

// output: 0 1 2   :)
// wrapped call in a closure function and passed in 'i' as a variable to self executing closure



// ------------------------------------------------

// (function(){
//   var a = b = 3;
// })();
//
// console.log("a defined? " + (typeof a !== 'undefined'));
// console.log("b defined? " + (typeof b !== 'undefined'));

// Since both a and b are defined within the enclosing scope of the function, and since the line they are on begins with the var keyword, most JavaScript developers would expect typeof a and typeof b to both be undefined in the above example.
//
// However, that is not the case. The issue here is that most developers incorrectly understand the statement var a = b = 3; to be shorthand for:
//
// var b = 3;
// var a = b;
// But in fact, var a = b = 3; is actually shorthand for:
//
// b = 3;
// var a = b;
// As a result (if you are not using strict mode), the output of the code snippet would be:
//
// a defined? false
// b defined? true
// But how can b be defined outside of the scope of the enclosing function? Well, since the statement var a = b = 3; is shorthand for the statements b = 3; and var a = b;, b ends up being a global variable (since it is not preceded by the var keyword) and is therefore still in scope even outside of the enclosing function.
//
// Note that, in strict mode (i.e., with use strict), the statement var a = b = 3; will generate a runtime error of ReferenceError: b is not defined, thereby avoiding any headfakes/bugs that might othewise result. (Yet another prime example of why you should use use strict as a matter of course in your code!)


// ------------------------------------------------


var x = 21;
var girl = function () {
    console.log(x);
};
// girl (); // 21


var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
// girl (); // undefined

// Neither 21, nor 20, the result is undefined
//
// It’s because JavaScript initialization is not hoisted.
//
// (Why doesn’t it show the global value of 21? The reason is that when the function is executed,
// it checks that there’s a local x variable present but doesn’t yet declare it, so it won’t look for global one.)
// Kon: i.e. having the var x = 20; inside the function scope prevents using the global x = 21.


// ------------------------------------------------

var b = 1;
function outer(){
   	var b = 2
    function inner(){
        console.log('b in inner BEFORE var b = 3:', b) // undefined
        b++; // NaN (++ on an undefined makes a NaN)
        var b = 3; // NOTE: this being below b KILLS the b from the outer scope, makes the b above (in b++) undefined
        console.log('b in inner AFTER var b = 3:', b) // 3
    }
    inner();
}
// outer(); // 3

// Output to the console will be “3”.
//
// There are three closures in the example, each with it’s own var b declaration.
// When a variable is invoked closures will be checked in order from local to global until an instance is found.
// Since the inner closure has a b variable of its own, that is what will be output.
//
// Furthermore, due to hoisting the code in inner will be interpreted as follows:
//
// function inner () {
//     var b; // b is undefined
//     b++; // b is NaN
//     b = 3; // b is 3
//     console.log(b); // output "3"
// }


// ---------------------------------------------------
(function () {
    try {
        throw new Error('hiiiii'); // so catch is executed because we threw an error
    } catch (x) { // pass in error as x
        // console.log(x); // Error: hiiiiii
        var x = 1, y = 2;  // redefine x as 1
        console.log(x); // 1
    }
    console.log(x); // undefined, no x in outer or global scope because x is declared in the catch block and passed into it
    console.log(y); // 2, var y got hoisted to outer scope because unlike x it is only declared once in the catch block (x declared as parameter passed in form catch as x, and in the block of catch)
})();

// 1
// undefined
// 2

// var statements are hoisted (without their value initialization) to the top of the global or
// function scope it belongs to, even when it’s inside a with or catch block.
// However, the error’s identifier is only visible inside the catch block. It is equivalent to:

// (function () {
//     var x, y; // outer and hoisted
//     try {
//         throw new Error();
//     } catch (x /* inner */) {
//         x = 1; // inner x, not the outer one
//         y = 2; // there is only one y, which is in the outer scope
//         console.log(x /* inner */);
//     }
//     console.log(x);
//     console.log(y);
// })();

// ------------------------------------------------
