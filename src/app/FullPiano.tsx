import React from 'react';

interface FullPianoProps {
  activeNotes: string[];
  keys: string[];
}

export const FullPiano: React.FC<FullPianoProps> = ({ activeNotes, keys }) => {
  const isBlackKey = (note: string) => note.includes('#');
  const isActive = (note: string) => activeNotes.includes(note);

  // Calculate positions for black keys
  const getBlackKeyStyle = (index: number) => {
    const whiteKeyWidth = 100 / 7; // 7 white keys in an octave
    let offset = 0;

    // C# = 0, D# = 1, F# = 2, G# = 3, A# = 4
    switch (index) {
      case 0: // C#
        offset = whiteKeyWidth * 0.7;
        break;
      case 1: // D#
        offset = whiteKeyWidth * 1.7;
        break;
      case 2: // F#
        offset = whiteKeyWidth * 3.7;
        break;
      case 3: // G#
        offset = whiteKeyWidth * 4.7;
        break;
      case 4: // A#
        offset = whiteKeyWidth * 5.7;
        break;
    }

    return {
      width: `${whiteKeyWidth * 0.6}%`,
      left: `${offset}%`,
      position: 'absolute' as const,
    };
  };

  const blackKeys = keys.filter(isBlackKey);
  const whiteKeys = keys.filter((note) => !isBlackKey(note));

  return (
    <div className='relative h-24 w-full max-w-3xl mx-auto'>
      <div className='absolute flex h-full w-full'>
        {/* White keys */}
        {whiteKeys.map((note) => (
          <div
            key={note}
            className={`flex-1 border border-gray-300 rounded-b ${
              isActive(note) ? 'bg-blue-200' : 'bg-white'
            } transition-colors duration-200`}
          />
        ))}
      </div>
      <div className='absolute h-2/3 w-full'>
        {/* Black keys */}
        {blackKeys.map((note, i) => (
          <div
            key={note}
            style={getBlackKeyStyle(i)}
            className={`h-full rounded-b ${
              isActive(note) ? 'bg-blue-600' : 'bg-black'
            } transition-colors duration-200`}
          />
        ))}
      </div>
    </div>
  );
};
