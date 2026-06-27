/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { FaSyncAlt } from "react-icons/fa";

interface Campus360ViewerProps {
  panorama: {
    src: string;
    preview?: string;
    alt: string;
    caption?: string;
    projection?: "equirectangular" | "flat";
    initialYaw?: number;
    initialPitch?: number;
    initialZoom?: number;
    markers?: Array<{
      id: string;
      targetPointId: string;
      yaw: number;
      pitch: number;
      label: string;
    }>;
  };
  onMarkerClick?: (targetPointId: string) => void;
  isAutoRotating?: boolean;
}

type PanoramaMarker = NonNullable<Campus360ViewerProps["panorama"]["markers"]>[number];

const markerHtml = `<div style="width: 32px; height: 32px; background: rgba(1,158,110,0.8); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); cursor: pointer;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>`;

function viewerMarkers(markers: PanoramaMarker[] = []) {
  return markers.map((marker) => ({
    id: marker.id,
    position: { yaw: marker.yaw, pitch: marker.pitch },
    tooltip: marker.label,
    html: markerHtml,
    anchor: "center center",
    data: { targetPointId: marker.targetPointId },
  }));
}

export default function Campus360Viewer({ panorama, onMarkerClick, isAutoRotating = true }: Campus360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const loadedPanoramaRef = useRef<string>("");
  const panoramaRef = useRef(panorama);
  const onMarkerClickRef = useRef(onMarkerClick);
  const loadRequestRef = useRef(0);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [autoRotate, setAutoRotate] = useState(isAutoRotating);
  const [loading, setLoading] = useState(true);
  const isFlatImage = panorama.projection === "flat";

  panoramaRef.current = panorama;
  onMarkerClickRef.current = onMarkerClick;

  // Sync internal state with prop
  useEffect(() => {
    setAutoRotate(isAutoRotating);
  }, [isAutoRotating]);

  const loadPanorama = useCallback(async (
    viewer: Viewer,
    nextPanorama: Campus360ViewerProps["panorama"],
    transition: boolean,
  ) => {
    const requestId = ++loadRequestRef.current;
    setError(false);
    setLoading(true);

    try {
      const completed = await viewer.setPanorama(nextPanorama.src, {
        position: {
          yaw: nextPanorama.initialYaw || 0,
          pitch: nextPanorama.initialPitch || 0,
        },
        zoom: nextPanorama.initialZoom || 0,
        caption: nextPanorama.caption,
        transition,
      });

      if (requestId !== loadRequestRef.current || completed === false) return;

      loadedPanoramaRef.current = nextPanorama.src;
      const markersPlugin = viewer.getPlugin(MarkersPlugin) as MarkersPlugin;
      markersPlugin?.setMarkers(viewerMarkers(nextPanorama.markers));
      setLoading(false);
    } catch {
      if (requestId !== loadRequestRef.current) return;
      setLoading(false);
      setError(true);
    }
  }, []);

  // 1. Initial mounting of the viewer
  useEffect(() => {
    if (isFlatImage || !containerRef.current || typeof window === "undefined") {
      setLoading(false);
      return;
    }

    let viewer: Viewer | null = null;
    let cancelled = false;

    // A short macrotask delay prevents React Strict Mode's development-only
    // mount/unmount probe from starting and immediately aborting a texture fetch.
    const initializeTimer = window.setTimeout(() => {
      if (cancelled || !containerRef.current) return;

      try {
        viewer = new Viewer({
          container: containerRef.current,
          caption: panoramaRef.current.caption,
          defaultYaw: panoramaRef.current.initialYaw || 0,
          defaultPitch: panoramaRef.current.initialPitch || 0,
          defaultZoomLvl: panoramaRef.current.initialZoom || 0,
          minFov: 10,
          maxFov: 100,
          moveSpeed: 1.5,
          zoomSpeed: 2,
          rendererParameters: {
            alpha: true,
            antialias: true,
          },
          mousewheelCtrlKey: false,
          touchmoveTwoFingers: false,
          navbar: [
            {
              id: "zoom-out-btn",
              title: "Zoom Out",
              content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M5 11h14v2H5z"/></svg>`,
              onClick: () => {
                if (viewerRef.current) {
                  viewerRef.current.zoom(Math.max(0, viewerRef.current.getZoomLevel() - 20));
                }
              },
            },
            "move",
            "caption",
            "fullscreen",
          ],
          plugins: [[MarkersPlugin, { markers: [] }]],
        });

        viewerRef.current = viewer;
        loadedPanoramaRef.current = "";

        const markersPlugin = viewer.getPlugin(MarkersPlugin) as MarkersPlugin;
        markersPlugin.addEventListener("select-marker", (event: any) => {
          const targetPointId = event.marker.config.data?.targetPointId;
          if (targetPointId) onMarkerClickRef.current?.(targetPointId);
        });

        void loadPanorama(viewer, panoramaRef.current, false);
      } catch {
        setLoading(false);
        setError(true);
      }
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(initializeTimer);
      loadRequestRef.current += 1;
      if (viewer) {
        try {
          viewer.destroy();
        } catch (e) {
          console.warn("Error destroying viewer:", e);
        }
      }
      if (viewerRef.current === viewer) viewerRef.current = null;
      loadedPanoramaRef.current = "";
    };
  }, [isFlatImage, loadPanorama, retryCount]);

  // 2. Dynamically swap panorama texture and markers when panorama prop changes
  useEffect(() => {
    const viewer = viewerRef.current;
    if (isFlatImage || !viewer || loadedPanoramaRef.current === panorama.src) return;
    void loadPanorama(viewer, panorama, true);
  }, [isFlatImage, loadPanorama, panorama]);

  // Handle custom auto-rotation animation frame loop
  useEffect(() => {
    let active = true;
    let animationFrameId: number;
    const rotateSpeed = 0.0006; // Radians per frame (slow and cinematic)

    const rotateLoop = () => {
      if (!active) return;
      if (!isFlatImage && viewerRef.current && autoRotate) {
        try {
          const pos = viewerRef.current.getPosition();
          viewerRef.current.rotate({
            yaw: pos.yaw + rotateSpeed,
            pitch: pos.pitch
          });
        } catch (e) {
          // Ignore errors during destroy
        }
      }
      animationFrameId = requestAnimationFrame(rotateLoop);
    };

    animationFrameId = requestAnimationFrame(rotateLoop);

    return () => {
      active = false;
      cancelAnimationFrame(animationFrameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRotate, isFlatImage, panorama]);

  if (isFlatImage) {
    return (
      <div
        className="absolute inset-0 overflow-hidden bg-slate-950"
        data-panorama-state="ready"
      >
        <img
          src={panorama.src}
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-3xl opacity-50"
        />
        <img
          src={panorama.src}
          alt={panorama.alt || "Campus location"}
          className="relative z-10 h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 group overflow-hidden"
      data-panorama-state={error ? "error" : loading ? "loading" : "ready"}
      style={{ width: "100%", height: "100%", backgroundColor: "#000814" }}
    >
      {/* Blurred background image to fill black areas for non-360 photos */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
        <img 
          src={panorama.src} 
          alt="" 
          className="h-full w-full object-cover blur-3xl scale-125 opacity-60 brightness-75 transition-opacity duration-1000"
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .psv-loader {
          display: none !important;
        }
        .psv-navbar {
          background: linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0)) !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}} />

      <div 
        ref={containerRef} 
        className="absolute inset-0"
        style={{ width: '100%', height: '100%', display: 'block' }}
        aria-label={panorama.alt || "360-degree panorama"} 
      />

      {error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/90 p-6 text-center text-white backdrop-blur-md">
          <p className="mb-4 text-sm font-bold">This 360° view could not be loaded.</p>
          <button
            type="button"
            onClick={() => {
              setError(false);
              setRetryCount((count) => count + 1);
            }}
            className="flex items-center gap-2 rounded-full bg-[#019e6e] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#017a55]"
          >
            <FaSyncAlt /> Retry panorama
          </button>
        </div>
      )}

      {/* Premium Glassmorphic Loading Screen Overlay */}
      {loading && !error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
          {/* Dark background overlay */}
          <div className="absolute inset-0 z-0 bg-slate-950/80" />

          <div className="relative z-10 flex flex-col items-center justify-center p-8 rounded-[2.5rem] bg-slate-950/80 border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.5)] backdrop-blur-xl max-w-xs text-center text-white">
            {/* Sleek rotating ring spinner with pulsed inner core */}
            <div className="relative mb-6 h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-[#019e6e] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
              <div className="absolute inset-4 rounded-full bg-[#019e6e]/20 animate-pulse flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-[#019e6e]"></div>
              </div>
            </div>
            
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">High Quality 360°</h3>
            <p className="mt-2 text-sm font-black text-[#019e6e] uppercase tracking-wide truncate max-w-[220px]">
              {panorama.caption || "Campus Area"}
            </p>
            <p className="mt-4 text-[9px] text-white/50 tracking-widest uppercase font-bold">
              Initializing WebGL Canvas…
            </p>
          </div>
        </div>
      )}

      <div className="absolute top-4 left-4 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="rounded-full bg-black/50 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold text-white tracking-widest uppercase shadow-lg border border-white/10">
          Drag to look around
        </div>
      </div>
    </div>
  );
}
