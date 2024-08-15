'use client';

import React, { useState, useEffect } from 'react';
import PianoChord from './PianoChord';
import { playChordFunction } from './PianoChordPlayer';
import { FaVolumeUp } from 'react-icons/fa';

interface ScaleOption {
  name: string;
  intervals: number[];
}

export const PianoChordExplorer: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedScale, setSelectedScale] = useState<ScaleOption>({
    name: 'Major',
    intervals: [0, 2, 4, 5, 7, 9, 11],
  });
  const [chords, setChords] = useState<string[][]>([]);

  const keys = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];

  const scales: ScaleOption[] = [
    { name: 'Major', intervals: [0, 2, 4, 5, 7, 9, 11] },
    { name: 'Natural Minor', intervals: [0, 2, 3, 5, 7, 8, 10] },
    { name: 'Harmonic Minor', intervals: [0, 2, 3, 5, 7, 8, 11] },
    { name: 'Melodic Minor', intervals: [0, 2, 3, 5, 7, 9, 11] },
    { name: 'Dorian', intervals: [0, 2, 3, 5, 7, 9, 10] },
    { name: 'Phrygian', intervals: [0, 1, 3, 5, 7, 8, 10] },
    { name: 'Lydian', intervals: [0, 2, 4, 6, 7, 9, 11] },
    { name: 'Mixolydian', intervals: [0, 2, 4, 5, 7, 9, 10] },
  ];

  const generateChords = (key: string, scale: ScaleOption) => {
    const keyIndex = keys.indexOf(key);
    const scaleNotes = scale.intervals.map(
      (interval) => keys[(keyIndex + interval) % 12],
    );

    return scaleNotes.map((root, index) => {
      const third = scaleNotes[(index + 2) % 7];
      const fifth = scaleNotes[(index + 4) % 7];
      return [root, third, fifth];
    });
  };

  const getChordName = (chord: string[]) => {
    const [root, third, fifth] = chord;
    const rootIndex = keys.indexOf(root);
    const thirdInterval = (keys.indexOf(third) - rootIndex + 12) % 12;
    const fifthInterval = (keys.indexOf(fifth) - rootIndex + 12) % 12;

    if (thirdInterval === 4 && fifthInterval === 7) return `${root} Major`;
    if (thirdInterval === 3 && fifthInterval === 7) return `${root} Minor`;
    if (thirdInterval === 3 && fifthInterval === 6) return `${root} Diminished`;
    if (thirdInterval === 4 && fifthInterval === 8) return `${root} Augmented`;
    return `${root} (${third} ${fifth})`;
  };

  useEffect(() => {
    const newChords = generateChords(selectedKey, selectedScale);
    setChords(newChords);
  }, [selectedKey, selectedScale]);

  return (
    <div className='flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md'>
      <h2 className='text-xl font-bold mb-4'>Chord Explorer</h2>

      <div className='flex space-x-4 mb-4'>
        <select
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className='p-2 border rounded'
        >
          {keys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <select
          value={selectedScale.name}
          onChange={(e) =>
            setSelectedScale(
              scales.find((scale) => scale.name === e.target.value) ||
                scales[0],
            )
          }
          className='p-2 border rounded'
        >
          {scales.map((scale) => (
            <option key={scale.name} value={scale.name}>
              {scale.name}
            </option>
          ))}
        </select>
      </div>

      <h3 className='text-lg font-semibold mb-2'>
        Chords in {selectedKey} {selectedScale.name}
      </h3>

      <div className='flex flex-wrap gap-4 w-full justify-evenly'>
        {chords.map((chord, index) => (
          <div key={index} className='bg-white p-4 rounded shadow'>
            <div className='flex items-center mb-2'>
              <h4 className='text-md font-semibold mr-2'>
                {getChordName(chord)} ({chord.join(' - ')})
              </h4>
              <button onClick={() => playChordFunction(chord)} className='ml-2'>
                <FaVolumeUp />
              </button>
            </div>
            <PianoChord chord={chord} keys={keys} />
          </div>
        ))}
      </div>
    </div>
  );
};
