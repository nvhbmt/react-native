// 13. Handle errors using try/catch with async/await.

const errorProneTask = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    reject(new Error("This task failed")); // reject with an error
  });
};

const successfulTask = async (): Promise<string> => {
  return new Promise((resolve) => {
    resolve("This task succeeded"); // resolve with a success message
  });
};

async function runTask(task: () => Promise<string>) {
  try {
    const result = await task(); // await the result of the task
    console.log(result); // log the result if successful
  } catch (error) {
    if (error instanceof Error) {
      console.error("[Error]:", error.message); // log the error message if an error occurs
    }
  }
}
runTask(errorProneTask); // call runTask with the error-prone task
runTask(successfulTask); // call runTask with the successful task
