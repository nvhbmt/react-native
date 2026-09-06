// 10. Use .finally() to log "Done" when a Promise finishes (success or failure).
const successPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Success!"); // resolve with "Success!"
  }, 1000);
});
const failurePromise = new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error("Failure!")); // reject with "Failure!"
  }, 1000);
});

successPromise
  .then((message) => {
    console.log(message); // show the success message
  })
  .catch((error) => {
    console.error(error.message); // show the error message if any
  })
  .finally(() => {
    console.log("Done with successPromise"); // log "Done" when the Promise finishes
  });

failurePromise
  .then((message) => {
    console.log(message); // show the success message
  })
  .catch((error) => {
    console.error(error.message); // show the error message if any
  })
  .finally(() => {
    console.log("Done with failurePromise"); // log "Done" when the Promise finishes
  });
