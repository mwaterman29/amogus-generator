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

    //rescaling is wacky but this works :DD
    if (canvas.height > (window.screen.height - 300)) {
      const scaleFactor = (window.screen.height - 300) / canvas.height;
  
      // temp for rescale
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width * scaleFactor;
      tempCanvas.height = canvas.height * scaleFactor;
  
      // rescale temp canvas
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
      canvas.width = tempCanvas.width;
      canvas.height = tempCanvas.height;
  
      // clear n draw on original context
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
    }

    // "If letters are mirrored, mirror over the Y axis." - actually means vertical (over X), lol
    const isPalindromic = inputString === inputString.split('').reverse().join('');
    if (canvas.height > 0 && isPalindromic) {
      const imageData = ctx.getImageData(0, 0, canvas.width, Math.floor(canvas.height / 2));
      const mirroredData = new ImageData(imageData.width, imageData.height);

      for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
          const sourceIndex = (y * imageData.width + x) * 4;
          const destIndex = ((imageData.height - y - 1) * imageData.width + x) * 4;

          mirroredData.data[destIndex] = imageData.data[sourceIndex]; // r
          mirroredData.data[destIndex + 1] = imageData.data[sourceIndex + 1]; // g
          mirroredData.data[destIndex + 2] = imageData.data[sourceIndex + 2]; // b
          mirroredData.data[destIndex + 3] = imageData.data[sourceIndex + 3]; // a
        }
      }
      // draw mirror on second half
      ctx.putImageData(mirroredData, 0, Math.ceil(canvas.height / 2));
    }


  //"If letters are repeated, mirror over the X axis." - actually means horizontal (over Y), lol
  const repeatsItself = (
    inputString.length % 2 == 0 &&
    inputString === inputString.slice(0, inputString.length / 2) + inputString.slice(0, inputString.length / 2)
  )
  if (canvas.height > 0 && repeatsItself) {
    const imageData = ctx.getImageData(0, 0, Math.floor(canvas.width / 2), canvas.height);
    const mirroredData = new ImageData(imageData.width, imageData.height);

    for (let y = 0; y < imageData.height; y++) {
      for (let x = 0; x < imageData.width; x++) {
        const sourceIndex = (y * imageData.width + x) * 4;
        const destIndex = (y * imageData.width + (imageData.width - x - 1)) * 4;
        mirroredData.data[destIndex] = imageData.data[sourceIndex]; // r
        mirroredData.data[destIndex + 1] = imageData.data[sourceIndex + 1]; // g
        mirroredData.data[destIndex + 2] = imageData.data[sourceIndex + 2]; // b
        mirroredData.data[destIndex + 3] = imageData.data[sourceIndex + 3]; // a
      }
    }
    
    // draw mirror on second half
    ctx.putImageData(mirroredData, imageData.width, 0);
  }

    console.log(`Finalizing image, input: ${input}, mirrored over? horiz: ${repeatsItself}, vert ${isPalindromic}`)
    // return generated amogus
    return canvas;
  }

  const [input, setInput] = useState("");

  useEffect(() => {
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
