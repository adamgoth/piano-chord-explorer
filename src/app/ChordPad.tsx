import React from 'react';

interface ChordPadProps {
  chords: string[][];
  activeChordIndex: number | null;
  onChordPlay: (chord: string[], index: number) => void;
  getChordName: (chord: string[]) => string;
}

export const ChordPad: React.FC<ChordPadProps> = ({
  chords,
  activeChordIndex,
  onChordPlay,
  getChordName,
}) => {
  return (
    <>
      <h3 className='text-lg font-semibold mb-4'>Chord Pad</h3>
      <div className='grid grid-cols-3 gap-4 w-full max-w-md'>
        {chords.slice(0, 9).map((chord, index) => (
          <button
            key={index}
            onClick={() => onChordPlay(chord, index)}
            className={`aspect-square text-white rounded-lg shadow-md 
                       transition-colors duration-200 flex flex-col items-center justify-center p-2
                       ${
                         activeChordIndex === index
                           ? 'bg-blue-600'
                           : 'bg-blue-500'
                       }`}
          >
            <span className='font-bold'>{getChordName(chord)}</span>
            <span className='text-sm'>{chord.join('-')}</span>
          </button>
        ))}
      </div>
    </>
  );
};
