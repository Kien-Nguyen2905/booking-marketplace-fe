/**
 * Formats a number as currency with the specified currency code
 * @param value - The number to format
 * @param currencyCode - The currency code (e.g., 'USD', 'VND')
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currencyCode: string = 'VND'): string => {
  if (!value && value !== 0) return '';
  
  // Handle different currency formatting cases
  switch (currencyCode) {
    case 'VND': {
      // Format VND without decimal places and with dot as thousands separator
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
      }).format(value);
    }
    case 'USD': {
      // Format USD with 2 decimal places
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    }
    default: {
      // Default formatting with the specified currency
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(value);
    }
  }
};
