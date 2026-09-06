// 17. Use for await...of to iterate over an array of Promises.
async function simulateAsyncTask(
  taskName: string,
  delayTime: number,
): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Task ${taskName} completed after ${delayTime} ms`);
    }, delayTime);
  });
}

async function runSequentialTasks() {
  const promises = [
    simulateAsyncTask("A", 1000),
    simulateAsyncTask("B", 4000),
    simulateAsyncTask("C", 1500),
  ];

  for await (const result of promises) {
    // iterate over the array of Promises using for await...of
    console.log(result);
  }
}

runSequentialTasks();
