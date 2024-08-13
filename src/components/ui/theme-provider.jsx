import React, { createContext, useContext, useEffect, useState } from 'react';

// Define possible theme types
const themes = ["dark", "light", "system"];

// Create context for theme provider
const ThemeProviderContext = createContext({
  theme: "system",
  setTheme: () => {}
});

// ThemeProvider component
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(() => {
    // Get the initial theme from localStorage or use the default theme
    return localStorage.getItem(storageKey) || defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;

    // Remove previous theme classes
    root.classList.remove("light", "dark");

    // Determine the theme to apply
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      if (themes.includes(newTheme)) {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      }
    }
  };

  return (
    <ThemeProviderContext.Provider value={value} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
