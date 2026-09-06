// 25. Create a function downloadFile that simulates downloading a file in 3 seconds and logs when done.
async function downloadFile(fileName: string): Promise<void> {
  return new Promise((resolve) => {
    console.log(`Starting download of ${fileName}...`);
    setTimeout(() => {
      console.log(`Download of ${fileName} completed.`);
      resolve();
    }, 3000); // Simulate a 3-second download time
  });
}

downloadFile("example.txt").then(() => {
  console.log("File download simulation finished.");
});
