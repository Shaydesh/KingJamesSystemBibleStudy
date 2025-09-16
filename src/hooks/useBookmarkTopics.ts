import { useEffect, useState } from "react";
import { getDistinctTopics, initDB } from "../DB";

export const useBookmarkTopics = () => {
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await initDB();
        const distinctTopics = await getDistinctTopics();
        setTopics(distinctTopics);
        console.log("Topics are:", distinctTopics);
      } catch (error) {
        console.error("Error initializing DB or fetching topics:", error);
      }
    };

    initializeDatabase();
  }, []);

  return { topics, setTopics };
};
