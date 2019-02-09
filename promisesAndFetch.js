let momsPromise = new Promise((resolve, reject) => {
  // change momsSavings to 50000 to see the catch statement execute
  let momsSavings = 70000;
  let priceOfPhone = 60000;
  // imagine that instead of momsSavings > priceOfPhone -- > we have a api call here;
  // if the call results in a 200 result, we go call the the resolve;
  // if the call results in a 400 or 500, we go call the reject
  if (momsSavings > priceOfPhone) {
    resolve({
      brand: "iphone",
      model: "6s"
    });
  } else {
    reject("We do not have enough savings. Let us save some more money.");
  }
});

momsPromise.then((value) => {
  console.log("Moms Promise: Hurray I got this phone as a gift ", JSON.stringify(value));
}).catch((reason) => {
  console.log("Moms Promise: Mom coudn't buy me the phone because ", reason);
});

// .finally doesn't work in node
// momsPromise.finally(() => {
//   console.log(
//     "Irrespecitve of whether my mom can buy me a phone or not, I still love her"
//   );
// });


let myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code.
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout(function(){
    resolve("Success!"); // Yay! Everything went well!
  }, 2000);
});

// myFirstPromise.then((successMessage) => {
//   // successMessage is whatever we passed in the resolve(...) function above.
//   // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
//   console.log("Finally: " + successMessage);
// });
// Finally: Success!    ... after 2000ms


const konRandomDelayedPromise = new Promise((resolve, reject) => {
  const randomSecondsCallDelay = parseInt((Math.random() * 5), 10)
  setTimeout(() => {
    const randomNumber = parseInt((Math.random() * 10), 10)
    if (randomNumber < 5) {
      resolve('status 200 yo')
    } else {
      reject('status 400 something yo')
    }
  }, randomSecondsCallDelay * 1000)
})

// wrap promise execution (i.e. then catch calls in a function, so it is executed when you want)
function callKonRandomDelayedPromise() {
  konRandomDelayedPromise.then((value) => {
    console.log('Your promise resolved successfully: ' + value)
  }).catch((error) => {
    console.log('Your promise failed: ' + error)
  })
}

callKonRandomDelayedPromise()
// output after random second delay:
// Your promise resolved successfully: status 200 yo
// or:
// Your promise failed: status 400 something you

// -------------------------------------
// Another pattern of calling promises -- returning the promise inside a function!!!

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => console.log('runs after 3 seconds'));

// function buyCoffee() {
//   return new Promise((resolve, reject) => {
//     asyncronouslyGetCoffee((coffee) => {    // asyncronouslyGetCoffee - think of this like setTimeout
//       resolve(coffee);
//     });
//   });
// }

// Promises have some other very interesting properties, which allow them to be chained.
// Lets say we have other functions that return a Promise. We could do this:
// buyCoffee()
//   .then(() => {
//     return drinkCoffee();
//   })
//   .then(() => {
//     return doWork();
//   })



// -------------------------------------
// Example with xhr call
// E.g.
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}
// myAsyncFunction(url).then((value) => console.log(value)).catch((error) => console.log(error))


// -------------------------------------
// https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1

// Every promise has a STATUS and VALUE

// STATE: pending, resolved, or rejected
// VALUE: resolve or reject value or undefined (while pending)

// let keepsHisWord = true;
// let promise1 = new Promise(function(resolve, reject) {
//   if (keepsHisWord) {
//     resolve("The man likes to keep his word");
//   } else {
//     reject("The man doesnt want to keep his word");
//   }
// });
// console.log(promise1);
// Promise {
//   <resolved>: "The man likes to keep his word"}
//   __proto__: Promise[[PromiseStatus]]: "resolved"
//             [[PromiseValue]]: "The man likes to keep his word"
// }

// let promise2 = new Promise(function(resolve, reject) {
//   setTimeout(function() {
//     resolve(console.log('finally resolved jeez'));
//   }, 5 * 1000);
// });
// NOTE NOTE NOTE: We don't call the promise2 with promise2() -- but it still runs!!!!!!
// console.log(promise2); // Promise { <pending> }
// 5 seconds later console logs 'finally resolved jeez'


// let keepsHisWord2 = false;
// let promise3 = new Promise(function(resolve, reject) {
//   if (keepsHisWord2) {
//     resolve("The man likes to keep his word");
//   } else {
//     reject("The man doesn't want to keep his word");
//   }
// });
// console.log(promise3);
// Promise { <rejected> 'The man doesn\'t want to keep his word' }


//
// Promise.prototype.catch(onRejected)
//
// Promise.prototype.then(onFulfilled, onRejected)
//
// Promise.prototype.finally(onFinally)

// .finally is declared for a promise then it will be executed whenever a promise is settled
// irrespective of whether it is fulfilled or rejected

// -------------------------------------

// https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1

// There are four static methods in Promise object.
//
// The first two are helpers methods or shortcuts. They help you create resolved or rejected promises easily.

// 1. Promise.reject(reason)

