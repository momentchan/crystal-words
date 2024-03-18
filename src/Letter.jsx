import { Center, MeshTransmissionMaterial, Preload, RenderTexture, Text3D, useTexture } from "@react-three/drei";
import { events, useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { MathUtils } from "three";

const components = [
    () => <Turtle />,
    () => <Shoe scale={5} />,
    () => <Basic scale={3} />,
    () => <PingPong />,
    () => <Stencil scale={2} />,
];

const rfs = MathUtils.randFloatSpread
export default function Letter({ char, stencilBuffer = false }) {
    const main = useRef()
    const props = useMemo(() => {
        return {
            position: [rfs(20), 30, rfs(20)],
            rotation: [0, rfs(180), 0]
        }
    }, [])

    const children = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * components.length);
        const Component = components[randomIndex];
        return <Component />;
    }, [])


    const contentRef = useRef()

    return (
        <RigidBody
            colliders='cuboid'
            gravityScale={5}

            {...props}
        >
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
                        clearcoat={1}
                        samples={3}
                        thickness={40}
                        chromaticAberration={0.25}
                        anisotropy={0.4}
                        // background={'./adamsbridge.hdr'}
                    >
                        {/* <RenderTexture attach="buffer" stencilBuffer={stencilBuffer} width={32} height={32} compute={events.compute}>
                            <color attach="background" args={['#4899c9']} />
                            <group matrixAutoUpdate={false}>
                                {children}
                            </group>
                            <Preload all />
                        </RenderTexture> */}
                    </MeshTransmissionMaterial>
                </Text3D>
            </Center>
        </RigidBody>
    )
}