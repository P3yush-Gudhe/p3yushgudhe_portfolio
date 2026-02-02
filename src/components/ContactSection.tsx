import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Send } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface ContactSectionProps {
    isMobile: boolean;
    onFocus: () => void;
    onBlur: (formRef: React.RefObject<HTMLFormElement>) => void;
}

const ContactSection = ({ isMobile, onFocus, onBlur }: ContactSectionProps) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [formState, setFormState] = useState<{ status: 'idle' | 'loading' | 'success' | 'error', message: string }>({ status: 'idle', message: '' });
    const formRef = useRef<HTMLFormElement>(null);

    const validateForm = () => {
        const errors: Record<string, string> = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name.trim()) errors.name = 'Name is required';

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Invalid email format';
        }

        if (!formData.message.trim()) {
            errors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setFormState({ status: 'loading', message: '' });

        try {
            const { error } = await supabase
                .from('contact_submissions')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message
                    }
                ]);

            if (error) throw error;

            toast.success('Message sent successfully!');
            setFormState({ status: 'success', message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', message: '' });
            setFormErrors({});

            setTimeout(() => {
                setFormState({ status: 'idle', message: '' });
            }, 3000);
        } catch (error) {
            console.error('Supabase Error:', error);
            toast.error('Failed to send message.');
            setFormState({
                status: 'error',
                message: 'Failed to send message.'
            });
        }
    };

    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black text-center mb-4 leading-none tracking-tighter"
                    >
                        <span className="text-white">LET'S BUILD</span>
                        <br />
                        <span className="text-blue-400/60">SOMETHING..</span>
                    </motion.h2>
                    <div className="w-24 h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="bg-black/40 backdrop-blur-md border border-blue-500/20 p-8 md:p-12 rounded-[2rem] relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full" />
                            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full" />

                            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="relative group/field">
                                        <label htmlFor="name" className="text-[10px] uppercase tracking-[0.2em] text-blue-400/60 font-bold mb-2 block group-focus-within/field:text-blue-400 transition-colors">
                                            Your Identity
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="NAME"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            onFocus={onFocus}
                                            onBlur={() => onBlur(formRef)}
                                            className={`w-full bg-transparent border-b-2 border-white/10 py-3 outline-none text-white text-xl placeholder:text-white/20 focus:border-blue-500 transition-all duration-500 ${formErrors.name ? 'border-red-500/50' : ''
                                                }`}
                                        />
                                        {formErrors.name && (
                                            <p className="text-red-400 text-[10px] mt-2 font-mono uppercase tracking-widest flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> {formErrors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative group/field">
                                        <label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-blue-400/60 font-bold mb-2 block group-focus-within/field:text-blue-400 transition-colors">
                                            Digital Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="EMAIL"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            onFocus={onFocus}
                                            onBlur={() => onBlur(formRef)}
                                            className={`w-full bg-transparent border-b-2 border-white/10 py-3 outline-none text-white text-xl placeholder:text-white/20 focus:border-blue-500 transition-all duration-500 ${formErrors.email ? 'border-red-500/50' : ''
                                                }`}
                                        />
                                        {formErrors.email && (
                                            <p className="text-red-400 text-[10px] mt-2 font-mono uppercase tracking-widest flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" /> {formErrors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="relative group/field">
                                    <label htmlFor="message" className="text-[10px] uppercase tracking-[0.2em] text-blue-400/60 font-bold mb-2 block group-focus-within/field:text-blue-400 transition-colors">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        placeholder="TELL ME ABOUT YOUR PROJECT..."
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        onFocus={onFocus}
                                        onBlur={() => onBlur(formRef)}
                                        className={`w-full bg-transparent border-b-2 border-white/10 py-3 outline-none text-white text-xl placeholder:text-white/20 focus:border-blue-500 transition-all duration-500 resize-none ${formErrors.message ? 'border-red-500/50' : ''
                                            }`}
                                    />
                                    {formErrors.message && (
                                        <p className="text-red-400 text-[10px] mt-2 font-mono uppercase tracking-widest flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" /> {formErrors.message}
                                        </p>
                                    )}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={formState.status === 'loading'}
                                    whileHover={!isMobile ? { scale: 1.02 } : {}}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-6 mt-4 bg-white text-black font-black text-xl tracking-tighter hover:bg-blue-500 hover:text-white transition-all duration-500 rounded-xl flex items-center justify-center gap-4 relative overflow-hidden group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10">
                                        {formState.status === 'loading' ? 'TRANSMITTING...' : 'INITIATE CONTACT'}
                                    </span>
                                    <Send className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-1 flex flex-col items-center lg:items-end gap-6">
                        <div className="relative w-56 h-72" style={{ perspective: '1000px' }}>
                            {[
                                { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/16931465-960f-4395-9802-f132c8bb55b6/download-5-1768563911425.jpg?width=8000&height=8000&resize=contain', index: 2 },
                                { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/16931465-960f-4395-9802-f132c8bb55b6/download-6-1768563911429.jpg?width=8000&height=8000&resize=contain', index: 1 },
                                { src: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/16931465-960f-4395-9802-f132c8bb55b6/download-7-1768563911422.jpg?width=8000&height=8000&resize=contain', index: 0 },
                            ].map((card, arrayIndex) => (
                                <motion.div
                                    key={card.index}
                                    className="absolute inset-0 rounded-2xl overflow-hidden"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                        zIndex: 3 - arrayIndex,
                                        boxShadow: arrayIndex === 2
                                            ? '0 30px 60px -15px rgba(0,0,0,0.9), 0 0 30px rgba(59,130,246,0.15)'
                                            : '0 20px 40px -10px rgba(0,0,0,0.6)',
                                    }}
                                    initial={{
                                        y: arrayIndex * 16,
                                        x: arrayIndex * 8,
                                        rotateZ: arrayIndex * -4,
                                        scale: 1 - arrayIndex * 0.08,
                                        filter: arrayIndex === 2 ? 'brightness(1)' : `brightness(${0.5 - arrayIndex * 0.15})`,
                                    }}
                                    animate={{
                                        y: [
                                            arrayIndex * 16,
                                            arrayIndex * 16 - 30,
                                            arrayIndex * 16 - 50,
                                            -350,
                                        ],
                                        x: [
                                            arrayIndex * 8,
                                            arrayIndex * 8 + 10,
                                            arrayIndex * 8 + 30,
                                            150,
                                        ],
                                        rotateZ: [
                                            arrayIndex * -4,
                                            arrayIndex * -4 - 3,
                                            arrayIndex * -4 - 8,
                                            -20,
                                        ],
                                        scale: [
                                            1 - arrayIndex * 0.08,
                                            1 - arrayIndex * 0.06,
                                            1 - arrayIndex * 0.04,
                                            0.7,
                                        ],
                                        opacity: [1, 1, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        delay: arrayIndex * 2.5,
                                        repeat: Infinity,
                                        repeatDelay: 5,
                                        ease: [0.25, 0.1, 0.25, 1],
                                        times: [0, 0.3, 0.6, 1],
                                    }}
                                >
                                    <div
                                        className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                                        style={{
                                            border: arrayIndex === 2 ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(255,255,255,0.1)',
                                        }}
                                    />
                                    <img
                                        src={card.src}
                                        alt={`Design ${card.index + 1}`}
                                        className="w-full h-full object-cover"
                                        style={{
                                            filter: arrayIndex === 2 ? 'none' : `grayscale(${arrayIndex * 20}%)`,
                                        }}
                                        loading="lazy"
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: arrayIndex === 2
                                                ? 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)'
                                                : 'linear - gradient(to top, rgba(0, 0, 0, ${ 0.6 + arrayIndex * 0.15 }) 0 %, rgba(0, 0, 0, ${ 0.2 + arrayIndex * 0.1 }) 100 %)',
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                        <div className="text-center">
                            <h4 className="text-white font-bold text-lg tracking-tight mb-1">Design Inspirations</h4>
                            <p className="text-white/40 text-xs font-mono uppercase tracking-widest">curated_references</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
