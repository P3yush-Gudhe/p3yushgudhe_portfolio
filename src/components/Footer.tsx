import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
    scrollToSection: (sectionId: string) => void;
    isMobile: boolean;
}

const Footer = ({ scrollToSection, isMobile }: FooterProps) => {
    return (
        <footer className="relative z-10 border-t border-white/5 py-16 bg-black/20 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <motion.div
                            className="text-3xl font-black tracking-tighter text-white"
                            whileHover={!isMobile ? { scale: 1.02 } : {}}
                        >
                            PIYUSH'S<span className="text-pink-500"> TECH</span>
                        </motion.div>
                        <p className="text-gray-500 text-sm max-w-xs text-center md:text-left leading-relaxed">
                            Pushing the boundaries of digital experience through code and cosmic design.
                        </p>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium uppercase tracking-widest" aria-label="Footer navigation">
                        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="text-gray-400 hover:text-blue-400 transition-colors bg-transparent border-none cursor-pointer"
                            >
                                {item}
                            </button>
                        ))}
                    </nav>

                    <div className="flex gap-4">
                        {[
                            { icon: Github, link: "https://github.com/P3yush-Gudhe", label: "GitHub" },
                            { icon: Linkedin, link: "https://www.linkedin.com/in/piyush-gudhe-793b5832a", label: "LinkedIn" },
                            { icon: Mail, link: "mailto:piyushgudhe563@gmail.com", label: "Email" }
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={!isMobile ? { y: -5, backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.5)' } : {}}
                                whileTap={{ scale: 0.9 }}
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all"
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-xs tracking-widest uppercase">
                        © 2026 Crafted by <span className="text-gray-400">Piyush Gudhe</span>
                    </p>

                    <div className="flex gap-6">
                        <motion.div
                            className="flex items-center gap-2 text-[10px] text-gray-600 uppercase tracking-widest"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                            System Active
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
