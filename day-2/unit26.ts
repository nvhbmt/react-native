// 26. Use async/await with setTimeout to simulate a 5-second wait.
async function simulateWait() {
  console.log("Waiting for 5 seconds...");
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
  console.log("5 seconds have passed.");
}

simulateWait(); // Call the function to simulate the wait
