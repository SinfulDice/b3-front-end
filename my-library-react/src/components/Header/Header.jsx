import { Link } from 'react-router'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li><Link to="/" aria-current="page">Bibliothèque</Link></li>
          <li><Link to="/" aria-current="page">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}
