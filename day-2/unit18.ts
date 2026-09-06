// 18. Write an async function fetchUser(id) that simulates an API call (resolves a user object after 1 second).
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

async function getUser(id: number) {
  const user = await fetchUser(id);
  console.log(user);
}

getUser(1); // Simulates fetching user with id 1
