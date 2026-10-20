import React from 'react'
import styles from './BookCard.module.css'

export default function BookCard({ cover, title, author, date }) {
    return (
        <li>
            <a className={styles.bookCard} href="book.html">
                <img className={styles.bookCover} src={cover} alt="" />
                <div className={styles.bookContent}>
                    <h3 className={styles.bookTitle}>{title}</h3>
                    <p className={styles.bookMeta}>
                        <span className={styles.bookAuthor}>{author}</span>
                        <time dateTime={date}>{date}</time>
                    </p>
                </div>
            </a>
        </li>
    )
}
