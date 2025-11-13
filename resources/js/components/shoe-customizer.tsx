import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useState, useMemo } from 'react';
import { router } from '@inertiajs/react';
import * as THREE from 'three';
import { ShoppingCart } from 'lucide-react';

function ShoeModel({
  laceColor,
  meshColor,
  stripeColor,
  soleColor,
  patchColor,
  bandColor
}) {
  const { scene } = useGLTF('/models/model.glb');

  const clonedScene = useMemo(() => {
    console.log('=== CIPŐ MODELL DEBUG ===');
    const cloned = scene.clone();

    cloned.traverse((child) => {
      if (child.isMesh) {
        console.log('Mesh találva:', {
          name: child.name,
          type: child.type,
          materialName: child.material?.name || 'nincs név',
          materialType: child.material?.type || 'nincs típus'
        });

        const originalMaterial = child.material;

        child.material = new THREE.MeshStandardMaterial({
          color: originalMaterial.color?.clone() || new THREE.Color('#ffffff'),
          roughness: 0.5,
          metalness: 0.1,
          map: originalMaterial.map || null,
          normalMap: originalMaterial.normalMap || null,
        });

        const meshName = child.name.toLowerCase();
        const materialName = originalMaterial.name?.toLowerCase() || '';

        if (meshName.includes('lace') || materialName.includes('lace')) {
          child.material.color.set(laceColor);
          console.log('✓ Fűző színezve:', child.name, laceColor);
        } else if (meshName.includes('mesh') || materialName.includes('mesh')) {
          child.material.color.set(meshColor);
          console.log('✓ Mesh színezve:', child.name, meshColor);
        } else if (meshName.includes('stripe') || materialName.includes('stripe')) {
          child.material.color.set(stripeColor);
          console.log('✓ Csík színezve:', child.name, stripeColor);
        } else if (meshName.includes('sole') || materialName.includes('sole') ||
                   meshName.includes('bottom') || materialName.includes('bottom') ||
                   meshName.includes('outsole') || materialName.includes('outsole')) {
          child.material.color.set(soleColor);
          console.log('✓ Talp színezve:', child.name, soleColor);
        } else if (meshName.includes('patch') || materialName.includes('patch') ||
                   meshName.includes('logo') || materialName.includes('logo')) {
          child.material.color.set(patchColor);
          console.log('✓ Patch színezve:', child.name, patchColor);
        } else if (meshName.includes('band') || materialName.includes('band')) {
          child.material.color.set(bandColor);
          console.log('✓ Szalag színezve:', child.name, bandColor);
        } else {
          child.material.color.set(meshColor);
          console.log('⚪ Alapértelmezett (mesh) szín:', child.name, meshColor);
        }
      }
    });

    console.log('=== DEBUG VÉGE ===');
    return cloned;
  }, [scene, laceColor, meshColor, stripeColor, soleColor, patchColor, bandColor]);

  return <primitive object={clonedScene} scale={2.2} position={[0, 0.3, 0]} />;
}

