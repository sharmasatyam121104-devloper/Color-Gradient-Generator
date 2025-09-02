import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const getHaxColoCode = () => {
    const rgb = 255 * 255 * 255;
    const random = Math.random() * rgb;
    const int = Math.floor(random);
    const haxCode = int.toString(16);
    const colorHax = haxCode.padEnd(6, "0");
    return `#${colorHax}`;
  };

  const generatedGradient = () => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const color1 = getHaxColoCode();
      const color2 = getHaxColoCode();
      const degree = Math.floor(Math.random() * 360);
      const degreeString = degree + "deg";

      if (type === "linear") {
        colors.push({
          gradient: `${type}-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background: linear-gradient(${degreeString}, ${color1}, ${color2})`
        });
      } else {
        colors.push({
          gradient: `${type}-gradient(circle, ${color1}, ${color2})`,
          css: `background: radial-gradient(circle, ${color1}, ${color2})`
        });
      }
    }
    setGradients(colors);
  };

  const oncopy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Gradient code copied!", { position: 'top-center' });
  };

  useEffect(() => {
    generatedGradient();
  }, [num, type]);

  return (
    <div className='min-h-screen bg-white'>
      {/* ✅ Responsive main container */}
      <div className='w-full max-w-6xl mx-auto mt-4 space-y-8 p-4 rounded-xl'>
        
        {/* ✅ Responsive header: stacked on small, row on medium+ */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl rounded-2xl p-4'>
          <h1 className='text-2xl md:text-3xl font-bold text-center md:text-left'>
            🎨 Gradient Generator
          </h1>

          {/* ✅ Inputs and buttons in column on mobile, row on larger screens */}
          <div className='flex flex-col sm:flex-row items-center gap-3'>
            <input
              type="number"
              className='border border-slate-300 bg-white rounded-lg w-[100px] p-2 shadow'
              placeholder='12'
              value={num}
              onChange={(e) => setNum(Number(e.target.value))}
            />
            <select
              className='bg-gray-100 shadow rounded-xl p-2'
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button
              className='px-6 py-2 bg-rose-500 text-white rounded font-medium hover:bg-indigo-500'
              onClick={generatedGradient}
            >
              Generate
            </button>
          </div>
        </div>

        {/* ✅ Responsive grid for gradients */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4'>
          {gradients.map((item, index) => (
            <div
              key={index}
              className='h-40 w-full rounded-xl relative'
              style={{ background: item.gradient }}
            >
              <button
                onClick={() => oncopy(item.css)}
                className='bg-black/50 text-white rounded absolute bottom-3 right-3 text-xs h-6 w-14 hover:bg-black'
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
