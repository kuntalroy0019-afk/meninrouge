"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Real-time 3D refraction diamond.
 * Procedural round-brilliant geometry + drei MeshTransmissionMaterial
 * (transmission, high IOR, chromatic aberration → diamond fire). Lit by a
 * static, baked-once (frames={1}) environment of blush/champagne lightformers,
 * so there is no per-frame env cost and no external HDR fetch.
 *
 * Perf: DPR capped, frameloop is driven by the `paused` prop (set when the
 * canvas scrolls off-screen / tab hidden) so it does zero GPU work when unseen.
 */

function makeBrilliantGeometry() {
  const seg = 16;
  const R = 1; // girdle radius
  const rt = 0.5; // table radius
  const crown = 0.42; // crown height
  const pavilion = 1.05; // pavilion depth

  const ring = (r: number, y: number) =>
    Array.from({ length: seg }, (_, i) => {
      const a = (i / seg) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    });
  // offset girdle by half a segment → kite/star crown facets (more brilliant)
  const ringOffset = (r: number, y: number) =>
    Array.from({ length: seg }, (_, i) => {
      const a = ((i + 0.5) / seg) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    });

  const table = ring(rt, crown);
  const girdle = ringOffset(R, 0);
  const tableCenter = new THREE.Vector3(0, crown, 0);
  const culet = new THREE.Vector3(0, -pavilion, 0);

  const pos: number[] = [];
  const push = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) =>
    pos.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);

  for (let i = 0; i < seg; i++) {
    const n = (i + 1) % seg;
    // table (top facet) fan
    push(tableCenter, table[n], table[i]);
    // crown facets: each table edge fans to the nearest girdle point + neighbours
    push(table[i], table[n], girdle[i]);
    push(table[n], girdle[n], girdle[i]);
    // pavilion facets down to the culet
    push(girdle[i], girdle[n], culet);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  g.center();
  return g;
}

function Gem({ lite }: { lite: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(makeBrilliantGeometry, []);

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    m.rotation.y += delta * 0.35; // steady spin
    // gentle tilt toward the pointer (negligible on touch — gem just spins)
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, state.pointer.y * 0.35, 0.06);
    m.rotation.z = THREE.MathUtils.lerp(m.rotation.z, -state.pointer.x * 0.25, 0.06);
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
      <mesh ref={ref} geometry={geometry} scale={1.35}>
        {lite ? (
          // Mobile: a crisp reflective + iridescent crystal. No transmission
          // FBO (the muddy/expensive part on phones) — sharp facets + rainbow
          // fire from the environment instead. Looks sharper at high DPR.
          <meshPhysicalMaterial
            color="#ffffff"
            metalness={0}
            roughness={0.04}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            iridescence={1}
            iridescenceIOR={1.6}
            envMapIntensity={2.6}
          />
        ) : (
          <MeshTransmissionMaterial
            samples={4}
            resolution={256}
            transmission={1}
            thickness={0.9}
            ior={2.42}
            chromaticAberration={0.6}
            anisotropicBlur={0.1}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0}
            roughness={0}
            clearcoat={1}
            clearcoatRoughness={0}
            attenuationColor="#ffe3ea"
            attenuationDistance={2}
            color="#ffffff"
            backside
            backsideThickness={0.4}
          />
        )}
      </mesh>
    </Float>
  );
}

export default function Diamond3DScene({
  paused = false,
  lite = false,
}: {
  paused?: boolean;
  lite?: boolean;
}) {
  return (
    <Canvas
      frameloop={paused ? "never" : "always"}
      // Render at the screen's real density (capped at 2) so it's sharp on
      // high-DPR phones; the reflective mobile material keeps it affordable.
      dpr={lite ? [1, 2] : [1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5], fov: 32 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={20} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={12} color="#f6c7d1" />

      <Gem lite={lite} />

      {/* Static, baked-once lighting environment (no external HDR) */}
      <Environment frames={1} resolution={lite ? 128 : 256}>
        <Lightformer
          intensity={3}
          position={[0, 2, 3]}
          scale={[6, 6, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={2.4}
          position={[-3, -1, 2]}
          scale={[4, 4, 1]}
          color="#f6c7d1"
        />
        <Lightformer
          intensity={2}
          position={[3, 1, -2]}
          scale={[4, 4, 1]}
          color="#e6d3a8"
        />
        <Lightformer
          intensity={1.6}
          position={[0, -3, 1]}
          scale={[5, 2, 1]}
          color="#b76e79"
        />
      </Environment>
    </Canvas>
  );
}
