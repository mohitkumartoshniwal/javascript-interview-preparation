async function fetchWitAutoRetry(fetchData, retry) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function attemptFetch() {
      fetchData()
        .then((res) => resolve(res))
        .catch((err) => {
          attempts++;

          if (attempts < retry) {
            console.error(`Attempt ${attempts} failed. Retrying...`);
            attemptFetch(); // Retry the fetch
          } else {
            reject(err);
          }
        });
    }

    attemptFetch();
  });
}

function fetchApi(successRate = 0.4) {
  return new Promise((resolve, reject) => {
    // Generate a random number between 0 and 1
    const random = Math.random();

    // Determine whether to resolve or reject based on the successRate
    if (random < successRate) {
      resolve("Success!");
    } else {
      reject(new Error("Failure!"));
    }
  });
}

fetchWitAutoRetry(fetchApi, 3).then(console.log).catch(console.error);
