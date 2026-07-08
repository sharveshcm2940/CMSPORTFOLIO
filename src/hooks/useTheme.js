import { useState, useEffect } from "react";

export const THEMES = {
  amber: {
    name: "Amber CRT",
    vars: {
      "--bg": "#0b0702",
      "--bg-soft": "#120b03",
      "--panel": "#191004",
      "--panel-raised": "#211506",
      "--border": "#442700",
      "--border-soft": "#2c1b00",
      "--text": "#ffb000",
      "--text-dim": "#cca000",
      "--text-mute": "#8c5c00",
      "--amber": "#ffb000",
      "--amber-dim": "#cc8a00",
      "--teal": "#ffd000",
      "--teal-dim": "#b28c00"
    }
  },
  monochrome: {
    name: "Stark Mono",
    vars: {
      "--bg": "#0a0a0a",
      "--bg-soft": "#121212",
      "--panel": "#1a1a1a",
      "--panel-raised": "#242424",
      "--border": "#333333",
      "--border-soft": "#222222",
      "--text": "#f5f5f5",
      "--text-dim": "#cccccc",
      "--text-mute": "#777777",
      "--amber": "#ffffff",
      "--amber-dim": "#888888",
      "--teal": "#e0e0e0",
      "--teal-dim": "#999999"
    }
  }
};

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "amber";
  });

  const changeTheme = (newTheme) => {
    if (THEMES[newTheme]) {
      setThemeState(newTheme);
      localStorage.setItem("portfolio-theme", newTheme);
      
      // Dispatch custom event to notify other components (like terminal)
      window.dispatchEvent(new CustomEvent("themechange", { detail: newTheme }));
    }
  };

  useEffect(() => {
    const activeThemeData = THEMES[theme] || THEMES.amber;
    const root = document.documentElement;
    
    // Apply all CSS custom properties to :root
    Object.entries(activeThemeData.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Handle incoming theme changes from terminal custom events
    const handleEvent = (e) => {
      if (THEMES[e.detail]) {
        setThemeState(e.detail);
      }
    };
    
    window.addEventListener("themechange", handleEvent);
    return () => window.removeEventListener("themechange", handleEvent);
  }, [theme]);

  return { theme, changeTheme, availableThemes: Object.keys(THEMES) };
}
