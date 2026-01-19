import { useState, useEffect, useCallback } from "react";
import type { PromptHistoryItem } from "@/lib/promptEnhancer";
import {
  getHistory,
  saveToHistory,
  deleteFromHistory,
  clearHistory,
} from "@/lib/promptEnhancer";
export function usePromptHistory() {
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const addToHistory = useCallback(
    (item: Omit<PromptHistoryItem, "id" | "timestamp">) => {
      const newItem: PromptHistoryItem = {
        ...item,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
      };
      saveToHistory(newItem);
      setHistory((prev) => [newItem, ...prev.slice(0, 49)]);
      return newItem;
    },
    [],
  );

  const removeFromHistory = useCallback((id: string) => {
    deleteFromHistory(id);
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearAllHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearAllHistory,
  };
}
