'use client';

import React, { useEffect } from 'react';

const frequencies = {
  C: 261.63,
  'C#': 277.18,
  D: 293.66,
  'D#': 311.13,
  E: 329.63,
  F: 349.23,
  'F#': 369.99,
  G: 392.0,
  'G#': 415.3,
  A: 440.0,
  'A#': 466.16,
  B: 493.88,
};

const playChord = (notes: string[]) => {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();
  const gainNode = audioContext.createGain();
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Lower the volume
  gainNode.connect(audioContext.destination);

  notes.forEach((note) => {
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; // You can experiment with different wave types
    oscillator.frequency.setValueAtTime(
      frequencies[note as keyof typeof frequencies], // Type assertion to fix the linter error
      audioContext.currentTime,
    );
    oscillator.connect(gainNode);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1); // Play each note for 1 second
  });

  return () => {
    gainNode.disconnect();
    audioContext.close();
  };
};

// Export a function to play the chord
export const playChordFunction = (chord: string[]) => {
  playChord(chord);
};
