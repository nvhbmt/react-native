// 27. Write a function fetchWithRetry(url, retries) that retries up to retries times if the API call fails.
async function fakeFailedFetch(url: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
  throw new Error("Simulated fetch failure");
}

async function fetchWithRetry(url: string, retries: number) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    // Loop through the number of retry attempts
    try {
      const response = await fakeFailedFetch(url);
      console.log(`Fetch successful on attempt ${attempt}`);
      return response; // Return the response if successful
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        console.error("All retry attempts failed.");
        throw error; // Rethrow the error after all retries have failed
      }
    }
  }
}

fetchWithRetry("https://jsonplaceholder.typicode.com/posts", 3);
