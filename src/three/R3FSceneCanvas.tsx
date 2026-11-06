import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  createAcademicBookGroup,
  createAcademicMaterials,
  createGlassOrbGroup,
  createGoldenParticles,
  createGraduationCapGroup,
  createKnowledgeArmillaryGroup,
  createMathSymbolGroup,
  createMoleculeGroup,
  createOpenBookGroup,
  createPencilGroup,
  type AcademicMaterialSet,
  type ParticleDatum,
} from './academicModels';

export type R3FSceneVariant = 'hero' | 'methodology';

interface R3FSceneCanvasProps {
  variant: R3FSceneVariant;
  className?: string;
  interactive?: boolean;
}

interface FloatingItemConfig {
  create: (mats: AcademicMaterialSet, geos: THREE.BufferGeometry[]) => THREE.Group;
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
  floatAmp: number;
  floatFreq: number;
  rotSpeed: [number, number, number];
  phase: number;
  parallaxDepth: number;
}

const _dummy = new THREE.Object3D();

// R3F Component for individual floating 3D objects with mouse parallax
const FloatingObject: React.FC<{
  config: FloatingItemConfig;
  materials: AcademicMaterialSet;
  geometries: THREE.BufferGeometry[];
  pointerDamped: { x: number; y: number };
  isNarrow: boolean;
  variant: R3FSceneVariant;
}> = ({ config, materials, geometries, pointerDamped, isNarrow, variant }) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshObj = useMemo(() => {
    return config.create(materials, geometries);
  }, [config, materials, geometries]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.getElapsedTime();

    const floatY = Math.sin(elapsed * config.floatFreq + config.phase) * config.floatAmp;
    const floatX = Math.cos(elapsed * config.floatFreq * 0.7 + config.phase) * (config.floatAmp * 0.45);

    const isMobileHero = isNarrow && variant === 'hero';
    const mobileYSpread = isMobileHero ? 1.62 : 1.0;
    const mobileXSpread = isMobileHero ? 0.65 : 1.0;

    groupRef.current.position.x =
      config.pos[0] * mobileXSpread + floatX + pointerDamped.x * config.parallaxDepth;
    groupRef.current.position.y =
      config.pos[1] * mobileYSpread + floatY + pointerDamped.y * config.parallaxDepth;
    groupRef.current.position.z = isMobileHero ? config.pos[2] - 1.4 : config.pos[2];

    const targetScale = isMobileHero ? config.scale * 0.64 : config.scale;
    groupRef.current.scale.setScalar(targetScale);

    groupRef.current.rotation.x =
      config.rot[0] + Math.sin(elapsed * 0.5 + config.phase) * 0.14 + pointerDamped.y * 0.15;
    groupRef.current.rotation.y =
      config.rot[1] + elapsed * config.rotSpeed[1] + pointerDamped.x * 0.22;
    groupRef.current.rotation.z =
      config.rot[2] + Math.cos(elapsed * 0.45 + config.phase) * 0.1;
  });

  return (
    <group ref={groupRef} position={config.pos} rotation={config.rot} scale={config.scale}>
      <primitive object={meshObj} />
    </group>
  );
};

