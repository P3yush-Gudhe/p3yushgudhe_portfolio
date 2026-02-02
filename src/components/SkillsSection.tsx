import { useMemo } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const SkillsSection = () => {
    const skills = useMemo(() => [
        { name: 'C++', level: 90, color: 'bg-red-500', icon: '💻' },
        { name: 'TypeScript', level: 90, color: 'bg-blue-500', icon: '📘' },
        { name: 'Node.js', level: 85, color: 'bg-green-500', icon: '🟢' },
        { name: 'Python', level: 80, color: 'bg-yellow-500', icon: '🐍' },
        { name: 'AWS', level: 75, color: 'bg-orange-500', icon: '☁️' },
        { name: 'Frontend (HTML, CSS, JS)', level: 90, color: 'bg-purple-500', icon: '🎨' }
    ], []);

    return (
        <AnimatedSection id="skills">
            <h2 id="skills-heading" className="sr-only">Skills and Expertise</h2>
            <div className="max-w-7xl mx-auto relative z-10 w-full px-6">
                <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Skills & Expertise
                    </span>
                </h2>

                <div className="grid lg:grid-cols-3 gap-12 items-center">
                    <div className="space-y-8 order-2 lg:order-1">
                        {skills.slice(0, 3).map((skill, index) => (
                            <div key={skill.name}>
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl" aria-hidden="true">{skill.icon}</span>
                                        <span className="font-semibold text-lg">{skill.name}</span>
                                    </div>
                                    <span className="text-gray-400">{skill.level}%</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`h-full ${skill.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative order-1 lg:order-2 flex justify-center"
                    >
                        <div className="relative group max-w-[300px]">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 bg-black/40 backdrop-blur-md">
                                <img
                                    src="/download.jpg"
                                    alt="Focused developer workspace"
                                    loading="lazy"
                                    className="w-full h-auto opacity-80 group-hover:opacity-100 transition-all duration-500 grayscale-[0.2] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <p className="text-xs font-mono text-cyan-400 mb-1">
                      // executing hyper_focus.sh
                                        </p>
                                        <p className="text-sm font-bold text-white">Locked In Mode</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-8 order-3">
                        {skills.slice(3).map((skill, index) => (
                            <div key={skill.name}>
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl" aria-hidden="true">{skill.icon}</span>
                                        <span className="font-semibold text-lg">{skill.name}</span>
                                    </div>
                                    <span className="text-gray-400">{skill.level}%</span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: (index + 3) * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`h-full ${skill.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default SkillsSection;
