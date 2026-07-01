import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  return (
    <header className="global-header">
      <div className="header-container">
        <nav className="header-nav">
          <Link href="/" className="header-nav-link active">Home</Link>
          <Link href="#projects" className="header-nav-link">Projects</Link>
          <Link href="#certificates" className="header-nav-link">Certificates</Link>
          <Link href="https://github.com/mrbilauta" target="_blank" className="header-nav-link">GitHub</Link>
          <Link href="https://linkedin.com/in/khanmohammedzaid" target="_blank" className="header-nav-link">LinkedIn</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

