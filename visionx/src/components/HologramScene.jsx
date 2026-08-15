import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

/* ═══════════════════════════════════════════════
   REALISTIC BUILDING — solid with glowing windows
═══════════════════════════════════════════════ */
function Building({ pos, w=2, h=4, d=2, color="#22d3ee" }) {
  const ref = useRef();
  useFrame(({ clock:c }) => {
    if (!ref.current) return;
    ref.current.children.forEach((ch,i) => {
      if (ch.material && ch.material.emissive) {
        ch.material.emissiveIntensity = 0.4 + Math.abs(Math.sin(c.elapsedTime*0.5+i*0.7))*0.4;
      }
    });
  });
  const windows = [];
  for(let y=0.3; y<h-0.5; y+=0.7) {
    for(let x=-w/2+0.3; x<w/2; x+=0.6) {
      windows.push(<mesh key={`${x}${y}`} position={[x, y-h/2, d/2+0.01]}>
        <boxGeometry args={[0.22,0.28,0.04]}/>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.9}/>
      </mesh>);
    }
  }
  return (
    <group ref={ref} position={[pos[0], pos[1]+h/2, pos[2]]}>
      {/* main body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w,h,d]}/>
        <meshStandardMaterial color="#0a1628" roughness={0.3} metalness={0.7}/>
      </mesh>
      {/* glowing top edge */}
      <mesh position={[0,h/2+0.04,0]}>
        <boxGeometry args={[w+0.1,0.08,d+0.1]}/>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.95}/>
      </mesh>
      {/* corner edges */}
      {[[-w/2,-d/2],[w/2,-d/2],[-w/2,d/2],[w/2,d/2]].map(([ex,ez],i)=>(
        <mesh key={i} position={[ex,0,ez]}>
          <boxGeometry args={[0.06,h+0.1,0.06]}/>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.7}/>
        </mesh>
      ))}
      {windows}
    </group>
  );
}

/* ── Road system ── */
function Roads({ color }) {
  return (
    <group>
      {/* horizontal road */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.02,0]}>
        <planeGeometry args={[22,5]}/>
        <meshStandardMaterial color="#0d1a2a" roughness={0.9}/>
      </mesh>
      {/* vertical road */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.02,0]}>
        <planeGeometry args={[5,22]}/>
        <meshStandardMaterial color="#0d1a2a" roughness={0.9}/>
      </mesh>
      {/* lane markings horizontal */}
      {[-8,-5,-2,2,5,8].map(x=>(
        <mesh key={x} rotation={[-Math.PI/2,0,0]} position={[x,0.03,0]}>
          <planeGeometry args={[1.2,0.1]}/>
          <meshStandardMaterial color="#c8d8e8" emissive="#c8d8e8" emissiveIntensity={0.5} transparent opacity={0.7}/>
        </mesh>
      ))}
      {/* lane markings vertical */}
      {[-8,-5,-2,2,5,8].map(z=>(
        <mesh key={z} rotation={[-Math.PI/2,0,0]} position={[0,0.03,z]}>
          <planeGeometry args={[0.1,1.2]}/>
          <meshStandardMaterial color="#c8d8e8" emissive="#c8d8e8" emissiveIntensity={0.5} transparent opacity={0.7}/>
        </mesh>
      ))}
      {/* crosswalks */}
      {[-1.8,-1.0,-0.2,0.6,1.4].map((x,i)=>(
        <mesh key={i} rotation={[-Math.PI/2,0,0]} position={[x,0.03,3.2]}>
          <planeGeometry args={[0.32,1.8]}/>
          <meshStandardMaterial color="#e8f4ff" emissive="#e8f4ff" emissiveIntensity={0.4} transparent opacity={0.6}/>
        </mesh>
      ))}
    </group>
  );
}

/* ── Ground plane ── */
function Ground({ color }) {
  return (
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.01,0]} receiveShadow>
      <planeGeometry args={[28,28]}/>
      <meshStandardMaterial color="#060e1a" roughness={1}/>
    </mesh>
  );
}

/* ── Grid overlay ── */
function GridOverlay({ color }) {
  const lines = useMemo(()=>{
    const out=[];
    for(let i=-12;i<=12;i+=2){
      out.push(
        <mesh key={`h${i}`} rotation={[-Math.PI/2,0,0]} position={[0,0.01,i]}>
          <planeGeometry args={[24,0.015]}/><meshBasicMaterial color={color} transparent opacity={0.1}/>
        </mesh>,
        <mesh key={`v${i}`} rotation={[-Math.PI/2,0,0]} position={[i,0.01,0]}>
          <planeGeometry args={[0.015,24]}/><meshBasicMaterial color={color} transparent opacity={0.1}/>
        </mesh>
      );
    }
    return out;
  },[color]);
  return <group>{lines}</group>;
}

/* ── Moving car ── */
function Car({ startX, lane, dir=1, speed=2.8, color="#22d3ee" }) {
  const r = useRef();
  useFrame((_,dt)=>{
    if(!r.current) return;
    r.current.position.x += dt*speed*dir;
    if(dir>0 && r.current.position.x>12) r.current.position.x=-12;
    if(dir<0 && r.current.position.x<-12) r.current.position.x=12;
  });
  return (
    <group ref={r} position={[startX,0.3,lane]}>
      <mesh castShadow>
        <boxGeometry args={[1.4,0.35,0.7]}/>
        <meshStandardMaterial color="#0f2040" roughness={0.3} metalness={0.6}/>
      </mesh>
      <mesh position={[-0.1,0.28,0]}>
        <boxGeometry args={[0.7,0.28,0.62]}/>
        <meshStandardMaterial color="#0a1830" roughness={0.3} metalness={0.5}/>
      </mesh>
      {/* headlights */}
      <mesh position={[0.72,0.05,0.22]}>
        <sphereGeometry args={[0.07,8,8]}/>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5}/>
      </mesh>
      <mesh position={[0.72,0.05,-0.22]}>
        <sphereGeometry args={[0.07,8,8]}/>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5}/>
      </mesh>
      {/* wheels */}
      {[[-0.45,-0.18,0.38],[-0.45,-0.18,-0.38],[0.45,-0.18,0.38],[0.45,-0.18,-0.38]].map((p,i)=>(
        <mesh key={i} rotation={[Math.PI/2,0,0]} position={p}>
          <cylinderGeometry args={[0.12,0.12,0.09,14]}/>
          <meshStandardMaterial color="#050d18"/>
        </mesh>
      ))}
    </group>
  );
}

