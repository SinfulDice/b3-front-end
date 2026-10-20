// Étapes 5 et 6 : l'API Google Books et la clé fournie dans l'exercice
const API_URL = 'https://www.googleapis.com/books/v1/volumes';
const API_KEY = 'AIzaSyAAU-Fg7X8gopwftnbTfpLvCPxjQIgHzk0';
const PAGE_SIZE = 10;

// Erreur 503 : nombre total de tentatives et attente de base entre deux essais
const MAX_ATTEMPTS = 4;
const RETRY_DELAY = 1000;

const button = document.getElementById('load-more');
const bookList = document.getElementById('book-list');
const message = document.getElementById('message');
const loader = document.getElementById('loader');
const loaderText = document.getElementById('loader-text');

// Étape 9 : position du prochain livre à demander (pagination)
let startIndex = 0;

// Attend "ms" millisecondes (à utiliser avec await)
function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Affiche la roue de chargement avec un texte, ou la cache
function showLoader(text) {
    loaderText.textContent = text;
    loader.hidden = false;
}

function hideLoader() {
    loader.hidden = true;
}

// Demande une page de livres à l'API et renvoie la réponse en objet JavaScript.
// Si Google répond 503 (serveur surchargé), on réessaie un peu plus tard.
async function fetchBooks() {
    const url = new URL(API_URL);
    url.searchParams.set('q', 'javascript');
    url.searchParams.set('startIndex', startIndex);
    url.searchParams.set('maxResults', PAGE_SIZE);
    url.searchParams.set('key', API_KEY);

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        const response = await fetch(url);

        if (response.ok) {
            return response.json();
        }

        // Autre erreur que 503, ou plus aucun essai : on abandonne
        if (response.status !== 503 || attempt === MAX_ATTEMPTS) {
            throw new Error(`Erreur ${response.status}`);
        }

        showLoader(`Serveur surchargé, nouvel essai (${attempt + 1}/${MAX_ATTEMPTS})…`);
        await wait(RETRY_DELAY * attempt);
    }
}

// Étape 8 : ajoute un <li> par livre à la fin de la liste
function displayBooks(books) {
    for (const book of books) {
        const info = book.volumeInfo;
        const item = document.createElement('li');

        if (info.authors) {
            item.textContent = `${info.title} — ${info.authors.join(', ')}`;
        } else {
            item.textContent = info.title;
        }

        bookList.append(item);
    }
}

// Charge la page suivante, l'affiche et prépare la suivante
async function loadNextBooks() {
    button.disabled = true;
    message.textContent = '';
    showLoader('Chargement…');

    try {
        const data = await fetchBooks();
        console.log(data);

        // L'API n'envoie pas de "items" quand il n'y a plus de résultats
        const books = data.items ?? [];

        if (books.length === 0) {
            message.textContent = 'Il n’y a plus de livres à charger.';
            return;
        }

        displayBooks(books);
        startIndex += PAGE_SIZE;
        button.disabled = false;
    } catch (error) {
        console.error(error);
        message.textContent = 'Impossible de charger les livres. Réessayez.';
        button.disabled = false;
    } finally {
        hideLoader();
    }
}

// Étape 7 : premiers livres chargés dès le chargement du script
loadNextBooks();

// Étape 9 : chaque clic ajoute les livres suivants
button.addEventListener('click', loadNextBooks);
