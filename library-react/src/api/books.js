const MAX_RESULTS = 12;
const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function fetchBooks(query) {
  const url = new URL(API_BASE_URL);
  url.searchParams.set("q", query);
  url.searchParams.set("key", import.meta.env.VITE_GOOGLE_BOOKS_API_KEY);
  url.searchParams.set("maxResults", MAX_RESULTS);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const bookResult = await response.json();

    return bookResult;
  } catch (error) {
    console.error("Error fetching books:", error);

    throw error;
  }
}

export async function fetchBookById(id) {
    const url = new URL(`${API_BASE_URL}/${id}`);
    url.searchParams.set("key", import.meta.env.VITE_GOOGLE_BOOKS_API_KEY);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const bookResult = await response.json();
        return bookResult;
    }
    catch (error) {
        console.error("Error fetching book by ID:", error);
        throw error;
    }
}