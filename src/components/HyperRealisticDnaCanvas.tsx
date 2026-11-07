import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  createAcademicMaterials,
  createHyperRealisticDNAGroup,
} from '../three/academicModels';

export type DnaRenderMode = 'bioluminescent' | 'molecular-glass' | 'base-pairs';

interface HyperRealisticDnaCanvasProps {
  className?: string;
  interactive?: boolean;
  mode?: DnaRenderMode;
  isCompact?: boolean;
  onSelectFeature?: (feature: string) => void;
}

export const HyperRealisticDnaCanvas: React.FC<HyperRealisticDnaCanvasProps> = ({
  className = '',
  interactive = true,
  mode = 'bioluminescent',
  isCompact = false,
  onSelectFeature,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const mount = mountRef.current;
    if (!container || !mount) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = mode === 'bioluminescent' ? 1.35 : 1.15;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const width = Math.max(container.clientWidth, 260);
    const height = Math.max(container.clientHeight, 260);
    renderer.setSize(width, height);

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, isCompact ? 9.2 : 11.5);

    // Studio PBR Reflection for clearcoat & glass refraction
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Multi-Point Purplish & Bioluminescent Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xd8b4fe, 0x13092d, 1.3);
    scene.add(hemiLight);

    // Key Light (Electric Violet)
    const violetKeyLight = new THREE.DirectionalLight(0xa855f7, 2.8);
    violetKeyLight.position.set(5.0, 6.0, 7.0);
    scene.add(violetKeyLight);

    // Cyan Fill Light (Phosphodiester backlight)
    const cyanRimLight = new THREE.DirectionalLight(0x06b6d4, 2.2);
    cyanRimLight.position.set(-6.0, -3.0, 5.0);
    scene.add(cyanRimLight);

    // Warm Golden Core Light (Hydrogen bonds)
    const goldCoreLight = new THREE.PointLight(0xf59e0b, 2.4, 20);
    goldCoreLight.position.set(0, 0, 3.5);
    scene.add(goldCoreLight);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const mats = createAcademicMaterials(false, maxAnisotropy);
    const geometries: THREE.BufferGeometry[] = [];

    // Construct the hyper-realistic DNA model
    const dnaGroup = createHyperRealisticDNAGroup(mats, geometries, isCompact);
    scene.add(dnaGroup);

    // Apply Mode-Specific Visual Tweaks
    if (mode === 'base-pairs') {
      mats.adenineFuchsia.emissiveIntensity = 0.85;
      mats.thymineCyan.emissiveIntensity = 0.85;
      mats.guanineEmerald.emissiveIntensity = 0.85;
      mats.cytosinePurple.emissiveIntensity = 0.85;
      mats.hydrogenBondMat.emissiveIntensity = 1.4;
    } else if (mode === 'molecular-glass') {
      mats.amethystGlass.transmission = 0.65;
      mats.amethystGlass.roughness = 0.08;
      mats.amethystGlass.clearcoat = 1.0;
    }

    // Pointer Interaction State
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    const manualRot = { x: 0.18, y: 0.2 };
    const autoRotSpeed = 0.42;

    const onPointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive || !isDragging) return;
      const dx = (e.clientX - prevPointerX) * 0.007;
      const dy = (e.clientY - prevPointerY) * 0.007;
      manualRot.y += dx;
      manualRot.x += dy;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    if (interactive) {
      dom.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 260);
      const h = Math.max(container.clientHeight, 260);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let isDisposed = false;
    let frameId = 0;
    const startTime = performance.now();

    const animate = () => {
      if (isDisposed) return;
      const elapsed = (performance.now() - startTime) / 1000;

      if (!prefersReducedMotion) {
        if (!isDragging) {
          manualRot.y += autoRotSpeed * 0.016;
        }
        dnaGroup.rotation.y = manualRot.y;
        dnaGroup.rotation.x = manualRot.x + Math.sin(elapsed * 0.6) * 0.06;
        dnaGroup.rotation.z = Math.cos(elapsed * 0.45) * 0.04;
        dnaGroup.position.y = Math.sin(elapsed * 0.9) * 0.15;
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        dom.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
      }
      geometries.forEach((g) => g.dispose());
      mats.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (mount) mount.innerHTML = '';
    };
  }, [interactive, mode, isCompact]);

  if (webglError) {
    return (
      <div className={`flex items-center justify-center p-8 text-center ${className}`}>
        <div className="rounded-2xl border border-violet-500/20 bg-purple-950/60 p-6 text-violet-200">
          <p className="font-serif text-lg font-semibold">3D DNA Molecule</p>
          <p className="mt-1 text-xs text-violet-400">WebGL Acceleration Not Available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className}`}
      style={{ touchAction: interactive ? 'none' : 'auto' }}
    >
      <div ref={mountRef} className="h-full w-full" />
    </div>
  );
};
