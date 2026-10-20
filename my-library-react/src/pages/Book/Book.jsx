import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getBook } from '../../api/books.js'
import styles from './Book.module.css'

export default function Book() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    async function loadBook() {
      setLoading(true)
      setError(null)
      try {
        const result = await getBook(id)
        if (!ignore) setBook(result)
      } catch (err) {
        console.error(err)
        if (!ignore) {
          setError('Impossible de charger ce livre. Vérifiez votre connexion ou réessayez dans un instant.')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadBook()

    return () => {
      ignore = true
    }
  }, [id])

  if (loading) {
    return (
      <main className={styles.page}>
        <p className={styles.status} role="status">Chargement du livre…</p>
      </main>
    )
  }

  if (error || !book) {
    return (
      <main className={styles.page}>
        <div className={styles.status}>
          <p role="alert">{error ?? 'Ce livre est introuvable.'}</p>
          <Link to="/">Retour à la bibliothèque</Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <article className={styles.bookDetail}>
        <div className={styles.bookSidebar}>
          <img
            className={styles.detailCover}
            src={book.cover}
            alt={`Couverture du livre ${book.title}`}
          />
          <div className={styles.bookActions}>
            {book.summary.length > 0 && (
              <a className={styles.bookAction} href="#resume">
                <span className="material-symbols-outlined" aria-hidden="true">
                  menu_book
                </span>
                Lire le résumé
              </a>
            )}
          </div>
        </div>

        <div className={styles.bookInformation}>
          <nav className={styles.breadcrumb} aria-label="Fil d’Ariane">
            <ol>
              <li><Link to="/">Bibliothèque</Link></li>
              <li aria-current="page">{book.title}</li>
            </ol>
          </nav>

          <h1>{book.title}</h1>
          <p className={styles.detailAuthor}>{book.authors.join(', ')}</p>

          <dl className={styles.detailMetadata}>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                calendar_today
              </span><span className={styles.visuallyHidden}>Date de publication</span>
              </dt>
              <dd>
                {book.publishedDate ? (
                  <time dateTime={book.publishedDate}>{book.publishedDate}</time>
                ) : (
                  'Date inconnue'
                )}
              </dd>
            </div>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                translate
              </span><span className={styles.visuallyHidden}>Langue</span>
              </dt>
              <dd>{book.language ?? 'Langue inconnue'}</dd>
            </div>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                auto_stories
              </span><span className={styles.visuallyHidden}>Genre</span>
              </dt>
              <dd>{book.category ?? 'Genre inconnu'}</dd>
            </div>
          </dl>

          <section className={styles.bookSummary} id="resume">
            <h2 className={styles.visuallyHidden}>Présentation du livre</h2>
            {book.summary.length > 0 ? (
              book.summary.map((paragraph, index) => <p key={index}>{paragraph}</p>)
            ) : (
              <p>Aucun résumé disponible pour ce livre.</p>
            )}
          </section>
        </div>
      </article>
    </main>
  )
}
