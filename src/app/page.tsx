'use client';

import React, { useState } from 'react';
import Viewer from '@/components/Viewer';
import SceneMap from '@/components/SceneMap';
import { views } from '@/data/views';

export default function Home() {
  const [currentView, setCurrentView] = useState(views[0]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <main className="relative w-screen h-screen overflow-hidden text-slate-900 bg-slate-900 font-sans flex flex-col md:block">

      {/* Main Render Viewer (Background) */}
      <div className="relative w-full h-[50vh] md:absolute md:inset-0 md:h-full z-0">
        <Viewer
          currentView={currentView}
          isFullScreen={isFullScreen}
          onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
        />
      </div>

      {/* Floating 3D Map Widget */}
      <div
        className={`transition-all overflow-hidden pointer-events-auto shrink-0 z-10 
          ${isFullScreen
            ? "absolute inset-0 w-full h-full bg-slate-900 z-50"
            : "relative w-full h-[50vh] md:absolute md:bottom-6 md:left-6 md:w-[400px] xl:w-[480px] md:h-[400px] xl:h-[450px] bg-slate-800 md:bg-transparent"
          }`}
      >
        <SceneMap
          currentView={currentView}
          onSelectView={setCurrentView}
          isFullScreen={isFullScreen}
          onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
        />
      </div>

    </main >
  );
}
