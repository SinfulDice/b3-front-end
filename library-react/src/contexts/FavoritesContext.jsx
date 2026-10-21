import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (book) => {
    if (favorites.some((fav) => fav.id === book.id)) {
        return;
    }
    setFavorites((prevFavorites) => [...prevFavorites, book]);
  };

  const removeFavorite = (bookId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((book) => book.id !== bookId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavoritesContext must be used within a FavoritesProvider");
    }

    return context;
}