// R3F Golden Particle Cloud
const GoldenParticlesMesh: React.FC<{
  materials: AcademicMaterialSet;
  geometries: THREE.BufferGeometry[];
  count: number;
  spread: { x: number; y: number; z: number };
  pointerDamped: { x: number; y: number };
}> = ({ materials, geometries, count, spread, pointerDamped }) => {
  const { mesh, data } = useMemo(() => {
    return createGoldenParticles(count, spread, materials, geometries);
  }, [count, spread, materials, geometries]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      const yOffset = Math.sin(elapsed * p.speed + p.phase) * 0.22;
      const xOffset = Math.cos(elapsed * p.speed * 0.8 + p.phase) * 0.12;
      _dummy.position.set(
        p.baseX + xOffset + pointerDamped.x * 0.25,
        p.baseY + yOffset + pointerDamped.y * 0.25,
        p.baseZ
      );
      _dummy.rotation.set(elapsed * 0.4 + p.phase, elapsed * 0.6 + p.phase, 0);
      const pulseScale = p.scale * (0.85 + 0.25 * Math.sin(elapsed * 1.4 + p.phase));
      _dummy.scale.setScalar(pulseScale);
      _dummy.updateMatrix();
      mesh.setMatrixAt(i, _dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return <primitive object={mesh} />;
};

// Studio Environment & Lighting Rig Setup inside R3F Scene
const R3FEnvironmentAndLighting: React.FC<{ isSoftwareGl: boolean }> = ({ isSoftwareGl }) => {
  const { gl, scene } = useThree();

  useEffect(() => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.12;

    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;

    return () => {
      roomEnv.dispose();
      pmremGenerator.dispose();
      envTarget.dispose();
    };
  }, [gl, scene]);

  return (
    <>
      <hemisphereLight args={[0xdbeafe, 0x101d36, 1.15]} />
      <directionalLight position={[5.5, 6.5, 6.0]} intensity={2.2} color={0xfff1d6} />
      <directionalLight position={[-6.0, -3.5, 4.0]} intensity={1.65} color={0x4f83ff} />
      <pointLight position={[2.2, 2.0, 4.2]} intensity={1.8} distance={18} color={0xf2b84b} />
    </>
  );
};

// Main Scene Manager inside R3F Canvas
const R3FSceneManager: React.FC<{
  variant: R3FSceneVariant;
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  isSoftwareGl: boolean;
}> = ({ variant, pointerRef, isSoftwareGl }) => {
  const { gl, camera, size } = useThree();
  const pointerDamped = useRef({ x: 0, y: 0 });
  const isNarrow = size.width < 768;

  // Track responsive camera depth
  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      const baseZ = variant === 'hero' ? 8.8 : 7.8;
      camera.position.z = isNarrow ? baseZ + 2.8 : baseZ;
      camera.updateProjectionMatrix();
    }
  }, [camera, isNarrow, variant]);

  // Materials and geometries allocation
  const geometries = useMemo<THREE.BufferGeometry[]>(() => [], []);
  const maxAnisotropy = useMemo(() => {
    return gl?.capabilities?.getMaxAnisotropy?.() || 8;
  }, [gl]);

  const materials = useMemo(() => {
    return createAcademicMaterials(isSoftwareGl, maxAnisotropy);
  }, [isSoftwareGl, maxAnisotropy]);

  useEffect(() => {
    return () => {
      geometries.forEach((g) => g.dispose());
      materials.dispose();
    };
  }, [geometries, materials]);

  useFrame((_, delta) => {
    pointerDamped.current.x = THREE.MathUtils.damp(
      pointerDamped.current.x,
      pointerRef.current.x,
      4.5,
      delta
    );
    pointerDamped.current.y = THREE.MathUtils.damp(
      pointerDamped.current.y,
      pointerRef.current.y,
      4.5,
      delta
    );
  });

  // Configurations for floating 3D objects
  const heroConfigs = useMemo<FloatingItemConfig[]>(() => {
    return [
      {
        create: (mats, geos) => createGraduationCapGroup(mats, geos),
        pos: [3.65, 2.25, 0.35],
        rot: [0.25, -0.5, 0.15],
        scale: 0.9,
        floatAmp: 0.14,
        floatFreq: 0.85,
        rotSpeed: [0.08, 0.24, 0.05],
        phase: 0.2,
        parallaxDepth: 0.45,
      },
      {
        create: (mats, geos) => createAcademicBookGroup(mats, geos, false),
        pos: [-4.15, 2.05, -0.4],
        rot: [0.45, 0.55, -0.2],
        scale: 0.84,
        floatAmp: 0.13,
        floatFreq: 0.72,
        rotSpeed: [0.12, 0.18, 0.08],
        phase: 1.1,
        parallaxDepth: 0.4,
      },
      {
        create: (mats, geos) => createMoleculeGroup(mats, geos),
        pos: [3.95, -1.85, -0.2],
        rot: [0.3, 0.4, 0.2],
        scale: 0.88,
        floatAmp: 0.15,
        floatFreq: 0.9,
        rotSpeed: [0.15, 0.28, 0.1],
        phase: 2.0,
        parallaxDepth: 0.5,
      },
      {
        create: (mats, geos) => createOpenBookGroup(mats, geos),
        pos: [-3.55, -2.05, 0.15],
        rot: [0.38, 0.45, 0.12],
        scale: 0.82,
        floatAmp: 0.12,
        floatFreq: 0.78,
        rotSpeed: [0.06, 0.16, 0.04],
        phase: 2.8,
        parallaxDepth: 0.42,
      },
      {
        create: (mats, geos) => createPencilGroup(mats, geos),
        pos: [-2.15, 2.48, -0.8],
        rot: [0.2, 0.3, -0.55],
        scale: 0.74,
        floatAmp: 0.11,
        floatFreq: 0.95,
        rotSpeed: [0.05, 0.22, 0.08],
        phase: 0.7,
        parallaxDepth: 0.3,
      },
      {
        create: (mats, geos) => createMathSymbolGroup('pi', mats, geos),
        pos: [0.45, -2.32, -0.5],
        rot: [0.15, -0.25, 0.1],
        scale: 0.74,
        floatAmp: 0.12,
        floatFreq: 0.82,
        rotSpeed: [0.08, 0.2, 0.06],
        phase: 1.7,
        parallaxDepth: 0.35,
      },
      {
        create: (mats, geos) => createMathSymbolGroup('infinity', mats, geos),
        pos: [-4.45, -2.25, -1.2],
        rot: [0.2, 0.3, 0],
        scale: 0.68,
        floatAmp: 0.11,
        floatFreq: 0.76,
        rotSpeed: [0.14, 0.24, 0.08],
        phase: 3.4,
        parallaxDepth: 0.28,
      },
      {
        create: (mats, geos) => createGlassOrbGroup(mats, geos, false),
        pos: [1.15, 2.32, -0.8],
        rot: [0, 0, 0],
        scale: 0.7,
        floatAmp: 0.12,
        floatFreq: 0.68,
        rotSpeed: [0.1, 0.16, 0.08],
        phase: 0.9,
        parallaxDepth: 0.32,
      },
      {
        create: (mats, geos) => createGlassOrbGroup(mats, geos, true),
        pos: [-1.35, -2.35, -0.8],
        rot: [0, 0, 0],
        scale: 0.64,
        floatAmp: 0.11,
        floatFreq: 0.74,
        rotSpeed: [0.12, -0.15, 0.05],
        phase: 2.3,
        parallaxDepth: 0.3,
      },
      {
        create: (mats, geos) => createKnowledgeArmillaryGroup(mats, geos),
        pos: [4.35, 0.18, -1.1],
        rot: [0.3, 0.2, 0.1],
        scale: 0.78,
        floatAmp: 0.13,
        floatFreq: 0.65,
        rotSpeed: [0.1, 0.22, 0.12],
        phase: 1.5,
        parallaxDepth: 0.38,
      },
    ];
  }, []);

  const methodologyConfigs = useMemo<FloatingItemConfig[]>(() => {
    return [
      {
        create: (mats, geos) => createAcademicBookGroup(mats, geos, false),
        pos: [-3.8, -1.5, -0.6],
        rot: [0.35, 0.5, -0.15],
        scale: 0.8,
        floatAmp: 0.14,
        floatFreq: 0.75,
        rotSpeed: [0.08, 0.18, 0.05],
        phase: 0.4,
        parallaxDepth: 0.4,
      },
      {
        create: (mats, geos) => createPencilGroup(mats, geos),
        pos: [3.6, -1.6, -0.7],
        rot: [0.2, -0.3, 0.5],
        scale: 0.75,
        floatAmp: 0.12,
        floatFreq: 0.88,
        rotSpeed: [0.05, 0.2, 0.06],
        phase: 1.2,
        parallaxDepth: 0.38,
      },
      {
        create: (mats, geos) => createMoleculeGroup(mats, geos),
        pos: [-3.45, 1.25, -0.5],
        rot: [0.25, 0.4, 0.15],
        scale: 0.85,
        floatAmp: 0.15,
        floatFreq: 0.85,
        rotSpeed: [0.12, 0.25, 0.08],
        phase: 0.8,
        parallaxDepth: 0.44,
      },
      {
        create: (mats, geos) => createKnowledgeArmillaryGroup(mats, geos),
        pos: [3.45, -1.15, -0.5],
        rot: [0.3, -0.25, 0.15],
        scale: 0.85,
        floatAmp: 0.14,
        floatFreq: 0.72,
        rotSpeed: [0.1, 0.22, 0.1],
        phase: 1.9,
        parallaxDepth: 0.42,
      },
      {
        create: (mats, geos) => createMathSymbolGroup('infinity', mats, geos),
        pos: [3.25, 1.4, -0.8],
        rot: [0.2, -0.3, 0],
        scale: 0.72,
        floatAmp: 0.12,
        floatFreq: 0.78,
        rotSpeed: [0.12, 0.2, 0.06],
        phase: 2.7,
        parallaxDepth: 0.35,
      },
      {
        create: (mats, geos) => createMathSymbolGroup('pi', mats, geos),
        pos: [-1.2, 2.2, -0.8],
        rot: [0.1, 0.2, 0],
        scale: 0.7,
        floatAmp: 0.11,
        floatFreq: 0.82,
        rotSpeed: [0.08, 0.18, 0.05],
        phase: 3.1,
        parallaxDepth: 0.32,
      },
      {
        create: (mats, geos) => createGlassOrbGroup(mats, geos, false),
        pos: [-3.6, 0.2, -1.0],
        rot: [0, 0, 0],
        scale: 0.65,
        floatAmp: 0.12,
        floatFreq: 0.65,
        rotSpeed: [0.08, 0.15, 0.05],
        phase: 1.5,
        parallaxDepth: 0.3,
      },
    ];
  }, []);

  const configs = variant === 'hero' ? heroConfigs : methodologyConfigs;
  const particleCount = variant === 'hero' ? 48 : 28;
  const particleSpread = variant === 'hero' ? { x: 5.4, y: 3.1, z: 2.0 } : { x: 4.4, y: 2.2, z: 1.2 };

  return (
    <>
      <R3FEnvironmentAndLighting isSoftwareGl={isSoftwareGl} />
      {configs.map((cfg, idx) => (
        <FloatingObject
          key={`r3f-obj-${variant}-${idx}`}
          config={cfg}
          materials={materials}
          geometries={geometries}
          pointerDamped={pointerDamped.current}
          isNarrow={isNarrow}
          variant={variant}
        />
      ))}
      <GoldenParticlesMesh
        materials={materials}
        geometries={geometries}
        count={particleCount}
        spread={particleSpread}
        pointerDamped={pointerDamped.current}
      />
    </>
  );
};

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

