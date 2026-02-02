import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
    activeSection: string;
    scrollToSection: (sectionId: string) => void;
    scrolled: boolean;
}

const Navbar = ({ activeSection, scrollToSection, scrolled }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

    const handleNavClick = (item: string) => {
        scrollToSection(item.toLowerCase());
        setIsMenuOpen(false);
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 origin-left z-50 pointer-events-none"
                style={{ scaleX }}
            />
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                aria-label="Main navigation"
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10' : 'bg-black/50 backdrop-blur-sm'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <motion.button
                        className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer bg-transparent border-none"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollToSection('home')}
                        aria-label="Go to home section"
                    >
                        Piyush's Tech
                    </motion.button>

                    <div className="hidden md:flex gap-8">
                        {navItems.map((item, idx) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`relative group transition-colors bg-transparent border-none cursor-pointer ${activeSection === item.toLowerCase() ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'
                                    }`}
                                aria-label={`Navigate to ${item} (Ctrl+${idx + 1})`}
                                title={`Ctrl+${idx + 1}`}
                            >
                                {item}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                            </button>
                        ))}
                    </div>

                    <button
                        className="md:hidden text-white bg-transparent border-none cursor-pointer p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 border-t border-white/10"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleNavClick(item)}
                                className={`block w-full text-left px-6 py-3 hover:bg-white/5 transition-colors bg-transparent border-none cursor-pointer ${activeSection === item.toLowerCase() ? 'text-white font-semibold bg-white/5' : 'text-gray-300'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </motion.div>
                )}
            </motion.nav>
        </>
    );
};

export default Navbar;
