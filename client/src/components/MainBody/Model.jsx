import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { a } from '@react-spring/three'
import Girl from '../../assets/3D/Girl_TEST.glb'

const Model = (props) => {
  const { nodes, materials } = useGLTF(Girl)
  const girlRef = useRef()
  // useFrame(() => {
  //   if (girlRef.current) {
  //     // Крутим вокруг оси Y (можно изменить на X или Z, если нужно)
  //     girlRef.current.rotation.y += 0.01
  //   }
  // })

  return (
    <a.group {...props} ref={girlRef} position={[0.3, -0.7, 0]}>
      <mesh
        geometry={nodes.PM3D_Cylinder3D1.geometry}
        material={materials.EM3D_Base_Body30}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes.HP_001.geometry}
        material={materials.EM3D_Base_Body30}
        position={[0.206, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes.Cube_002_001.geometry}
        material={materials.EM3D_Base_Body30}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes.Cube_006_001.geometry}
        material={materials.EM3D_Base_Body30}
        position={[0, 0.008, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes.EM3D_Base_Body2_001.geometry}
        material={materials.EM3D_Base_Body30}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh geometry={nodes.Pattern_2110390_001.geometry} material={materials.EM3D_Base_Body30} />
      <mesh
        geometry={nodes.Cube_008.geometry}
        material={materials.EM3D_Base_Body30}
        position={[-0.163, 1.159, -0.753]}
        rotation={[-0.023, 0.93, 0.479]}
        scale={[-0.031, -0.006, -0.031]}
      />
      <mesh
        geometry={nodes.Circle_003.geometry}
        material={materials.EM3D_Base_Body30}
        position={[0.353, 0.522, -1.184]}
        rotation={[1.326, -0.161, 0.73]}
        scale={0.511}
      />
      <mesh
        geometry={nodes.Circle_004.geometry}
        material={materials.EM3D_Base_Body30}
        position={[0.353, 0.522, -1.184]}
        rotation={[1.326, -0.161, -2.411]}
        scale={0.472}
      />
      <mesh
        geometry={nodes.EM3D_Base_Body3_011.geometry}
        material={materials.EM3D_Base_Body30}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
      <mesh
        geometry={nodes.Body_Front_002.geometry}
        material={materials.EM3D_Base_Body30}
        position={[0.143, -1.4556, 0.46]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.002}
      />
      <mesh
        geometry={nodes.EM3D_Base_Body3_2_001.geometry}
        material={materials.EM3D_Base_Body30}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.PM3D_Sphere3D1_3_001.geometry}
        material={materials.EM3D_Base_Body30}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
    </a.group>
  )
}

useGLTF.preload('/Girl_TEST.glb')

export default Model