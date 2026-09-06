// 16. Call multiple async functions in parallel using Promise.all().
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

async function runParallelTasks() {
  const results = await Promise.all([
    simulateAsyncTask("A", 1000),
    simulateAsyncTask("B", 2000),
    simulateAsyncTask("C", 1500),
  ]);
  console.log(results); // show after the longest task completed (2 seconds)
}

runParallelTasks();
