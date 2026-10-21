import BookCard from '../../components/BookCard/BookCard'
import styles from './Home.module.css'
import { useState, useRef } from 'react'
import useBooks from '../../hooks/useBooks'

const DEFAULT_QUERY = 'javascript'

export default function Home() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState(DEFAULT_QUERY)

  const inputRef = useRef(null)

  const { books, loading, error } = useBooks(query)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    if (search.trim() === '') {
      setQuery(DEFAULT_QUERY)
      return
    }

    setQuery(search)
  }

  const handleSearchClear = () => {
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

      <form action="index.html" method="get" onSubmit={handleSearchSubmit}>
        <div className={styles.searchField}>
          <input
            type="search"
            name="q"
            id="book-name"
            aria-label="Rechercher un livre"
            placeholder="Rechercher un titre, un auteur..."
            value={search}
            onChange={handleSearchChange}
            ref={inputRef}
          />
          <button type="submit" aria-label="Rechercher">
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </button>
          <button type="button" aria-label="Effacer la recherche" onClick={handleSearchClear}>
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>
      </form>

      <p>Recherche : {query}</p>

      <section className={styles.catalogue}>
        <h2>Les livres de la bibliothèque</h2>

        {loading && <div className={styles.loading} />}
        {error && <p className={styles.error}>{error}</p>}

        <ul className={styles.bookList}>
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              cover={book.volumeInfo.imageLinks?.thumbnail || './assets/moby-dick.png'}
              title={book.volumeInfo.title}
              author={book.volumeInfo.authors?.join(', ') || ''}
              date={book.volumeInfo.publishedDate || ''}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
