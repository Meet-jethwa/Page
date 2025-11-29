import { useState, useEffect } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section with better threshold
      const sections = ['home', 'features', 'about', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll(); // Call once on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home', id: 'home' },
    { href: '#features', label: 'Features', id: 'features' },
    { href: '#about', label: 'About', id: 'about' },
    { href: '#contact', label: 'Contact', id: 'contact' }
  ];

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6 py-3">
        {/* Desktop Pill Navigation */}
        <nav className={`hidden md:flex items-center justify-between backdrop-blur-lg rounded-full px-6 py-3 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 shadow-lg' 
            : 'bg-white/70 shadow-md'
        }`}>
          <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            YourBrand
          </div>
          
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.id}
                href={link.href} 
                className="relative px-5 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group"
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-blue-600 transition-all duration-300 ${
                  activeSection === link.id 
                    ? 'w-full' 
                    : 'w-0 group-hover:w-full'
                }`}></span>
              </a>
            ))}
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg text-sm">
            Get Started
          </button>
        </nav>

        {/* Mobile Navigation */}
        <nav className={`md:hidden backdrop-blur-lg rounded-2xl px-6 py-3 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 shadow-lg' 
            : 'bg-white/70 shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              YourBrand
            </div>

            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg 
                className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className={`overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="space-y-2 pb-4">
              {navLinks.map((link) => (
                <a 
                  key={link.id}
                  href={link.href} 
                  className={`block py-2.5 px-4 rounded-xl transition-all duration-300 font-medium ${
                    activeSection === link.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold hover:shadow-lg text-sm">
                Get Started
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;