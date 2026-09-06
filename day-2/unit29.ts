// 29. Write an async function queueProcess() that processes tasks sequentially in a queue.
async function simulateAsyncTask(taskId: number): Promise<string> {
  return new Promise((resolve) => {
    const randomDelay = Math.random() * 2000; // Random delay between 0 and 2 seconds
    setTimeout(() => {
      resolve(`Task ${taskId} completed after ${randomDelay} ms`);
    }, randomDelay); // Simulate a random delay for each task
  });
}

async function queueProcess() {
  const tasks = Array.from({ length: 5 }, (_, i) => simulateAsyncTask(i + 1)); // Create an array of 5 async tasks

  for await (const result of tasks) {
    console.log(result); // Log the result of each task
  }
}

queueProcess(); // Call the function to start queue processing
