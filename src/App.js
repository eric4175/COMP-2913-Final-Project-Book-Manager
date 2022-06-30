import "./styles.css";
import BookListForm from "./BookListForm";
import BookList from "./BookList";

export default function App() {
  return (
    <div className="App">
      <BookListForm />
      <BookList />
    </div>
  );
}
