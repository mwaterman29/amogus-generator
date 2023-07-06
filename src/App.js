import logo from './logo.svg';
import './App.css';
import base from './amogus_base.png'
import { useEffect, useState } from 'react';

function App() {

  //init base image w/ static import
  const baseImage = new Image();
  baseImage.src = base;
  const baseImageWidth = 865

  // zlices of the existing image
  const imageSlices = {
    A: { x: 0, y: 0, h: 168},
    M: { x: 0, y: 169, h: 100 },
    O: { x: 0, y: 269, h: 130 },
    G: { x: 0, y: 400, h: 120 },
    U: { x: 0, y: 520, h: 150 },
    S: { x: 0, y: 670, h: 180 }
  };

  function generateImage(inputString) {

    //First, get total height of the string
    let canvasHeight = 0;
    for (let i = 0; i < inputString.length; i++) {
      const letter = inputString[i].toUpperCase();
      const slice = imageSlices[letter];
      canvasHeight += slice.h;
    }

    // get canvas el, set height
    const canvas = document.getElementById('canvas');
    canvas.width = baseImageWidth;
    canvas.height = canvasHeight;

    // drawing context
    const ctx = canvas.getContext('2d');

    // clear the canvas from previous amogi
    ctx.clearRect(0, 0, baseImageWidth, canvasHeight);

    // loop through each character of the input string
    let rectY = 0;
    for (let i = 0; i < inputString.length; i++) {
      const letter = inputString[i].toUpperCase();
      const slice = imageSlices[letter];

      // calculate the position of the rectangle based on the index

      // draw the slice from the existing image onto the canvas
      ctx.drawImage(
        baseImage,      // Existing image source (AMOGUS :D)
        slice.x, slice.y,   // Slice coordinates
        baseImageWidth, slice.h,  // Slice dimensions on the canvas
        0, rectY,      // Destination coordinates on the canvas
        baseImageWidth, slice.h  // Destination dimensions on the canvas
      );
      rectY += slice.h // inc height
    }

    // return generated amogus
    return canvas;
  }

  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(`input: ${input}`)
    generateImage(input)
  }, [input])

  return (
    <div className="App">
      <input type='text' onChange={(evt) => {setInput(evt.target.value)}}/>
      <canvas id='canvas'/>
      <button>Button</button>
    </div>
  );
}

export default App;