export default function ShoeCustomizer() {
  const [laceColor, setLaceColor] = useState('#ffffff');
  const [meshColor, setMeshColor] = useState('#ff0000');
  const [stripeColor, setStripeColor] = useState('#000000');
  const [soleColor, setSoleColor] = useState('#ffffff');
  const [patchColor, setPatchColor] = useState('#0000ff');
  const [bandColor, setBandColor] = useState('#ffff00');

  const [selectedPart, setSelectedPart] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const colorOptions = [
    { name: 'Fehér', value: '#ffffff' },
    { name: 'Fekete', value: '#000000' },
    { name: 'Piros', value: '#ff0000' },
    { name: 'Kék', value: '#0000ff' },
    { name: 'Zöld', value: '#00ff00' },
    { name: 'Sárga', value: '#ffff00' },
    { name: 'Narancssárga', value: '#ff8800' },
    { name: 'Rózsaszín', value: '#ff00ff' },
    { name: 'Lila', value: '#8800ff' },
    { name: 'Barna', value: '#8B4513' },
    { name: 'Szürke', value: '#808080' },
    { name: 'Tengerkék', value: '#00CED1' }
  ];

  const parts = [
    { id: 'lace', label: 'Fűzők', color: laceColor, setter: setLaceColor },
    { id: 'mesh', label: 'Háló', color: meshColor, setter: setMeshColor },
    { id: 'stripe', label: 'Csíkok', color: stripeColor, setter: setStripeColor },
    { id: 'sole', label: 'Talp', color: soleColor, setter: setSoleColor },
    { id: 'patch', label: 'Patch', color: patchColor, setter: setPatchColor },
    { id: 'band', label: 'Szalag', color: bandColor, setter: setBandColor }
  ];

  const resetColors = () => {
    setLaceColor('#ffffff');
    setMeshColor('#ffffff');
    setStripeColor('#000000');
    setSoleColor('#ffffff');
    setPatchColor('#ffffff');
    setBandColor('#ffffff');
    setSelectedPart(null);
    setSaveMessage('');
  };


    const saveCustomization = () => {
    setIsSaving(true);
    setSaveMessage('');

    const customization = {
        lace_color: laceColor,
        mesh_color: meshColor,
        stripe_color: stripeColor,
        sole_color: soleColor,
        patch_color: patchColor,
        band_color: bandColor
    };

    router.post('/cart/add-custom-shoe', {
        product_id: 1,
        customizations: customization,
        quantity: 1,
        price: 39,
    }, {
        preserveScroll: true,
        onSuccess: () => {
            setSaveMessage('✓ Hozzáadva a kosárhoz!');
            setIsSaving(false);
            setTimeout(() => setSaveMessage(''), 3000);
        },
        onError: (errors) => {
            console.error('Hiba:', errors);
            setSaveMessage('✗ Hiba történt a mentés során');
            setIsSaving(false);
            setTimeout(() => setSaveMessage(''), 3000);
        }
    });
};

  const currentPart = parts.find(p => p.id === selectedPart);

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 relative bg-gray-50">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: '#f9fafb' }}
        >
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />
          <pointLight position={[0, 5, 0]} intensity={0.5} />

          <ShoeModel
            laceColor={laceColor}
            meshColor={meshColor}
            stripeColor={stripeColor}
            soleColor={soleColor}
            patchColor={patchColor}
            bandColor={bandColor}
          />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={10}
          />
        </Canvas>

        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            CUSTOMIZE YOUR SHOE
          </h1>
        </div>

        {saveMessage && (
          <div className={`absolute top-6 right-6 rounded-lg p-3 shadow-lg ${
            saveMessage.includes('✓') ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'
          }`}>
            <p className={`text-sm font-semibold ${
              saveMessage.includes('✓') ? 'text-green-800' : 'text-red-800'
            }`}>
              {saveMessage}
            </p>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between gap-8">
            {/* Parts Selection */}
            <div className="flex gap-2">
              {parts.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedPart(part.id)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    selectedPart === part.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {part.label}
                </button>
              ))}
            </div>

            {/* Color Selection */}
            {selectedPart && (
              <div className="flex gap-2 items-center">
                <span className="text-xs font-semibold text-gray-400 mr-2">SZÍN:</span>
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => currentPart.setter(color.value)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
                      currentPart.color === color.value
                        ? 'border-black ring-2 ring-offset-1 ring-black scale-110'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={saveCustomization}
                disabled={isSaving}
                className="px-6 py-2 bg-black text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? '...' : <ShoppingCart className="w-4 h-4" />}
              </button>
              <button
                onClick={resetColors}
                className="px-6 py-2 bg-white text-black border-2 border-black text-sm font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300 whitespace-nowrap"
              >
                RESET
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload('/models/model.glb');
