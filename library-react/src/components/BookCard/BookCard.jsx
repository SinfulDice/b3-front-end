import React from 'react'
import styles from './BookCard.module.css'
import { Link } from 'react-router'

export default function BookCard({ cover, title, author, date, id }) {
    return (
        <li>
            <Link className={styles.bookCard} to={`/book/${id}`}>
                <img className={styles.bookCover} src={cover} alt="" />
                <div className={styles.bookContent}>
                    <h3 className={styles.bookTitle}>{title}</h3>
                    <p className={styles.bookMeta}>
                        <span className={styles.bookAuthor}>{author}</span>
                        <time dateTime={date}>{date}</time>
                    </p>
                </div>
            </Link>
        </li>
    )
}
