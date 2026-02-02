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
                    setTimeout(() => onFinish(), 1200);
                    return 100;
                }
                return next;
            });
        }, 45);

        return () => clearInterval(interval);
    }, [onFinish, phase]);

    return (
        <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden transition-all duration-1000 ${isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
            
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Orbitron:wght@400;500;700;900&display=swap');
                
                @keyframes gridFlow {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(30px, 30px); }
                }
                
                @keyframes orbPulse {
                    0%, 100% { transform: scale(1) translateY(0); opacity: 0.4; }
                    50% { transform: scale(1.2) translateY(-20px); opacity: 0.6; }
                }
                
                @keyframes orbPulse2 {
                    0%, 100% { transform: scale(1) translateY(0) translateX(0); opacity: 0.3; }
                    50% { transform: scale(1.3) translateY(20px) translateX(-30px); opacity: 0.5; }
                }
                
                @keyframes orbPulse3 {
                    0%, 100% { transform: scale(1) translateX(0); opacity: 0.25; }
                    50% { transform: scale(1.15) translateX(40px); opacity: 0.45; }
                }
                
                @keyframes particleFloat {
                    0% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) translateX(var(--drift, 20px)) scale(1); opacity: 0; }
                }
                
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
                
                @keyframes ringRotate {
                    from { transform: rotate(0deg) scale(1); }
                    to { transform: rotate(360deg) scale(1); }
                }
                
                @keyframes ringRotateReverse {
                    from { transform: rotate(360deg) scale(1); }
                    to { transform: rotate(0deg) scale(1); }
                }
                
                @keyframes hexExpand {
                    0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.3; }
                    50% { transform: scale(1.1) rotate(180deg); opacity: 0.6; }
                }
                
                @keyframes energyPulse {
                    0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.2); }
                    50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.8), 0 0 80px rgba(168, 85, 247, 0.6), inset 0 0 40px rgba(6, 182, 212, 0.4); }
                }
                
                @keyframes textReveal {
                    from { 
                        opacity: 0; 
                        transform: translateY(30px) rotateX(-90deg);
                        filter: blur(10px);
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0) rotateX(0deg);
                        filter: blur(0);
                    }
                }
                
                @keyframes letterGlow {
                    0%, 100% { 
                        text-shadow: 0 0 10px rgba(6, 182, 212, 0.5),
                                     0 0 20px rgba(168, 85, 247, 0.3),
                                     0 0 30px rgba(6, 182, 212, 0.2);
                    }
                    50% { 
                        text-shadow: 0 0 20px rgba(6, 182, 212, 0.8),
                                     0 0 40px rgba(168, 85, 247, 0.6),
                                     0 0 60px rgba(6, 182, 212, 0.4),
                                     0 0 80px rgba(168, 85, 247, 0.2);
                    }
                }
                
                @keyframes hologramFlicker {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                    51% { opacity: 1; }
                    61% { opacity: 0.9; }
                    62% { opacity: 1; }
                }
                
                @keyframes dataStream {
                    0% { transform: translateY(-100%) scaleY(0.5); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(100vh) scaleY(2); opacity: 0; }
                }
                
                @keyframes progressGlow {
                    0%, 100% { filter: brightness(1) drop-shadow(0 0 5px rgba(6, 182, 212, 0.5)); }
                    50% { filter: brightness(1.3) drop-shadow(0 0 15px rgba(6, 182, 212, 0.9)); }
                }
                
                @keyframes cornerExpand {
                    0% { width: 0; height: 0; opacity: 0; }
                    50% { opacity: 1; }
                    100% { width: 80px; height: 80px; opacity: 1; }
                }
                
                @keyframes hexagonPulse {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.05) rotate(60deg); }
                }
                
                @keyframes codeRain {
                    0% { transform: translateY(-100%); opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.6; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            `}</style>

            {/* Animated grid background with flow */}
            <div className="absolute inset-0 opacity-15">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(6, 182, 212, 0.15) 1.5px, transparent 1.5px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.15) 1.5px, transparent 1.5px)
                    `,
                    backgroundSize: '80px 80px',
                    animation: 'gridFlow 15s ease-in-out infinite'
                }} />
            </div>

            {/* Massive gradient orbs with advanced animations */}
            <div className="absolute w-[800px] h-[800px] bg-cyan-500/40 rounded-full blur-[150px]"
                style={{ animation: 'orbPulse 10s ease-in-out infinite', top: '10%', left: '20%' }} />
            <div className="absolute w-[700px] h-[700px] bg-purple-600/35 rounded-full blur-[130px]"
                style={{ animation: 'orbPulse2 12s ease-in-out infinite', bottom: '15%', right: '15%' }} />
            <div className="absolute w-[600px] h-[600px] bg-pink-500/25 rounded-full blur-[120px]"
                style={{ animation: 'orbPulse3 14s ease-in-out infinite', top: '40%', right: '25%' }} />
            <div className="absolute w-[650px] h-[650px] bg-blue-500/30 rounded-full blur-[140px]"
                style={{ animation: 'orbPulse 16s ease-in-out infinite reverse', bottom: '30%', left: '30%' }} />

            {/* Scanline effect */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    style={{ animation: 'scanline 4s linear infinite' }} />
            </div>

            {/* Enhanced particle system */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: '-20px',
                            width: `${2 + Math.random() * 3}px`,
                            height: `${2 + Math.random() * 3}px`,
                            background: i % 3 === 0 ? 'rgba(6, 182, 212, 0.7)' : i % 3 === 1 ? 'rgba(168, 85, 247, 0.6)' : 'rgba(236, 72, 153, 0.5)',
                            animation: `particleFloat ${8 + Math.random() * 8}s ease-in ${Math.random() * 5}s infinite`,
                            '--drift': `${-50 + Math.random() * 100}px`
                        } as React.CSSProperties}
                    />
                ))}
            </div>

            {/* Code rain effect */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute font-mono text-xs text-cyan-400"
                        style={{
                            left: `${i * 7}%`,
                            animation: `codeRain ${10 + Math.random() * 10}s linear ${Math.random() * 5}s infinite`
                        }}
                    >
                        {Array(20).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('')}
                    </div>
                ))}
            </div>

            {/* Data streams */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-px h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                        style={{
                            left: `${10 + i * 12}%`,
                            animation: `dataStream ${6 + Math.random() * 6}s ease-in ${Math.random() * 3}s infinite`
                        }}
                    />
                ))}
            </div>

            <div className="relative text-center z-10 px-4">

                {/* Central energy core logo */}
                <div className="mb-12 flex justify-center">
                    <div className="relative w-32 h-32">
                        
                        {/* Outer rotating rings */}
                        <div className="absolute inset-0 border-2 border-cyan-500/40 rounded-full"
                            style={{ animation: 'ringRotate 20s linear infinite' }} />
                        <div className="absolute inset-3 border-2 border-purple-500/40 rounded-full"
                            style={{ animation: 'ringRotateReverse 15s linear infinite' }} />
                        <div className="absolute inset-6 border border-pink-500/30 rounded-full"
                            style={{ animation: 'ringRotate 25s linear infinite' }} />
                        
                        {/* Hexagon layer */}
                        <div className="absolute inset-8 flex items-center justify-center"
                            style={{ animation: 'hexExpand 8s ease-in-out infinite' }}>
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <path
                                    d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z"
                                    fill="none"
                                    stroke="url(#hexGradient)"
                                    strokeWidth="2"
                                />
                                <defs>
                                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#06b6d4" />
                                        <stop offset="50%" stopColor="#a855f7" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        {/* Energy core */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-16 h-16 rounded-full"
                                style={{ animation: 'energyPulse 2s ease-in-out infinite' }}>
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full" />
                                <div className="absolute inset-1 bg-black rounded-full" />
                                <div className="absolute inset-3 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-full opacity-90" />
                            </div>
                        </div>

                        {/* Center dot */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"
                                style={{ 
                                    animation: 'energyPulse 1s ease-in-out infinite',
                                    boxShadow: '0 0 20px rgba(255,255,255,0.8)'
                                }} />
                        </div>
                    </div>
                </div>

                {/* Name with advanced holographic effect */}
                <div className="relative mb-6 perspective-1000"
                    style={{ animation: 'textReveal 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both' }}>
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter relative"
                        style={{ 
                            fontFamily: "'Orbitron', sans-serif",
                            animation: 'hologramFlicker 8s ease-in-out infinite'
                        }}>
                        <span className="relative inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                            style={{ animation: 'letterGlow 3s ease-in-out infinite' }}>
                            PIYUSH GUDHE
                        </span>
                    </h1>
                    
                    {/* Hologram scan lines */}
                    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
                        <div className="w-full h-px bg-cyan-400"
                            style={{ animation: 'scanline 3s linear infinite' }} />
                    </div>
                </div>

                {/* Subtitle with staggered reveal */}
                <div className="text-gray-400 text-xl md:text-3xl mb-16 font-light tracking-[0.4em]"
                    style={{ 
                        fontFamily: "'Space Mono', monospace",
                        animation: 'textReveal 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both'
                    }}>
                    <span className="inline-block" style={{ animationDelay: '0.7s', animation: 'textReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s both' }}>DEVELOPER</span>
                    <span className="text-cyan-400 mx-4">⬢</span>
                    <span className="inline-block" style={{ animationDelay: '0.9s', animation: 'textReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.9s both' }}>DESIGNER</span>
                    <span className="text-purple-400 mx-4">⬢</span>
                    <span className="inline-block" style={{ animationDelay: '1.1s', animation: 'textReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1.1s both' }}>CREATOR</span>
                </div>

                {/* Ultra-advanced loading system */}
                <div className="w-96 max-w-full mx-auto"
                    style={{ animation: 'textReveal 1s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s both' }}>

                    {/* Progress bar container with glow */}
                    <div className="relative h-2 bg-zinc-900/80 overflow-hidden rounded-full border border-cyan-500/30 backdrop-blur-sm"
                        style={{ 
                            boxShadow: '0 0 20px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.5)'
                        }}>
                        
                        {/* Animated background shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
                            style={{
                                animation: 'dataStream 3s ease-in-out infinite',
                                width: '40%'
                            }} />

                        {/* Main progress bar */}
                        <div
                            className="h-full relative transition-all duration-300 ease-out overflow-hidden"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Multi-layer gradient */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-90" />
                            
                            {/* Animated overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                style={{ 
                                    animation: 'dataStream 2s linear infinite',
                                    width: '50%'
                                }} />
                            
                            {/* Glow layers */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-400 blur-md opacity-70" />
                            
                            {/* Leading edge glow */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full blur-lg opacity-70"
                                style={{ animation: 'energyPulse 1s ease-in-out infinite' }} />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full" />
                        </div>
                    </div>

                    {/* Progress information */}
                    <div className="mt-6 flex items-center justify-between text-sm">
                        <div className="text-gray-500 tracking-[0.3em] font-mono flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"
                                style={{ animation: 'energyPulse 1s ease-in-out infinite' }} />
                            <span style={{ animation: 'hologramFlicker 3s ease-in-out infinite' }}>
                                {phase === 'init' ? 'INITIALIZING' : phase === 'loading' ? 'LOADING SYSTEMS' : 'READY'}
                            </span>
                        </div>
                        <div className="font-mono font-bold text-2xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                            style={{ animation: 'letterGlow 2s ease-in-out infinite' }}>
                            {progress.toString().padStart(3, '0')}%
                        </div>
                    </div>

                    {/* System status indicators */}
                    <div className="mt-8 flex justify-center gap-6">
                        {[
                            { label: 'CORE', threshold: 0 },
                            { label: 'NEURAL', threshold: 25 },
                            { label: 'QUANTUM', threshold: 50 },
                            { label: 'MATRIX', threshold: 75 }
                        ].map((system) => (
                            <div key={system.label} className="flex flex-col items-center gap-2">
                                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                    progress > system.threshold
                                        ? 'bg-cyan-400 scale-125'
                                        : 'bg-zinc-700 scale-100'
                                }`}
                                    style={{
                                        animation: progress > system.threshold ? 'energyPulse 1.5s ease-in-out infinite' : 'none',
                                        boxShadow: progress > system.threshold ? '0 0 15px rgba(6, 182, 212, 0.8)' : 'none'
                                    }} />
                                <span className={`text-[9px] tracking-[0.2em] font-mono transition-all duration-500 ${
                                    progress > system.threshold ? 'text-cyan-400' : 'text-zinc-600'
                                }`}>
                                    {system.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* System metrics */}
                    <div className="mt-6 grid grid-cols-3 gap-4 text-xs font-mono">
                        {[
                            { label: 'CPU', value: `${Math.min(100, progress * 0.98).toFixed(1)}%` },
                            { label: 'MEM', value: `${Math.min(100, progress * 0.85).toFixed(1)}%` },
                            { label: 'NET', value: `${Math.min(100, progress * 1.02).toFixed(1)}%` }
                        ].map((metric, i) => (
                            <div key={metric.label} className="bg-black/40 border border-cyan-500/20 rounded px-3 py-2 backdrop-blur-sm"
                                style={{ 
                                    animation: `textReveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${1.5 + i * 0.1}s both`
                                }}>
                                <div className="text-gray-500 mb-1">{metric.label}</div>
                                <div className="text-cyan-400 font-bold">{metric.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Corner accents with expand animation */}
            <div className="absolute top-6 left-6 border-l-2 border-t-2 border-cyan-500/40"
                style={{ animation: 'cornerExpand 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both' }} />
            <div className="absolute top-6 right-6 border-r-2 border-t-2 border-purple-500/40"
                style={{ animation: 'cornerExpand 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both' }} />
            <div className="absolute bottom-6 left-6 border-l-2 border-b-2 border-pink-500/40"
                style={{ animation: 'cornerExpand 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s both' }} />
            <div className="absolute bottom-6 right-6 border-r-2 border-b-2 border-cyan-500/40"
                style={{ animation: 'cornerExpand 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s both' }} />

            {/* Additional decorative elements */}
            <div className="absolute top-1/4 left-12 w-px h-24 bg-gradient-to-b from-cyan-500/50 to-transparent"
                style={{ animation: 'textReveal 1s ease-out 1s both' }} />
            <div className="absolute bottom-1/4 right-12 w-px h-24 bg-gradient-to-t from-purple-500/50 to-transparent"
                style={{ animation: 'textReveal 1s ease-out 1.2s both' }} />

        </div>
    );
};

export default SplashScreen;