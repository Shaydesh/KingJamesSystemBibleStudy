import React, { createContext, useContext, useState } from "react";

// Create a Context
const BookContext = createContext();

// Create a Provider component
export const BookProvider = ({ children }) => {
    const [book, setBook] = useState("Genesis");
    const [chapter, setChapter] = useState(0);
    const [verse, setVerse] = useState(1); // Initialize chapter state
    const [topics, setTopics] = useState([]);

    // Function to set a new book
    const setBookTheme = (newBook) => {
        setBook(newBook);
    };

    // Function to set a new chapter
    const setSelectedChapter = (newChapter) => {
        setChapter(newChapter);
    };

    const setVerseContext = (newVerse) => {
        setVerse(newVerse);
    };

    const setTopicContext = (newTopics) => {
        setTopics(newTopics);
    };

    return (
        <BookContext.Provider
            value={{
                book,
                setBookTheme,
                chapter,
                setSelectedChapter,
                verse,
                setVerseContext,
                setTopicContext,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};

// Custom hook to use the BookContext
export const useBook = () => {
    return useContext(BookContext);
};
