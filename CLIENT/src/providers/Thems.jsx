import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react";
// import { createTheme, ThemePrvoider } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ThemeContext = createContext(null);

export const AppThemePrvoider = ({ children }) => {
  const [isDark, setisDark] = useState(false);

  const togleIsDark = useCallback(
    () => setisDark((prev) => !prev),
    [setisDark]
  );
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

 
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              // Your custom styles for the input text
              // For example:
              color:"#7DA2A9"
            },
            "& .MuiInputLabel-root": {
              // Your custom styles for the input label
              // For example:
              color: "#11cb5f",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              // Your custom border color for the TextField
              borderColor: "#7DA2A9",
            },
            // Add any other custom styles for the TextField here...
          },
        },
      },
    },
    palette: {
      mode: isDark ? `dark` : `light`,
      primary: {
        // Purple and green play nicely together.
        main: "#7DA2A9",
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#11cb5f",
      },
    },
  });

  const value = useMemo(() => {
    return { isDark, togleIsDark };
  }, [isDark, togleIsDark, prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
