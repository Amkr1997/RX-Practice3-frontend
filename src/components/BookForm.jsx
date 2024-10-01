//import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookAsync, updateBookAsync } from "../features/booksSlice";
import { useLocation } from "react-router-dom";

const BookForm = () => {
  const [formdata, setFormData] = useState({
    name: "",
    author: "",
    genre: "",
  });
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (state) {
      setFormData({
        name: state.bookName,
        author: state.author,
        genre: state.genre,
      });
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formdata.name && formdata.author && formdata.genre) {
      const newBook = {
        bookName: formdata.name
          .split(" ")
          .map((data) => data.charAt(0).toLocaleUpperCase() + data.slice(1))
          .join(" "),
        author: formdata.author
          .split(" ")
          .map((data) => data.charAt(0).toLocaleUpperCase() + data.slice(1))
          .join(" "),
        genre: formdata.genre
          .split(" ")
          .map((data) => data.charAt(0).toLocaleUpperCase() + data.slice(1))
          .join(" "),
      };

      state
        ? dispatch(updateBookAsync({ _id: state._id, ...newBook }))
        : dispatch(addBookAsync(newBook));

      setFormData({
        name: "",
        author: "",
        genre: "",
      });

      setShowError(false);

      if (
        formdata.name === "" ||
        formdata.author === "" ||
        formdata.genre === ""
      ) {
        setShowError(true);
      }
    }
  };

  return (
    <>
      <section className="container py-3">
        <h1 className="py-2">Add Book</h1>

        <form className="py-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="form-control w-25"
            name="name"
            value={formdata.name}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Author"
            className="form-control w-25"
            name="author"
            value={formdata.author}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            placeholder="Genre"
            className="form-control w-25"
            name="genre"
            value={formdata.genre}
            onChange={handleChange}
          />
          <br />
          <button className="btn btn-success">Add</button>{" "}
          {showError && <span className="text-danger">Fill full form</span>}
        </form>
      </section>
    </>
  );
};

export default BookForm;
