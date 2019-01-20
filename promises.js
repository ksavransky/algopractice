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
  console.log("Hurray I got this phone as a gift ", JSON.stringify(value));
}).catch((reason) => {
  console.log("Mom coudn't buy me the phone because ", reason);
});

// .finally doesn't work in node
// momsPromise.finally(() => {
//   console.log(
//     "Irrespecitve of whether my mom can buy me a phone or not, I still love her"
//   );
// });


// E.g.
// function myAsyncFunction(url) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url);
//     xhr.onload = () => resolve(xhr.responseText);
//     xhr.onerror = () => reject(xhr.statusText);
//     xhr.send();
//   });
// }

let myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
  // In this example, we use setTimeout(...) to simulate async code.
  // In reality, you will probably be using something like XHR or an HTML5 API.
  setTimeout(function(){
    resolve("Success!"); // Yay! Everything went well!
  }, 2000);
});

myFirstPromise.then((successMessage) => {
  // successMessage is whatever we passed in the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log("Finally: " + successMessage);
});

console.log(myFirstPromise)


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
