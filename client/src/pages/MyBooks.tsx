import { useEffect, useState } from 'react';
import './MyBooks.css';

interface Book {
  _id: string;
  googleId: string;
  title: string;
  authors: string[];
  thumbnail: string;
  startDate?: string;
  endDate?: string;
  rating?: number;
  review?: string;
  pageCount?: number;
}

const MyBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState<number | ''>('');
  const [editReview, setEditReview] = useState('');


  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching books:', err);
        setLoading(false);
      });
  }, []);

  const startEdit = (book: Book) => {
    setEditingId(book._id);
    setEditRating(book.rating ?? '');
    setEditReview(book.review ?? '');
  };

  const handleEditSubmit = async (book: Book) => {
    try {
      const updated = {
        ...book,
        rating: editRating === '' ? undefined : editRating,
        review: editReview,
      };

      const res = await fetch(`http://localhost:5000/api/books/${book._id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updated),
      });

      if (!res.ok) throw new Error('Failed to update');

      const updatedBook = await res.json();
      setBooks(books.map((b) => (b._id === updatedBook._id ? updatedBook : b)));
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert('Error updating book');
    }
  };


  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this book?');
    if (!confirmed) return;

    try {
        const res = await fetch(`http://localhost:5000/api/books/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete');

        setBooks(books.filter((book) => book._id !== id));
    } catch (err) {
        console.error(err);
        alert('Error deleting book');
    }
    };

  return (
    <div className="my-books-container">
      <h2>My Library</h2>
      {loading && <p>Loading...</p>}
      {!loading && books.length === 0 && <p>No books added yet.</p>}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book._id} className="book-card">
            {book.thumbnail && <img src={book.thumbnail} alt={book.title} />}
            <div>
              <h3>{book.title}</h3>
              <p>{book.authors.join(', ')}</p>
              <p><b>Pages:</b> {book.pageCount}</p>
              {book.startDate && <p><b>Start:</b> {book.startDate.split('T')[0]}</p>}
              {book.endDate && <p><b>Finish:</b> {book.endDate.split('T')[0]}</p>}
              {editingId === book._id ? (
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    handleEditSubmit(book);
                    }}
                >
                    <label>
                    Rating:
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={editRating}
                        onChange={(e) => {
                        const value = e.target.value;
                        setEditRating(value === '' ? '' : parseInt(value));
                        }}
                    />
                    </label>
                    <label>
                    Review:
                    <textarea
                        value={editReview}
                        onChange={(e) => setEditReview(e.target.value)}
                    />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                </form>
                ) : (
                <>
                    {book.rating && <p>⭐ {book.rating}/5</p>}
                    {book.review && <p className="review-snippet">"{book.review.slice(0, 100)}..."</p>}
                </>
                )}


              <div className="actions">
                  <button className="edit-btn" onClick={() => startEdit(book)}>
                    {editingId === book._id ? 'Editing...' : 'Edit'}
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(book._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default MyBooks;
