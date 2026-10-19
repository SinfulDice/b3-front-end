const button = document.getElementById('myButton');

console.log(button)

function handleClick() {
    fetchData();
}

button.addEventListener('click', handleClick);

const API_KEY = 'AIzaSyAAU-Fg7X8gopwftnbTfpLvCPxjQIgHzk0';

async function fetchData() {
    const url = new URL('https://www.googleapis.com/books/v1/volumes');
    url.searchParams.set('q', 'javascript');
    url.searchParams.set('key', API_KEY);

    const response = await fetch(url);

    const data = await response.json();
    console.log(data);
}
