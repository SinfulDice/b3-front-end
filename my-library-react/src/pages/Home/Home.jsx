import { useEffect, useRef, useState } from 'react'
import { searchBooks } from '../../api/books.js'
import BookCard from '../../components/BookCard/BookCard.jsx'
import styles from './Home.module.css'

const DEFAULT_QUERY = 'jules verne'

export default function Home() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    let ignore = false

    async function loadBooks() {
      setLoading(true)
      setError(null)
      try {
        const results = await searchBooks(query)
        if (!ignore) setBooks(results)
      } catch (err) {
        console.error(err)
        if (!ignore) {
          setError('Impossible de charger les livres. Vérifiez votre connexion ou réessayez dans un instant.')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadBooks()

    return () => {
      ignore = true
    }
  }, [query])

  function handleSubmit(event) {
    event.preventDefault()
    setQuery(search.trim() || DEFAULT_QUERY)
  }

  function handleClear() {
    setSearch('')
    inputRef.current.focus()
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Bibliothèque</h1>
      <p className={styles.description}>
        Bienvenue dans notre bibliothèque. Découvrez notre{' '}
        <strong>sélection de romans d’aventure</strong> et consultez la fiche
        d’un livre pour en savoir plus. Cette sélection vous invite à explorer
        des récits d’aventure et des univers imaginaires.{' '}
        <em>Quel sera votre prochain voyage ?</em>
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.searchField}>
          <input
            type="search"
            name="q"
            id="book-name"
            aria-label="Rechercher un livre"
            placeholder="Rechercher un titre, un auteur..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            ref={inputRef}
          />
          <button type="submit" aria-label="Rechercher">
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </button>
          <button
            type="button"
            className={styles.clearButton}
            aria-label="Effacer"
            onClick={handleClear}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>
      </form>

      <p className={styles.currentQuery}>
        Recherche : <strong>{query}</strong>
      </p>

      <section className={styles.catalogue}>
        <h2>Les livres de la bibliothèque</h2>

        {loading ? (
          <p className={styles.message} role="status">Chargement des livres…</p>
        ) : error ? (
          <p className={styles.error} role="alert">{error}</p>
        ) : books.length === 0 ? (
          <p className={styles.message} role="status">Aucun résultat</p>
        ) : (
          <>
            <p className={styles.message}>
              {books.length} {books.length > 1 ? 'livres' : 'livre'}
            </p>
            <ul className={styles.bookList}>
              {books.map((book) => (
                <li key={book.id}>
                  <BookCard
                    title={book.title}
                    authors={book.authors}
                    publishedDate={book.publishedDate}
                    cover={book.cover}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  )
}
