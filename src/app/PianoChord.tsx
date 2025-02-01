import React from 'react';
import PianoKey from './PianoKey';

interface PianoChordProps {
  chord: string[];
  keys: string[];
}

const PianoChord: React.FC<PianoChordProps> = ({ chord, keys }) => {
  const startIndex = keys.indexOf(chord[0]);
  const displayedKeys = [
    ...keys.slice(startIndex),
    ...keys.slice(0, startIndex),
  ];

  return (
    <div className='flex mb-2'>
      {displayedKeys.map((note, index) => (
        <PianoKey
          key={index}
          note={note}
          isPressed={chord.includes(note)}
          isBlack={note.includes('#')}
        />
      ))}
    </div>
  );
};

export default PianoChord;
