import React from 'react';
import { soundPresets } from './audioEngine';

interface SoundExplorerProps {
  selectedSound: string;
  onSoundChange: (sound: string) => void;
}

export const SoundExplorer: React.FC<SoundExplorerProps> = ({
  selectedSound,
  onSoundChange,
}) => {
  const soundOptions = Object.keys(soundPresets);

  return (
    <select
      value={selectedSound}
      onChange={(e) => onSoundChange(e.target.value)}
      className='p-2 border rounded'
    >
      {soundOptions.map((sound) => (
        <option key={sound} value={sound}>
          {sound}
        </option>
      ))}
    </select>
  );
};