/* ── Traffic signal ── */
function TrafficSignal({ pos, state="green", color }) {
  return (
    <group position={pos}>
      <mesh position={[0,1.8,0]}>
        <cylinderGeometry args={[0.07,0.07,3.6,8]}/>
        <meshStandardMaterial color="#1a2840" metalness={0.8}/>
      </mesh>
      <mesh position={[-0.75,3.4,0]}>
        <boxGeometry args={[1.55,0.07,0.07]}/>
        <meshStandardMaterial color="#1a2840" metalness={0.8}/>
      </mesh>
      <mesh position={[-1.45,3.1,0]}>
        <boxGeometry args={[0.5,1.5,0.42]}/>
        <meshStandardMaterial color="#060e1a" metalness={0.5}/>
      </mesh>
      {[["#ef4444","red",3.58],["#facc15","yellow",3.1],["#22c55e","green",2.62]].map(([c,name,y])=>(
        <mesh key={name} position={[-1.45,y,0.23]}>
          <sphereGeometry args={[0.13,16,16]}/>
          <meshStandardMaterial
            color={state===name?c:"#1e293b"}
            emissive={state===name?c:"#000"}
            emissiveIntensity={state===name?5:0}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── AI Sensor node ── */
function SensorNode({ pos, color, label }) {
  const r = useRef();
  useFrame(({ clock:c })=>{
    if(!r.current) return;
    const s = 1+Math.sin(c.elapsedTime*3)*0.2;
    r.current.scale.set(s,s,s);
  });
  return (
    <group position={pos}>
      <mesh ref={r}>
        <sphereGeometry args={[0.18,16,16]}/>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5}/>
      </mesh>
      <mesh rotation={[-Math.PI/2,0,0]}>
        <torusGeometry args={[1.2,0.025,10,60]}/>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.6}/>
      </mesh>
      <Text position={[0,0.55,0]} fontSize={0.15} color={color} anchorX="center">{label}</Text>
    </group>
  );
}

/* ── Data stream particles ── */
function DataStream({ from, to, color, n=6 }) {
  const pts = useRef(Array.from({length:n},()=>({t:Math.random()})));
  const ms  = useRef([]);
  useFrame((_,dt)=>{
    pts.current.forEach((p,i)=>{
      p.t=(p.t+dt*(0.4+i*0.06))%1;
      const el=ms.current[i]; if(!el) return;
      el.position.set(
        from[0]+(to[0]-from[0])*p.t,
        from[1]+(to[1]-from[1])*p.t,
        from[2]+(to[2]-from[2])*p.t
      );
    });
  });
  return <>{Array.from({length:n}).map((_,i)=>(
    <mesh key={i} ref={el=>ms.current[i]=el} position={from}>
      <sphereGeometry args={[0.07,8,8]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={7}/>
    </mesh>
  ))}</>;
}

/* ── Pulse ring ── */
function PulseRing({ pos=[0,0,0], color, r=3, spd=0.5 }) {
  const m = useRef();
  useFrame(({ clock:c })=>{ if(m.current){ const s=1+Math.sin(c.elapsedTime*spd)*0.07; m.current.scale.set(s,s,s); } });
  return <mesh ref={m} position={pos} rotation={[-Math.PI/2,0,0]}><torusGeometry args={[r,0.025,10,80]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.55}/></mesh>;
}

/* ═══════════════════════════════════════════════
   20 DOMAIN SCENES — realistic models
═══════════════════════════════════════════════ */

/* SMART CITY */
function SceneCity({ color, phase }) {
  const [signal, setSignal] = useState("green");
  useEffect(() => {
    const seq=["green","green","yellow","red"]; let i=0;
    const id=setInterval(()=>{ i=(i+1)%seq.length; setSignal(seq[i]); },2200);
    return ()=>clearInterval(id);
  },[]);
  const spin = useRef();
  useFrame(({ clock:c })=>{ if(spin.current) spin.current.rotation.y=c.elapsedTime*0.05; });
  return (
    <group ref={spin}>
      <Ground color={color}/><GridOverlay color={color}/><Roads color={color}/>
      {[[-6,0,-6,2,9,2],[-3,0,-7,1.5,5,1.5],[0,0,-8,2.8,13,2.8],[4,0,-6,2,8,2],[7,0,-5,2,10,2],[-7,0,-2,2,6,2],[6,0,1,1.5,5,1.5],[-4,0,3,2,4,2],[4,0,3,2,7,2]].map(([x,y,z,w,h,d],i)=>(
        <Building key={i} pos={[x,y,z]} w={w} h={h} d={d} color={color}/>
      ))}
      <TrafficSignal pos={[4.5,0,4.5]} state={signal} color={color}/>
      {phase>=1 && <>
        <SensorNode pos={[0,3,0]} color={color} label="AI CORE"/>
        <SensorNode pos={[-4,2,0]} color={color} label="VEHICLE COUNT"/>
        <SensorNode pos={[4,2,0]} color={color} label="QUEUE SENSOR"/>
      </>}
      {phase>=2 && <>
        <Car startX={-10} lane={-1.3} dir={1} speed={2.8} color={color}/>
        <Car startX={-5} lane={-1.3} dir={1} speed={2.2} color="#38bdf8"/>
        <Car startX={8} lane={1.3} dir={-1} speed={2.5} color={color}/>
        <Car startX={3} lane={1.3} dir={-1} speed={2.0} color="#a78bfa"/>
      </>}
      {phase>=3 && <>
        <PulseRing pos={[0,0.1,0]} color={color} r={5} spd={0.5}/>
        <DataStream from={[0,3,0]} to={[-4,2,0]} color={color} n={4}/>
        <DataStream from={[0,3,0]} to={[4,2,0]} color={color} n={4}/>
      </>}
      {phase>=4 && <PulseRing pos={[0,0.2,0]} color={color} r={9} spd={0.25}/>}
      <Text position={[0,5.5,0]} fontSize={0.4} color={color} anchorX="center" fontWeight="bold">SMART CITY AI</Text>
    </group>
  );
}

/* AGRICULTURE */
function SceneFarm({ color, phase }) {
  const droneRef = useRef();
  useFrame(({ clock:c })=>{
    if(!droneRef.current) return;
    droneRef.current.position.x=Math.sin(c.elapsedTime*0.5)*5;
    droneRef.current.position.z=Math.cos(c.elapsedTime*0.4)*4;
    droneRef.current.position.y=3.8+Math.sin(c.elapsedTime)*0.2;
  });
  const crops=[];
  for(let x=-6;x<=6;x+=1.6) for(let z=-5;z<=5;z+=1.4){
    const sick=phase>=2&&(x+z+2)%5===0;
    crops.push(
      <group key={`${x}${z}`} position={[x,0,z]}>
        <mesh position={[0,0.3,0]}><cylinderGeometry args={[0.12,0.15,0.6,8]}/><meshStandardMaterial color="#3d2006" roughness={1}/></mesh>
        <mesh position={[0,0.85,0]}><coneGeometry args={[0.28,1.1,7]}/><meshStandardMaterial color={sick?"#dc2626":color} emissive={sick?"#dc2626":color} emissiveIntensity={sick?2:0.8} transparent opacity={0.9}/></mesh>
        {sick&&phase>=2&&<mesh position={[0,1.5,0]}><sphereGeometry args={[0.1,8,8]}/><meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={5}/></mesh>}
      </group>
    );
  }
  return (
    <group>
      <Ground color={color}/><GridOverlay color={color}/>
      {/* soil */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.01,0]}><planeGeometry args={[18,14]}/><meshStandardMaterial color="#1a0f05" roughness={1}/></mesh>
      {crops}
      {/* barn */}
      <Building pos={[0,0,-7]} w={4} h={3.5} d={3} color={color}/>
      {phase>=1&&[[-5,0,0],[0,0,-4],[5,0,2],[-2,0,4]].map((p,i)=>(
        <group key={i} position={p}>
          <mesh position={[0,0.4,0]}><cylinderGeometry args={[0.1,0.13,0.8,8]}/><meshStandardMaterial color="#2a1a06"/></mesh>
          <mesh position={[0,0.9,0]}><sphereGeometry args={[0.14,12,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={4}/></mesh>
          {phase>=3&&<DataStream from={[0,0.9,0]} to={[0,3.8,0]} color={color} n={3}/>}
        </group>
      ))}
      {phase>=2&&(
        <group ref={droneRef}>
          <mesh><boxGeometry args={[0.8,0.12,0.8]}/><meshStandardMaterial color="#1a2840" metalness={0.8}/></mesh>
          {[[-0.45,0,-0.45],[-0.45,0,0.45],[0.45,0,-0.45],[0.45,0,0.45]].map((p,i)=>(
            <mesh key={i} position={p}><boxGeometry args={[0.38,0.05,0.1]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={4}/></mesh>
          ))}
          <mesh position={[0,0.1,0]}><sphereGeometry args={[0.12,12,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={5}/></mesh>
          <PulseRing pos={[0,0,0]} color={color} r={1} spd={6}/>
          {phase>=4&&<DataStream from={[0,-0.2,0]} to={[0,-3.8,0]} color={color} n={5}/>}
        </group>
      )}
      <Text position={[0,6,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">PRECISION AGRICULTURE</Text>
    </group>
  );
}

/* HOSPITAL */
function SceneHospital({ color, phase }) {
  const scanY = useRef(0);
  const scanMesh = useRef();
  useFrame(({ clock:c })=>{ if(scanMesh.current) scanMesh.current.position.y=1+Math.sin(c.elapsedTime*1.8)*1.6; });
  return (
    <group>
      <Ground color={color}/><GridOverlay color={color}/>
      <Building pos={[0,0,0]} w={7} h={8} d={4.5} color={color}/>
      <Building pos={[-6,0,0]} w={3} h={4.5} d={3.5} color={color}/>
      <Building pos={[6,0,0]} w={3} h={4.5} d={3.5} color={color}/>
      {/* red cross */}
      <mesh position={[0,8.6,2.35]}><boxGeometry args={[1.6,0.18,0.18]}/><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={5}/></mesh>
      <mesh position={[0,8.6,2.35]}><boxGeometry args={[0.18,1.6,0.18]}/><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={5}/></mesh>
      {phase>=1&&[[-2,0.5,2.35],[0,0.5,2.35],[2,0.5,2.35]].map((p,i)=>(
        <group key={i} position={p}>
          <mesh><boxGeometry args={[0.9,0.22,0.45]}/><meshStandardMaterial color="#0d1f35" metalness={0.5}/></mesh>
          <mesh position={[0,0.35,0]}><sphereGeometry args={[0.1,12,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={4}/></mesh>
          {phase>=3&&<DataStream from={[0,0.4,0]} to={[0,2.5,0]} color={color} n={3}/>}
        </group>
      ))}
      {phase>=2&&(
        <group position={[0,1,0]}>
          <mesh><cylinderGeometry args={[1.4,1.4,2,20]}/><meshStandardMaterial color="#0d1f35" metalness={0.7} roughness={0.3} transparent opacity={0.5}/></mesh>
          <mesh ref={scanMesh}><boxGeometry args={[0.08,0.05,2.9]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={7} transparent opacity={0.8}/></mesh>
          <PulseRing pos={[0,0,0]} color={color} r={1.5} spd={1.5}/>
        </group>
      )}
      {phase>=4&&<DataStream from={[0,5,2.5]} to={[0,9,0]} color={color} n={8}/>}
      <Text position={[0,10,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">SMART HEALTHCARE</Text>
    </group>
  );
}

/* WEATHER */
function SceneWeather({ color, phase }) {
  const cloudRef = useRef();
  const rainMeshes = useRef([]);
  useFrame(({ clock:c })=>{
    if(cloudRef.current){ cloudRef.current.rotation.y=c.elapsedTime*0.1; cloudRef.current.position.y=4+Math.sin(c.elapsedTime*0.4)*0.3; }
    rainMeshes.current.forEach(r=>{ if(!r) return; r.position.y-=0.1; if(r.position.y<-1) r.position.y=6; });
  });
  return (
    <group>
      <Ground color={color}/><GridOverlay color={color}/>
      {/* sun */}
      <mesh position={[7,6,-5]}><sphereGeometry args={[1.4,24,24]}/><meshStandardMaterial color="#facc15" emissive="#facc15" emissiveIntensity={1.5} transparent opacity={0.8}/></mesh>
      <PulseRing pos={[7,6,-5]} color="#facc15" r={2} spd={0.4}/>
      {/* main cloud */}
      <group ref={cloudRef} position={[0,5,0]}>
        {[[0,0,0,3,1.4,2.2],[1.8,0.4,0,2.2,1.1,1.8],[-1.8,0.3,0,2.2,1.1,1.8],[0,0.7,0,1.8,1,1.5]].map(([x,y,z,w,h,d],i)=>(
          <mesh key={i} position={[x,y,z]}><boxGeometry args={[w,h,d]}/><meshStandardMaterial color={phase>=2?"#334155":"#94a3b8"} emissive={phase>=2?"#1e293b":"#475569"} emissiveIntensity={1} transparent opacity={0.7}/></mesh>
        ))}
      </group>
      {/* storm cloud */}
      {phase>=2&&<group position={[-4,4,2]}>
        {[[0,0,0,2.5,1.1,2],[1.2,0.3,0,1.8,0.8,1.6]].map(([x,y,z,w,h,d],i)=>(
          <mesh key={i} position={[x,y,z]}><boxGeometry args={[w,h,d]}/><meshStandardMaterial color="#1e293b" emissive="#0f172a" emissiveIntensity={2} transparent opacity={0.8}/></mesh>
        ))}
        <mesh position={[0,-0.8,0]}><sphereGeometry args={[0.14,12,12]}/><meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={6}/></mesh>
      </group>}
      {/* rain */}
      {phase>=2&&Array.from({length:25}).map((_,i)=>(
        <mesh key={i} ref={el=>rainMeshes.current[i]=el} position={[(Math.random()-0.5)*14,Math.random()*6,(Math.random()-0.5)*12]}>
          <cylinderGeometry args={[0.03,0.03,0.5,6]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.65}/>
        </mesh>
      ))}
      {/* weather stations */}
      {phase>=1&&[[-5,0,3],[0,0,-4],[5,0,1]].map((p,i)=>(
        <group key={i} position={p}>
          <mesh position={[0,1.8,0]}><cylinderGeometry args={[0.07,0.09,3.6,8]}/><meshStandardMaterial color="#1a2840" metalness={0.8}/></mesh>
          <mesh position={[0,3.7,0]}><sphereGeometry args={[0.17,14,14]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={4}/></mesh>
          {phase>=3&&<DataStream from={[0,3.7,0]} to={[0,5.5,0]} color={color} n={3}/>}
        </group>
      ))}
      <Text position={[0,7.5,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">WEATHER INTELLIGENCE</Text>
    </group>
  );
}

/* ENERGY */
function SceneEnergy({ color, phase }) {
  const blades = useRef([]);
  useFrame(({ clock:c })=>blades.current.forEach((r,i)=>{ if(r) r.rotation.z=c.elapsedTime*(1.2+i*0.3); }));
  return (
    <group>
      <Ground color={color}/><GridOverlay color={color}/>
      {[[-7,0,-3],[0,0,-5],[7,0,-3]].map((pos,wi)=>(
        <group key={wi} position={pos}>
          <mesh position={[0,4.5,0]}><cylinderGeometry args={[0.18,0.22,9,12]}/><meshStandardMaterial color="#1a2840" metalness={0.8} roughness={0.3}/></mesh>
          <group ref={el=>blades.current[wi]=el} position={[0,9,0]}>
            {[0,120,240].map((a,bi)=>(
              <group key={bi} rotation={[0,0,a*Math.PI/180]}>
                <mesh position={[0,1.8,0]}><boxGeometry args={[0.22,3.6,0.09]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9}/></mesh>
              </group>
            ))}
          </group>
          {phase>=2&&<mesh position={[0,9.2,0]}><sphereGeometry args={[0.22,14,14]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={5}/></mesh>}
          {phase>=3&&<DataStream from={[0,9,0]} to={[0,0,0]} color={color} n={4}/>}
        </group>
      ))}
      {[[-6,0.7,4],[-3,0.7,4],[0,0.7,4],[3,0.7,4],[6,0.7,4]].map((p,i)=>(
        <group key={i}>
          <mesh position={p} rotation={[-0.45,0,0]}><boxGeometry args={[2.4,0.08,1.6]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={phase>=1?1.5:0.4} transparent opacity={0.7}/></mesh>
          {/* panel frame */}
          <mesh position={[p[0],p[1]+0.05,p[2]]} rotation={[-0.45,0,0]}><boxGeometry args={[2.52,0.04,1.72]}/><meshStandardMaterial color="#1a2840" metalness={0.9}/></mesh>
        </group>
      ))}
      {phase>=4&&<>
        <PulseRing pos={[0,0.1,0]} color={color} r={8} spd={0.3}/>
        <DataStream from={[-6,0.7,4]} to={[0,0,0]} color={color} n={5}/>
        <DataStream from={[6,0.7,4]} to={[0,0,0]} color={color} n={5}/>
      </>}
      <Text position={[0,11,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">RENEWABLE ENERGY GRID</Text>
    </group>
  );
}

/* WATER */
function SceneWater({ color, phase }) {
  return (
    <group>
      <Ground color={color}/><GridOverlay color={color}/>
      {/* reservoir */}
      <mesh position={[-6,0.8,0]}>
        <boxGeometry args={[4,1.6,3.5]}/>
        <meshStandardMaterial color="#0a1e35" metalness={0.5} roughness={0.5}/>
      </mesh>
      <mesh position={[-6,1.6,0]}><boxGeometry args={[4.1,0.08,3.6]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.5}/></mesh>
      {/* main pipe */}
      <mesh position={[0,0.5,0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.28,0.28,12,14]}/><meshStandardMaterial color="#1a2840" metalness={0.9} roughness={0.2}/></mesh>
      {/* treatment plant */}
      <mesh position={[6,1,0]}><cylinderGeometry args={[1.6,1.8,2.5,20]}/><meshStandardMaterial color="#0a1e35" metalness={0.5}/></mesh>
      <mesh position={[6,2.35,0]}><cylinderGeometry args={[1.62,1.62,0.12,20]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.7}/></mesh>
      {[-3,-1,1,3].map((x,i)=>(
        <group key={i} position={[x,0.5,0]}>
          <mesh><sphereGeometry args={[0.18,12,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={4}/></mesh>
          {phase>=2&&<PulseRing pos={[0,0,0]} color={color} r={0.5} spd={2+i*0.4}/>}
          {phase>=3&&<DataStream from={[0,0.2,0]} to={[0,2.5,0]} color={color} n={3}/>}
        </group>
      ))}
      {phase>=1&&<DataStream from={[-6,0.6,0]} to={[6,0.6,0]} color={color} n={12} spd={0.5}/>}
      {phase>=4&&<PulseRing pos={[6,1,0]} color={color} r={2.2} spd={0.8}/>}
      <Text position={[0,5,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">SMART WATER MANAGEMENT</Text>
    </group>
  );
}

/* EDUCATION */
function SceneEducation({ color, phase }) {
  return (
    <group>
      <Ground color={color}/><GridOverlay color={color}/>
      <Building pos={[0,0,0]} w={8} h={4.5} d={4.5} color={color}/>
      <Building pos={[-6,0,0]} w={3} h={3.5} d={3} color={color}/>
      <Building pos={[6,0,0]} w={3} h={3.5} d={3} color={color}/>
      {/* smart board */}
      {phase>=2&&<mesh position={[0,3,2.35]}><boxGeometry args={[3.8,2,0.12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={0.5} wireframe/></mesh>}
      {/* student nodes */}
      {phase>=1&&[[-2,0.4,2.35],[0,0.4,2.35],[2,0.4,2.35],[-1,0.4,3],[1,0.4,3]].map((p,i)=>(
        <group key={i} position={p}>
          <mesh><boxGeometry args={[0.55,0.12,0.45]}/><meshStandardMaterial color="#0d1f35" metalness={0.5}/></mesh>
          <mesh position={[0,0.22,0]}><boxGeometry args={[0.45,0.3,0.04]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.6}/></mesh>
          {phase>=3&&<DataStream from={[0,0.35,0]} to={[0,1.8,0]} color={color} n={2}/>}
        </group>
      ))}
      {/* satellite dish */}
      {phase>=3&&<group position={[0,5,0]}>
        <mesh rotation={[-Math.PI/4,0,0]}><coneGeometry args={[1,0.5,20]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.6} wireframe/></mesh>
        <PulseRing pos={[0,0,0]} color={color} r={1.4} spd={1.5}/>
        <DataStream from={[0,0.5,0]} to={[0,4.5,0]} color={color} n={6}/>
      </group>}
      <Text position={[0,7.5,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">SMART EDUCATION SYSTEM</Text>
    </group>
  );
}

/* SPORTS */
function SceneSports({ color, phase }) {
  const playerRef = useRef();
  useFrame(({ clock:c })=>{
    if(!playerRef.current) return;
    playerRef.current.position.x=Math.sin(c.elapsedTime*0.9)*4;
    playerRef.current.position.z=Math.cos(c.elapsedTime*0.7)*2.5;
  });
  return (
    <group>
      <Ground color={color}/><GridOverlay color={color}/>
      {/* pitch */}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.02,0]}><planeGeometry args={[15,10]}/><meshStandardMaterial color="#0a1f0a" roughness={0.9}/></mesh>
      {/* pitch lines */}
      {[[-5,0,0],[5,0,0]].map((p,i)=>(
        <mesh key={i} rotation={[-Math.PI/2,0,0]} position={p}><planeGeometry args={[0.06,10]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.6}/></mesh>
      ))}
      {/* goal posts */}
      {[-7.5,7.5].map((x,i)=>(
        <group key={i} position={[x,0,0]}>
          <mesh position={[0,1.8,0]}><boxGeometry args={[0.1,3.6,0.1]}/><meshStandardMaterial color="#c0d8f0" metalness={0.8}/></mesh>
          <mesh position={[0,3.6,0]}><boxGeometry args={[0.1,0.1,4.5]}/><meshStandardMaterial color="#c0d8f0" metalness={0.8}/></mesh>
        </group>
      ))}
      {/* stands */}
      {[0,Math.PI/2,Math.PI,3*Math.PI/2].map((rot,i)=>(
        <mesh key={i} position={[Math.sin(rot)*9,1.8,Math.cos(rot)*6.5]} rotation={[0,rot,0]}>
          <boxGeometry args={[13,3.2,1.8]}/>
          <meshStandardMaterial color="#0a1628" metalness={0.5} roughness={0.5}/>
        </mesh>
      ))}
      {/* player */}
      {phase>=2&&<group ref={playerRef}>
        <mesh position={[0,0.85,0]}><sphereGeometry args={[0.25,14,14]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={3}/></mesh>
        <mesh position={[0,0.35,0]}><cylinderGeometry args={[0.15,0.18,0.7,10]}/><meshStandardMaterial color="#1a2840"/></mesh>
        {phase>=3&&<PulseRing pos={[0,0.5,0]} color={color} r={0.8} spd={3}/>}
        {phase>=4&&<DataStream from={[0,1.1,0]} to={[0,4.5,0]} color={color} n={5}/>}
      </group>}
      {/* AI camera poles */}
      {phase>=1&&[[-6,0,5.5],[6,0,5.5],[-6,0,-5.5],[6,0,-5.5]].map((p,i)=>(
        <group key={i} position={p}>
          <mesh position={[0,3,0]}><cylinderGeometry args={[0.07,0.09,6,8]}/><meshStandardMaterial color="#1a2840" metalness={0.8}/></mesh>
          <mesh position={[0,6.2,0]}><sphereGeometry args={[0.18,12,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={4}/></mesh>
          {phase>=3&&<PulseRing pos={[0,6.2,0]} color={color} r={0.6} spd={2.5}/>}
        </group>
      ))}
      <Text position={[0,8.5,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">AI SPORTS ANALYTICS</Text>
    </group>
  );
}

/* SECURITY */
function SceneSecurity({ color, phase }) {
  const scanRef = useRef();
  useFrame(({ clock:c })=>{ if(scanRef.current) scanRef.current.rotation.y=c.elapsedTime*1.8; });
  return (
    <group>
      <Ground color={color}/><GridOverlay color={color}/>
      <Building pos={[0,0,0]} w={10} h={6} d={7} color={color}/>
      <Building pos={[-7,0,-4]} w={3} h={3.5} d={3} color={color}/>
      <Building pos={[7,0,-4]} w={3} h={3.5} d={3} color={color}/>
      {[[-4.8,3.5,3.6],[4.8,3.5,3.6],[-4.8,3.5,-3.6],[4.8,3.5,-3.6],[0,6.2,0]].map((p,i)=>(
        <group key={i} position={p}>
          <mesh><sphereGeometry args={[0.26,14,14]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={4}/></mesh>
          <PulseRing pos={[0,0,0]} color={color} r={0.8} spd={2+i*0.3}/>
          {phase>=2&&<mesh ref={i===0?scanRef:undefined} rotation={[0,i*72*Math.PI/180,0]} position={[0.9,0,0]}>
            <coneGeometry args={[0.14,3,8]}/>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.2}/>
          </mesh>}
        </group>
      ))}
      {phase>=3&&<PulseRing pos={[0,0.1,0]} color={color} r={8} spd={0.5}/>}
      {phase>=4&&<DataStream from={[0,6.5,0]} to={[0,0,0]} color={color} n={12}/>}
      <Text position={[0,8.5,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">AI SURVEILLANCE SYSTEM</Text>
    </group>
  );
}

/* BLOCKCHAIN */
function SceneBlockchain({ color, phase }) {
  const spinRef = useRef();
  useFrame(({ clock:c })=>{ if(spinRef.current) spinRef.current.rotation.y=c.elapsedTime*0.18; });
  const nodes=[[0,3,0],[4,1,3],[-4,1,3],[4,1,-3],[-4,1,-3],[0,0,6],[0,0,-6],[6,1.5,0],[-6,1.5,0]];
  return (
    <group ref={spinRef}>
      <Ground color={color}/><GridOverlay color={color}/>
      {nodes.map((p,i)=>(
        <group key={i} position={p}>
          <mesh><icosahedronGeometry args={[0.38,0]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.9}/></mesh>
          <PulseRing pos={[0,0,0]} color={color} r={0.7} spd={1.5+i*0.2}/>
          {phase>=2&&i>0&&<DataStream from={[0,0,0]} to={[nodes[0][0]-p[0],nodes[0][1]-p[1]+1,nodes[0][2]-p[2]]} color={color} n={3} spd={0.3}/>}
        </group>
      ))}
      {phase>=3&&<PulseRing pos={[0,0.1,0]} color={color} r={7} spd={0.3}/>}
      {phase>=4&&<PulseRing pos={[0,0.1,0]} color={color} r={10} spd={0.15}/>}
      <Text position={[0,5.5,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">BLOCKCHAIN NETWORK</Text>
    </group>
  );
}

/* FACTORY */
function SceneFactory({ color, phase }) {
  const convRef = useRef();
  useFrame(({ clock:c })=>{
    if(!convRef.current) return;
    convRef.current.children.forEach((ch,i)=>{ ch.position.x=((i*1.7-c.elapsedTime*1.8)%8.5)-4.2; });
  });
  return (
    <group>
      <Ground color={color}/><GridOverlay color={color}/>
      <Building pos={[-5,0,0]} w={5.5} h={7} d={5} color={color}/>
      <Building pos={[5.5,0,0]} w={4.5} h={6} d={4.5} color={color}/>
      <mesh position={[-4,7.5,0]}><cylinderGeometry args={[0.35,0.42,3,12]}/><meshStandardMaterial color="#1a2840" metalness={0.8}/></mesh>
      <mesh position={[-4,9.3,0]}><sphereGeometry args={[0.18,12,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={3}/></mesh>
      <mesh position={[0,0.6,0]}><boxGeometry args={[8,0.18,0.95]}/><meshStandardMaterial color="#1a2840" metalness={0.7}/></mesh>
      <group ref={convRef}>
        {[0,1,2,3,4].map(i=>(
          <mesh key={i} position={[i*1.7-4,0.95,0]}>
            <boxGeometry args={[0.52,0.52,0.52]}/>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} transparent opacity={0.8} wireframe/>
          </mesh>
        ))}
      </group>
      {phase>=2&&<group position={[0,1.4,0]}>
        <mesh position={[0,1,0]}><boxGeometry args={[0.24,2,0.24]}/><meshStandardMaterial color="#1a2840" metalness={0.8}/></mesh>
        <mesh position={[0,2.1,0]}><sphereGeometry args={[0.22,14,14]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={4}/></mesh>
        {phase>=3&&<PulseRing pos={[0,2.1,0]} color={color} r={0.8} spd={3}/>}
      </group>}
      {phase>=4&&<DataStream from={[0,3.5,0]} to={[0,8,0]} color={color} n={8}/>}
      <Text position={[0,10,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">SMART MANUFACTURING</Text>
    </group>
  );
}

/* ROBOTICS / DRONES */
function SceneRobotics({ color, phase }) {
  const droneRefs = useRef([]);
  useFrame(({ clock:c })=>{
    droneRefs.current.forEach((r,i)=>{
      if(!r) return;
      r.position.x=Math.sin(c.elapsedTime*(0.45+i*0.25)+i*2)*5;
      r.position.z=Math.cos(c.elapsedTime*(0.38+i*0.2)+i*2)*4;
      r.position.y=3+Math.sin(c.elapsedTime+i)*0.45;
    });
  });
  return (
    <group>
      <Ground color={color}/><GridOverlay color={color}/>
      {/* base station */}
      <mesh position={[0,0.8,0]}><boxGeometry args={[4,1.6,4]}/><meshStandardMaterial color="#0a1628" metalness={0.7} roughness={0.3}/></mesh>
      <mesh position={[0,1.68,0]}><boxGeometry args={[4.1,0.08,4.1]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} transparent opacity={0.9}/></mesh>
      <mesh position={[0,2.2,0]}><sphereGeometry args={[0.32,16,16]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={5}/></mesh>
      <PulseRing pos={[0,0.1,0]} color={color} r={3} spd={0.7}/>
      {[0,1,2,3].map(i=>(
        <group key={i} ref={el=>droneRefs.current[i]=el} position={[(i-1.5)*3,3.5,0]}>
          <mesh><boxGeometry args={[0.7,0.13,0.7]}/><meshStandardMaterial color="#1a2840" metalness={0.8}/></mesh>
          {[[-0.4,0,-0.4],[-0.4,0,0.4],[0.4,0,-0.4],[0.4,0,0.4]].map((p,j)=>(
            <mesh key={j} position={p}><boxGeometry args={[0.36,0.05,0.1]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={5}/></mesh>
          ))}
          <mesh position={[0,0.12,0]}><sphereGeometry args={[0.12,12,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={5}/></mesh>
          <PulseRing pos={[0,0,0]} color={color} r={0.9} spd={6}/>
          {phase>=3&&<DataStream from={[0,-0.1,0]} to={[0,-3,0]} color={color} n={3}/>}
        </group>
      ))}
      {phase>=4&&[[-5,0,-5],[5,0,-5],[-5,0,5],[5,0,5]].map((p,i)=>(
        <DataStream key={i} from={p} to={[0,0,0]} color={color} n={4}/>
      ))}
      <Text position={[0,7,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">AUTONOMOUS DRONE SYSTEM</Text>
    </group>
  );
}

/* NATURE / ENVIRONMENT */
function SceneNature({ color, phase }) {
  const spinRef = useRef();
  useFrame(({ clock:c })=>{ if(spinRef.current) spinRef.current.rotation.y=c.elapsedTime*0.08; });
  const trees=[[-5,0,-4],[-3,0,-5.5],[0,0,-6],[3,0,-5.5],[5,0,-4],[-6.5,0,0],[6.5,0,0],[-5,0,4],[5,0,4],[0,0,5.5]];
  return (
    <group ref={spinRef}>
      <Ground color={color}/>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.01,0]}><planeGeometry args={[22,22]}/><meshStandardMaterial color="#061208" roughness={1}/></mesh>
      <GridOverlay color={color}/>
      {trees.map((p,i)=>(
        <group key={i} position={p}>
          <mesh position={[0,1.2,0]}><cylinderGeometry args={[0.2,0.28,2.4,8]}/><meshStandardMaterial color="#3d1a06" roughness={1}/></mesh>
          <mesh position={[0,3.5,0]}><coneGeometry args={[1.1,2.6,8]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} transparent opacity={0.9}/></mesh>
          <mesh position={[0,4.8,0]}><coneGeometry args={[0.8,2,8]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.9} transparent opacity={0.9}/></mesh>
          {phase>=2&&i%3===0&&<mesh position={[0,5.8,0]}><sphereGeometry args={[0.14,10,10]}/><meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={5}/></mesh>}
        </group>
      ))}
      {phase>=2&&<group position={[2,5.5,0]}>
        <mesh><sphereGeometry args={[1.8,14,14]}/><meshStandardMaterial color="#334155" emissive="#1e293b" emissiveIntensity={2} transparent opacity={0.4}/></mesh>
        <PulseRing pos={[0,0,0]} color="#f43f5e" r={2.2} spd={0.8}/>
      </group>}
      {phase>=3&&[[-3.5,4.5,2],[3.5,4.5,-2],[0,4.5,3.5]].map((p,i)=>(
        <group key={i} position={p}>
          <mesh><boxGeometry args={[0.6,0.13,0.6]}/><meshStandardMaterial color="#1a2840" metalness={0.8}/></mesh>
          <PulseRing pos={[0,0,0]} color={color} r={0.8} spd={5}/>
          {phase>=4&&<DataStream from={[0,-0.1,0]} to={[0,-4.5,0]} color={color} n={3}/>}
        </group>
      ))}
      {phase>=5&&<Text position={[0,7.5,0]} fontSize={0.28} color="#22c55e" anchorX="center">✓ POLLUTION REDUCED 73%</Text>}
      <Text position={[0,8.5,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">ENVIRONMENT MONITORING</Text>
    </group>
  );
}

/* DISASTER */
function SceneDisaster({ color, phase }) {
  const alertRef = useRef();
  useFrame(({ clock:c })=>{ if(alertRef.current) alertRef.current.material.emissiveIntensity=2+Math.abs(Math.sin(c.elapsedTime*4))*5; });
  return (
    <group>
      <Ground color="#1a0a05"/>
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,0.01,0]}><planeGeometry args={[24,24]}/><meshStandardMaterial color="#120806" roughness={1}/></mesh>
      <GridOverlay color="#f43f5e"/>
      <mesh ref={alertRef} position={[0,2.5,0]}><sphereGeometry args={[2,16,16]}/><meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={2} transparent opacity={0.12}/></mesh>
      {[[-5,0,-3],[0,0,-5],[5,0,-3],[-6,0,1],[6,0,1],[0,0,5]].map((p,i)=>(
        <group key={i} position={p}>
          <mesh position={[0,2.2,0]}><cylinderGeometry args={[0.08,0.1,4.4,8]}/><meshStandardMaterial color="#1a2030" metalness={0.8}/></mesh>
          <mesh position={[0,4.6,0]}><sphereGeometry args={[0.2,12,12]}/><meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={5}/></mesh>
          {phase>=2&&<PulseRing pos={[0,4.6,0]} color="#f43f5e" r={0.8} spd={3+i*0.3}/>}
          {phase>=3&&<DataStream from={[0,4.6,0]} to={[0,0,0]} color={color} n={3}/>}
        </group>
      ))}
      {phase>=2&&<PulseRing pos={[0,0.1,0]} color="#f43f5e" r={5} spd={0.7}/>}
      {phase>=3&&<PulseRing pos={[0,0.2,0]} color={color} r={8} spd={0.35}/>}
      {phase>=5&&<Text position={[0,6,0]} fontSize={0.28} color="#22c55e" anchorX="center">✓ EARLY WARNING SENT</Text>}
      <Text position={[0,7.5,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">DISASTER RESPONSE SYSTEM</Text>
    </group>
  );
}

/* TRANSPORT / LOGISTICS */
function SceneTransport({ color, phase }) {
  const truck1=useRef(), truck2=useRef(), truck3=useRef();
  useFrame((_,dt)=>{
    if(truck1.current){ truck1.current.position.x+=dt*2.5; if(truck1.current.position.x>12) truck1.current.position.x=-12; }
    if(truck2.current){ truck2.current.position.x-=dt*2; if(truck2.current.position.x<-12) truck2.current.position.x=12; }
    if(truck3.current){ truck3.current.position.z+=dt*2.2; if(truck3.current.position.z>12) truck3.current.position.z=-12; }
  });
  return (
    <group>
      <Ground color={color}/><GridOverlay color={color}/>
      <Roads color={color}/>
      <Building pos={[-7,0,-6]} w={3} h={4} d={3} color={color}/>
      <Building pos={[7,0,-6]} w={3} h={4} d={3} color={color}/>
      <Building pos={[0,0,-7]} w={4} h={5} d={3} color={color}/>
      {/* trucks */}
      <group ref={truck1} position={[-10,0.5,-1.5]}>
        <mesh><boxGeometry args={[3.2,1,1.4]}/><meshStandardMaterial color="#0f2040" metalness={0.6}/></mesh>
        <mesh position={[-0.8,0.7,0]}><boxGeometry args={[1.5,0.9,1.35]}/><meshStandardMaterial color="#0a1628" metalness={0.5}/></mesh>
        {[[-1.1,-0.48,0.75],[-1.1,-0.48,-0.75],[1.1,-0.48,0.75],[1.1,-0.48,-0.75]].map((p,i)=>(
          <mesh key={i} rotation={[Math.PI/2,0,0]} position={p}><cylinderGeometry args={[0.15,0.15,0.12,12]}/><meshStandardMaterial color="#050d18"/></mesh>
        ))}
        {phase>=2&&<mesh position={[0,1.2,0]}><sphereGeometry args={[0.14,12,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={4}/></mesh>}
      </group>
      <group ref={truck2} position={[10,0.5,1.5]}>
        <mesh><boxGeometry args={[3.2,1,1.4]}/><meshStandardMaterial color="#0f2040" metalness={0.6}/></mesh>
        <mesh position={[-0.8,0.7,0]}><boxGeometry args={[1.5,0.9,1.35]}/><meshStandardMaterial color="#0a1628" metalness={0.5}/></mesh>
      </group>
      <group ref={truck3} position={[1.5,0.5,-10]} rotation={[0,Math.PI/2,0]}>
        <mesh><boxGeometry args={[3.2,1,1.4]}/><meshStandardMaterial color="#0f2040" metalness={0.6}/></mesh>
        <mesh position={[-0.8,0.7,0]}><boxGeometry args={[1.5,0.9,1.35]}/><meshStandardMaterial color="#0a1628" metalness={0.5}/></mesh>
      </group>
      {phase>=1&&[[-4,0,3],[4,0,-3],[0,0,5]].map((p,i)=>(
        <group key={i} position={p}>
          <mesh position={[0,2,0]}><boxGeometry args={[0.55,0.55,0.55]}/><meshStandardMaterial color="#1a2840" metalness={0.7}/></mesh>
          <mesh position={[0,2.45,0]}><sphereGeometry args={[0.15,12,12]}/><meshStandardMaterial color={color} emissive={color} emissiveIntensity={4}/></mesh>
          {phase>=3&&<DataStream from={[0,2.5,0]} to={[0,0,0]} color={color} n={3}/>}
        </group>
      ))}
      {phase>=4&&<PulseRing pos={[0,0.1,0]} color={color} r={9} spd={0.3}/>}
      <Text position={[0,6,0]} fontSize={0.38} color={color} anchorX="center" fontWeight="bold">SMART LOGISTICS NETWORK</Text>
    </group>
  );
}

/* ── Domain scene selector ── */
function DomainScene({ scenario, color, phase }) {
  switch(scenario) {
    case "city":       return <SceneCity color={color} phase={phase}/>;
    case "farm":       return <SceneFarm color={color} phase={phase}/>;
    case "weather":    return <SceneWeather color={color} phase={phase}/>;
    case "nature":     return <SceneNature color={color} phase={phase}/>;
    case "hospital":   return <SceneHospital color={color} phase={phase}/>;
    case "energy":     return <SceneEnergy color={color} phase={phase}/>;
    case "water":      return <SceneWater color={color} phase={phase}/>;
    case "school":     return <SceneEducation color={color} phase={phase}/>;
    case "stadium":    return <SceneSports color={color} phase={phase}/>;
    case "blockchain": return <SceneBlockchain color={color} phase={phase}/>;
    case "security":   return <SceneSecurity color={color} phase={phase}/>;
    case "factory":    return <SceneFactory color={color} phase={phase}/>;
    case "robotics":   return <SceneRobotics color={color} phase={phase}/>;
    case "disaster":   return <SceneDisaster color={color} phase={phase}/>;
    case "transport":  return <SceneTransport color={color} phase={phase}/>;
    case "highway":    return <SceneTransport color={color} phase={phase}/>;
    default:           return <SceneCity color={color} phase={phase}/>;
  }
}

/* ═══════════════════════════════════════════════
   PHASE CONTENT
═══════════════════════════════════════════════ */
const PHASE_COLORS=["#f43f5e","#fb923c","#facc15","#22d3ee","#38bdf8","#4ade80","#22c55e"];

function buildPhases(concept) {
  const name=concept?.name||"Solution";
  const scenario=concept?.scenario||"city";
  const ctx={
    city:["smart city network","connected buildings","traffic signals","data grid"],
    farm:["crop fields","soil sensors","drone fleet","harvest system"],
    weather:["weather stations","rain sensors","storm trackers","climate network"],
    nature:["forest sensors","pollution detectors","drone monitors","green network"],
    hospital:["patient monitoring","medical scanners","drug dispensers","health network"],
    energy:["wind turbines","solar panels","power grid","energy storage"],
    water:["water pipelines","leak sensors","treatment plant","flow monitors"],
    school:["smart classrooms","student devices","AI tutors","learning network"],
    stadium:["AI cameras","player trackers","biometric sensors","performance AI"],
    blockchain:["blockchain nodes","smart contracts","data ledger","security layer"],
    security:["CCTV cameras","threat detectors","access controls","alert system"],
    factory:["conveyor system","robot arms","quality sensors","production AI"],
    robotics:["drone fleet","base station","navigation AI","task execution"],
    disaster:["warning sensors","evacuation routes","emergency dispatch","relief network"],
    transport:["GPS trackers","route optimizers","fleet system","logistics AI"],
  }[scenario]||["environment","sensors","AI system","data network"];
  return [
    { icon:"⚠️",phase:"PHASE 01",title:"Problem Detected",subtitle:`${name.split(" ")[0]} challenge identified`,
      lines:[`The problem in your ${scenario} environment is detected and mapped.`,`All affected ${ctx[0]} components are identified and scoped by VisionX AI.`,`Stakeholders, pain points and impact zones are recorded into the system.`],
      cta:"Defining the problem clearly is the most powerful step of any solution." },
    { icon:"🔍",phase:"PHASE 02",title:"Environment Scanned",subtitle:`All ${ctx[1]} mapped in 3D`,
      lines:[`AI sensors are deployed across the ${scenario} — every node is mapped.`,`${ctx[1].charAt(0).toUpperCase()+ctx[1].slice(1)} data is captured in real time and verified.`,`A complete 3D digital map of the problem environment is built.`],
      cta:"You cannot fix what you cannot see. VisionX makes it all visible." },
    { icon:"💡",phase:"PHASE 03",title:"Issues Located",subtitle:"AI pinpoints critical failure zones",
      lines:[`AI cross-references live data with historical patterns — problems pinpointed.`,`Critical zones in the ${scenario} are ranked by severity and priority.`,`Root cause confirmed: ${ctx[2]} failure nodes identified and flagged.`],
      cta:"Finding the exact problem saves weeks of manual investigation." },
    { icon:"🏗️",phase:"PHASE 04",title:"Solution Applied",subtitle:`${name} deployed to environment`,
      lines:[`The ${name} solution is overlaid on the ${scenario} model precisely.`,`Each component — ${ctx[3]} — is placed and connected in the right location.`,`Detection → AI Engine → Output: the full pipeline is established.`],
      cta:"Virtual deployment first — zero physical risk, zero wasted cost." },
    { icon:"⚡",phase:"PHASE 05",title:"System Goes Live",subtitle:"Real-time data flowing",
      lines:[`All sensors active — the complete ${scenario} network is online.`,`AI processes thousands of data points per second in real time.`,`The system self-optimises — accuracy improves automatically every hour.`],
      cta:"This is exactly what the real deployed system will look like running live." },
    { icon:"📊",phase:"PHASE 06",title:"Results Measured",subtitle:"Every metric AI-validated",
      lines:[`Performance: ${concept?.trafficFlow??82}% efficiency achieved — above target.`,`Safety index: ${concept?.pedestrianSafety??88}% — all thresholds passed.`,`AI validation complete. Success rate: ${concept?.successRate??87}%. Approved.`],
      cta:"Hard numbers. Real results. Clients approve what they can measure." },
    { icon:"🚀",phase:"PHASE 07",title:"Prototype Ready",subtitle:"Full specification — ready to build",
      lines:[`Complete technical specification for ${name} is generated.`,`Client receives full proposal: architecture, stack, timeline and ROI.`,`Development team builds the real solution with total confidence.`],
      cta:"From problem to prototype-ready specification — in one VisionX session." },
  ];
}

function Typewriter({ text, speed=20, color }) {
  const [shown,setShown]=useState("");
  useEffect(()=>{
    setShown(""); let i=0;
    const id=setInterval(()=>{ i++; setShown(text.slice(0,i)); if(i>=text.length) clearInterval(id); },speed);
    return ()=>clearInterval(id);
  },[text,speed]);
  return <span style={{color}}>{shown}</span>;
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════ */
export default function HologramScene({ concept }) {
  const [phase,setPhase]=useState(0);
  const [playing,setPlaying]=useState(true);
  const [lineIdx,setLineIdx]=useState(0);
  const [progress,setProgress]=useState(0);
  const playRef=useRef(true);
  const timerRef=useRef(null);
  const progRef=useRef(null);
  const startRef=useRef(Date.now());
  const DUR=6000;

  const PHASES=useMemo(()=>buildPhases(concept),[concept?.id]);
  const P=PHASES[phase];
  const tc=PHASE_COLORS[phase];

  useEffect(()=>{
    setLineIdx(0);
    const id=setInterval(()=>setLineIdx(n=>(n+1)%P.lines.length),DUR/P.lines.length);
    return ()=>clearInterval(id);
  },[phase]);

  useEffect(()=>{
    setProgress(0); startRef.current=Date.now();
    clearInterval(progRef.current); if(!playing) return;
    progRef.current=setInterval(()=>setProgress(Math.min((Date.now()-startRef.current)/DUR,1)),50);
    return ()=>clearInterval(progRef.current);
  },[phase,playing]);

  useEffect(()=>{ playRef.current=playing; },[playing]);
  useEffect(()=>{
    if(!playing) return;
    clearTimeout(timerRef.current);
    timerRef.current=setTimeout(()=>{
      if(!playRef.current) return;
      setPhase(p=>{ if(p>=PHASES.length-1){setPlaying(false);return p;} return p+1; });
    },DUR);
    return ()=>clearTimeout(timerRef.current);
  },[phase,playing]);

  function jumpTo(i){ clearTimeout(timerRef.current); setPhase(i); setPlaying(true); }
  function togglePlay(){ if(!playing&&phase>=PHASES.length-1){jumpTo(0);return;} setPlaying(v=>!v); }

  if(!concept) return <div className="vx-empty">Select a concept to watch the walkthrough.</div>;

  const scenario=concept.scenario||"city";

  return (
    <div className="cinema-outer">
      {/* STEPPER */}
      <div className="cinema-stepper">
        {PHASES.map((ph,i)=>(
          <button key={i}
            className={`cinema-step ${i===phase?"cst-active":""} ${i<phase?"cst-done":""}`}
            style={i===phase?{borderColor:PHASE_COLORS[i],color:PHASE_COLORS[i],boxShadow:`0 0 14px ${PHASE_COLORS[i]}40`}
              :i<phase?{borderColor:PHASE_COLORS[i]+"40",color:PHASE_COLORS[i]+"70"}:{}}
            onClick={()=>jumpTo(i)}>
            <span className="cst-icon">{ph.icon}</span>
            <span className="cst-label">{ph.phase}</span>
            {i<phase&&<span className="cst-done-tick" style={{color:PHASE_COLORS[i]}}>✓</span>}
            {i===phase&&playing&&<span className="cst-pulse" style={{background:PHASE_COLORS[i]}}/>}
          </button>
        ))}
      </div>
      <div className="cinema-pbar-wrap">
        <div className="cinema-pbar">
          <div className="cinema-pbar-fill" style={{width:`${((phase+progress)/PHASES.length)*100}%`,background:tc,boxShadow:`0 0 12px ${tc}`}}/>
        </div>
      </div>
      <div className="cinema-stage">
        {/* CANVAS */}
        <div className="cinema-canvas">
          <Canvas key={`${concept?.id}-${phase}`} camera={{position:[0,11,18],fov:50}} shadows>
            <color attach="background" args={["#020914"]}/>
            <fog attach="fog" args={["#020914",28,52]}/>
            <ambientLight intensity={0.25}/>
            <directionalLight position={[8,12,8]} intensity={0.6} castShadow/>
            <pointLight position={[0,8,0]} color={tc} intensity={50} distance={28}/>
            <pointLight position={[0,2,0]} color={tc} intensity={20} distance={22}/>
            <pointLight position={[-10,5,10]} color="#ffffff" intensity={6} distance={25}/>
            <DomainScene scenario={scenario} color={tc} phase={phase}/>
            <OrbitControls enablePan={false} minDistance={8} maxDistance={32} maxPolarAngle={Math.PI/1.9} autoRotate autoRotateSpeed={0.45}/>
          </Canvas>
          <div className="cinema-pnum" style={{color:tc}}>{String(phase+1).padStart(2,"0")}</div>
          <div className="cinema-brand" style={{color:tc}}>VISIONX AI</div>
          <div className="cinema-domain-label" style={{borderColor:tc+"40",color:tc}}>{concept.name?.toUpperCase().slice(0,30)}</div>
        </div>
        {/* NARRATION */}
        <div className="cinema-narration" style={{borderColor:tc+"30"}}>
          <div className="cn-badge" style={{background:tc+"18",borderColor:tc+"50",color:tc}}>{P.icon} {P.phase}</div>
          <h2 className="cn-title">{P.title}</h2>
          <p className="cn-subtitle" style={{color:tc}}>{P.subtitle}</p>
          <div className="cn-divider" style={{background:tc+"40"}}/>
          <div className="cn-line-wrap">
            <div className="cn-line-num" style={{color:tc}}>{String(lineIdx+1).padStart(2,"0")}</div>
            <div className="cn-line-text"><Typewriter text={P.lines[lineIdx]} speed={20} color="#d8e8f5"/></div>
          </div>
          <div className="cn-dots">
            {P.lines.map((_,i)=>(
              <div key={i} className={`cn-dot ${i===lineIdx?"cn-dot-active":""} ${i<lineIdx?"cn-dot-done":""}`}
                style={i<=lineIdx?{background:tc,boxShadow:`0 0 8px ${tc}`}:{}}/>
            ))}
          </div>
          <div className="cn-lines-list">
            {P.lines.map((ln,i)=>(
              <div key={i} className={`cn-list-item ${i===lineIdx?"cn-list-active":""}`}
                style={i===lineIdx?{borderColor:tc,color:"#e8f4ff"}:{}}>
                <span className="cn-list-tick" style={i<=lineIdx?{color:tc}:{}}>{i<lineIdx?"✓":i===lineIdx?"▶":"○"}</span>
                {ln}
              </div>
            ))}
          </div>
          <div className="cn-divider" style={{background:tc+"30"}}/>
          <div className="cn-cta" style={{borderColor:tc+"50",background:tc+"10"}}>
            <span style={{color:tc,fontSize:18}}>💬</span>
            <p style={{color:tc}}>{P.cta}</p>
          </div>
          <div className="cn-concept-name" style={{color:tc+"80"}}>{concept.name}</div>
          {phase>=5&&(
            <div className="cn-metrics">
              <div className="cn-metric" style={{borderColor:tc+"30"}}>
                <span>Success</span><strong style={{color:"#22c55e"}}>{concept.successRate}%</strong>
              </div>
              <div className="cn-metric" style={{borderColor:tc+"30"}}>
                <span>Score</span>
                <strong style={{color:tc}}>{Math.round(((concept.trafficFlow||0)+(concept.waitingTime||0)+(concept.pedestrianSafety||0))/3)}/100</strong>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="cinema-controls">
        <div className="cinema-ctrl-left">
          <button className="cc-btn" onClick={()=>jumpTo(Math.max(0,phase-1))}>◀ Prev</button>
          <button className="cc-btn cc-play" style={{borderColor:tc,color:tc,boxShadow:`0 0 16px ${tc}30`}} onClick={togglePlay}>{playing?"⏸ Pause":"▶ Play"}</button>
          <button className="cc-btn" onClick={()=>jumpTo(Math.min(PHASES.length-1,phase+1))}>Next ▶</button>
          <button className="cc-btn" onClick={()=>jumpTo(0)}>↺ Restart</button>
        </div>
        <div className="cinema-ctrl-right" style={{color:tc}}>
          <span className="cc-pname">{P.icon} {P.title}</span>
          <span className="cc-counter">{phase+1} / {PHASES.length}</span>
        </div>
      </div>
    </div>
  );
}
