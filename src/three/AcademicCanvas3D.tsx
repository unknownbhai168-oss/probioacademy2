import React, { useEffect, useRef, useState } from 'react';
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
  type ParticleDatum,
} from './academicModels';

export type AcademicSceneVariant = 'hero' | 'teacher' | 'courses' | 'methodology' | 'contact';

interface AcademicCanvas3DProps {
  variant: AcademicSceneVariant;
  className?: string;
  interactive?: boolean;
}

interface FloatingActor {
  object: THREE.Object3D;
  basePos: THREE.Vector3;
  baseRot: THREE.Euler;
  baseScale: number;
  floatAmp: number;
  floatFreq: number;
  rotSpeed: THREE.Vector3;
  phase: number;
  parallaxDepth: number;
}

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

const _dummy = new THREE.Object3D();

export const AcademicCanvas3D: React.FC<AcademicCanvas3DProps> = ({
  variant,
  className = '',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const mount = canvasMountRef.current;
    if (!container || !mount) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isSoftwareGl = detectSoftwareWebGL();
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const width = Math.max(container.clientWidth, 300);
    const height = Math.max(container.clientHeight, 240);
    renderer.setSize(width, height);

    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, variant === 'hero' ? 8.4 : 7.6);

    // Studio PBR environment reflection for brushed gold, royal lacquer & optical glass
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Three-point warm/cool studio lighting rig
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x101d36, 1.15);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1d6, 2.2);
    keyLight.position.set(5.5, 6.5, 6.0);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x4f83ff, 1.65);
    rimLight.position.set(-6.0, -3.5, 4.0);
    scene.add(rimLight);

    const goldAccentLight = new THREE.PointLight(0xf2b84b, 1.8, 18);
    goldAccentLight.position.set(2.2, 2.0, 4.2);
    scene.add(goldAccentLight);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const mats = createAcademicMaterials(isSoftwareGl, maxAnisotropy);
    const geometries: THREE.BufferGeometry[] = [];
    const actors: FloatingActor[] = [];

    const addActor = (
      object: THREE.Object3D,
      pos: [number, number, number],
      rot: [number, number, number],
      scale: number,
      floatAmp: number,
      floatFreq: number,
      rotSpeed: [number, number, number],
      phase: number,
      parallaxDepth: number
    ) => {
      object.position.set(pos[0], pos[1], pos[2]);
      object.rotation.set(rot[0], rot[1], rot[2]);
      object.scale.setScalar(scale);
      scene.add(object);
      actors.push({
        object,
        basePos: new THREE.Vector3(pos[0], pos[1], pos[2]),
        baseRot: new THREE.Euler(rot[0], rot[1], rot[2]),
        baseScale: scale,
        floatAmp,
        floatFreq,
        rotSpeed: new THREE.Vector3(rotSpeed[0], rotSpeed[1], rotSpeed[2]),
        phase,
        parallaxDepth,
      });
    };

    let particleSystem: { mesh: THREE.InstancedMesh; data: ParticleDatum[] } | null = null;

    if (variant === 'hero') {
      // Balanced orbital constellation framing the hero headline & portrait with a clear reading zone
      addActor(
        createGraduationCapGroup(mats, geometries),
        [3.65, 2.25, 0.35],
        [0.25, -0.5, 0.15],
        0.9,
        0.14,
        0.85,
        [0.08, 0.24, 0.05],
        0.2,
        0.45
      );
      addActor(
        createAcademicBookGroup(mats, geometries, false),
        [-4.15, 2.05, -0.4],
        [0.45, 0.55, -0.2],
        0.84,
        0.13,
        0.72,
        [0.12, 0.18, 0.08],
        1.1,
        0.4
      );
      addActor(
        createMoleculeGroup(mats, geometries),
        [3.95, -1.85, -0.2],
        [0.3, 0.4, 0.2],
        0.88,
        0.15,
        0.9,
        [0.15, 0.28, 0.1],
        2.0,
        0.5
      );
      addActor(
        createOpenBookGroup(mats, geometries),
        [-3.55, -2.05, 0.15],
        [0.38, 0.45, 0.12],
        0.82,
        0.12,
        0.78,
        [0.06, 0.16, 0.04],
        2.8,
        0.42
      );
      addActor(
        createPencilGroup(mats, geometries),
        [-2.15, 2.48, -0.8],
        [0.2, 0.3, -0.55],
        0.74,
        0.11,
        0.95,
        [0.05, 0.22, 0.08],
        0.7,
        0.3
      );
      addActor(
        createMathSymbolGroup('pi', mats, geometries),
        [0.45, -2.32, -0.5],
        [0.15, -0.25, 0.1],
        0.74,
        0.12,
        0.82,
        [0.08, 0.2, 0.06],
        1.7,
        0.35
      );
      addActor(
        createMathSymbolGroup('infinity', mats, geometries),
        [-4.45, -2.25, -1.2],
        [0.2, 0.3, 0],
        0.68,
        0.11,
        0.76,
        [0.14, 0.24, 0.08],
        3.4,
        0.28
      );
      addActor(
        createGlassOrbGroup(mats, geometries, false),
        [1.15, 2.32, -0.8],
        [0, 0, 0],
        0.7,
        0.12,
        0.68,
        [0.1, 0.16, 0.08],
        0.9,
        0.32
      );
      addActor(
        createGlassOrbGroup(mats, geometries, true),
        [-1.35, -2.35, -0.8],
        [0, 0, 0],
        0.64,
        0.11,
        0.74,
        [0.12, -0.15, 0.05],
        2.3,
        0.3
      );
      addActor(
        createKnowledgeArmillaryGroup(mats, geometries),
        [4.35, 0.18, -1.1],
        [0.3, 0.2, 0.1],
        0.78,
        0.13,
        0.65,
        [0.1, 0.22, 0.12],
        1.5,
        0.38
      );

      particleSystem = createGoldenParticles(
        48,
        { x: 5.4, y: 3.1, z: 2.0 },
        mats,
        geometries
      );
      scene.add(particleSystem.mesh);
    } else if (variant === 'teacher') {
      addActor(
        createGraduationCapGroup(mats, geometries),
        [3.3, 1.55, -0.3],
        [0.22, -0.45, 0.12],
        0.86,
        0.14,
        0.8,
        [0.06, 0.22, 0.04],
        0.4,
        0.45
      );
      addActor(
        createKnowledgeArmillaryGroup(mats, geometries),
        [-3.4, -1.25, -0.5],
        [0.25, 0.3, 0],
        0.85,
        0.13,
        0.7,
        [0.08, 0.2, 0.1],
        1.6,
        0.4
      );
      addActor(
        createGlassOrbGroup(mats, geometries, false),
        [2.9, -1.5, -0.8],
        [0, 0, 0],
        0.65,
        0.12,
        0.65,
        [0.08, 0.15, 0.05],
        2.4,
        0.3
      );
      particleSystem = createGoldenParticles(
        34,
        { x: 4.5, y: 2.4, z: 1.5 },
        mats,
        geometries
      );
      scene.add(particleSystem.mesh);
    } else if (variant === 'courses') {
      addActor(
        createAcademicBookGroup(mats, geometries, true),
        [-3.5, 1.4, -0.5],
        [0.35, 0.5, -0.18],
        0.82,
        0.14,
        0.75,
        [0.08, 0.18, 0.05],
        0.5,
        0.42
      );
      addActor(
        createMathSymbolGroup('sigma', mats, geometries),
        [3.55, 1.35, -0.4],
        [0.15, -0.35, 0.1],
        0.82,
        0.14,
        0.82,
        [0.08, 0.22, 0.06],
        1.4,
        0.45
      );
      addActor(
        createPencilGroup(mats, geometries),
        [3.35, -1.45, -0.6],
        [0.2, -0.3, 0.5],
        0.78,
        0.12,
        0.88,
        [0.05, 0.2, 0.06],
        2.2,
        0.38
      );
      addActor(
        createOpenBookGroup(mats, geometries),
        [-3.35, -1.4, -0.6],
        [0.32, 0.4, 0.1],
        0.76,
        0.12,
        0.72,
        [0.06, 0.15, 0.04],
        3.0,
        0.36
      );
      particleSystem = createGoldenParticles(
        32,
        { x: 4.8, y: 2.5, z: 1.4 },
        mats,
        geometries
      );
      scene.add(particleSystem.mesh);
    } else if (variant === 'methodology') {
      addActor(
        createMoleculeGroup(mats, geometries),
        [-3.45, 1.25, -0.5],
        [0.25, 0.4, 0.15],
        0.85,
        0.15,
        0.85,
        [0.12, 0.25, 0.08],
        0.8,
        0.44
      );
      addActor(
        createKnowledgeArmillaryGroup(mats, geometries),
        [3.45, -1.15, -0.5],
        [0.3, -0.25, 0.15],
        0.85,
        0.14,
        0.72,
        [0.1, 0.22, 0.1],
        1.9,
        0.42
      );
      addActor(
        createMathSymbolGroup('infinity', mats, geometries),
        [3.25, 1.4, -0.8],
        [0.2, -0.3, 0],
        0.72,
        0.12,
        0.78,
        [0.12, 0.2, 0.06],
        2.7,
        0.35
      );
      particleSystem = createGoldenParticles(
        28,
        { x: 4.4, y: 2.2, z: 1.2 },
        mats,
        geometries
      );
      scene.add(particleSystem.mesh);
    } else {
      addActor(
        createGlassOrbGroup(mats, geometries, false),
        [-3.35, 1.2, -0.4],
        [0, 0, 0],
        0.86,
        0.14,
        0.7,
        [0.08, 0.16, 0.06],
        0.3,
        0.4
      );
      addActor(
        createGlassOrbGroup(mats, geometries, true),
        [3.35, -1.15, -0.4],
        [0, 0, 0],
        0.82,
        0.14,
        0.75,
        [0.1, -0.18, 0.05],
        1.7,
        0.4
      );
      addActor(
        createGlassOrbGroup(mats, geometries, false),
        [3.0, 1.4, -0.9],
        [0, 0, 0],
        0.6,
        0.11,
        0.65,
        [0.06, 0.14, 0.04],
        2.6,
        0.3
      );
      particleSystem = createGoldenParticles(
        30,
        { x: 4.6, y: 2.2, z: 1.4 },
        mats,
        geometries
      );
      scene.add(particleSystem.mesh);
    }

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerTarget.x = THREE.MathUtils.clamp(nx, -1, 1);
      pointerTarget.y = THREE.MathUtils.clamp(ny, -1, 1);
    };

    const handlePointerLeave = () => {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    };

    if (interactive) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      container.addEventListener('pointerleave', handlePointerLeave);
    }

    let isNarrowViewport = false;

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 280);
      const h = Math.max(container.clientHeight, 220);
      isNarrowViewport = w < 768;
      camera.aspect = w / h;
      const baseZ = variant === 'hero' ? 8.8 : 7.8;
      camera.position.z = isNarrowViewport ? baseZ + 2.8 : baseZ;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    let isVisible = true;
    let isDisposed = false;
    let frameId = 0;
    const startTimeMs = performance.now();
    let lastTimeMs = startTimeMs;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (isDisposed) {
          if (sync) gl.deleteSync(sync);
          return;
        }
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const updateScene = (elapsed: number, dt: number) => {
      pointerCurrent.x = THREE.MathUtils.damp(pointerCurrent.x, pointerTarget.x, 4.5, dt);
      pointerCurrent.y = THREE.MathUtils.damp(pointerCurrent.y, pointerTarget.y, 4.5, dt);

      for (let i = 0; i < actors.length; i++) {
        const a = actors[i];
        const floatY = Math.sin(elapsed * a.floatFreq + a.phase) * a.floatAmp;
        const floatX = Math.cos(elapsed * a.floatFreq * 0.7 + a.phase) * (a.floatAmp * 0.45);

        const isMobileHero = isNarrowViewport && variant === 'hero';
        const mobileYSpread = isMobileHero ? 1.62 : 1.0;
        const mobileXSpread = isMobileHero ? 0.65 : 1.0;

        a.object.position.x =
          a.basePos.x * mobileXSpread + floatX + pointerCurrent.x * a.parallaxDepth;
        a.object.position.y =
          a.basePos.y * mobileYSpread + floatY + pointerCurrent.y * a.parallaxDepth;
        a.object.position.z = isMobileHero ? a.basePos.z - 1.4 : a.basePos.z;
        a.object.scale.setScalar(isMobileHero ? a.baseScale * 0.64 : a.baseScale);

        a.object.rotation.x =
          a.baseRot.x +
          Math.sin(elapsed * 0.5 + a.phase) * 0.14 +
          pointerCurrent.y * 0.15;
        a.object.rotation.y =
          a.baseRot.y + elapsed * a.rotSpeed.y + pointerCurrent.x * 0.22;
        a.object.rotation.z =
          a.baseRot.z + Math.cos(elapsed * 0.45 + a.phase) * 0.1;
      }

      if (particleSystem) {
        const { mesh, data } = particleSystem;
        for (let i = 0; i < data.length; i++) {
          const p = data[i];
          const yOffset = Math.sin(elapsed * p.speed + p.phase) * 0.22;
          const xOffset = Math.cos(elapsed * p.speed * 0.8 + p.phase) * 0.12;
          _dummy.position.set(
            p.baseX + xOffset + pointerCurrent.x * 0.25,
            p.baseY + yOffset + pointerCurrent.y * 0.25,
            p.baseZ
          );
          _dummy.rotation.set(elapsed * 0.4 + p.phase, elapsed * 0.6 + p.phase, 0);
          const pulseScale = p.scale * (0.85 + 0.25 * Math.sin(elapsed * 1.4 + p.phase));
          _dummy.scale.setScalar(pulseScale);
          _dummy.updateMatrix();
          mesh.setMatrixAt(i, _dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      }
    };

    updateScene(0, 0.016);
    renderer.render(scene, camera);

    const tick = () => {
      if (isDisposed || !isVisible || prefersReducedMotion) return;
      const now = performance.now();
      const dt = Math.min((now - lastTimeMs) / 1000, 0.1);
      lastTimeMs = now;
      const elapsed = (now - startTimeMs) / 1000;
      updateScene(elapsed, dt);
      renderer.render(scene, camera);
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible && !prefersReducedMotion && !isDisposed) {
          lastTimeMs = performance.now();
          tick();
        }
      },
      { rootMargin: '180px' }
    );
    observer.observe(container);

    if (!prefersReducedMotion) {
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerleave', handlePointerLeave);
      }
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      geometries.forEach((g) => g.dispose());
      mats.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (mount) mount.innerHTML = '';
    };
  }, [variant, interactive]);

  if (webglFailed) {
    return (
      <div
        aria-hidden="true"
        className={`pointer-events-none select-none overflow-hidden ${className}`}
      >
        <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full border border-[#F2B84B]/20 bg-[#2855C5]/10" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full border border-[#2855C5]/25 bg-[#F2B84B]/5" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      data-testid={`three-scene-${variant}`}
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden ${className}`}
    >
      <div ref={canvasMountRef} className="h-full w-full" />
    </div>
  );
};
