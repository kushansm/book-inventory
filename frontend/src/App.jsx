// App.jsx
import { Routes, Route } from 'react-router-dom';
import BookList from './pages/BookList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BookList />} />
    </Routes>
  );
}

export default App;
