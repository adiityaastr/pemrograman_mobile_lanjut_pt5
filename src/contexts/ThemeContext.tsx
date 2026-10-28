import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  secondaryText: string;
  border: string;
  primary: string;
  danger: string;
  success: string;
  warning: string;
  returnedBackground: string;
  inputBackground: string;
};

type ThemeContextValue = {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const lightColors: ThemeColors = {
  background: '#F4F7FB',
  surface: '#FFFFFF',
  text: '#172033',
  secondaryText: '#667085',
  border: '#DCE3ED',
  primary: '#1769AA',
  danger: '#C62828',
  success: '#2E7D32',
  warning: '#B26A00',
  returnedBackground: '#E6F4EA',
  inputBackground: '#FFFFFF',
};

const darkColors: ThemeColors = {
  background: '#101722',
  surface: '#1B2635',
  text: '#F3F6FA',
  secondaryText: '#B0BDCC',
  border: '#344256',
  primary: '#75B8F2',
  danger: '#FF8A80',
  success: '#81C995',
  warning: '#FFB74D',
  returnedBackground: '#203D32',
  inputBackground: '#152131',
};

const ThemeContext =
  createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isDark, setIsDark] = useState(false);

  const value = useMemo<ThemeContextValue>(
    () => ({
      isDark,
      colors: isDark ? darkColors : lightColors,
      toggleTheme: () => setIsDark(current => !current),
    }),
    [isDark],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(
      'useTheme harus digunakan di dalam ThemeProvider.',
    );
  }

  return context;
}
