// 20. Add a timeout: if the API call takes more than 2 seconds, throw an error.

// Fake API call that simulates fetching user data take 3 seconds to respond.
const fakeApiCall = (id: number): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` }); // Simulates fetching user data after 3 seconds
    }, 3000); // Set a timeout of 3 seconds
  });
};

async function fetchUserWithTimeout(id: number): Promise<User> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request for user ${id} timed out`)); // Reject if it takes more than 2 seconds
    }, 2000);
  });

  return Promise.race([fakeApiCall(id), timeout]); // Race between the API call and the timeout, the first one to resolve or reject will be returned
}

fetchUserWithTimeout(1);
