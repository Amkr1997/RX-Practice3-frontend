import { useDispatch } from "react-redux";
import { deleteBookAsync, fetchAsyncBooks } from "../features/booksSlice";
import { Link } from "react-router-dom";

const BooksList = ({ books }) => {
  const dispatch = useDispatch();

  const handleDelete = (bookId) => {
    dispatch(deleteBookAsync(bookId));
    dispatch(fetchAsyncBooks());
  };

  return (
    <>
      <div className="row py-2 px-sm-0 px-2">
        {books?.books?.map((book) => {
          return (
            <div
              key={book._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 my-3"
            >
              <div className="card">
                <img
                  src={`https://placehold.co/300x200/cornflowerblue/white?text=${book.bookName}`}
                  className="img-thumbnail"
                  alt="book image"
                />
                <div className="card-body py-sm-2">
                  <h5 className="card-heading fs-3">{book.bookName}</h5>
                  <p className="card-text fs-6">Author: {book.author}</p>
                  <p className="card-text fs-6">Genre: {book.genre}</p>

                  <div className="d-flex flex-wrap gap-2">
                    <Link
                      type="button"
                      className="btn btn-outline-info btn-sm px-3 text-primary fw-semibold"
                      to={"/bookForm"}
                      state={book}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm px-1 fw-medium"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BooksList;
