import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface AboutSectionProps {
    isMobile: boolean;
}

const AboutSection = ({ isMobile }: AboutSectionProps) => {
    return (
        <AnimatedSection id="about">
            <h2 id="about-heading" className="sr-only">About Me</h2>
            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="text-center mb-20">
                    <span className="text-blue-400 text-sm font-medium tracking-widest uppercase mb-4 block">
                        About Me
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold">
                        Know Me <span className="text-blue-500">Better</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-blue-400">My Journey</h3>
                            <p className="text-gray-100 text-sm leading-relaxed">
                                I'm a passionate full-stack developer with a curiosity for technology and a commitment to building
                                exceptional digital experiences.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="p-4 bg-black border border-blue-400 rounded-lg text-center">
                                <div className="text-2xl font-bold text-blue-500 mb-1">3+</div>
                                <div className="text-xs text-gray-100">Projects (and counting!)</div>
                            </div>
                            <div className="p-4 bg-black border border-blue-400 rounded-lg text-center">
                                <div className="text-2xl font-bold text-blue-500 mb-1">0</div>
                                <div className="text-xs text-gray-100">Clients (yet!)</div>
                            </div>
                            <div className="p-4 bg-black border border-blue-400 rounded-lg text-center">
                                <div className="text-sm font-bold text-blue-500 mb-1">🇬🇧 English, German</div>
                                <div className="text-xs text-gray-100">Foreign Languages</div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 relative flex justify-center">
                        <div className="relative w-full max-w-md mx-auto">
                            <motion.div
                                whileHover={!isMobile ? { scale: 1.05 } : {}}
                                whileTap={{ scale: 0.98 }}
                                className="relative bg-black p-2 rounded-3xl border-4 border-blue-500 shadow-2xl"
                            >
                                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-black flex items-center justify-center" style={{ height: '500px' }}>
                                    <img
                                        src="/profile_silhouette.png"
                                        alt="Piyush Gudhe Profile"
                                        loading="lazy"
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 flex flex-col justify-center space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-blue-400">What I Do</h3>
                            <p className="text-gray-100 text-sm leading-relaxed">
                                I combine technical excellence with user-centered design thinking to build delightful products that solve real problems.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="p-4 bg-black border border-blue-400 rounded-lg text-center">
                                <div className="text-sm font-bold text-blue-500 mb-1">Java, Python</div>
                                <div className="text-xs text-gray-100">Programming Languages</div>
                            </div>
                            <div className="p-4 bg-black border border-blue-400 rounded-lg text-center">
                                <div className="text-sm font-bold text-blue-500 mb-1">🤖 AI Master</div>
                                <div className="text-xs text-gray-100">Can use AI to its limit</div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <motion.a
                                href="https://github.com/P3yush-Gudhe"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : {}}
                                whileTap={{ scale: 0.9 }}
                                className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition text-white"
                                aria-label="Visit GitHub profile"
                            >
                                <Github className="w-6 h-6" />
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/piyush-gudhe-793b5832a"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={!isMobile ? { scale: 1.1, rotate: 5 } : {}}
                                whileTap={{ scale: 0.9 }}
                                className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition text-white"
                                aria-label="Visit LinkedIn profile"
                            >
                                <Linkedin className="w-6 h-6" />
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default AboutSection;
