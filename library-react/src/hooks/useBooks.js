import { fetchBooks } from '../api/books'
import { useState, useEffect } from 'react'

export default function useBooks(query = 'javascript') {
    const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

   useEffect(() => {
    console.log('Fetching books for query:', query)
    const fetchBooksData = async () => {
      setLoading(true)
      setError(null)

      try {
        const bookResult = await fetchBooks(query)
        setBooks(bookResult.items || [])
      } catch (error) {
        setError('Failed to fetch books. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchBooksData()
  }, [query])

  return { books, loading, error }
}