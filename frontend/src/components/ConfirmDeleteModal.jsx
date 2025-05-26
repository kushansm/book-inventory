function ConfirmDeleteModal({ book, onClose, onConfirm }) {
  if (!book) return null;

  return (
    <div
    className="modal fade show"
    tabIndex="-1"
    style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1050,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}
    >

      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">⚠️ Confirm Deletion</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete the following book?</p>
            <ul className="list-unstyled mb-0">
              <li><strong>ID:</strong> {book._id}</li>
              <li><strong>Title:</strong> {book.title}</li>
              <li><strong>Author:</strong> {book.author}</li>
            </ul>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onConfirm(book._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
