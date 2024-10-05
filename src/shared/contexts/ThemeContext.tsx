import {
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { Box, ThemeProvider } from "@mui/material";
import { DarkTheme, LightTheme } from "../themes";

interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

interface IAppThemeProvider {
  children: React.ReactNode;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IAppThemeProvider> = ({ children }) => {
  const initialTheme =
    (localStorage.getItem("theme") as "light" | "dark") || "light";
  const [themeName, setThemeName] = useState<"light" | "dark">(initialTheme);

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => {
      const newTheme = oldThemeName === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); // Save the new theme to localStorage
      return newTheme;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  const theme = useMemo(() => {
    if (themeName === "light") return LightTheme;

    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <Box
        width="100vw"
        height="100vh"
        bgcolor={theme.palette.background.default}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Box>
    </ThemeContext.Provider>
  );
};
