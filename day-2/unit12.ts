// 12. Write an async function that calls simulateTask(2000) and logs the result.
function simulateTask(time: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Task done"); // resolve with "Task done"
    }, time); // delay of time ms
  });
}
async function runSimulateTask() {
  await simulateTask(2000).then((message) => {
    console.log(`Task done after 2000 ms with message: ${message}`); // show the message after 2 seconds
  });
}

runSimulateTask(); // call the async function to run the simulateTask and log the message after 2 seconds
