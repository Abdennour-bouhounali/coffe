/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const BrunchSelectionContext = createContext(null);

export function BrunchSelectionProvider({ children }) {
  const [selection, setSelection] = useState(() => {
    try {
      const saved = localStorage.getItem("maison_saha_selection");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("maison_saha_selection", JSON.stringify(selection));
    } catch (e) {
      console.error("Failed to save selection", e);
    }
  }, [selection]);

  const addToSelection = (item) => {
    setSelection((prev) => [...prev, item]);
    setIsDrawerOpen(true); // Automatically open drawer to show success!
  };

  const removeFromSelection = (index) => {
    setSelection((prev) => prev.filter((_, idx) => idx !== index));
  };

  const clearSelection = () => {
    setSelection([]);
  };

  return (
    <BrunchSelectionContext.Provider
      value={{
        selection,
        addToSelection,
        removeFromSelection,
        clearSelection,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </BrunchSelectionContext.Provider>
  );
}

export function useBrunchSelection() {
  const context = useContext(BrunchSelectionContext);
  if (!context) {
    throw new Error("useBrunchSelection must be used within a BrunchSelectionProvider");
  }
  return context;
}
