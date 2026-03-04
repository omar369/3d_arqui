'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, useGLTF } from '@react-three/drei';
import { View, views } from '@/data/views';

// Error Boundary para evitar que toda la página se rompa si falla el modelo 3D
class ModelErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("Error al cargar el modelo 3D desde el CDN:", error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-inner">
                    <svg className="w-10 h-10 text-slate-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-slate-300 text-sm font-medium text-center px-4">
                        El modelo 3D no está disponible.
                    </p>
                    <p className="text-slate-500 text-xs text-center px-4 mt-1">
                        Puedes seguir usando el menú interactivo.
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

interface SceneMapProps {
    currentView: View;
    onSelectView: (view: View) => void;
    isFullScreen?: boolean;
    onToggleFullScreen?: () => void;
}

export default function SceneMap({ currentView, onSelectView, isFullScreen, onToggleFullScreen }: SceneMapProps) {
    const [hoveredView, setHoveredView] = useState<View | null>(null);

    return (
        <div className="relative w-full h-full bg-transparent">
            {/* Model Error Boundary Wrap */}
            <ModelErrorBoundary>
                <Canvas camera={{ position: [5, 4, 6], fov: 45 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />

                    {/* Simple Building Representation */}
                    <group position={[0, -0.5, 0]}>
                        <BuildingModel
                            currentView={currentView}
                            onSelectView={onSelectView}
                            setHoveredView={setHoveredView}
                        />
                    </group>

                    <ContactShadows position={[0, -0.51, 0]} opacity={0.5} scale={15} blur={2.5} far={4} color="#1e293b" />
                    <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enablePan={true} minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.1} />
                    <Environment preset="city" />
                </Canvas>
            </ModelErrorBoundary>

            {/* Floating Hover Label (REMOVED as requested) */}

            {/* Interior Sites Menu */}
            <div className="absolute top-2 left-2 md:top-auto md:left-auto md:bottom-2 md:right-2 flex flex-col md:items-end gap-1 md:gap-1.5 z-10 pointer-events-auto max-w-[95%] md:max-w-[180px]">
                <p className="text-[9px] text-slate-300 md:text-slate-400 font-bold mb-0.5 md:mb-0 uppercase tracking-wider text-left md:text-right shrink-0">
                    Interiores
                </p>
                <div className="flex flex-row flex-wrap md:justify-end gap-1 max-w-[80vw] md:max-w-full">
                    {views.filter(v => v.id.startsWith('interior')).map(view => (
                        <button
                            key={view.id}
                            className={`text-[9px] px-2 py-1 md:px-1.5 md:py-0.5 rounded-md text-left md:text-center font-medium transition-colors shadow-sm border backdrop-blur-md shrink-0
                                ${currentView.id === view.id
                                    ? 'bg-blue-600 text-white border-blue-500 shadow-blue-900/50'
                                    : 'bg-slate-700/80 text-slate-200 hover:bg-slate-600 border-slate-600/80 md:bg-slate-800/70 md:text-slate-200 md:hover:bg-slate-700/80 md:border-slate-600/70'}`}
                            onClick={() => onSelectView(view)}
                            onMouseEnter={() => setHoveredView(view)}
                            onMouseLeave={() => setHoveredView(null)}
                        >
                            {view.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Toggle Fullscreen Button (Bottom Left on 3D Canvas) */}
            {onToggleFullScreen && (
                <button
                    onClick={onToggleFullScreen}
                    className="absolute bottom-2 left-2 md:bottom-4 md:left-4 z-50 bg-slate-800/80 backdrop-blur-md text-white p-2 md:p-3 rounded-full border border-slate-600/50 hover:bg-slate-700/90 transition-all shadow-lg pointer-events-auto flex items-center justify-center"
                    title={isFullScreen ? "Minimizar Modelo 3D" : "Expandir Modelo 3D"}
                >
                    {isFullScreen ? (
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 3v3h-3m16 0h-3v-3M3 16h3v3m15 0v-3h-3m-6-8l-4-4m14 4l-4-4M4 20l4-4m12 4l-4-4" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    )}
                </button>
            )}


        </div>
    );
}

function BuildingModel({
    currentView,
    onSelectView,
    setHoveredView
}: {
    currentView: View;
    onSelectView: (v: View) => void;
    setHoveredView: (v: View | null) => void;
}) {
    // TODO: Pega aquí la URL pública que te dio Supabase (Paso 5 de la imagen)
    const MODEL_URL = 'https://awtjgufmxargxdzrfdxr.supabase.co/storage/v1/object/public/models/cafeteria_v2.glb';
    const { scene } = useGLTF(MODEL_URL);
    const [localHover, setLocalHover] = React.useState<string | null>(null);

    const handlePointerOver = (e: any, viewId: string) => {
        e.stopPropagation();
        const view = views.find(v => v.id === viewId);
        if (view) setHoveredView(view);
        setLocalHover(viewId);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHoveredView(null);
        setLocalHover(null);
        document.body.style.cursor = 'auto';
    };

    const handleClick = (e: any, viewId: string) => {
        e.stopPropagation();
        const view = views.find(v => v.id === viewId);
        if (view) onSelectView(view);
    };

    const getMaterialOptions = (viewId: string) => {
        const isActive = currentView.id === viewId;
        const isHovered = localHover === viewId;
        return {
            color: isHovered || isActive ? '#3b82f6' : '#94a3b8',
            emissive: isActive ? '#1d4ed8' : '#000000',
            emissiveIntensity: isActive ? 0.4 : 0,
            transparent: true,
            opacity: isActive ? 0.3 : (isHovered ? 0.2 : 0.02),
            roughness: 0.2,
            metalness: 0.5,
            side: 2 as const,
            depthWrite: false,
        };
    };

    return (
        <group>
            {/* El modelo 3D cargado */}
            <primitive object={scene} position={[0, 0, 0]} scale={0.5} />

            {/* Contenedor unificado para las 5 caras de la caja delimitadora interactiva */}
            <group position={[-1.5, 0, -1.5]}>

                {/* Fachada Principal (Front Face) */}
                <mesh
                    position={[0, 0.9, 3.3]}
                    onPointerOver={(e) => handlePointerOver(e, 'front')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'front')}
                >
                    <planeGeometry args={[2.0, 2.6]} />
                    <meshStandardMaterial {...getMaterialOptions('front')} />
                </mesh>

                {/* Esquina Frontal-Izquierda (Front-Left Face) */}
                <mesh
                    position={[-2.3, 0.9, 2.3]}
                    rotation={[0, -Math.PI / 4, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'front_left')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'front_left')}
                >
                    <planeGeometry args={[1.5, 2.6]} />
                    <meshStandardMaterial {...getMaterialOptions('front_left')} />
                </mesh>

                {/* Esquina Frontal-Derecha (Front-Right Face) */}
                <mesh
                    position={[2.3, 0.9, 2.3]}
                    rotation={[0, Math.PI / 4, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'front_right')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'front_right')}
                >
                    <planeGeometry args={[1.5, 2.6]} />
                    <meshStandardMaterial {...getMaterialOptions('front_right')} />
                </mesh>

                {/* Vista Izquierda (Left Face) */}
                <mesh
                    position={[-3.3, 0.9, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'left')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'left')}
                >
                    <planeGeometry args={[2.0, 2.6]} />
                    <meshStandardMaterial {...getMaterialOptions('left')} />
                </mesh>

                {/* Vista Derecha (Right Face)  */}
                <mesh
                    position={[3.3, 0.9, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'right')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'right')}
                >
                    <planeGeometry args={[2.0, 2.6]} />
                    <meshStandardMaterial {...getMaterialOptions('right')} />
                </mesh>

                {/* Esquina Trasera-Izquierda (Back-Left Face) */}
                <mesh
                    position={[-2.3, 0.9, -2.3]}
                    rotation={[0, -Math.PI * 0.75, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'back_left')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'back_left')}
                >
                    <planeGeometry args={[1.5, 2.6]} />
                    <meshStandardMaterial {...getMaterialOptions('back_left')} />
                </mesh>

                {/* Esquina Trasera-Derecha (Back-Right Face) */}
                <mesh
                    position={[2.3, 0.9, -2.3]}
                    rotation={[0, Math.PI * 0.75, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'back_right')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'back_right')}
                >
                    <planeGeometry args={[1.5, 2.6]} />
                    <meshStandardMaterial {...getMaterialOptions('back_right')} />
                </mesh>

                {/* Vista Trasera (Back Face) */}
                <mesh
                    position={[0, 0.9, -3.3]}
                    rotation={[0, Math.PI, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'back')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'back')}
                >
                    <planeGeometry args={[2.0, 2.6]} />
                    <meshStandardMaterial {...getMaterialOptions('back')} />
                </mesh>

                {/* Vista Superior (Top Face) */}
                <mesh
                    position={[0, 2.2, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'top')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'top')}
                >
                    <planeGeometry args={[6.6, 6.6]} />
                    <meshStandardMaterial {...getMaterialOptions('top')} />
                </mesh>
            </group>
        </group>
    );
}

// Recuerda actualizar esta URL también si la cambias arriba, o puedes usar la misma constante si la exportas.
useGLTF.preload('https://awtjgufmxargxdzrfdxr.supabase.co/storage/v1/object/public/models/cafeteria_v2.glb');
