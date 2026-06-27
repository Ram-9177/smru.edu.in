const fs = require('fs');

const targetPath = 'src/views/Campus360.tsx';
const content = fs.readFileSync(targetPath, 'utf8');

// Extract the SCENES array
const scenesStart = content.indexOf('const SCENES = [');
const scenesEnd = content.indexOf('];', scenesStart) + 2;
const scenesArray = content.substring(scenesStart, scenesEnd);

const newContent = `// @ts-nocheck
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SEO from "../components/SEO";
import { FaChevronLeft, FaPlay, FaPause, FaExpand, FaCompress, FaMapMarkerAlt, FaShareAlt } from "react-icons/fa";
import dynamic from "next/dynamic";

const Campus360Viewer = dynamic(() => import("@/components/Campus360Viewer"), {
  ssr: false,
});

${scenesArray}

export default function Campus360() {
  const [selectedScene, setSelectedScene] = useState(SCENES[0]);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: \`\${selectedScene.name} - St. Mary's University Virtual Tour\`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <main className="fixed inset-0 z-[9999] bg-[#000814] overflow-hidden flex flex-col font-outfit" style={{ width: '100vw', height: '100dvh' }}>
      <SEO
        title="Campus 360° Virtual Tour | St. Mary's Rehabilitation University"
        description="Explore St. Mary's Rehabilitation University campus in an immersive 360° virtual tour."
      />

      {/* 360 Viewer Layer */}
      <div className="absolute inset-0 z-0">
        <Campus360Viewer 
          panorama={selectedScene} 
          isAutoRotating={isAutoRotating}
          onMarkerClick={(targetPointId) => {
            const targetScene = SCENES.find(s => s.id === targetPointId);
            if (targetScene) setSelectedScene(targetScene);
          }}
        />
      </div>

      {/* Top Header Overlay - Glassmorphic */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-start p-4 md:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none">
        
        {/* Left: Logo & Back */}
        <div className="flex flex-col gap-4 pointer-events-auto">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-105 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              aria-label="Back to Home"
            >
              <FaChevronLeft className="text-white text-sm md:text-base pr-1" />
            </Link>
            <div className="hidden md:flex bg-white px-4 py-2 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-white/10">
              <img src="/assets/Logo.webp" alt="SMRU" className="h-8 md:h-10 w-auto" />
            </div>
          </div>
          
          <div className="md:hidden bg-white px-3 py-1.5 rounded-lg shadow-lg w-max">
            <img src="/assets/Logo.webp" alt="SMRU" className="h-6 w-auto" />
          </div>
        </div>
        
        {/* Right: Title & Meta */}
        <div className="flex flex-col items-end pointer-events-auto text-right max-w-[60vw]">
           <div className="flex items-center gap-2 mb-2">
             <span className="flex items-center justify-center w-2 h-2 rounded-full bg-[#ffaf3a] animate-pulse" />
             <span className="px-3 py-1 rounded-full bg-black/50 border border-white/20 text-[#ffaf3a] text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
               Virtual Tour
             </span>
           </div>
           <h1 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] leading-none text-right">
             {selectedScene.name}
           </h1>
           <div className="flex items-center gap-2 mt-3 opacity-80">
             <FaMapMarkerAlt className="text-[#019e6e] text-sm md:text-base drop-shadow-md" />
             <p className="text-xs md:text-sm font-bold tracking-widest text-white drop-shadow-md uppercase">
               Deshmukhi Campus
             </p>
           </div>
        </div>
      </div>

      {/* Controls Overlay (Right side middle) */}
      <div className="absolute top-1/2 right-4 md:right-6 -translate-y-1/2 z-10 flex flex-col gap-3 pointer-events-auto">
         <button 
           onClick={() => setIsAutoRotating(!isAutoRotating)}
           className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/60 border border-white/20 backdrop-blur-md hover:bg-[#019e6e] hover:border-[#019e6e] hover:scale-110 active:scale-95 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.4)] group"
           title={isAutoRotating ? "Pause Rotation" : "Auto Rotate"}
         >
           {isAutoRotating ? <FaPause className="text-white/90 group-hover:text-white" /> : <FaPlay className="ml-1 text-white/90 group-hover:text-white" />}
         </button>
         
         <button 
           onClick={toggleFullscreen}
           className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/60 border border-white/20 backdrop-blur-md hover:bg-[#ffaf3a] hover:border-[#ffaf3a] hover:text-[#0d315c] hover:scale-110 active:scale-95 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.4)] group"
           title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
         >
           {isFullscreen ? <FaCompress className="text-white/90 group-hover:text-[#0d315c]" /> : <FaExpand className="text-white/90 group-hover:text-[#0d315c]" />}
         </button>

         <button 
           onClick={handleShare}
           className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/60 border border-white/20 backdrop-blur-md hover:bg-white/20 hover:scale-110 active:scale-95 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.4)] group mt-4"
           title="Share Scene"
         >
           <FaShareAlt className="text-white/90 group-hover:text-white" />
         </button>
      </div>

      {/* Bottom Thumbnails Carousel (BITS Pilani Style) */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent pt-16 pb-4 md:pb-6 px-4 pointer-events-auto">
         <div className="max-w-[1600px] mx-auto">
            <div className="flex items-center justify-between mb-3 px-2">
              <h3 className="text-[10px] md:text-xs font-black text-white/70 uppercase tracking-[0.3em]">Explore Locations</h3>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest hidden sm:block">Scroll to see more →</p>
            </div>
            
            <div className="flex overflow-x-auto gap-3 pb-4 snap-x hide-scrollbar scroll-smooth">
              {SCENES.map((scene) => {
                const isActive = selectedScene.id === scene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedScene(scene)}
                    className={\`group relative w-[140px] h-[90px] md:w-[180px] md:h-[110px] shrink-0 snap-start rounded-xl overflow-hidden transition-all duration-500 \${
                      isActive 
                        ? "ring-[3px] ring-[#019e6e] ring-offset-[3px] ring-offset-black scale-100 shadow-[0_0_20px_rgba(1,158,110,0.4)]" 
                        : "opacity-60 hover:opacity-100 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    }\`}
                  >
                    <Image
                      src={scene.src}
                      alt={scene.name}
                      fill
                      sizes="(max-width: 768px) 140px, 180px"
                      className={\`object-cover transition-transform duration-700 \${isActive ? "scale-110" : "group-hover:scale-110"}\`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    {isActive && (
                      <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-[#019e6e] shadow-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                      <p className={\`text-[9px] md:text-[11px] font-black uppercase tracking-wide leading-tight drop-shadow-md line-clamp-2 \${isActive ? "text-[#ffaf3a]" : "text-white"}\`}>
                        {scene.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
         </div>
      </div>

      {/* Global overrides for Campus360Viewer to hide its native navbar and loaders to use ours */}
      <style dangerouslySetInnerHTML={{__html: \`
        .hide-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 10px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.4);
        }
        /* Hide the native PhotoSphereViewer Navbar since we have our custom UI */
        .psv-navbar {
          display: none !important;
        }
        .psv-loader-container {
           /* Keep loader but style it minimal */
           background: rgba(0,0,0,0.8) !important;
           backdrop-filter: blur(10px) !important;
        }
      \`}} />
    </main>
  );
}
`;

fs.writeFileSync(targetPath, newContent);
console.log('Successfully rewrote Campus360.tsx with custom BITS Pilani style layout.');
