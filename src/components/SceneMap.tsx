'use client';

import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, useGLTF } from '@react-three/drei';
import { View, views } from '@/data/views';

interface SceneMapProps {
    currentView: View;
    onSelectView: (view: View) => void;
}

export default function SceneMap({ currentView, onSelectView }: SceneMapProps) {
    const [hoveredView, setHoveredView] = useState<View | null>(null);

    return (
        <div className="relative w-full h-full bg-transparent">
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
                <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.1} />
                <Environment preset="city" />
            </Canvas>

            {/* Floating Hover Label */}
            {hoveredView && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white/95 shadow-lg text-slate-800 px-4 py-2 rounded-full pointer-events-none transition-all duration-200 ease-out z-10 flex items-center gap-2 border border-slate-100">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="font-medium whitespace-nowrap">{hoveredView.label}</span>
                    <span className="text-xs text-slate-400 ml-1 hidden sm:inline">| Click para ver</span>
                </div>
            )}

            {/* Interior Sites Menu */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-2 z-10">
                <p className="text-[10px] sm:text-xs text-slate-800 font-bold mb-1 uppercase tracking-wider text-right">Zonas Interiores</p>
                {views.filter(v => v.id.startsWith('interior')).map(view => (
                    <button
                        key={view.id}
                        className={`text-xs px-3 py-1.5 rounded-lg text-right font-medium transition-colors shadow-sm
                            ${currentView.id === view.id
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white/90 text-slate-700 hover:bg-white border-slate-200'} border`}
                        onClick={() => onSelectView(view)}
                        onMouseEnter={() => setHoveredView(view)}
                        onMouseLeave={() => setHoveredView(null)}
                    >
                        {view.label}
                    </button>
                ))}
            </div>

            {/* Instructions */}
            <div className="absolute bottom-6 w-full flex justify-center pointer-events-none px-4">
                <p className="bg-white/80 backdrop-blur text-slate-600 text-[11px] sm:text-xs px-4 py-2 rounded-full shadow-sm text-center">
                    Gira el modelo y haz clic en las caras brillantes o en el menú
                </p>
            </div>
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
    const MODEL_URL = 'https://arqui_3D.supabase.co/storage/v1/object/public/models/cafeteria_v2.glb';
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
            opacity: isActive ? 0.3 : (isHovered ? 0.2 : 0.05),
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
                    position={[0, 0, 3.3]}
                    onPointerOver={(e) => handlePointerOver(e, 'front')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'front')}
                >
                    <planeGeometry args={[6.6, 4.4]} />
                    <meshStandardMaterial {...getMaterialOptions('front')} />
                </mesh>

                {/* Vista Izquierda (Left Face) */}
                <mesh
                    position={[-3.3, 0, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'left')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'left')}
                >
                    <planeGeometry args={[6.6, 4.4]} />
                    <meshStandardMaterial {...getMaterialOptions('left')} />
                </mesh>

                {/* Vista Derecha (Right Face)  */}
                <mesh
                    position={[3.3, 0, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'right')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'right')}
                >
                    <planeGeometry args={[6.6, 4.4]} />
                    <meshStandardMaterial {...getMaterialOptions('right')} />
                </mesh>

                {/* Vista Trasera (Back Face) */}
                <mesh
                    position={[0, 0, -3.3]}
                    rotation={[0, Math.PI, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'back')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'back')}
                >
                    <planeGeometry args={[6.6, 4.4]} />
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

            {/* Interior Cubes Group */}
            <group position={[0, 0, 0]}>
                {/* Lobby Principal */}
                <mesh
                    position={[-1, 0.5, 1]}
                    onPointerOver={(e) => handlePointerOver(e, 'interior_1')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'interior_1')}
                >
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial {...getMaterialOptions('interior_1')} />
                </mesh>

                {/* Zona Norte */}
                <mesh
                    position={[1.5, 0.5, 0]}
                    onPointerOver={(e) => handlePointerOver(e, 'interior_2')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'interior_2')}
                >
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial {...getMaterialOptions('interior_2')} />
                </mesh>

                {/* Zona Sur */}
                <mesh
                    position={[-1.5, 0.5, -1]}
                    onPointerOver={(e) => handlePointerOver(e, 'interior_3')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'interior_3')}
                >
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial {...getMaterialOptions('interior_3')} />
                </mesh>

                {/* Pasillos */}
                <mesh
                    position={[0, 0.5, -2]}
                    onPointerOver={(e) => handlePointerOver(e, 'interior_4')}
                    onPointerOut={handlePointerOut}
                    onClick={(e) => handleClick(e, 'interior_4')}
                >
                    <boxGeometry args={[0.5, 0.5, 0.5]} />
                    <meshStandardMaterial {...getMaterialOptions('interior_4')} />
                </mesh>
            </group>
        </group>
    );
}

// Recuerda actualizar esta URL también si la cambias arriba, o puedes usar la misma constante si la exportas.
useGLTF.preload('https://arqui_3D.supabase.co/storage/v1/object/public/models/cafeteria_v2.glb');
