import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface HeroSectionProps {
    scrollToSection: (sectionId: string) => void;
    isMobile: boolean;
}

const HeroSection = ({ scrollToSection, isMobile }: HeroSectionProps) => {
    const handleDownloadCV = () => {
        const cvUrl = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/16931465-960f-4395-9802-f132c8bb55b6/My-Resume-1768550739275.pdf';
        const link = document.createElement('a');
        link.href = cvUrl;
        link.download = 'Piyush_Gudhe_CV.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('CV download started!');
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-6 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
                    <div className="flex-1 w-full text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Available for new projects
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
                        >
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                PIYUSH
                                <br />
                                GUDHE
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl lg:mx-0 mx-auto"
                        >
                            Crafting exceptional digital experiences with cutting-edge technology and innovative design.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-4 justify-center lg:justify-start flex-wrap"
                        >
                            <motion.button
                                onClick={() => scrollToSection('projects')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg flex items-center gap-2 border-none cursor-pointer shadow-lg shadow-purple-500/50 text-white"
                            >
                                View Projects <ArrowRight className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                onClick={handleDownloadCV}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold backdrop-blur flex items-center gap-2 bg-transparent cursor-pointer text-white"
                            >
                                <Download className="w-5 h-5" /> Download CV
                            </motion.button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: isMobile ? 0 : 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 flex justify-center lg:justify-end"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                            <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm">
                                <img
                                    src="https://res.cloudinary.com/dlz3d9gqi/image/upload/v1769801071/piyushsquare_nrs77w.jpg"
                                    alt="Piyush Gudhe - Full Stack Developer"
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {!isMobile && (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -bottom-4 -right-4 w-20 h-20 border-2 border-dashed border-purple-500/30 rounded-full pointer-events-none"

                                />
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
