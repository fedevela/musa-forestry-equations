import { useThemeContext } from "../ThemeContext";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <div>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle theme {theme}
      </button>
    </div>
  );
};
