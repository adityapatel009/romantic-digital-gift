export default function Lights() {
  return (
    <>
      {/* Soft ambient */}
      <ambientLight intensity={0.6} />

      {/* Warm light from inside envelope */}
      <pointLight
        position={[0, 0.3, 0.6]}
        intensity={1.2}
        color="#f472b6"
      />

      {/* Directional depth */}
      <directionalLight
        position={[2, 2, 3]}
        intensity={0.6}
      />
    </>
  );
}
