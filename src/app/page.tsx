'use client';

import React, { useState } from 'react';
import Viewer from '@/components/Viewer';
import SceneMap from '@/components/SceneMap';
import { views } from '@/data/views';

export default function Home() {
  const [currentView, setCurrentView] = useState(views[0]);

  return (
    <main className="relative w-screen h-screen overflow-hidden text-slate-900 bg-slate-900 font-sans">

      {/* Main Render Viewer (Background) */}
      <div className="absolute inset-0 z-0">
        <Viewer currentView={currentView} />
      </div>

      {/* Floating 3D Map Widget */}
      <div className="absolute top-6 right-6 md:top-auto md:bottom-6 md:left-6 w-[90vw] md:w-[400px] xl:w-[480px] h-[45vh] md:h-[400px] xl:h-[450px] shrink-0 z-10 overflow-hidden transition-all bg-transparent pointer-events-auto">
        <SceneMap currentView={currentView} onSelectView={setCurrentView} />
      </div>

    </main >
  );
}
