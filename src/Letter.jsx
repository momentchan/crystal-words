import { Center, MeshTransmissionMaterial, Text3D } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { MathUtils } from "three";

export default function Letter({ char, children, stencilBuffer = false, ...props }) {
    const main = useRef()
    const position = useMemo(() => {
        return [MathUtils.randFloat(-2, 2), 60, MathUtils.randFloat(-2, 2)]
    }, [])

    return (
        <RigidBody colliders='cuboid' position={position}>
            <Center ref={main}>
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
                    bevelSegments={5}>
                    {char}
                    <MeshTransmissionMaterial
                        clearcoat={1} samples={3} thickness={40} chromaticAberration={0.25} anisotropy={0.4}
                    >
                    </MeshTransmissionMaterial>
                </Text3D>
            </Center>
        </RigidBody>
    )
}