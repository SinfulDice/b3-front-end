import { useState } from 'react'
import { FavoritesContext } from './FavoritesContext.js'

export default function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([])

  // Ajoute l'identifiant s'il est absent, le retire s'il est présent.
  function toggleFavorite(id) {
    setFavoriteIds((previousIds) =>
      previousIds.includes(id)
        ? previousIds.filter((favoriteId) => favoriteId !== id)
        : [...previousIds, id],
    )
  }

  return (
    <FavoritesContext value={{ favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext>
  )
}
