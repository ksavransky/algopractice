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

// let myFirstPromise = new Promise((resolve, reject) => {
//   // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
//   // In this example, we use setTimeout(...) to simulate async code.
//   // In reality, you will probably be using something like XHR or an HTML5 API.
//   setTimeout(function(){
//     resolve("Success!"); // Yay! Everything went well!
//   }, 2000);
// });
//
// myFirstPromise.then((successMessage) => {
//   // successMessage is whatever we passed in the resolve(...) function above.
//   // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
//   console.log("Yay! " + successMessage);
// });
//
// console.log(myFirstPromise())
