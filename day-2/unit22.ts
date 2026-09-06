// 22. Call the API multiple times and log the results.
const fetchTodo = async (id: number) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
    const data = await response.json();
    console.log(`Todo ${id}:`, data); // Log the fetched todo data to the console
  } catch (error) {
    console.error(`Error fetching todo ${id}:`, error); // Log any errors that occur during the fetch operation
  }
};

async function fetchMultipleTodos() {
  const todoIds = [1, 2, 3, 4, 5]; // Array of todo IDs to fetch
  for (const id of todoIds) {
    await fetchTodo(id); // Fetch each todo one by one
  }
}

fetchMultipleTodos(); // Call the function to fetch multiple todos
