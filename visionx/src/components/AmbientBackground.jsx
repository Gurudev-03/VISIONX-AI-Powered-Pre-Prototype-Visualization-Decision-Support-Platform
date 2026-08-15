import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

/* Floating particle field */
function Particles({ color = "#22d3ee", count = 120 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.elapsedTime * 0.03;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.015) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.06} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* Slow drifting grid plane */
function GridPlane({ color = "#22d3ee" }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.z = ((clock.elapsedTime * 0.4) % 3) - 1.5;
  });
  return (
    <group ref={ref} position={[0, -5, 0]} rotation={[-Math.PI / 2.5, 0, 0]}>
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh key={`h${i}`} position={[0, 0, -14 + i * 1.8]}>
          <planeGeometry args={[34, 0.015]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} />
        </mesh>
      ))}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh key={`v${i}`} position={[-14 + i * 1.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[28, 0.015]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  );
}

/* Orbiting ring */
function OrbRing({ color = "#22d3ee", radius = 6, speed = 0.15, tilt = 0.4 }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.018, 12, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.18} />
    </mesh>
  );
}

export default function AmbientBackground({ themeColor = "#22d3ee" }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0,
      pointerEvents: "none", overflow: "hidden",
    }}>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        gl={{ alpha: true, antialias: false }}
      >
        <Particles color={themeColor} count={140} />
        <GridPlane color={themeColor} />
        <OrbRing color={themeColor} radius={7} speed={0.08} tilt={0.5} />
        <OrbRing color={themeColor} radius={10} speed={-0.05} tilt={-0.3} />
      </Canvas>
    </div>
  );
}
