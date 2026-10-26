import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Box, Sparkles, RefreshCw, Eye, EyeOff, Layers } from 'lucide-react';

type GeometryMode = 'torusKnot' | 'icosahedron' | 'cyberRings';
type FinishMode = 'violet' | 'cyan' | 'chrome' | 'gold';

export const Hero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState(true);
  const [geometryMode, setGeometryMode] = useState<GeometryMode>('icosahedron');
  const [finishMode, setFinishMode] = useState<FinishMode>('violet');
  const [speed, setSpeed] = useState(1);
  const [isWebGlSupported, setIsWebGlSupported] = useState(true);

  // References to keep inside animation loop without state re-renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const mainMeshGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const materialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    // Detect software WebGL or WebGL support
    const checkGl = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return { supported: false, software: true };
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        const isSoft = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
        return { supported: true, software: isSoft };
      } catch {
        return { supported: false, software: true };
      }
    };

    const glInfo = checkGl();
    if (!glInfo.supported) {
      setIsWebGlSupported(false);
      return;
    }

    const container = mountRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !glInfo.software,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(glInfo.software ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 3. Mandatory Studio Environment Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const keyLight = new THREE.DirectionalLight(0x8b5cf6, 2.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x06b6d4, 1.8);
    fillLight.position.set(-5, -3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xec4899, 2.0);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0x312e81, 0x030712, 1.2);
    scene.add(hemiLight);

    // 5. Build Composite 3D Centerpiece Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);
    mainMeshGroupRef.current = mainGroup;

    // Material Library
    const createMaterial = (color: number, rough: number, metal: number, clearcoat = 1) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color,
        roughness: rough,
        metalness: metal,
        clearcoat,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
        wireframe: false,
      });
      materialsRef.current.push(mat);
      return mat;
    };

    const violetMat = createMaterial(0x8b5cf6, 0.15, 0.9);
    const cyanMat = createMaterial(0x06b6d4, 0.2, 0.85);
    const darkMat = createMaterial(0x181825, 0.3, 0.95);

    // Geometry Initial Builder: Core (Icosahedron) + Orbital Ring
    const buildInitialCore = () => {
      mainGroup.clear();
      materialsRef.current = [];

      const icoGeo = new THREE.IcosahedronGeometry(1.6, 2);
      const icoMat = createMaterial(0x8b5cf6, 0.15, 0.9);
      icoMat.wireframe = true;
      mainGroup.add(new THREE.Mesh(icoGeo, icoMat));

      const ringGeo = new THREE.TorusGeometry(2.3, 0.08, 16, 100);
      const ringMat = new THREE.MeshPhysicalMaterial({ color: 0x06b6d4, metalness: 0.9, wireframe: true });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.5;
      mainGroup.add(ring);
    };

    // Build initial geometry
    buildInitialCore();

    // 6. Orbiting Particle Field
    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
      particleScales[i / 3] = Math.random();
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse Movement Handler for Parallax
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.targetX = x * 0.5;
      mouseRef.current.targetY = y * 0.5;
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with Smooth Exponential Damping
    let animFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Mouse Parallax Interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (mainGroup) {
        mainGroup.rotation.y = elapsedTime * 0.35 * speed + mouseRef.current.x;
        mainGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.2 + mouseRef.current.y;
      }

      if (particles) {
        particles.rotation.y = -elapsedTime * 0.08 * speed;
      }

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Geometry Mode dynamically
  useEffect(() => {
    if (!mainMeshGroupRef.current) return;
    const group = mainMeshGroupRef.current;
    group.clear();

    const colorHex = finishMode === 'violet' ? 0x8b5cf6 : finishMode === 'cyan' ? 0x06b6d4 : finishMode === 'gold' ? 0xf59e0b : 0xe2e8f0;

    if (geometryMode === 'torusKnot') {
      const knotGeo = new THREE.TorusKnotGeometry(1.3, 0.35, 128, 32, 2, 3);
      const knotMat = new THREE.MeshPhysicalMaterial({
        color: colorHex,
        roughness: 0.12,
        metalness: 0.95,
        clearcoat: 1,
        wireframe,
      });
      group.add(new THREE.Mesh(knotGeo, knotMat));

      const coreGeo = new THREE.IcosahedronGeometry(0.7, 2);
      const coreMat = new THREE.MeshPhysicalMaterial({ color: 0x06b6d4, roughness: 0.2, metalness: 0.8, wireframe });
      group.add(new THREE.Mesh(coreGeo, coreMat));
    } else if (geometryMode === 'icosahedron') {
      const icoGeo = new THREE.IcosahedronGeometry(1.6, 2);
      const icoMat = new THREE.MeshPhysicalMaterial({
        color: colorHex,
        roughness: 0.15,
        metalness: 0.9,
        wireframe,
      });
      group.add(new THREE.Mesh(icoGeo, icoMat));

      const ringGeo = new THREE.TorusGeometry(2.3, 0.08, 16, 100);
      const ringMat = new THREE.MeshPhysicalMaterial({ color: 0x06b6d4, metalness: 0.9, wireframe });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.5;
      group.add(ring);
    } else if (geometryMode === 'cyberRings') {
      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(1.2 + i * 0.5, 0.08, 16, 64);
        const ringMat = new THREE.MeshPhysicalMaterial({
          color: i === 0 ? colorHex : i === 1 ? 0x06b6d4 : 0xec4899,
          roughness: 0.1,
          metalness: 0.9,
          wireframe,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = (i * Math.PI) / 4;
        ring.rotation.y = (i * Math.PI) / 6;
        group.add(ring);
      }
    }
  }, [geometryMode, finishMode, wireframe]);

  if (!isWebGlSupported) {
    return (
      <div className="w-full h-[500px] rounded-3xl bg-gradient-to-tr from-violet-950/40 to-indigo-950/40 border border-violet-500/20 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        <div className="w-20 h-20 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 mb-4 animate-pulse">
          <Box className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-bold text-white font-display">Interactive 3D Art Engine</h3>
        <p className="text-sm text-slate-400 max-w-sm mt-2">
          Experience high-performance WebGL graphics with custom procedural geometry and physical shaders.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] lg:h-[620px] rounded-3xl overflow-hidden group">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Badge */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md text-[11px] font-mono text-violet-300 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>THREE.JS WEBGL 3D ENGINE</span>
      </div>

      {/* Sleek Bottom Control Dock */}
      <div className="absolute bottom-4 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 z-10 p-2 rounded-2xl bg-[#0d0e15]/90 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-center gap-2 text-xs">
        {/* Geometry Switcher */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setGeometryMode('torusKnot')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              geometryMode === 'torusKnot' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Knot
          </button>
          <button
            onClick={() => setGeometryMode('icosahedron')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              geometryMode === 'icosahedron' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Core
          </button>
          <button
            onClick={() => setGeometryMode('cyberRings')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              geometryMode === 'cyberRings' ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Rings
          </button>
        </div>

        {/* Color Palette Swatches */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => setFinishMode('violet')}
            className={`w-5 h-5 rounded-full bg-violet-500 transition-transform ${finishMode === 'violet' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
            title="Electric Violet"
          />
          <button
            onClick={() => setFinishMode('cyan')}
            className={`w-5 h-5 rounded-full bg-cyan-400 transition-transform ${finishMode === 'cyan' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
            title="Cyber Cyan"
          />
          <button
            onClick={() => setFinishMode('gold')}
            className={`w-5 h-5 rounded-full bg-amber-400 transition-transform ${finishMode === 'gold' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
            title="Imperial Gold"
          />
          <button
            onClick={() => setFinishMode('chrome')}
            className={`w-5 h-5 rounded-full bg-slate-200 transition-transform ${finishMode === 'chrome' ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
            title="Monochrome Chrome"
          />
        </div>

        {/* Wireframe Toggle */}
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`px-2.5 py-1 rounded-xl font-medium flex items-center gap-1.5 transition-all ${
            wireframe ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          {wireframe ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>Wireframe</span>
        </button>

        {/* Speed Toggle */}
        <button
          onClick={() => setSpeed(speed === 1 ? 2.5 : speed === 2.5 ? 0.2 : 1)}
          className="px-2.5 py-1 rounded-xl font-medium bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 flex items-center gap-1 transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>{speed}x</span>
        </button>
      </div>
    </div>
  );
};
