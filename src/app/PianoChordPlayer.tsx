'use client';

// Frequencies mapped to note names
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

// Define different sound presets
export const soundPresets = {
  basicSine: {
    oscillatorType: 'sine',
    filterType: 'lowpass',
    filterFrequency: 1000,
    adsr: {
      attackTime: 0.1,
      decayTime: 0.2,
      sustainLevel: 0.7,
      releaseTime: 0.3,
      noteLength: 1.0,
    },
  },
  sawPad: {
    oscillatorType: 'sawtooth',
    filterType: 'lowpass',
    filterFrequency: 1200,
    adsr: {
      attackTime: 0.2,
      decayTime: 0.3,
      sustainLevel: 0.5,
      releaseTime: 0.5,
      noteLength: 2.0,
    },
  },
  pluckySquare: {
    oscillatorType: 'square',
    filterType: 'lowpass',
    filterFrequency: 2000,
    adsr: {
      attackTime: 0.05,
      decayTime: 0.1,
      sustainLevel: 0.3,
      releaseTime: 0.2,
      noteLength: 0.5,
    },
  },
  triangleChill: {
    oscillatorType: 'triangle',
    filterType: 'lowpass',
    filterFrequency: 800,
    adsr: {
      attackTime: 0.2,
      decayTime: 1.0,
      sustainLevel: 0.4,
      releaseTime: 1.0,
      noteLength: 2.0,
    },
  },

  ambientDrone: {
    oscillatorType: 'sine',
    filterType: 'lowpass',
    filterFrequency: 600,
    adsr: {
      attackTime: 2.0,
      decayTime: 2.0,
      sustainLevel: 0.8,
      releaseTime: 4.0,
      noteLength: 6.0, // A long note before release
    },
  },

  etherealOrgan: {
    oscillatorType: 'triangle',
    filterType: 'bandpass',
    filterFrequency: 500, // Focus the band on a mid-range
    adsr: {
      attackTime: 1.5,
      decayTime: 1.5,
      sustainLevel: 0.6,
      releaseTime: 3.0,
      noteLength: 4.0,
    },
  },

  brightBrass: {
    oscillatorType: 'sawtooth',
    filterType: 'lowpass',
    filterFrequency: 1800,
    adsr: {
      attackTime: 0.4,
      decayTime: 1.0,
      sustainLevel: 0.7,
      releaseTime: 1.5,
      noteLength: 3.0,
    },
  },

  spacePad: {
    oscillatorType: 'sine',
    filterType: 'lowpass',
    filterFrequency: 2000,
    adsr: {
      attackTime: 3.0, // Very slow fade in
      decayTime: 2.0,
      sustainLevel: 0.7,
      releaseTime: 4.0, // Long release
      noteLength: 8.0, // Very long hold
    },
  },
};

const playChord = (notes: string[], sound: string) => {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();

  // Default to basicSine if preset isn't found
  const preset =
    soundPresets[sound as keyof typeof soundPresets] || soundPresets.basicSine;

  // Master gain for overall volume
  const masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.1, audioContext.currentTime);
  masterGain.connect(audioContext.destination);

  notes.forEach((note) => {
    const frequency = frequencies[note as keyof typeof frequencies];
    const oscillator = audioContext.createOscillator();
    oscillator.type = preset.oscillatorType as OscillatorType;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

    // Create a filter to shape the sound
    const filter = audioContext.createBiquadFilter();
    filter.type = preset.filterType as BiquadFilterType;
    filter.frequency.setValueAtTime(
      preset.filterFrequency,
      audioContext.currentTime,
    );

    // Create a gain node for the envelope
    const envelopeGain = audioContext.createGain();
    envelopeGain.gain.setValueAtTime(0, audioContext.currentTime);

    // Connect nodes: oscillator -> filter -> envelope -> master
    oscillator.connect(filter);
    filter.connect(envelopeGain);
    envelopeGain.connect(masterGain);

    // Read ADSR parameters
    const { attackTime, decayTime, sustainLevel, releaseTime, noteLength } =
      preset.adsr;
    const now = audioContext.currentTime;

    // Attack
    envelopeGain.gain.linearRampToValueAtTime(1.0, now + attackTime);
    // Decay
    envelopeGain.gain.linearRampToValueAtTime(
      sustainLevel,
      now + attackTime + decayTime,
    );

    // Start the oscillator
    oscillator.start(now);

    // We'll begin the release after noteLength
    const releaseStart = now + noteLength;
    oscillator.stop(releaseStart + releaseTime);

    // Sustain until release
    envelopeGain.gain.setValueAtTime(sustainLevel, releaseStart);
    // Release
    envelopeGain.gain.linearRampToValueAtTime(0, releaseStart + releaseTime);
  });
};

export const playChordFunction = (chord: string[], sound: string) => {
  playChord(chord, sound);
};
