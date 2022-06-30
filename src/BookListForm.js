import { useStore } from "./Store";
import { useState } from "react";

export default function BookListForm() {
  const [userInput, setUserInput] = useState("");
  const add = useStore((state) => state.add);
  const filter = useStore((state) => state.filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput !== "" && userInput !== null) {
      add(userInput);
      setUserInput("");
    } else {
      alert("Please enter a valid book name !!!");
    }
  };

  return (
    <div>
    <h1>Books List: {filter}</h1>
    <form onSubmit={handleSubmit}>
      <input
        value={userInput}
        type="text"
        placeholder="Add New Book"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button>Add</button>
    </form>
    </div>
  );
}
