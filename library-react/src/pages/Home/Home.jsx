import bookCover from '../../assets/moby-dick.png'
import BookCard from '../../components/BookCard/BookCard'
import styles from './Home.module.css'
import { useState, useRef } from 'react'

const books = [
  {
    id: 1,
    title: 'Moby-Dick',
    author: 'Herman Melville',
    year: 1851,
    cover: bookCover
  },
  {
    id: 2,
    title: 'Vingt mille lieues sous les mers',
    author: 'Jules Verne',
    year: 1870,
    cover: bookCover
  },
  {
    id: 3,
    title: 'L’Île au trésor',
    author: 'Robert Louis Stevenson',
    year: 1883,
    cover: bookCover
  },
  {
    id: 4,
    title: 'Le Tour du monde en quatre-vingts jours',
    author: 'Robert Louis Stevenson',
    year: 1883,
    cover: bookCover
  }
]


export default function Home() {
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('javascript')

  const inputRef = useRef(null)

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
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

        <ul className={styles.bookList}>
          {books.map((book) => (
            <BookCard
              key={book.id}
              cover={book.cover}
              title={book.title}
              author={book.author}
              date={book.year}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}
