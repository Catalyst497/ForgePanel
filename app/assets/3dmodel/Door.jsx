import { useState } from "react";
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 door.glb --draco 
Author: qwertderstar (https://sketchfab.com/qwertderstar)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/door-5507795f3c234c3d853aba1bbdc70e84
Title: Door
*/

import React from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/door.glb");
  const { open } = props;

  return (
    <group
      {...props}
      dispose={null}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, 4.75, 0]}
    >
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.doorHandle_0.geometry}
            material={materials.Material}
            position={[-0.001, 0.554, 1.109]}
            scale={0.055}
          />
          <mesh
            geometry={nodes.Door_0.geometry}
            material={materials["Material.001"]}
            position={[-0.027, 0, 1.258]}
          />
        </group>
    </group>
  );
}

useGLTF.preload("/door.glb");
