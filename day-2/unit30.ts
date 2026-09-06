// 30. Use async/await + Promise.allSettled() to handle multiple API calls and display their success/failure status.
async function simulateAsyncTask(taskId: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const randomDelay = Math.random() * 2000; // Random delay between 0 and 2 seconds
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve(
          `Task ${taskId} completed successfully after ${randomDelay} ms`,
        );
      } else {
        reject(new Error(`Task ${taskId} failed after ${randomDelay} ms`));
      }
    }, randomDelay); // Simulate a random delay for each task
  });
}

async function queueProcess() {
  const tasks = Array.from({ length: 5 }, (_, i) => simulateAsyncTask(i + 1)); // Create an array of 5 async tasks

  const results = await Promise.allSettled(tasks); // Wait for all tasks to settle (either fulfilled or rejected)

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      // Check if the task was fulfilled
      console.log(`Task ${index + 1} succeeded: ${result.value}`);
    } else {
      console.error(`Task ${index + 1} failed: ${result.reason}`);
    }
  });
}

queueProcess(); // Call the function to start queue processing