// var promiseRejected = Promise.reject("Not interested");
// promiseRejected.then(function(value){
//   console.log("This will not run as it is a resolved promise. The resolved value is ", value);
// });
// promiseRejected.catch(function(reason){
//   console.log("This run as it is a rejected promise. The reason is ", reason);
// });
// NOTE: doesn't work in Node; works in browser
//This run as it is a rejected promise. The reason is  Not interested

// 2. Promise.resolve(value)

// var promiseResolved = Promise.resolve(1);
// promiseResolved.then(function(value){
//   console.log("This will run as it is a resovled promise. The resolved value is ", value);
// });
// promiseResolved.catch(function(reason){
//   console.log("This will not run as it is a resolved promise", reason);
// });
// This will run as it is a resovled promise. The resolved value is  1

// On a sidenote a promise can have multiple handlers. So you can update the above code to:
// var promise4 = Promise.resolve(1);
// promise4.then(function(value){
//   console.log("This will run as it is a resovled promise. The resolved value is ", value);
// });
// promise4.then(function(value){
//   console.log("This will also run as multiple handlers can be added. Printing twice the resolved value which is ", value * 2);
// });
// promise4.catch(function(reason){
//   console.log("This will not run as it is a resolved promise", reason);
// });
// This will run as it is a resovled promise. The resolved value is  1
// This will also run as multiple handlers can be added. Printing twice the resolved value which is  2

// 3. Promise.All

// The Promise.all(iterable) method returns a single Promise that resolves when all of
// the promises in the iterable argument have resolved or when the iterable argument contains no promises.
//  It rejects with the reason of the first promise that rejects.

const konRandomDelayedPromise1Resolve = new Promise((resolve, reject) => {
  const randomSecondsCallDelay = parseInt((Math.random() * 5), 10)
  setTimeout(() => {
    resolve('konRandomDelayedPromise1Resolve: status 200 yo')
  }, randomSecondsCallDelay * 1000)
})

const konRandomDelayedPromise2Resolve = new Promise((resolve, reject) => {
  const randomSecondsCallDelay = parseInt((Math.random() * 5), 10)
  setTimeout(() => {
    resolve('konRandomDelayedPromise2Resolve: status 200 yo')
  }, randomSecondsCallDelay * 1000)
})

const konRandomDelayedPromise3Resolve = new Promise((resolve, reject) => {
  const randomSecondsCallDelay = parseInt((Math.random() * 5), 10)
  setTimeout(() => {
    resolve('konRandomDelayedPromise3Resolve: status 200 yo')
  }, randomSecondsCallDelay * 1000)
})

// const konRandomDelayedPromise4Reject = new Promise((resolve, reject) => {
//   const randomSecondsCallDelay = parseInt((Math.random() * 5), 10)
//   setTimeout(() => {
//     reject('konRandomDelayedPromise4Reject: status 400 something yo')
//   }, randomSecondsCallDelay * 1000)
// })

function callAllPromises(){
  const promisesArray = [];
  promisesArray.push(konRandomDelayedPromise1Resolve)
  promisesArray.push(konRandomDelayedPromise2Resolve)
  promisesArray.push(konRandomDelayedPromise3Resolve)
  // promisesArray.push(konRandomDelayedPromise4Reject)

  const handleAllPromises = Promise.all(promisesArray);

  handleAllPromises.then(function(values) {
    console.log("Promise.All");
    console.log("All the promises are resolved", values);
  });
  handleAllPromises.catch(function(reason) {
    console.log("One of the promises failed with the following reason", reason);
  });
}

callAllPromises()
//output
// All the promises are resolved [ 'konRandomDelayedPromise1Resolve: status 200 yo',
//   'konRandomDelayedPromise2Resolve: status 200 yo',
//   'konRandomDelayedPromise3Resolve: status 200 yo' ]

// NOTE: callAllPromises can be used to make multiple API calls and only resolve once all responses come in.
// in other words this is like a parallelize function


// 4. Promise.race

// The Promise.race(iterable) method returns a promise that resolves or rejects as soon as one of
// the promises in the iterable resolves or rejects, with the value or reason from that promise.

// In other words, similar to Promise.all except for instead of waiting for all to promises to resolve or reject,
// it will return right away once one does

// -------------------------------------
// FETCH API
// https://flaviocopes.com/fetch-api/
// https://flaviocopes.com/javascript-promises/

// WHICH JS API USE PROMISES?
// In addition to your own code and library code, promises are used by standard modern Web APIs such as:
//
// the Battery API
// the Fetch API
// Service Workers

// Async API calls from browser

// History:
// Since IE5 was released in 1998, we’ve had the option to make asynchronous network calls in the browser using XMLHttpRequest (XHR).
//
// Quite a few years after this, GMail and other rich apps made heavy use of it, and made the approach so popular that it had to have a name: AJAX.
//
// Working directly with the XMLHttpRequest has always been a pain and it was almost always abstracted by some library, in particular jQuery has its own helper functions built around it:
//
// jQuery.ajax()
// jQuery.get()
// jQuery.post()
// and so on.
//
// They had a huge impact on making this more accessible in particular with regards to making sure all worked on older browsers as well.


