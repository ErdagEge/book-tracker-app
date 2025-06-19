import './AddBook.css';
import BookSearch from '../components/BooksSearch';

const AddBook = () => {
  return (
    <div className="addbook-container">
      <h2>Add a new book</h2>
      <BookSearch />
    </div>
  );
};

export default AddBook;
