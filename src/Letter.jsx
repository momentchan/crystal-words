import { Center, DragControls, MeshTransmissionMaterial, Preload, RenderTexture, Text3D, useTexture } from "@react-three/drei";
import { events, useFrame, useLoader, useThree } from "@react-three/fiber";
import { CuboidCollider, RigidBody, vec3 } from "@react-three/rapier";
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
            position: [rfs(20), 30, rfs(20)],
            rotation: [rfs(20), rfs(180), rfs(20)]
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

    return (
        <RigidBody
            colliders='cuboid'
            type={dragging ? "kinematicPosition" : "dynamic"}
            ref={body}
            onPointerDown={e => {
                control.current.enabled = false
                plane.current.setFromNormalAndCoplanarPoint(e.ray.direction, e.point);
                setDragging(true)
            }}
            {...props}
        >
            <Center>
                <Text3D
                    bevelEnabled
                    font="/bold.blob"
                    smooth={1}
                    scale={0.125}
                    size={80}
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
                        chromaticAberration={0.25}
                        anisotropy={0.4}
                    >
                    </MeshTransmissionMaterial>
                </Text3D>
            </Center>
        </RigidBody>
    )
}