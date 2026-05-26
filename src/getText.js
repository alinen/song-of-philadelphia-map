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