//  24. Write an async function postData() that sends a POST request to a test API.
async function postData(url: string, data: any) {
  try {
    const response = await fetch(url, {
      method: "POST", // Specify the HTTP method as POST
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string for the request body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if the response is not OK
    }

    const result = await response.json(); // Parse the response as JSON
    console.log("Response from POST request:", result); // Log the response from the POST request
  } catch (error) {
    console.error("Error during POST request:", error); // Log any errors that occur during the POST request
  }
}

const testData = { title: "foo", body: "bar", userId: 1 };
postData("https://jsonplaceholder.typicode.com/posts", testData); // Call postData with the test API URL and sample data    \\
