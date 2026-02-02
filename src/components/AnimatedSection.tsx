import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
    children: React.ReactNode;
    id: string;
    className?: string;
}

const AnimatedSection = ({ children, id, className = "" }: AnimatedSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id={id}
            aria-labelledby={`${id}-heading`}
            className={`min-h-screen flex items-center justify-center py-20 px-6 ${className}`}
            style={{ scrollMarginTop: '80px' }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full"
            >
                {children}
            </motion.div>
        </section>
    );
};

export default AnimatedSection;
