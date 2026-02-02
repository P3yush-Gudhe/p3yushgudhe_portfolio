import { useEffect, useState } from "react";

interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreen = ({ onFinish }: SplashScreenProps) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [phase, setPhase] = useState<'init' | 'loading' | 'ready'>('init');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 1;
                
                if (next >= 33 && phase === 'init') setPhase('loading');
                if (next >= 66 && phase === 'loading') setPhase('ready');
                
                if (next >= 100) {
                    clearInterval(interval);
                    setIsExiting(true);
                    setTimeout(() => onFinish(), 800);
                    return 100;
                }
                return next;
            });
        }, 40);

        return () => clearInterval(interval);
    }, [onFinish, phase]);

    return (
        <div 
            className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-700 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
            style={{
                // Force GPU acceleration
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                perspective: '1000px',
                willChange: 'opacity'
            }}
        >
            
            <style>{`
                /* Minimal, optimized animations only */
                @keyframes float {
                    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
                    50% { transform: translate3d(0, -8px, 0) scale(1.02); }
                }
                
                @keyframes subtlePulse {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.7; }
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes shimmer {
                    0% { transform: translate3d(-100%, 0, 0); }
                    100% { transform: translate3d(100%, 0, 0); }
                }
                
                @keyframes fadeInUp {
                    from { 
                        opacity: 0; 
                        transform: translate3d(0, 10px, 0);
                    }
                    to { 
                        opacity: 1; 
                        transform: translate3d(0, 0, 0);
                    }
                }
                
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                /* Performance optimizations */
                .will-transform { will-change: transform; }
                .will-opacity { will-change: opacity; }
                .will-transform-opacity { will-change: transform, opacity; }
                
                /* Disable animations for reduced motion */
                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>

            {/* Subtle gradient background */}
            <div 
                className="absolute inset-0 opacity-40"
                style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(236, 72, 153, 0.1) 100%)',
                    backgroundSize: '400% 400%',
                    animation: 'gradientShift 15s ease infinite',
                    willChange: 'background-position'
                }}
            />

            {/* Minimal particles - only 8 for mobile */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: '1px',
                            height: '1px',
                            background: `rgba(${i % 3 === 0 ? '6, 182, 212' : i % 3 === 1 ? '168, 85, 247' : '236, 72, 153'}, 0.6)`,
                            animation: `subtlePulse ${3 + Math.random() * 2}s ease-in-out infinite ${i * 0.2}s`,
                            willChange: 'opacity'
                        }}
                    />
                ))}
            </div>

            <div className="relative text-center z-10 px-4 max-w-lg mx-auto will-transform-opacity">

                {/* Compact logo */}
                <div className="mb-6 flex justify-center will-transform">
                    <div className="relative w-16 h-16 md:w-20 md:h-20">
                        {/* Outer ring */}
                        <div 
                            className="absolute inset-0 border border-cyan-500/30 rounded-full will-transform"
                            style={{ 
                                animation: 'spin 20s linear infinite',
                            }} 
                        />
                        
                        {/* Inner ring */}
                        <div 
                            className="absolute inset-2 border border-purple-500/20 rounded-full will-transform"
                            style={{ 
                                animation: 'spin 15s linear infinite reverse',
                            }} 
                        />

                        {/* Center core */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div 
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full will-transform-opacity"
                                style={{ 
                                    animation: 'float 3s ease-in-out infinite',
                                    background: 'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.8), rgba(168, 85, 247, 0.6))',
                                    boxShadow: `
                                        0 0 20px rgba(6, 182, 212, 0.4),
                                        inset 0 0 20px rgba(255, 255, 255, 0.1)
                                    `
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Name with gradient */}
                <div 
                    className="mb-4 will-transform-opacity"
                    style={{ 
                        animation: 'fadeInUp 0.8s ease-out 0.2s both',
                    }}
                >
                    <h1 
                        className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight"
                        style={{ 
                            fontFamily: "'Orbitron', sans-serif",
                            background: 'linear-gradient(90deg, #06b6d4, #a855f7, #ec4899)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                            backgroundSize: '200% auto',
                            animation: 'gradientShift 3s ease infinite',
                            letterSpacing: '-0.025em'
                        }}
                    >
                        PIYUSH GUDHE
                    </h1>
                </div>

                {/* Subtle subtitle */}
                <div 
                    className="text-gray-300/80 text-xs sm:text-sm md:text-base mb-8 tracking-[0.2em] will-transform-opacity"
                    style={{ 
                        fontFamily: "'Space Mono', monospace",
                        animation: 'fadeInUp 0.8s ease-out 0.4s both',
                    }}
                >
                    <span>DEVELOPER</span>
                    <span className="text-cyan-300/50 mx-2">•</span>
                    <span>DESIGNER</span>
                    <span className="text-purple-300/50 mx-2">•</span>
                    <span>CREATOR</span>
                </div>

                {/* Compact progress system */}
                <div 
                    className="w-full max-w-xs mx-auto will-transform-opacity"
                    style={{ 
                        animation: 'fadeInUp 0.8s ease-out 0.6s both',
                    }}
                >

                    {/* Minimal progress bar */}
                    <div className="relative h-1 bg-zinc-800/50 overflow-hidden rounded-full mb-3">
                        <div 
                            className="h-full transition-all duration-300 ease-out origin-left will-transform"
                            style={{ 
                                transform: `scaleX(${progress / 100})`,
                                background: 'linear-gradient(90deg, #06b6d4, #a855f7)',
                                borderRadius: 'inherit'
                            }}
                        />
                        
                        {/* Shimmer only when active */}
                        {progress < 100 && (
                            <div className="absolute inset-0 overflow-hidden">
                                <div 
                                    className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-white/10 to-transparent will-transform"
                                    style={{ 
                                        animation: 'shimmer 1.5s ease-in-out infinite',
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Progress info - compact */}
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-gray-400 font-mono">
                            <div 
                                className={`w-1.5 h-1.5 rounded-full will-opacity ${phase === 'ready' ? 'bg-emerald-400' : 'bg-cyan-400'}`}
                                style={{
                                    animation: phase !== 'init' ? 'subtlePulse 1s ease-in-out infinite' : 'none'
                                }} 
                            />
                            <span className="text-[10px] tracking-wider">
                                {phase === 'init' ? 'INITIALIZING' : phase === 'loading' ? 'LOADING ASSETS' : 'READY'}
                            </span>
                        </div>
                        
                        <div className="font-mono font-bold text-cyan-300 text-sm">
                            {progress.toString().padStart(2, '0')}%
                        </div>
                    </div>

                    {/* Minimal system indicators */}
                    <div className="mt-6 flex justify-center gap-6">
                        {[
                            { label: 'CORE', color: 'cyan' },
                            { label: 'SYS', color: 'purple' },
                            { label: 'UI', color: 'pink' }
                        ].map((system, index) => (
                            <div key={system.label} className="flex flex-col items-center gap-1">
                                <div 
                                    className={`w-1.5 h-1.5 rounded-full will-opacity ${
                                        progress > (index * 33) ? `bg-${system.color}-400` : 'bg-zinc-700'
                                    }`}
                                    style={{
                                        animation: progress > (index * 33) ? 'subtlePulse 1.5s ease-in-out infinite' : 'none',
                                        animationDelay: `${index * 0.2}s`
                                    }} 
                                />
                                <span className={`text-[9px] tracking-wider font-mono ${
                                    progress > (index * 33) ? `text-${system.color}-300` : 'text-zinc-600'
                                }`}>
                                    {system.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Subtle corner accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-cyan-500/20 will-opacity" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-purple-500/20 will-opacity" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-pink-500/20 will-opacity" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-cyan-500/20 will-opacity" />

        </div>
    );
};

export default SplashScreen;