// Now:
// The Fetch API, has been standardized as a modern approach to asynchronous network requests,
// and uses Promises as a building block.

// Fetch has a good support across the major browsers, except IE.
// But The polyfill https://github.com/github/fetch released by GitHub allows us to use fetch on any browser.


// Fetch - how to use it:

// Starting to use Fetch for GET requests is very simple:

// fetch('./file.json')
//   .then(data => console.log(data))

// Note: you can chain 'then' -- the above, when fetch is successfully resolved, will call 'then',
// and console log the response data,
// as you can see 'fetch' is a promise under the hood, which is why we are using '.then'

// Calling fetch() returns a promise.
// We can then wait for the promise to resolve by passing a handler with the then() method of the promise.
// That handler receives the return value of the fetch promise, a Response object.


// Can also add '.catch' to fetch
// fetch('./file.json')
// .then(response => {
//   //...
// })
// .catch(err => console.error(err))

// --------------------------------------

// Chaining promises and then response with Fetch API:

// A fetch call response has a body, accessible using the text() or json() methods, which return a promise.

// So you can do this:

// fetch('./file.json')
//   .then(response => response.json()) // returns a promise, that's why there is another then after
//   .then(body => console.log(body))

// the above means, 1. make a get call (returns get call promise), once the get call resolves,
// call response.json() (note: .json() is a built in fetch api method), once response.json promise resolve (i.e. converts data to json),
// call the second then and console.log the body (which is now json)

// The same can be written using the ES2017 async functions (Kon: looks like 'await' has replaced 'then'):

// (async () => {
//   const response = await fetch('./file.json')
//   const data = await response.json()
//   console.log(data)
// })()

// ----------------------------------
// Example of Post request with Fetch API:

// const url = 'https://randomuser.me/api';
// // The data we are going to send in our request
// let data = {
//     name: 'Sara'
// }
// // The parameters we are gonna pass to the fetch function
// let fetchData = {
//     method: 'POST',
//     body: data,
//     headers: new Headers()
// }
// fetch(url, fetchData)
// .then(function() {
//     // Handle response you get from the server
// });


// ----------------------------------
// Async/Await
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved resolveAfter2Seconds!!!');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling resolveAfter2Seconds');
  var result = await resolveAfter2Seconds();
  console.log(result); // expected output: 'resolved'
}

asyncCall();

// Same as old way without async/await:

// function resolveAfter2SecondsOLDSCHOOL() {
//   console.log('calling resolveAfter2SecondsOLDSCHOOL promise');
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('resolved resolveAfter2SecondsOLDSCHOOL!!!');
//     }, 2000);
//   });
// }
//
// resolveAfter2SecondsOLDSCHOOL().then((value) => console.log(value))



// https://medium.com/@rafaelvidaurre/truly-understanding-async-await-491dd580500e

// Some random async functions that deal with value
// async function thingOne() { ... }
// async function thingTwo(value) { ... }
// async function thingThree(value) { ... }
//
// async function doManyThings() {
//   var result = await thingOne();
//   var resultTwo = await thingTwo(result);
//   var finalResult = await thingThree(resultTwo);
//
//   return finalResult;
// }

// Call doManyThings()

// This is how code with async/await looks like, it very close to synchronous code, and synchronous code is much easier to understand.
//
// So, since doManyThings() is an Asynchronous Function too, how do we await it?
// We can’t. Not with our new syntax. We have three options:
//
//     1. Let the rest of our code execute and not wait for it to finish, which we might even want in many cases.
//     2. Call it inside another Async Function wrapped with a try/catch block.
//     or ...
//     3. Use it as a Promise.

// Option 1:
// doManyThings();
//
// // Option 2:
// (async function() {
//   try {
//     await doManyThings();
//   } catch (err) {
//     console.error(err);
//   }
// })();
//
// // Option 3:
// doManyThings().then((result) => {
//
//   // Do the things that need to wait for our function
//
// }).catch((err) => {
//   throw err;
// });


// Async/Await version
// async function helloAsync() {
//   return "hello";
// }
//
// // Promises version
// function helloAsync() {
//   return new Promise(function (resolve) {
//     resolve("hello");
//   });
// }

// ---------


class MyPromise{
  constructor(asyncFn) {
    this.asyncFn = asyncFn
    this.successHandler = null
    this.errHandler = null
    this.resolve = () => typeof this.successHandler === 'function' ? this.successHandler() : null
    this.reject = () => typeof this.successHandler === 'function' ? this.errHandler() : null
    this.asyncFn(this.resolve, this.reject)
  }

  then(successHandler, errHandler) {
    this.successHandler = successHandler;
    this.errHandler = errHandler;
    return new MyPromise(this.asyncFn)
  }
}

(new MyPromise(
  // note this below is an async function because of the setTimeout
  (resolve, reject) => {
    setTimeout(()=> resolve(),1000)
  })
).then(
  (msg) => console.log("MyPromise Success"),
  (err) => console.log("MyPromise Errror")
).then(
  (msg) => console.log("MyPromise Success2"),
  (err) => console.log("MyPromise Errror2"));
