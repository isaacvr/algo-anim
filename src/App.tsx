import React from 'react'
import './App.scss';
import { Geometry, Scene } from './core';

function App() {
  let scene = new Scene(-20, 10, 20, 10, 900, 700);
  scene.add(new Geometry.Point(0, 0, 0));
  scene.draw();

  return (
    <>
      { scene.cnv }
    </>
  )
}

export default App
