import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<ContextType | undefined>(undefined);

export const ThemeContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [theme, setTheme] = useState<ContextType["theme"]>("dark");
  useEffect(() => {
    console.log(`theme=`);
    console.log(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used inside the ThemeProvider");
  }

  return context;
};
