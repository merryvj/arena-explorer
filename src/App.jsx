import React from 'react';
import data from '../contents.json';
import Canvas from './components/Canvas';
import './App.css'
function App() {
  let contents = data.contents;
  contents.forEach((d) => (
    console.log(d.title)
  ))

  return (
    <div>
      <Canvas contents={contents}/>
    </div>
  )
}

export default App