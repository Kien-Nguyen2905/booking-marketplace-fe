import { useEffect, useState } from 'react';

// Define standard Tailwind CSS breakpoint sizes
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Standard Tailwind CSS breakpoints (in pixels)
const screens: Record<Size, string> = {
  xs: '0px', // Custom extra small
  sm: '640px', // Small screens (mobile)
  md: '768px', // Medium screens (tablets)
  lg: '1024px', // Large screens (desktops)
  xl: '1280px', // Extra large screens
  '2xl': '1536px', // 2X Extra large screens
};

type Direction = 'min' | 'max';

/**
 * Hook to check if the current viewport matches a specific Tailwind CSS breakpoint
 * @param size - Breakpoint size (xs, sm, md, lg, xl, 2xl)
 * @param direction - Direction of the media query (min or max)
 * @returns Boolean indicating if the current viewport matches the specified breakpoint
 */
export const useBreakpoint = (size: Size, direction: Direction = 'min') => {
  // Initialize state based on window.matchMedia if available (for SSR compatibility)
  const [isScreen, setIsScreen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(`(${direction}-width: ${screens[size]})`).matches;
  });

  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === 'undefined') return;

    // Create media query
    const mediaQuery = window.matchMedia(
      `(${direction}-width: ${screens[size]})`,
    );

    // Update state with current match status
    const updateMatch = () => setIsScreen(mediaQuery.matches);

    // Set initial value
    updateMatch();

    // Add event listener for changes
    mediaQuery.addEventListener('change', updateMatch);

    // Return cleanup function
    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, [size, direction]);

  return isScreen;
};
