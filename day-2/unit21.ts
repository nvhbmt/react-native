// 21. Use fetch to get data from a public API (e.g., https://jsonplaceholder.typicode.com/todos/1).
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((data) => {
    console.log("Data fetched from API:", data); // Log the fetched data to the console
  })
  .catch((error) => {
    console.error("Error fetching data:", error); // Log any errors that occur during the fetch operation
  });
