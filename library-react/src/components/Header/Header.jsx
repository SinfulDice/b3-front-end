import { useFavoritesContext } from '../../contexts/FavoritesContext';
import styles from './Header.module.css'
import { Link } from 'react-router'


export default function Header() {
  const { favorites } = useFavoritesContext();

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li><Link to="/" aria-current="page">Bibliothèque</Link></li>
          <li><Link to="/contact" aria-current="page">Contact</Link></li>
        </ul>
      </nav>
      <span>Favorites : {favorites.length}</span>
    </header>
  )
}
