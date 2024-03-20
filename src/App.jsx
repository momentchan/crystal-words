import { CameraControls, ContactShadows, Environment, Lightformer, Preload} from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import { CuboidCollider, Physics } from "@react-three/rapier";
import Letter from "./Letter";
import { useEffect, useMemo, useRef, useState } from "react";
import InputField from "./InputField";
import { Button } from "@mui/material";

export default function App() {
    const [chars, setChars] = useState([])
    const [focus, setFocus] = useState(false)
    const [fadeClass, setFadeClass] = useState('');
    const control = useRef()
    let timeoutId;


    function showLastChar() {
        setFadeClass('fade-in');
        clearTimeout(timeoutId); // Clear previous timeout if exists
        timeoutId = setTimeout(() => setFadeClass('fade-out'), 2000);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (focus) return

            const char = event.key
            setChars(prevChars => [...prevChars, char]);
            showLastChar()
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timeoutId);
        };
    }, [focus]); // 

    const handleSubmit = (inputValue) => {
        setChars(prevChars => [...prevChars, inputValue]);
        showLastChar()
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
            <color attach='background' args={['#8dafc2']} />

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

            <ContactShadows smooth={false} scale={200} position={[0, -0.05, 0]} blur={0.5} opacity={0.75} />
            <Preload all />

            <CameraControls ref={control} makeDefault dollyToCursor minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
            <Preload all/>
        </Canvas>
        <InputField onSubmit={handleSubmit} onFocus={(focus) => setFocus(focus)} />

        <div className={`keyDisplayer ${fadeClass}`}>
            {chars[chars.length - 1] != "" ? `Input : ${chars[chars.length - 1]}` : ""}
        </div>
        <div
            className="trashCan"
        >
            <Button
                variant="outlined"
                size="small"
                sx={{
                    'minWidth': '32px',
                    'color': '#dddddd',
                    'borderColor': '#dddddd', // Set the border color of the button
                    '&:hover': {
                        color: '#dddddd', // Set the text color of the button on hover
                        borderColor: '#dddddd', // Set the border color of the button on hover
                    },
                }}
                onClick={() => setChars([])}
            >
                Clear
            </Button>
        </div>
    </>
}