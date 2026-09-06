// 23. Write an async function that fetches a list of todos and filters out those that are not completed.
const fetchTodo = async (id: number) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
    );
    const data = await response.json();
    return data; // Return the fetched todo data
  } catch (error) {
    console.error(`Error fetching todo ${id}:`, error); // Log any errors that occur during the fetch operation
  }
};

const fetchTodos = async () => {
  const todoIds = Array.from({ length: 10 }, (_, i) => i + 1); // Create an array of todo IDs from 1 to 10
  const fetchTodos = todoIds.map((todoId) => fetchTodo(todoId)); // Map each todo ID to a fetchTodo promise
  const todos = await Promise.all(fetchTodos); // Wait for all fetchTodo promises to resolve
  const completedTodos = todos.filter((todo) => todo && todo.completed); // Filter out todos that are not completed
  console.log("Completed Todos:", completedTodos); // Log the completed todos to the console
};

fetchTodos(); // Call the function to fetch and filter todos
