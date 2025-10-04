// hooks/useMiracles.ts
import { useEffect, useState } from "react";
import { Miracle } from "../types/Miracle";

export function useMiracles() {
  const [data, setData] = useState<Miracle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMiracles = async () => {
      try {
        const res = await fetch("/miracles/miracles.json");
        if (!res.ok) {
          throw new Error("Failed to fetch miracles");
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMiracles();
  }, []);

  return { data, loading, error };
}
