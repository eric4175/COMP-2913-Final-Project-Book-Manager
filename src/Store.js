import create from "zustand";
import produce from "immer";
import data from "./data.json";

export const useStore = create((set) => ({
    books: data,

    add: (bookName) =>
        set(
        produce((state) => {
            state.books.push({
            id: state.books.length + 1,
            bookName: bookName,
            read: false
            });
        })
        ),

    read: (id) =>
        set(
        produce((state) => {
            const index = state.books.findIndex((book) => book.id === Number(id));
            if (index !== -1) {
                state.books[index].read = !state.books[index].read;
            }
        })
        ),    

    remove: (id) =>
        set(
        produce((state) => {
            const index = state.books.findIndex((book) => book.id === Number(id));
            if (index !== -1) state.books.splice(index, 1);
        })
        ),
    //https://immerjs.github.io/immer/update-patterns/

    edit: (id, bookName) =>
        set(
        produce((state) => {
            const index = state.books.findIndex((book) => book.id === Number(id));
            if (index !== -1) {
                state.books[index].bookName = bookName;
                state.books[index].read = false;
            }
        })
        ),

    notEdited: false,

    edited: () => set(
        produce((state) => {
        state.notEdited = !state.notEdited;
    })),

    editButtonId: 0,

    setEditButtonId: (id) => set(
        produce((state) => {
        state.editButtonId = Number(id)
    })),

    filter: "All",

    setFilterSelection: (filter) => set(
        produce((state) => {
        state.filter = filter
    }))

}));