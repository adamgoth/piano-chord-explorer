# Chord Explorer

An interactive web application for exploring music theory, chords, and scales with real-time audio synthesis and visual feedback.

## Overview

Chord Explorer is a powerful music education and composition tool that helps musicians and learners understand chord progressions, scale relationships, and sound design. It combines visual learning with real-time audio synthesis, making music theory concepts tangible and interactive.

## Features

### 🎹 Music Theory Engine
- **12 Chromatic Keys**: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
- **8 Scales/Modes**: Major, Natural Minor, Harmonic Minor, Melodic Minor, Dorian, Phrygian, Lydian, Mixolydian
- **Automatic Chord Generation**: Builds triadic chords (root, third, fifth) for every degree of the selected scale
- **Chord Type Detection**: Automatically identifies Major, Minor, Diminished, and Augmented chords

### 🎵 Audio Synthesis
- **Real-time Sound Generation**: Uses Web Audio API for instant playback
- **8 Synthesizer Presets**: 
  - Basic Sine
  - Saw Pad
  - Plucky Square
  - Triangle Chill
  - Ambient Drone
  - Ethereal Organ
  - Bright Brass
  - Space Pad
- **Full ADSR Envelope Control**: Attack, Decay, Sustain, Release
- **Multiple Oscillator Types**: Sine, Square, Sawtooth, Triangle
- **Advanced Filter System**: Lowpass, Highpass, Bandpass, Notch filters
- **Polyphonic Playback**: Play multiple notes simultaneously

### 🎨 Visual Interface
- **Interactive Piano Visualizations**: 
  - Individual chord display with highlighted keys
  - Full 88-key piano that lights up during playback
- **Chord Pad Grid**: 3x3 pad interface for quick chord triggering
- **Real-time Visual Feedback**: See which notes are playing as you hear them
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chord-explorer.git
cd chord-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Select a Key**: Choose your root note from the dropdown menu
2. **Choose a Scale**: Select from 8 different scales and modes
3. **Explore Chords**: Click on any chord to hear it and see the notes on the piano
4. **Customize Sound**: Use the Sound Explorer panel to adjust synthesizer parameters
5. **Use the Chord Pad**: Trigger chords quickly using the 3x3 grid interface

## Technical Stack

- **Framework**: Next.js 14.2.5 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Audio**: Web Audio API (no external dependencies)
- **Icons**: React Icons

## Project Structure

```
src/app/
├── page.tsx              # Main application container
├── PianoChordExplorer.tsx # Chord selection and display
├── ChordPad.tsx          # Grid-based chord trigger interface
├── SoundExplorer.tsx     # Sound synthesis controls
├── audioEngine.ts        # Web Audio API implementation
├── FullPiano.tsx         # Full piano keyboard visualization
├── PianoChord.tsx        # Individual chord display
└── PianoKey.tsx          # Piano key component
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

Built with Next.js and powered by the Web Audio API for real-time sound synthesis.
