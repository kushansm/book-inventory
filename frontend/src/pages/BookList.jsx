import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
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

    // Optionally fetch updated list
    fetchBooks(); // if you want to refresh the list after adding
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
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    navigate(`/delete/${id}`);
  };

  return (
    <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="text-center flex-grow-1 m-0">📚 Book Inventory</h1>
            <button className="btn btn-primary ms-3" onClick={addNewBook}>
             Add New Book +
            </button>
            </div>


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
              <td>{book.createdAt}</td>
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
              <td colSpan="5" className="text-center text-muted">
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
