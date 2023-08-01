import React, {createContext} from 'react';
import data from '../contents.json';
import Canvas from './components/Canvas';
import './App.css'
import useChannel from './hooks/useChannel';


export const CanvasContext = createContext();
const initialContext = {
  maxZIndex: 1,
  isPanning: false,
  isMoving: false,
  isScrollingFrame: false,
  movingEl: null,
}

function App() {
  const {blocks, status} = useChannel("https://www.are.na/ivol-ga/interconnections-and-networks");

  return (
    <CanvasContext.Provider value={initialContext}>
      {status === "loaded" && (
        <Canvas contents={blocks.contents}/>
      )}
    </CanvasContext.Provider>
  )
}

export default App