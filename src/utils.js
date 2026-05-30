// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function getJson(urlString) {
  try {
    const response = await fetch(urlString);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } 
  catch (error) {
    console.error(error.message);
  }
  return {};
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