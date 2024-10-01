import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksView from "./components/BooksView";
import BookForm from "./components/BookForm";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<BooksView />} />
            <Route path="/bookForm" element={<BookForm />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
