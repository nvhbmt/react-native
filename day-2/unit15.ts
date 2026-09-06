// 15. Call multiple async functions sequentially using await.
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function asyncFunction() {
  await delay(1000);
  await delay(1000);
  await delay(1000);
  console.log("show after 3 seconds");
}

asyncFunction();
