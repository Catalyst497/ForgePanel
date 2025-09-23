import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Door } from '../Types';
import { useAppStore } from '../hooks/useAppStore';

export function useDoors() {
  const {doors, setDoors} = useAppStore()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getDoors() {
      try {
        setLoading(true);
        const response = await axios.get<{ doors: Door[] }>("/api/doors");
        setDoors(response.data.doors);
      } catch (err: any) {
        setError(err.message || "Failed to fetch doors");
      } finally {
        setLoading(false);
      }
    }

    getDoors();
  }, []);

  return { doors, loading, error };
}