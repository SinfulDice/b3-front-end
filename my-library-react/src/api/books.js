import fallbackCover from '../assets/moby-dick.png'

const API_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

// Transforme un résultat de Google Books au format utilisé par BookCard.
function toBook({ id, volumeInfo }) {
  return {
    id,
    title: volumeInfo.title ?? 'Titre inconnu',
    authors: volumeInfo.authors ?? ['Auteur inconnu'],
    publishedDate: volumeInfo.publishedDate ?? null,
    // Google renvoie parfois des liens en http : on force le https.
    cover: volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') ?? fallbackCover,
  }
}

export async function searchBooks(query) {
  const params = new URLSearchParams({
    q: query,
    key: API_KEY,
    maxResults: '12',
  })

  const response = await fetch(`${API_URL}?${params}`)
  if (!response.ok) {
    throw new Error(`La recherche a échoué (erreur ${response.status})`)
  }

  const data = await response.json()
  return (data.items ?? []).map(toBook)
}
