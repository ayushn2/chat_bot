"use client"

import { OrbitControls, useAnimations,SpotLight, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useContext, useEffect,useRef } from 'react'
import { Vector3 } from 'three'
import { Html } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three';
import { AppContext } from '@/app/context/isPlayingContext'


const Torch = ({ vec = new Vector3(), ...props }) => {
    const light = useRef();
    const targetPosition = useRef(new THREE.Vector3(0, 0, 0));
    const viewport = useThree(state=>state.viewport)


    const handleMouseMove = (event) => {
        const x = (event.clientX / window.innerWidth) * 2 -1;
        const y = ((event.clientY / window.innerHeight) * 2)*-1 + 1;
    
        targetPosition.current.set(
            x * (window.innerWidth / 16),
            y * (window.innerHeight / 16),
            0
          );
      };
    
      
      window.addEventListener('mousemove', handleMouseMove);
      useFrame(() => {
    
          light.current.target.position.lerp(targetPosition.current, 0.1);
       
    
        
      });
    return (
      <SpotLight
        ref={light}
        castShadow
        penumbra={1}
        distance={10}
        angle={0.35}
        attenuation={5}
        anglePower={4}
        intensity={3}
        {...props}
      />
    );
  };

const Head = ()=>{
    const model = useGLTF("/head_3.glb")
    const animation = useAnimations(model.animations,model.scene)
    const action = animation.actions.Animation;
    const {isPlaying,setIsPlaying} = useContext(AppContext);
    
    useEffect(() => {
      if (isPlaying) {
        action?.play();
      } else {
        action?.fadeOut(0.05);
        setTimeout(() => {
          action?.stop();
        }, 150);
      }
    }, [isPlaying, action]);

    return (
        <>
            <primitive 
            object={model.scene} 
            scale={4}
            position={ [0, 0, 0]} 
            rotation-z={0.18}/>
            <Torch color="grey" position={[4,0,2]}/>
            <Torch color="#bc003f" position={[-4,0,2]}/>
        </>
    )
   
}

const BotCanvas = () => {
  return (
    <Canvas>
       
        <OrbitControls 
        enableZoom={false} 
        enableDamping
        enableRotate={false} 
        maxPolarAngle={1.7} 
        minAzimuthAngle={-Math.PI*0.5} 
        maxAzimuthAngle={Math.PI*0.5}/>
        <ambientLight intensity={0.4}/>
        <Head/>
        
    </Canvas>
  )
}

export default BotCanvas
