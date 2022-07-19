import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Chalkboard({...props}) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/assets/0717_Chalkboard.glb");

  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <group position={[0, -.35, 0]} scale={[1.6,1.2,1]}>
          <mesh
            // onPointerMove={(e) => console.log(e.intersections[0].point)}
            castShadow
            receiveShadow
            geometry={nodes.node_id30.geometry}
            material={materials["46"]}
            scale={0.02}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/assets/0717_Chalkboard.glb");
