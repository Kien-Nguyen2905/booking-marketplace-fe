import { useState, useCallback } from 'react';

export const useRHFComboBox = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  // Clear search term when popover closes
  const handleOpenChange = useCallback((isOpen: boolean) => {
    setOpen(isOpen);
  }, []);

  // Filter list based on search term

  return {
    open,
    setOpen,
    handleOpenChange,
  };
};
