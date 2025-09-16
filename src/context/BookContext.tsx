// src/context/BookContext.tsx
import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

// 1️⃣ Define the shape of your context
interface BookContextType {
    book: string;
    chapter: number;
    verse: number;
    setBookTheme: (newBook: string) => void;
    setSelectedChapter: React.Dispatch<React.SetStateAction<number>>
    setVerseContext: React.Dispatch<React.SetStateAction<number>>
    setTopicContext: (topics: string[]) => void;
}

// 2️⃣ Create the context with default value `undefined`
const BookContext = createContext<BookContextType | undefined>(undefined);

// 3️⃣ Define props for the provider
interface BookProviderProps {
    children: ReactNode;
}

// 4️⃣ Provider component
export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
    const [book, setBook] = useState("Genesis");
    const [chapter, setChapter] = useState<number>(0);
    const [verse, setVerse] = useState(1);
    const [topics, setTopics] = useState<string[]>([]);

    const setBookTheme = (newBook: string) => {
        setBook(newBook);
    };

    const setSelectedChapter = (newChapter: number) => {
        setChapter(newChapter);
    };

    const setVerseContext = (newVerse: number) => {
        setVerse(newVerse);
    };

    const setTopicContext = (newTopics: string[]) => {
        setTopics(newTopics);
    };

    return (
        <BookContext.Provider
            value={{
                book,
                chapter,
                verse,
                setBookTheme,
                setSelectedChapter: setChapter,
                setVerseContext: setVerse,
                setTopicContext,
            }}
        >
            {children}
        </BookContext.Provider>
    );
};

// 5️⃣ Custom hook
export const useBook = (): BookContextType => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error("useBook must be used within a BookProvider");
    }
    return context;
};
