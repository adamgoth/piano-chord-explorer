'use client';

import React from 'react';
import PianoChord from './PianoChord';
import { FaVolumeUp } from 'react-icons/fa';
import { FullPiano } from './FullPiano';

interface PianoChordExplorerProps {
  selectedKey: string;
  selectedScale: ScaleOption;
  selectedSound: string;
  chords: string[][];
  activeChordIndex: number | null;
  activeNotes: string[];
  keys: string[];
  scales: ScaleOption[];
  onKeyChange: (key: string) => void;
  onScaleChange: (scale: ScaleOption) => void;
  onChordPlay: (chord: string[], index: number) => void;
  getChordName: (chord: string[]) => string;
}

export interface ScaleOption {
  name: string;
  intervals: number[];
}

export const PianoChordExplorer: React.FC<PianoChordExplorerProps> = ({
  selectedKey,
  selectedScale,
  chords,
  activeChordIndex,
  activeNotes,
  keys,
  scales,
  onKeyChange,
  onScaleChange,
  onChordPlay,
  getChordName,
}) => {
  return (
    <div className='flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md'>
      <h2 className='text-xl font-bold mb-4'>Chord Explorer</h2>

      <div className='flex space-x-4 mb-4'>
        <select
          value={selectedKey}
          onChange={(e) => onKeyChange(e.target.value)}
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
            onScaleChange(
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
          <div
            key={index}
            className={`bg-white p-4 rounded shadow transition-colors duration-200 ${
              activeChordIndex === index ? 'bg-blue-100' : ''
            }`}
          >
            <div className='flex items-center mb-2'>
              <h4 className='text-md font-semibold mr-2'>
                {getChordName(chord)} ({chord.join(' - ')})
              </h4>
              <button
                onClick={() => onChordPlay(chord, index)}
                className='ml-2'
              >
                <FaVolumeUp />
              </button>
            </div>
            <PianoChord chord={chord} keys={keys} />
          </div>
        ))}
      </div>

      <div className='w-full my-8'>
        <FullPiano activeNotes={activeNotes} keys={keys} />
      </div>
    </div>
  );
};
