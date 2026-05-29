// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function getJson(urlString) {
  const url = "https://example.org/products.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } 
  catch (error) {
    console.error(error.message);
  }
}

async function getText(urlString) {
    return fetch(urlString).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}