/**
 * React Three Fiber Scene Canvas component for Hero and Methodology sections.
 * Features realistic floating 3D books, pens, geometric armillary, mathematical symbols,
 * molecules, optical glass orbs, and golden glowing particles with smooth mouse parallax.
 */
export const R3FSceneCanvas: React.FC<R3FSceneCanvasProps> = ({
  variant,
  className = '',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerTarget = useRef({ x: 0, y: 0 });
  const [isSoftwareGl] = useState(() => detectSoftwareWebGL());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerTarget.current.x = THREE.MathUtils.clamp(nx, -1, 1);
      pointerTarget.current.y = THREE.MathUtils.clamp(ny, -1, 1);
    };

    const handlePointerLeave = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
    };

    if (interactive) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      containerRef.current?.addEventListener('pointerleave', handlePointerLeave);
    }

    return () => {
      if (interactive) {
        window.removeEventListener('pointermove', handlePointerMove);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      data-testid={`r3f-canvas-${variant}`}
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
    >
      <Canvas
        camera={{
          fov: 42,
          position: [0, 0, variant === 'hero' ? 8.8 : 7.8],
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: !isSoftwareGl,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={isSoftwareGl ? 1 : [1, 2]}
        frameloop={prefersReducedMotion ? 'demand' : 'always'}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <R3FSceneManager
          variant={variant}
          pointerRef={pointerTarget}
          isSoftwareGl={isSoftwareGl}
        />
      </Canvas>
    </div>
  );
};
