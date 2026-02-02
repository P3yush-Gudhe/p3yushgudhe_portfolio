import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedSection from './AnimatedSection';

interface ProjectsSectionProps {
    isMobile: boolean;
}

const ProjectsSection = ({ isMobile }: ProjectsSectionProps) => {
    const projects = useMemo(() => [
        {
            title: 'AI Nexus',
            description: 'Multi-AI collaboration platform achieving 40% better output quality through ensemble voting. Processes 1000+ requests daily with <500ms response time.',
            tech: ['React', 'Python', 'TensorFlow', 'WebSocket'],
            gradient: 'from-purple-500 to-pink-500',
            icon: <Sparkles className="w-6 h-6" />,
            image: '/imagesforport/ainexus.png',
            demoUrl: 'https://github.com/P3yush-Gudhe/ai-nexus',
            githubUrl: 'https://github.com/P3yush-Gudhe/ai-nexus',
            metrics: [
                { label: 'Quality', value: '+40%' },
                { label: 'Response', value: '<500ms' },
                { label: 'Daily Requests', value: '1000+' }
            ]
        },
        {
            title: 'E-Commerce Platform',
            description: 'Full-stack marketplace serving 1000+ products with Stripe integration, achieving 99.9% uptime and sub-2s load times across all pages.',
            tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
            gradient: 'from-blue-500 to-cyan-500',
            icon: <Rocket className="w-6 h-6" />,
            image: '/imagesforport/farmermarket.png',
            demoUrl: 'https://github.com/P3yush-Gudhe/farmer-market',
            githubUrl: 'https://github.com/P3yush-Gudhe/farmer-market',
            metrics: [
                { label: 'Products', value: '1000+' },
                { label: 'Uptime', value: '99.9%' },
                { label: 'Load Time', value: '<2s' }
            ]
        }
    ], []);

    return (
        <AnimatedSection id="projects">
            <h2 id="projects-heading" className="sr-only">Featured Projects</h2>
            <div className="max-w-7xl mx-auto relative z-10 w-full px-6 overflow-hidden">
                <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center">
                    <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                        Featured Projects
                    </span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            whileHover={!isMobile ? { y: -10 } : {}}
                            whileTap={{ scale: 0.98 }}
                            className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all min-h-[500px] flex flex-col"
                        >
                            <div
                                className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    backgroundImage: `url(${project.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />

                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/80 to-black/40 group-hover:from-black group-hover:via-black/90 transition-all duration-300" />

                            <div className="absolute inset-0 z-30 bg-gradient-to-t from-blue-600/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="flex gap-4">
                                    <motion.a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => toast.info(`Opening ${project.title} demo...`)}
                                        whileHover={!isMobile ? { scale: 1.05 } : {}}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 bg-white text-black rounded-full font-bold flex items-center gap-2"
                                        aria-label={`View ${project.title} live demo`}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Live Demo
                                    </motion.a>
                                    <motion.a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => toast.info(`Opening ${project.title} source code...`)}
                                        whileHover={!isMobile ? { scale: 1.05 } : {}}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-3 border-2 border-white text-white rounded-full font-bold flex items-center gap-2"
                                        aria-label={`View ${project.title} source code`}
                                    >
                                        <Github className="w-4 h-4" />
                                        Code
                                    </motion.a>
                                </div>
                            </div>

                            <div className="relative z-20 p-8 mt-auto">
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${project.gradient} mb-4 shadow-lg`}>
                                    {project.icon}
                                </div>

                                <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                                <p className="text-gray-200 mb-4 line-clamp-3">{project.description}</p>

                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    {project.metrics.map((metric, i) => (
                                        <div key={i} className="bg-white/10 backdrop-blur-md rounded-lg p-2 text-center">
                                            <div className="text-lg font-bold text-white">{metric.value}</div>
                                            <div className="text-[10px] text-gray-300">{metric.label}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs border border-white/10 text-white">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 mb-8 text-center">
                    <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase mb-2 block">
                        The Process
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                        Behind the Scenes
                    </h3>
                </div>

                <div className="relative w-full overflow-hidden py-10">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

                    <motion.div
                        className="flex gap-6 w-max"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{
                            duration: isMobile ? 60 : 30,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex gap-6">
                                {[
                                    { src: "/imagesforport/skelleton_in_stress.jpg", label: "// stress_test.sys" },
                                    { src: "/imagesforport/images3.jpg", label: "// architecture_v3.id" },
                                    { src: "/imagesforport/images2.jpg", label: "// blueprint_final.draft" },
                                    { src: "/imagesforport/images1.jpg", label: "// core_engine.bin" },
                                    { src: "/imagesforport/dark_as_inspo.jpg", label: "// dark_mode.eng" }
                                ].map((img, i) => (
                                    <div
                                        key={i}
                                        className="relative w-[300px] md:w-[450px] h-[250px] md:h-[300px] rounded-[2rem] overflow-hidden border border-white/5 bg-black/40 group"
                                    >
                                        <img
                                            src={img.src}
                                            alt={`Development process ${i + 1}`}
                                            loading="lazy"
                                            className="w-full h-full object-cover opacity-60 grayscale-[0.3] group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                            <span className="text-white/40 font-mono text-[10px] group-hover:text-cyan-400 transition-colors">
                                                {img.label}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default ProjectsSection;
