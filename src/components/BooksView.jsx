import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BooksList from "./BooksList";
import { useEffect } from "react";
import { fetchAsyncBooks } from "../features/booksSlice";

const BooksView = () => {
  const { books, status, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncBooks());
  }, []);

  return (
    <>
      {error === "error" && <p>{error}</p>}
      {status === "loading" ? (
        <p className="display-5 text-center mt-5 fw-normal">LOADING...</p>
      ) : (
        <>
          <section className="container py-4">
            <h1 className="pt-2 pb-3">Books View</h1>

            <Link
              to={"/bookForm"}
              className="btn btn-sm btn-info px-4 text-primary fw-semibold"
            >
              Add Book
            </Link>

            <h2 className="pt-4 pb-2">Books List</h2>
            <BooksList books={books} />
          </section>
        </>
      )}
    </>
  );
};

export default BooksView;
