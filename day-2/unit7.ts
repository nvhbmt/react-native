// 7. Use Promise.race() to return whichever Promise resolves first.
function simulateTaskWithName(name: string, time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${name} done after ${time} ms`); // resolve with the name of the task and the time it took
    }, time); // delay of time ms
  });
}
const promiseX = simulateTaskWithName("Task X", 3000); // 3 seconds
const promiseY = simulateTaskWithName("Task Y", 2000); // 2 seconds
const promiseZ = simulateTaskWithName("Task Z", 1500); // 1.5 seconds
Promise.race([promiseX, promiseY, promiseZ])
  .then((result) => {
    console.log("First task completed:", result); // show the result of the first task to complete (after 1.5 seconds)
  })
  .catch((error) => {
    console.error("Error in one of the tasks:", error.message); // show the message of the error if any task fails
  });
