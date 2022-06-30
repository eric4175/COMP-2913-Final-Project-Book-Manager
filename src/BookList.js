import "./styles.css";
import { useStore } from "./Store";
import { useState } from "react";

export default function BookList() {
    const [userEditInput, setUserEditInput] = useState("");
    const [filter, setFilter] = useState("All");
    const bookList = useStore((state) => state.books);
    const isEdited = useStore((state) => state.notEdited);
    const editButtonId = useStore((state) => state.editButtonId);

    const deleted = useStore((state) => state.remove);
    const editToggle = useStore((state) => state.edited);
    const readToggle = useStore((state) => state.read);
    const edit = useStore((state) => state.edit);
    const setEditButtonId = useStore((state) => state.setEditButtonId);
    const setFilterSelection = useStore((state) => state.setFilterSelection);
    
 
    const getFilteredTodoList = (books, filter) => {
        setFilterSelection(filter);
        return books.filter((book) => {
        if (filter === "Read") {
            return book.read;
        } else if (filter === "Reading") {
            return !book.read;
        } else {
            return book;
        }
        });
    };

    const handleEditTask = (e) => {
        e.preventDefault();
        if (userEditInput !== "" && userEditInput !== null) {
          edit(editButtonId, userEditInput);
          editToggle(true);
          setUserEditInput("");
        } else {
          alert("Please Enter The Book Name");
        }
      };

    const handleClick = (e) => {
        e.preventDefault();
        readToggle(e.target.id);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        deleted(e.target.id);
      };    

    const handleEditButton = (e) => {
        e.preventDefault();
        editToggle(isEdited);
        setEditButtonId(e.target.id)
    };

  return (
    <div>
    {
    getFilteredTodoList(bookList, filter).map((book) => {
        return(
        <div>
        <li
          id={book.id}
          key={book.id + book.bookName}
          name="book"
          value={book.id}
          onClick={handleClick}
          className={book.read ? "book strike" : "book"}
        >
          {book.bookName}
        </li>
        <button id={book.id} onClick={handleDelete}>
          Delete
        </button>
        <button id={book.id} onClick={handleEditButton}>
          Edit
        </button>
        </div>
    )})} 
    {
        isEdited ? (
        <form onSubmit={handleEditTask}>
          <p>Edit Book</p>
            <input
                value={userEditInput}
                type="text"
                placeholder="Edit Your Book List"
                onChange={(e) => setUserEditInput(e.target.value)}
            />
            <button id={editButtonId}>Edit</button>
            </form>
        ) : (
            <></>
        )}
        <button onClick={() => setFilter("Read")}>Read</button>
        <button onClick={() => setFilter("Reading")}>Reading</button>
        <button onClick={() => setFilter("All")}>All</button>
        </div>
    );
}




 
 