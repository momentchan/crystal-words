import { Center, MeshTransmissionMaterial, Text3D } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { MathUtils } from "three";
import * as THREE from 'three';

const rfs = MathUtils.randFloatSpread

export default function Letter({ char, control }) {
    const body = useRef()
    const [dragging, setDragging] = useState(false);

    const plane = useRef(new THREE.Plane())
    const camera = useThree((state) => state.camera)

    const props = useMemo(() => {
        return {
            position: [rfs(20), 40, rfs(20)],
            rotation: [rfs(1.5), rfs(180), rfs(1.5)]
        }
    }, [])

    useEffect(() => {
        const handleMouseUp = () => {
            setDragging(false);
            control.current.enabled = true
        };
        window.addEventListener("pointerup", handleMouseUp);

        return () => {
            window.removeEventListener("pointerup", handleMouseUp);
        };
    }, []);

    useFrame(({ mouse }) => {
        if (dragging) {
            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);
            const intersection = new THREE.Vector3();
            raycaster.ray.intersectPlane(plane.current, intersection);
            body.current.setNextKinematicTranslation(intersection)
        }
    })

    const handlePointerOver = () => {
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        document.body.style.cursor = 'auto';
    };

    return (
        <RigidBody
            colliders='cuboid'
            type={dragging ? "kinematicPosition" : "dynamic"}
            ref={body}
            gravityScale={5}
            onPointerDown={e => {
                control.current.enabled = false
                plane.current.setFromNormalAndCoplanarPoint(e.ray.direction, e.point);
                setDragging(true)
            }}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            {...props}
        >
            <Center>
                <Text3D
                    bevelEnabled
                    font="/Noto Sans TC_JP_Bold.json"
                    smooth={1}
                    scale={0.125}
                    size={80}
                    castShadow
                    height={4}
                    curveSegments={10}
                    bevelThickness={10}
                    bevelSize={2}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    {char}
                    <MeshTransmissionMaterial
                        clearcoat={1}
                        samples={3}
                        thickness={40}
                        chromaticAberration={0.5}
                        anisotropy={1}
                        transmission={1}
                    >
                    </MeshTransmissionMaterial>
                </Text3D>
            </Center>
        </RigidBody>
    )
}