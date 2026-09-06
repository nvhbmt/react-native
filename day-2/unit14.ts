// 14. Write an async function that takes a number, waits 1 second, and returns the number × 3.
async function multiplyByThree(num: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num * 3); // resolve with the number multiplied by 3
    }, 1000); // delay of 1 second
  });
}

multiplyByThree(5).then((result) => {
  console.log(`Result: ${result}`);
});
