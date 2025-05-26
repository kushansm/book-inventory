// App.jsx
import { Routes, Route } from 'react-router-dom';
import BookList from './pages/BookList';
import EditBook from './pages/EditBook';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
      <Route path="/edit/:id" element={<EditBook />} />
    </Routes>
  );
}

export default App;
