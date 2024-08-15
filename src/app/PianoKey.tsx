import React from 'react';

interface PianoKeyProps {
  note: string;
  isPressed: boolean;
  isBlack: boolean;
}

const PianoKey: React.FC<PianoKeyProps> = ({ note, isPressed, isBlack }) => (
  <div
    className={`
      ${
        isBlack
          ? `w-6 h-24 -mx-3 z-10 ${isPressed ? 'bg-blue-300' : 'bg-black'}`
          : `w-10 h-36 border border-gray-300 ${
              isPressed ? 'bg-blue-300' : 'bg-white'
            }`
      }
      relative
    `}
  >
    {!isBlack && (
      <span className='absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-black'>
        {note}
      </span>
    )}
    {isPressed && (
      <span
        className={`absolute ${
          isBlack ? 'bottom-5' : 'bottom-7'
        } left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black rounded-full`}
      ></span>
    )}
  </div>
);

export default PianoKey;
