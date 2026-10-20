import fallbackCover from '../assets/moby-dick.png'

const API_URL = 'https://www.googleapis.com/books/v1/volumes'
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY

const languageNames = new Intl.DisplayNames(['fr'], { type: 'language' })

// Google renvoie parfois des liens en http : on force le https.
function toHttps(url) {
  return url?.replace('http://', 'https://')
}

// Transforme un résultat de Google Books au format utilisé par BookCard.
function toBook({ id, volumeInfo }) {
  return {
    id,
    title: volumeInfo.title ?? 'Titre inconnu',
    authors: volumeInfo.authors ?? ['Auteur inconnu'],
    publishedDate: volumeInfo.publishedDate ?? null,
    cover: toHttps(volumeInfo.imageLinks?.thumbnail) ?? fallbackCover,
  }
}

// Le code de langue ("en") devient un nom lisible ("Anglais").
function toLanguageName(code) {
  if (!code) return null
  try {
    const name = languageNames.of(code)
    return name.charAt(0).toUpperCase() + name.slice(1)
  } catch {
    return code
  }
}

// Le résumé de Google contient du HTML (<p>, <br>, <b>…). On n'en garde que
// le texte, découpé en paragraphes, pour ne pas injecter de HTML dans la page.
function toParagraphs(html) {
  if (!html) return []
  const withLineBreaks = html.replace(/<br\s*\/?>|<\/p>/gi, '\n')
  const text = new DOMParser().parseFromString(withLineBreaks, 'text/html').body.textContent
  return text.split('\n').map((line) => line.trim()).filter(Boolean)
}

// Ajoute à toBook les informations affichées sur la fiche.
function toBookDetails(item) {
  const { volumeInfo } = item
  const images = volumeInfo.imageLinks ?? {}
  return {
    ...toBook(item),
    cover: toHttps(images.medium ?? images.small ?? images.thumbnail) ?? fallbackCover,
    language: toLanguageName(volumeInfo.language),
    category: volumeInfo.categories?.[0] ?? null,
    summary: toParagraphs(volumeInfo.description),
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

// Renvoie null si aucun livre ne correspond à cet identifiant.
export async function getBook(id) {
  const params = new URLSearchParams({ key: API_KEY })

  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}?${params}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error(`Le chargement du livre a échoué (erreur ${response.status})`)
  }

  const data = await response.json()
  return toBookDetails(data)
}
