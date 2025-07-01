import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`kl fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a href="#" className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white transition-colors">
          PORTFOLIO<span className="text-blue-500">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="bn hidden md:flex items-center space-x-8">
          <a href="#home" className="bn nav-link">Home</a>
          <a href="#projects" className="bn nav-link">Projects</a>
          <a href="#about" className="bn nav-link">About</a>
          <a href="#skills" className="bn nav-link">Skills</a>
          <a href="#contact" className="bn nav-link">Contact</a>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          <button 
            onClick={toggleMenu} 
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col space-y-8 mt-16">
          <a href="#home" className="mobile-nav-link" onClick={toggleMenu}>Home</a>
          <a href="#projects" className="mobile-nav-link" onClick={toggleMenu}>Projects</a>
          <a href="#about" className="mobile-nav-link" onClick={toggleMenu}>About</a>
          <a href="#skills" className="mobile-nav-link" onClick={toggleMenu}>Skills</a>
          <a href="#contact" className="mobile-nav-link" onClick={toggleMenu}>Contact</a>
        </div>
      </div>
    </header>
  );
};

export default Header;