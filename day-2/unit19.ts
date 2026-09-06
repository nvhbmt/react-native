// 19. Create an async function fetchUsers(ids: number[]) that calls fetchUser for each ID.
interface User {
  id: number;
  name: string;
}
async function fetchUser(id: number): Promise<User> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: `User ${id}` }); // Simulates fetching user data after 1 second
    }, 1000);
  });
}

async function fetchUsers(ids: number[]): Promise<User[]> {
  const userPromises = ids.map((id) => fetchUser(id)); // Create an array of Promises for each ID
  const users = await Promise.all(userPromises); // Wait for all Promises to resolve
  return users; // Return the array of user objects
}

async function getUsers(ids: number[]) {
  const users = await fetchUsers(ids);
  console.log(users);
}

getUsers([1, 2, 3]); // Simulates fetching users with IDs 1, 2, and 3
