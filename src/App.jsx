import React, {createContext} from 'react';
import data from '../contents.json';
import Canvas from './components/Canvas';
import './App.css'


export const CanvasContext = createContext();
const initialContext = {
  maxZIndex: 1,
  isPanning: false,
  isMoving: false,
  movingEl: null,
}

function App() {
  let contents = data.contents;
  contents.forEach((d) => (
    console.log(d.title)
  ))

  return (
    <CanvasContext.Provider value={initialContext}>
      <Canvas contents={contents}/>
    </CanvasContext.Provider>
  )
}

export default App