// 9. Write a Promise that reads an array after 1 second and filters even numbers.
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // an array of numbers
const filterEvenNumbers = new Promise<number[]>((resolve) => {
  setTimeout(() => {
    const evenNumbers = array.filter((num) => num % 2 === 0); // filter even numbers
    resolve(evenNumbers); // resolve with the filtered even numbers
  }, 1000); // delay of 1 second
});

filterEvenNumbers.then((evenNumbers) => {
  console.log("Even numbers:", evenNumbers); // show the filtered even numbers after 1 second
});
