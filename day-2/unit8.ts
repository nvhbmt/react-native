// 8. Create a Promise chain: square the number 2, then double it, then add 5.
function square(num: number): Promise<number> {
  return new Promise((resolve) => {
    resolve(num * num); // square the number
  });
}
function double(num: number): Promise<number> {
  return new Promise((resolve) => {
    resolve(num * 2); // double the number
  });
}
function addFive(num: number): Promise<number> {
  return new Promise((resolve) => {
    resolve(num + 5); // add 5 to the number
  });
}

square(2)
  .then((result) => {
    console.log("Squared:", result); // show the squared result
    return double(result); // return the doubled result
  })
  .then((result) => {
    console.log("Doubled:", result); // show the doubled result
    return addFive(result); // return the result after adding 5
  })
  .then((result) => {
    console.log("Added Five:", result); // show the final result
  })
  .catch((error) => {
    console.error("Error in Promise chain:", error.message); // show the message of the error if any step fails
  });
