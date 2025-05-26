import { useEffect, useState } from 'react';
import AddBookModal from '../components/AddBookModal';
import EditBookModal from '../components/EditBookModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
      setFilteredBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
  };

  const addNewBook = async (newBook) => {
    try {
      const res = await axios.post('http://localhost:5000/api/books', newBook);
      console.log('Book added:', res.data);
      fetchBooks(); // refresh list
      setShowAddModal(false); // close modal after add
    } catch (err) {
      console.error('Failed to add book:', err.response?.data || err.message);
    }
  };

  const handleSearch = async () => {
    if (searchId.trim() === '') {
      setFilteredBooks(books);
    } else {
      try {
        const res = await axios.get(`http://localhost:5000/api/books/${searchId}`);
        setFilteredBooks([res.data]);
      } catch (err) {
        setFilteredBooks([]);
      }
    }
  };

const handleEdit = (id) => {
  const bookToEdit = books.find((b) => b._id === id);
  setSelectedBook(bookToEdit);
  setShowEditModal(true);
};

const handleUpdateBook = async (updatedBook) => {
  try {
    await axios.put(`http://localhost:5000/api/books/${updatedBook._id}`, updatedBook);
    fetchBooks();
    setShowEditModal(false);
  } catch (err) {
    console.error('Failed to update book:', err.response?.data || err.message);
  }
};



  const handleDelete = (id) => {
    navigate(`/delete/${id}`);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center flex-grow-1 m-0">📚 Book Inventory</h1>
        <button
          className="btn btn-primary ms-3"
          onClick={() => setShowAddModal(true)} // open modal on click
        >
          Add New Book +
        </button>
      </div>

      {showAddModal && (
        <AddBookModal
          onClose={() => setShowAddModal(false)}
          onAddBook={addNewBook}
        />
      )}

      {showEditModal && selectedBook && (
        <EditBookModal
        book={selectedBook}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleUpdateBook}
        />
      )}


      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Book ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Created Date</th>
            <th>Price</th>
            <th style={{ width: '100px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book._id}>
              <td>{book._id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{new Date(book.createdAt).toLocaleDateString()}</td>
              <td>${book.price}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => handleEdit(book._id)}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(book._id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
          {filteredBooks.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;
