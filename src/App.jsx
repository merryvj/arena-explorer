import React, {createContext, useState} from 'react';
import data from '../contents.json';
import Canvas from './components/Canvas';
import './App.css'
import useChannel from './hooks/useChannel';
import ChannelInput from './components/ChannelInput';


export const CanvasContext = createContext();
const initialContext = {
  maxZIndex: 1,
  isPanning: false,
  isMoving: false,
  isScrollingFrame: false,
  movingEl: null,
}


function App() {
  const [channel, setChannel] = useState("https://www.are.na/ivol-ga/interconnections-and-networks");
  const {blocks, status} = useChannel(channel);

  return (
    <CanvasContext.Provider value={initialContext}>
      <ChannelInput updateBlocks={setChannel}/>
      {status === "loaded" && (
        <Canvas contents={blocks.contents}/>
      )}
    </CanvasContext.Provider>
  )
}

export default App