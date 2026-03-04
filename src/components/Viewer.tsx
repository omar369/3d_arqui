'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { View } from '@/data/views';

interface ViewerProps {
    currentView: View;
}

export default function Viewer({ currentView }: ViewerProps) {
    const [displayedImage, setDisplayedImage] = useState(currentView.image);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        if (currentView.image !== displayedImage) {
            setFade(false);
            const timeout = setTimeout(() => {
                setDisplayedImage(currentView.image);
                setFade(true);
            }, 300); // 300ms fade transition
            return () => clearTimeout(timeout);
        }
    }, [currentView, displayedImage]);

    return (
        <div className="relative w-full h-full bg-gray-900 flex items-center justify-center overflow-hidden">
            {/* Background placeholder while loading image or no image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <span className="text-xl font-light tracking-widest">CARGANDO RENDER...</span>
            </div>

            <Image
                src={displayedImage}
                alt={currentView.label}
                fill
                className={`object-cover transition-opacity duration-300 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'
                    }`}
            />

            {/* Overlay label */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-2xl pointer-events-none shadow-xl flex flex-col items-center">
                <h2 className="text-2xl font-bold tracking-wide">{currentView.label}</h2>
                <p className="text-xs text-gray-300 uppercase tracking-widest mt-1">Renderizado Arquitectónico</p>
            </div>
        </div>
    );
}
