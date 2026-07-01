"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by waiting for mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="header-theme-toggle" aria-label="Toggle theme">
        <div className="theme-toggle-container-inner" style={{ width: 20, height: 20 }} />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="header-theme-toggle"
      aria-label="Toggle theme"
    >
      <div className="theme-toggle-container-inner" style={{ width: 20, height: 20, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" style={{ width: 20, height: 20 }} />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" style={{ width: 20, height: 20 }} />
      </div>
    </button>
  )
}
