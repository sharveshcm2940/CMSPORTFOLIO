import { useState, useEffect } from "react";

export const THEMES = {
  classic: {
    name: "Classic",
    vars: {
      "--bg": "#0d1210",
      "--bg-soft": "#101613",
      "--panel": "#151d19",
      "--panel-raised": "#1a2420",
      "--border": "#26332c",
      "--border-soft": "#1c2620",
      "--text": "#eef1ec",
      "--text-dim": "#b7c2ba",
      "--text-mute": "#7c8a82",
      "--amber": "#e8a33d",
      "--amber-dim": "#a97a30",
      "--teal": "#52c9b6",
      "--teal-dim": "#3a8f81"
    }
  },
  matrix: {
    name: "Matrix",
    vars: {
      "--bg": "#030804",
      "--bg-soft": "#050d06",
      "--panel": "#071409",
      "--panel-raised": "#0c210e",
      "--border": "#143d1a",
      "--border-soft": "#0e2a12",
      "--text": "#00ff66",
      "--text-dim": "#52ff94",
      "--text-mute": "#004d1a",
      "--amber": "#33ff33",
      "--amber-dim": "#009933",
      "--teal": "#00ffcc",
      "--teal-dim": "#00aa88"
    }
  },
  cyberpunk: {
    name: "Cyberpunk",
    vars: {
      "--bg": "#120216",
      "--bg-soft": "#1b0321",
      "--panel": "#25052d",
      "--panel-raised": "#32073d",
      "--border": "#510c63",
      "--border-soft": "#3a0947",
      "--text": "#ffe5f5",
      "--text-dim": "#ff73ca",
      "--text-mute": "#992275",
      "--amber": "#ff007f",
      "--amber-dim": "#bf005f",
      "--teal": "#00ffff",
      "--teal-dim": "#00b2b2"
    }
  },
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
    return localStorage.getItem("portfolio-theme") || "classic";
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
    const activeThemeData = THEMES[theme] || THEMES.classic;
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
