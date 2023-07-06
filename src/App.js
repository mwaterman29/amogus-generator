import logo from './logo.svg';
import './App.css';
import base from './amogus_base.png'
import bone from './amogus_bone.png'
import { useEffect, useState } from 'react';

import bgMusic from './bg music.mp3'

//special
import abigus from './special/abigus.png'
import abominatiogus from './special/abominatiogus.png'
import asmolgus from './special/asmolgus.png'
import beef from './special/beef.png'
import mogu_mogu from './special/mogumogu.png'
import mug from './special/mug.png'
import oh_no from './special/oh no.png'
import oh_yeah from './special/oh yeah.png'
import sugoma from './special/sugoma.png'
import usa from './special/usa.png'
import what_if from './special/what if.png'

function App() {

  //init base image w/ static import
  const baseImage = new Image();
  baseImage.src = base;
  const baseImageWidth = 865

  //bone, w static import
  const boneImage = new Image();
  boneImage.src = bone;
  const special = {
    abigus: {img: abigus, w: 268, h:255},
    abominatiogus: {img: abominatiogus, w: 200, h:226},
    asmolgus: {img: asmolgus, w: 115, h:118},
    beef: {img: beef, w: 159, h:121},
    "mogu mogu": {img: mogu_mogu, w: 239, h:242},
    mug: {img: mug, w: 215, h:229},
    "oh no": {img: oh_no, w: 204, h:233},
    "oh yeah": {img: oh_yeah, w: 226, h:195},
    sugoma: {img: sugoma, w: 168, h:174},
    usa: {img: usa, w: 170, h:269},
    "what if": {img: what_if, w: 209, h:192},
  }

  // zlices of the existing image
  const imageSlices = {
    A: { x: 0, y: 0, h: 168},
    M: { x: 0, y: 169, h: 100 },
    O: { x: 0, y: 269, h: 130 },
    G: { x: 0, y: 400, h: 120 },
    U: { x: 0, y: 520, h: 150 },
    S: { x: 0, y: 670, h: 180 }
  };
  const lexi = 'AMOGUS';


  function generateImage(inputString) {
    let out = "";

    if(special[inputString])
    {
      console.log("Special " + inputString)
      //populate special via static import
      const specAsImage = new Image();
      specAsImage.src = special[inputString].img;
      specAsImage.width = special[inputString].w;
      specAsImage.height = special[inputString].h;

      const canvas = document.getElementById('canvas');
      canvas.height = specAsImage.height;
      canvas.width = specAsImage.width;

      const ctx = canvas.getContext('2d');
      specAsImage.onload = function () {
        setOutTitle(input);
        ctx.drawImage(
          specAsImage,
          0, 0,
          specAsImage.width, specAsImage.height,
          0, 0,
          canvas.width, canvas.height
        );
        console.log(`Drawn special ${canvas.width} X ${canvas.height}`);
      };

      //rescale lol
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width * 3;
      tempCanvas.height = canvas.height * 3;
  
      // rescale temp canvas
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height);
      canvas.width = tempCanvas.width;
      canvas.height = tempCanvas.height;
  
      // clear n draw on original context
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);

      return canvas;
    }


    //First, get total height of the string
    let canvasHeight = 0;
    for (let i = 0; i < inputString.length; i++) {

      const letter = inputString[i].toUpperCase();

      if(!lexi.includes(letter))
        continue;

      const slice = imageSlices[letter];
      canvasHeight += slice.h;

      //Check for bones
      if(i == 0 && letter != 'A')
        canvasHeight += 200;
      if(i == inputString.length - 1 && letter != 'S')
        canvasHeight += 200;
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

      if(!lexi.includes(letter))
        continue;

      //If the first letter isn't an A, stick a bone on top.
      if(i == 0 && letter != 'A')
      {
        //console.log("top bone!")
        ctx.drawImage(
          boneImage,      // bone src
          0, 0,  // Slice coordinates
          baseImageWidth, 200,  // Slice dimensions on the canvas
          0, rectY,      // Destination coordinates on the canvas
          baseImageWidth, 200 // Destination dimensions on the canvas
        );
        rectY += 200 // inc height
      }

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

      //If the last letter isn't an S, stick a bone on the bottom.
      if(i == inputString.length - 1 && letter != 'S')
      {
        console.log("bottom bone")
        ctx.drawImage(
          boneImage,      // bone src
          0, 200,  // Slice coordinates
          baseImageWidth, 200,  // Slice dimensions on the canvas
          0, rectY,      // Destination coordinates on the canvas
          baseImageWidth, 200 // Destination dimensions on the canvas
        );
        rectY += 200 // inc height
      }

      out += (i == 0) ? letter : letter.toLowerCase();

    }

    //rescaling is wacky but this works :DD
    if (canvas.height > (window.visualViewport.height - 100)) {
      const scaleFactor = (window.visualViewport.height - 100) / canvas.height;
  
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
    const isPalindromic = inputString.length > 1 && inputString === inputString.split('').reverse().join('');
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

    setOutTitle(out);

    // return generated amogus
    return canvas;
  }

  const [input, setInput] = useState("");
  const [outTitle, setOutTitle] = useState("");
  const [playing, setPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    generateImage(input)
  }, [input])

  useEffect(() => {
      document.getElementById("backgroundMusic").play().
      catch(
          (error) => {
            document.addEventListener('click', () => 
            {
              document.getElementById("backgroundMusic").play()
              setPlaying(true);
            })
      })

      document.getElementById("backgroundMusic").play().
      catch(
          (error) => {
            document.addEventListener('keydown', () => 
            {
              document.getElementById("backgroundMusic").play()
              setPlaying(true);
            })
      })

  });

  return (
    <div className="flex flex-row bg-blue-400 h-screen w-screen">
      <div className='w-full basis-1/5 flex flex-col p-6 gap-4'>
        <p className='text-black underline text-6xl'>AMOGUS GENERATOR</p>
        <p>Enter text here... it will generate amogus....</p>
        <input type='text' onChange={(evt) => {setInput(evt.target.value)}}/>
        <audio id="backgroundMusic">
        <source src={bgMusic} type="audio/mpeg" loop volume={0.5}/>
        Your browser does not support the audio element.
        </audio>
        {
        playing &&
        <div>
          <p>Volume</p>
          <input type="range" id="volume-slider" onChange={(e) => {
            var audio = document.getElementById("backgroundMusic");
            audio.volume = e.currentTarget.value / 100;
          }}></input>
        </div>
        }

        <button className="p-4 bg-blue-700 rounded-md border border-black text-white " onClick={(() => setShowInfo(!showInfo))}>
          {showInfo ? "Hide" : "Show"} info & credits?
        </button>
        {showInfo && <div className='flex flex-col gap-2 bg-white rounded-md border-black border-2 p-4'>
          <a className="text-blue-400 underline" href='https://github.com/mwaterman29'>Made by Matt W.</a>
          <a className="text-blue-400 underline" href='https://github.com/mwaterman29/amogus-generator'>View source code</a>
          <p>Inspired by:</p>
          <li><a className="text-blue-400 underline" href='https://www.youtube.com/watch?v=obmlZH3X9gs'>amogus</a></li>
          <li><a className="text-blue-400 underline" href='https://sustext.jerma.io/'>when the imposter...</a></li>
          <a  href='https://github.com/nagadomi/nunif#waifu2x'>Images upscaled <span className="text-blue-400 underline">by waifu2x</span></a>
          <a  className="text-blue-400 underline" href='https://www.youtube.com/watch?v=grd-K33tOSM'>Music Credit</a>
          <a  className="text-blue-400 underline" href='https://www.youtube.com/watch?v=grd-K33tOSM'>Original Music Credit</a>

        </div>}
      </div>
      <div className='flex flex-col w-full basis-4/5 items-center justify-center'>
        <p className='text-black text-4xl p-2'>{outTitle}</p>
        <canvas id='canvas'/>
      </div>
    </div>

  );
}

export default App;
