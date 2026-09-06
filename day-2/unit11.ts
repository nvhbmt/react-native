// 11. Convert Exercise 1 into async/await.

// Code from Exercise 1
// const promise1 = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("Hello Async");
//   }, 2000); // delay of 2 seconds
// });
// promise1.then((message) => {
//   console.log(message);
// });

// Convert the above code into async/await, return a async function that returns a Promise resolving with "Hello Async" after 2 seconds.
const promise11 = async (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Hello Async");
    }, 2000); // delay of 2 seconds
  });
};

async function runPromise11() {
  // async function to run the promise
  const message = await promise11();
  console.log(message);
}

runPromise11(); // call the async function to run the promise and log the message after 2 seconds
