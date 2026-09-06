// A. Basics with Promise
// 1. Create a Promise that returns the string "Hello Async" after 2 seconds.
const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Hello Async");
  }, 2000); // delay of 2 seconds
});
promise1.then((message) => {
  console.log(message);
});
// 2. Write a function that returns a Promise resolving with the number 10 after 1 second.
const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(10); // return the number 10
  }, 1000); /// delay of 1 second
});
promise2.then((number) => {
  console.log(number);
});
// 3. Write a function that rejects a Promise with the error "Something went wrong" after 1 second.
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Something went wrong")); // throw error
  }, 1000); // delay of 1 second
});
promise3.catch((error) => {
  console.error(error.message); // show the message of the error
});
// 4. Use .then() and .catch() to handle a Promise that returns a random number.
// A promise that resolves with a random number or rejects with an error when the number is less than 0.5
const promise4 = new Promise((resolve, reject) => {
  const randomNumber = Math.random(); // a random number between 0 and 1
  if (randomNumber > 0.5) {
    resolve(randomNumber); // resolve with the random number
  } else {
    reject(new Error("Random number is too low")); // throw error
  }
});
promise4
  .then((number) => {
    console.log("Random number:", number); // show the random number if resolved
  })
  .catch((error) => {
    console.error(error.message); // show the message of the error
  });
// 5. Create a function simulateTask(time) that returns a Promise resolving with "Task done" after time ms.
function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task done"); // resolve with "Task done"
    }, time); // delay of time ms
  });
}
const time = 1500; // 1.5 seconds
simulateTask(time).then((message) => {
  console.log(`Task done after ${time} ms with message: ${message}`); // show the message after 1.5 seconds
});

// 6. Use Promise.all() to run 3 simulated Promises in parallel and print the result.
const promiseA = simulateTask(1000); // 1 second
const promiseB = simulateTask(2000); // 2 seconds
const promiseC = simulateTask(1500); // 1.5 seconds

Promise.all([promiseA, promiseB, promiseC])
  .then((results) => {
    console.log("All tasks completed:", results); // show the results of all tasks (after 2 seconds, the longest task)
  })
  .catch((error) => {
    console.error("Error in one of the tasks:", error.message); // show the message of the error if any task fails
  });
