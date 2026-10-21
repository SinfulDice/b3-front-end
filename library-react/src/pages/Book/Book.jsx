import bookCover from '../../assets/moby-dick.png'
import styles from './Book.module.css'
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { fetchBookById } from '../../api/books';
import { useFavoritesContext } from '../../contexts/FavoritesContext';

export default function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const { addFavorite, removeFavorite } = useFavoritesContext();

  useEffect(() => {
    async function fetchBook() {
      try {
        const book = await fetchBookById(id);
        setBook(book);
        console.log('Fetched book:', book);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    }

    fetchBook();
  }, [id]);

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <main className={styles.page}>
      <article className={styles.bookDetail}>
        <div className={styles.bookSidebar}>
          <img
            className={styles.detailCover}
            src={bookCover}
            alt="Couverture du roman Moby-Dick"
            width="667"
            height="1000"
          />
          <div className={styles.bookActions}>
            <button
              className={[styles.bookAction, styles.primary].join(' ')}
              onClick={() => addFavorite(book)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                add_circle
              </span>
              Ajouter au favoris
            </button>
            <button className={styles.bookAction} onClick={() => removeFavorite(book.id)}>
              <span className="material-symbols-outlined" aria-hidden="true">
                menu_book
              </span>
              Supprimer des favoris
            </button>
          </div>
        </div>

        <div className={styles.bookInformation}>
          <nav className={styles.breadcrumb} aria-label="Fil d’Ariane">
            <ol>
              <li><a href="index.html">Bibliothèque</a></li>
              <li aria-current="page">{book.volumeInfo.title}</li>
            </ol>
          </nav>

          <h1>{book.volumeInfo.title}</h1>
          <p className={styles.detailAuthor}>{book.volumeInfo.authors?.join(', ')}</p>

          <dl className={styles.detailMetadata}>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                calendar_today
              </span><span className={styles.visuallyHidden}>Première publication</span>
              </dt>
              <dd><time dateTime={book.volumeInfo.publishedDate}>{book.volumeInfo.publishedDate}</time></dd>
            </div>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                translate
              </span><span className={styles.visuallyHidden}>Langue originale</span>
              </dt>
              <dd>Anglais</dd>
            </div>
            <div>
              <dt>
                <span className="material-symbols-outlined" aria-hidden="true">
                auto_stories
              </span><span className={styles.visuallyHidden}>Genre</span>
              </dt>
              <dd>Aventure</dd>
            </div>
          </dl>

          <section className={styles.bookSummary} id="resume">
            <h2 className={styles.visuallyHidden}>Présentation du roman</h2>
            <p>
              Ismaël embarque à bord du Pequod, un navire baleinier commandé par
              le capitaine Achab. Au fil de la traversée, il découvre la vie en
              mer, le travail des marins et les liens qui unissent les membres
              de cet équipage venu de tous horizons.
            </p>
            <p>
              Mais Achab ne poursuit qu’un seul but : retrouver Moby Dick, le
              cachalot blanc qui lui a arraché une jambe. Pour le capitaine,
              cette chasse dépasse bientôt les limites d’une simple expédition.
              Son obsession entraîne le navire et ses hommes dans une aventure
              périlleuse.
            </p>
            <p>
              Entre récit d’aventure et réflexion sur la condition humaine, le
              roman explore la vengeance, la démesure et la relation entre
              l’être humain et la nature. L’océan devient le théâtre d’un
              affrontement où se mêlent fascination, peur et désir de tout
              maîtriser.
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
