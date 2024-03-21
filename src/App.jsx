import { Canvas } from '@react-three/fiber'
import { CuboidCollider, Physics } from "@react-three/rapier";
import { CameraControls, Preload } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import InputField from "./InputField";
import Letter from "./Letter";
import Buttons from "./Buttons";
import ColorPicker from "./ColorPicker";
import useGlobalStore from "./useGlobalStore";
import Lighting from './Lighting';
import KeyDisplayer from './KeyDisplayer';

export default function App() {
    const [chars, setChars] = useState([])
    const [focus, setFocus] = useState(false)
    const { setIsMobile } = useGlobalStore();
    const [currentColor, setCurrentColor] = useState("#8dafc2");
    const control = useRef()
    const displayer = useRef()

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const isMobileDevice =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        setIsMobile(isMobileDevice);
    }, [])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (focus) return
            const char = event.key
            setChars(prevChars => [...prevChars, char]);
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => { window.removeEventListener('keydown', handleKeyDown); };
    }, [focus]);


    useEffect(() => {
        if (chars[chars.length - 1] == undefined)
            return
        displayer.current.showLastChar(`Input : ${chars[chars.length - 1]}`)
    }, [chars])

    const handleSubmit = (inputValue) => {
        setChars(prevChars => [...prevChars, inputValue]);
    };

    return <>
        <Canvas
            shadows
            camera={{ fov: 45, near: 1, far: 1000, position: [-20, 40, 30] }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <color attach='background' args={[currentColor]} />

            <Physics>
                {chars.map((char, index) => <Letter key={index} char={char} control={control} />)}
                <CuboidCollider position={[0, -1, 0]} type="fixed" args={[100, 1, 100]} />
                <CuboidCollider position={[0, 0, -100]} type="fixed" args={[30, 100, 1]} />
                <CuboidCollider position={[0, 0, 100]} type="fixed" args={[30, 100, 1]} />
                <CuboidCollider position={[-100, 0, 0]} type="fixed" args={[1, 100, 30]} />
                <CuboidCollider position={[100, 0, 0]} type="fixed" args={[1, 100, 30]} />
            </Physics>

            <Lighting />

            <Preload all />

            <CameraControls ref={control} makeDefault dollyToCursor minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
        </Canvas>

        <InputField onSubmit={handleSubmit} onFocus={(focus) => setFocus(focus)} />

        <Buttons onClear={() => setChars([])} />

        <ColorPicker onColorChange={(color) => setCurrentColor(color)} />

        <KeyDisplayer ref={displayer} />
    </>
}