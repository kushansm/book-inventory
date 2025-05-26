import { useParams } from 'react-router-dom';

function EditBook() {
  const { id } = useParams();
  return <h1>Edit Book ID: {id}</h1>;
}

export default EditBook;
