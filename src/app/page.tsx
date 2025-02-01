'use client';

import React, { useState, useEffect } from 'react';
import { PianoChordExplorer, ScaleOption } from './PianoChordExplorer';
import { ChordPad } from './ChordPad';
import { SoundExplorer } from './SoundExplorer';
import { playChordFunction } from './PianoChordPlayer';

export default function Home() {
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedScale, setSelectedScale] = useState<ScaleOption>({
    name: 'Major',
    intervals: [0, 2, 4, 5, 7, 9, 11],
  });
  const [selectedSound, setSelectedSound] = useState('basicSine');
  const [chords, setChords] = useState<string[][]>([]);
  const [activeChordIndex, setActiveChordIndex] = useState<number | null>(null);
  const [activeNotes, setActiveNotes] = useState<string[]>([]);

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

  const playChord = (chord: string[], index: number) => {
    playChordFunction(chord, selectedSound);
    setActiveChordIndex(index);
    setActiveNotes(chord);
    setTimeout(() => {
      setActiveChordIndex(null);
      setActiveNotes([]);
    }, 500);
  };

  useEffect(() => {
    const newChords = generateChords(selectedKey, selectedScale);
    setChords(newChords);
  }, [selectedKey, selectedScale]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 gap-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
        <div className='bg-white rounded-lg shadow-lg p-6'>
          <PianoChordExplorer
            selectedKey={selectedKey}
            selectedScale={selectedScale}
            selectedSound={selectedSound}
            chords={chords}
            activeChordIndex={activeChordIndex}
            activeNotes={activeNotes}
            keys={keys}
            scales={scales}
            onKeyChange={setSelectedKey}
            onScaleChange={setSelectedScale}
            onChordPlay={playChord}
            getChordName={getChordName}
          />
        </div>

        <div className='bg-white rounded-lg shadow-lg p-6'>
          <ChordPad
            chords={chords}
            activeChordIndex={activeChordIndex}
            onChordPlay={playChord}
            getChordName={getChordName}
          />
        </div>

        <div className='bg-white rounded-lg shadow-lg p-6'>
          <h3 className='text-lg font-semibold mb-4'>Sound Settings</h3>
          <SoundExplorer
            selectedSound={selectedSound}
            onSoundChange={setSelectedSound}
          />
        </div>
      </div>
    </main>
  );
}
