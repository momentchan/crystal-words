import { CameraControls, ContactShadows, Environment, KeyboardControls, Lightformer, OrbitControls, Preload, useKeyboardControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import { CuboidCollider, Physics } from "@react-three/rapier";
import Letter from "./Letter";
import { useEffect, useMemo, useRef, useState } from "react";
import InputControl from "./InputControl";

export default function App() {
    const [chars, setChars] = useState([])
    const [focus, setFocus] = useState(false)
    const control = useRef()

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (focus) return

            const isValidCharacter = /^[a-zA-Z]$/i.test(event.key);
            const isNumber = /^[0-9]$/.test(event.key);

            if (isValidCharacter) {
                const char = event.key.toUpperCase();
                setChars(prevChars => [...prevChars, char]);
            }
            if (isNumber) {
                setChars(prevChars => [...prevChars, event.key]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [focus]); // 


    const handleSubmit = (inputValue) => {
        const upperCaseValue = inputValue.toUpperCase();
        const cleanedValue = upperCaseValue.replace(/[^a-zA-Z0-9]/g, '');
        console.log('Input value received in App:', inputValue);
        setChars(prevChars => [...prevChars, cleanedValue]);
    };

    return <>
        <Canvas
            shadows
            camera={{
                fov: 45,
                near: 1,
                far: 1000,
                position: [-20, 40, 30]
            }}>
            <color attach='background' args={['#4899c9']} />

            <Physics
            // debug
            >
                {chars.map((char, index) => <Letter key={index} char={char} control={control} rotation={[4, 5, 6]} />)}
                <CuboidCollider position={[0, -1, 0]} type="fixed" args={[100, 1, 100]} />
                <CuboidCollider position={[0, 0, -100]} type="fixed" args={[30, 100, 1]} />
                <CuboidCollider position={[0, 0, 100]} type="fixed" args={[30, 100, 1]} />
                <CuboidCollider position={[-100, 0, 0]} type="fixed" args={[1, 100, 30]} />
                <CuboidCollider position={[100, 0, 0]} type="fixed" args={[1, 100, 30]} />
            </Physics>


            <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr" resolution={1024}>
                <group rotation={[-Math.PI / 3, 0, 0]}>
                    <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                    {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
                        <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
                    ))}
                    <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
                    <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
                </group>
            </Environment>

            <ContactShadows smooth={false} scale={100} position={[0, -0.05, 0]} blur={0.5} opacity={0.75} />
            <Preload all />

            <CameraControls ref={control} makeDefault dollyToCursor minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
        </Canvas>
        <InputControl onSubmit={handleSubmit} setFocus={(focus) => setFocus(focus)} />
    </>
}