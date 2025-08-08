import { useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { a } from "@react-spring/three";
import Girl from "../../assets/3D/Girl_TEST_v2.glb";

const Model = ({ hovered, ...props }) => {
  const { nodes, materials, animations } = useGLTF(Girl);
  const girlRef = useRef();
  const { actions, mixer } = useAnimations(animations, girlRef);

  const [currentAction, setCurrentAction] = useState("Idle");
  const activeActionRef = useRef(null);

  useEffect(() => {
    if (!actions || !currentAction) return;

    const nextAction = actions[currentAction];
    const prevAction = activeActionRef.current;

    if (prevAction === nextAction) return;

    if (prevAction) prevAction.fadeOut(0.3);

    if (nextAction) {
      const isLooped = currentAction === "Idle";

      nextAction
        .reset()
        .setLoop(isLooped ? THREE.LoopRepeat : THREE.LoopOnce, 1)
        .fadeIn(0.3)
        .play();

      nextAction.clampWhenFinished = !isLooped;
      activeActionRef.current = nextAction;
    }
  }, [currentAction, actions]);

  useEffect(() => {
    if (!actions || !mixer) return;

    const handleFinished = (e) => {
      if (e.action === actions["Return"]) {
        setCurrentAction("Idle");
      }
    };

    mixer.addEventListener("finished", handleFinished);
    return () => mixer.removeEventListener("finished", handleFinished);
  }, [actions, mixer]);

  useEffect(() => {
    if (hovered) {
      setCurrentAction("LookAt");
    } else {
      setCurrentAction("Return");
    }
  }, [hovered]);

  // 🔧 Осветление и настройка теней на модели
  useEffect(() => {
    if (!materials?.EM3D_Base_Body30) return;

    const mat = materials.EM3D_Base_Body30;

    // Цвет немного ярче
    mat.color = new THREE.Color(1.3, 1.3, 1.3);

    // Уменьшаем влияние ambient occlusion (если есть)
    if (mat.aoMap) {
      mat.aoMapIntensity = 0.2;
    }

    // Лёгкое самосвечение — чтобы тени были мягче
    mat.emissive = new THREE.Color(0x111111);
    mat.emissiveIntensity = 0.4;

    // Снижаем металличность и повышаем шероховатость — меньше бликов и глубоких теней
    if ('roughness' in mat) mat.roughness = 0.9;
    if ('metalness' in mat) mat.metalness = 0.1;

  }, [materials]);

  return (
    <a.group
      ref={girlRef}
      {...props}
      position={[0.2, -0.9, 0.1]}>

      <group name="Scene">
        <group name="Armature">
          <skinnedMesh
            name="EM3D_Base_Body3_011"
            geometry={nodes.EM3D_Base_Body3_011.geometry}
            material={materials.EM3D_Base_Body30}
            skeleton={nodes.EM3D_Base_Body3_011.skeleton}
          />
          <skinnedMesh
            name="PM3D_Sphere3D1_3_001"
            geometry={nodes.PM3D_Sphere3D1_3_001.geometry}
            material={materials.EM3D_Base_Body30}
            skeleton={nodes.PM3D_Sphere3D1_3_001.skeleton}
          />
          <skinnedMesh
            name="Sphere001"
            geometry={nodes.Sphere001.geometry}
            material={materials.EM3D_Base_Body30}
            skeleton={nodes.Sphere001.skeleton}
          />
          <skinnedMesh
            name="Sphere002"
            geometry={nodes.Sphere002.geometry}
            material={materials.EM3D_Base_Body30}
            skeleton={nodes.Sphere002.skeleton}
          />
          <primitive object={nodes.Body} />
        </group>
        <mesh
          name="HP_001"
          castShadow
          receiveShadow
          geometry={nodes.HP_001.geometry}
          material={materials.EM3D_Base_Body30}
        />
        <mesh
          name="Cube_002_001"
          castShadow
          receiveShadow
          geometry={nodes.Cube_002_001.geometry}
          material={materials.EM3D_Base_Body30}
        />
        <mesh
          name="Cube_006_001"
          castShadow
          receiveShadow
          geometry={nodes.Cube_006_001.geometry}
          material={materials.EM3D_Base_Body30}
        />
        <group name="EM3D_Base_Body3007" />
        <group name="EM3D_Base_Body3008" />
        <group name="EM3D_Base_Body3009" />
        <mesh
          name="Pattern_2110390_001"
          castShadow
          receiveShadow
          geometry={nodes.Pattern_2110390_001.geometry}
          material={materials.EM3D_Base_Body30}
        />
        <group name="EM3D_Base_Body3010" />
        <mesh
          name="Circle_003"
          castShadow
          receiveShadow
          geometry={nodes.Circle_003.geometry}
          material={materials.EM3D_Base_Body30}
        />
        <mesh
          name="Circle_004"
          castShadow
          receiveShadow
          geometry={nodes.Circle_004.geometry}
          material={materials.EM3D_Base_Body30}
        />
        <group name="EM3D_Base_Body3012" />
      </group>
    </a.group>
  );
};

useGLTF.preload(Girl);

export default Model;
