// 28. Write an async function batchProcess() that processes 5 async tasks at once (use Promise.all).
async function simulateAsyncTask(taskId: number): Promise<string> {
  return new Promise((resolve) => {
    const randomDelay = Math.random() * 2000; // Random delay between 0 and 2 seconds
    setTimeout(() => {
      resolve(`Task ${taskId} completed after ${randomDelay} ms`);
    }, randomDelay); // Simulate a random delay for each task
  });
}

async function batchProcess() {
  const tasks = Array.from({ length: 5 }, (_, i) => simulateAsyncTask(i + 1)); // Create an array of 5 async tasks
  const results = await Promise.all(tasks); // Wait for all tasks to complete
  console.log("Batch processing results:", results); // Log the results of the batch processing
}

batchProcess(); // Call the function to start batch processing
