import { useContext } from 'react'
import { Link } from 'react-router'
import { FavoritesContext } from '../../contexts/FavoritesContext.js'
import styles from './Header.module.css'

export default function Header() {
  const { favoriteIds } = useContext(FavoritesContext)

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li><Link to="/" aria-current="page">Bibliothèque</Link></li>
          <li><Link to="/" aria-current="page">Contact</Link></li>
        </ul>
      </nav>
      <p className={styles.favorites}>Favoris : {favoriteIds.length}</p>
    </header>
  )
}
