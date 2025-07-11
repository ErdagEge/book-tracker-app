import { useState } from 'react';
import './BookSearch.css';
import StarRating from './StarRating';

interface BookItem {
  id: string;
  title: string;
  authors: string[];
  thumbnail: string;
  pageCount: number;
}

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [rating, setRating] = useState<number | ''>('');
    const [review, setReview] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      interface GoogleItem {
        id: string;
        volumeInfo: {
          title: string;
          authors?: string[];
          imageLinks?: { thumbnail?: string };
          pageCount?: number;
        };
      }
      const books = data.items.map((item: GoogleItem) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Unknown Author'],
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
        pageCount: item.volumeInfo.pageCount ?? 0,
      }));
      setResults(books);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLibrary = async (book: BookItem) => {
    const bookData = {
      googleId: book.id,
      title: book.title,
      authors: book.authors,
      thumbnail: book.thumbnail,
      pageCount: book.pageCount,
      startDate,
      endDate,
      rating: rating === '' ? undefined : rating,
      review,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('User not authenticated. Please log in.');
        return;
      }

      const response = await fetch('https://book-tracker-app-0ncf.onrender.com/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) throw new Error('Failed to add book');
      alert('Book added to your library!');
      // Clear form state
      setSelectedBook(null);
      setStartDate('');
      setEndDate('');
      setRating('');
      setReview('');
    } catch (err) {
      console.error(err);
      alert('Error adding book');
    }
  };

  return (
    <div className="book-search-page container">
      <form onSubmit={handleSearch} className="form-card">
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="book-grid">
        {results.map((book) => (
          <div key={book.id} className="book-card elevated">
            {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
            <div className='book-info'>
              <h3>{book.title}</h3>
              <p>{book.authors.join(', ')}</p>
              <button className="btn" onClick={() => setSelectedBook(book)}>Add to Library</button>

              {selectedBook?.id === book.id && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddToLibrary(book); // We'll define this next
                    }}
                    className="add-form"
                >
                    <label>
                        Start Date:
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                    <label>
                        End Date:
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                    <label>
                        Rating:
                        <StarRating
                            value={rating}
                            onChange={(val) => setRating(val)}
                            idPrefix={`search-${book.id}`}
                        />
                    </label>
                    <label>
                        Review:
                        <textarea value={review} onChange={(e) => setReview(e.target.value)} />
                    </label>
                    <button className="btn primary" type="submit">Save Book</button>
                </form>
            )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default BookSearch;
