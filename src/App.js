import './App.css';
import './assets/css/global.css'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Loader } from '@react-three/drei'
import create from 'zustand'

import { Chalkboard } from './components/Models'
import { Navbar } from './components/Navbar'
import { Names } from './components/Names'

function App() {

  const useNamesArray = create((set) => ({
    namesArray: [],
    setNamesArray: (names) => set({ namesArray: names }),
  }))

  return (
    <>
      <Canvas style={{ position: 'absolute'}} camera={{position: [0,0,0.35]}}>
        <Suspense>
          <Names useNamesArray={useNamesArray}/> 
          <Chalkboard />
        </Suspense>
        <Environment ground={{height: 5}} background={true} files="/assets/forest_slope_1k.hdr" />
      </Canvas>
      <Loader />
      <Navbar useNamesArray={useNamesArray}/>
  </>
  );
}

export default App;
