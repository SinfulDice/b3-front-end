import styles from './BookCard.module.css'

export default function BookCard({ title, authors, publishedDate, cover }) {
  return (
    <a className={styles.bookCard} href="book.html">
      <img className={styles.bookCover} src={cover} alt="" />
      <div className={styles.bookContent}>
        <h3 className={styles.bookTitle}>{title}</h3>
        <p className={styles.bookMeta}>
          <span className={styles.bookAuthor}>{authors.join(', ')}</span>
          {publishedDate ? (
            <time dateTime={publishedDate}>{publishedDate}</time>
          ) : (
            <span>Date inconnue</span>
          )}
        </p>
      </div>
    </a>
  )
}
