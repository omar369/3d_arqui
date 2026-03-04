'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { View } from '@/data/views';

interface ViewerProps {
    currentView: View;
    isFullScreen?: boolean;
    onToggleFullScreen?: () => void;
}

export default function Viewer({ currentView, isFullScreen, onToggleFullScreen }: ViewerProps) {
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



        </div>
    );
}
