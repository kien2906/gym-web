import { createContext, useState } from "react";

export const Theme = createContext();
function ThemeContext({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const handleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <Theme.Provider value={{ darkMode, handleDarkMode }}>
      {" "}
      {children}
    </Theme.Provider>
  );
}

export default ThemeContext;
