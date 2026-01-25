// src/context/BookContext.tsx
import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";


// 1️⃣ Define the shape of your context
// Using consistent callback pattern for all setters
interface BookContextType {
    book: string;
    chapter: number;
    verse: number;
    locationName: string;
    locationCoords: [number, number];
    setBookTheme: (newBook: string) => void;
    setSelectedChapter: (chapter: number | ((prev: number) => number)) => void;
    setVerseContext: (verse: number | ((prev: number) => number)) => void;
    setTopicContext: (topics: string[]) => void;
    setLocationName: (name: string | ((prev: string) => string)) => void;
    setLocationCoords: (coords: [number, number] | ((prev: [number, number]) => [number, number])) => void;
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
    const [locationName, setLocationName] = useState<string>('Jerusalem');
    const [locationCoords, setLocationCoords] = useState<[number, number]>([35.2137, 31.7683]);


    const setBookTheme = (newBook: string) => {
        setBook(newBook);
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
                locationName,
                locationCoords,
                setBookTheme,
                setSelectedChapter: setChapter,
                setVerseContext: setVerse,
                setTopicContext,
                setLocationName,
                setLocationCoords,
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
