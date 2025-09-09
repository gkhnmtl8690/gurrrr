// This file contains metadata for all audio files to ensure offline functionality
// The actual audio files should be placed in client/public/audio/
// The actual video files should be placed in client/public/videos/

export const AUDIO_FILES = {
  // Turkish instruments
  davul: {
    path: "/audio/davul.mp3",
    videoPath: "/videos/davul.mp4",
    duration: 3000, // 3 seconds
    description: "Traditional Turkish drum beat"
  },
  saz: {
    path: "/audio/saz.mp3",
    videoPath: "/videos/saz.mp4", 
    duration: 4000,
    description: "Traditional Turkish long-necked lute melody"
  },
  ney: {
    path: "/audio/ney.mp3",
    videoPath: "/videos/ney.mp4",
    duration: 5000,
    description: "Turkish reed flute melody"
  },
  kemence: {
    path: "/audio/kemence.mp3",
    videoPath: "/videos/kemence.mp4",
    duration: 4500,
    description: "Turkish small violin melody"
  },
  kanun: {
    path: "/audio/kanun.mp3",
    videoPath: "/videos/kanun.mp4",
    duration: 4000,
    description: "Turkish plucked string instrument melody"
  },
  zurna: {
    path: "/audio/zurna.mp3",
    videoPath: "/videos/zurna.mp4",
    duration: 3500,
    description: "Turkish woodwind melody"
  },
  // Foreign instruments
  piyano: {
    path: "/audio/piyano.mp3",
    videoPath: "/videos/piyano.mp4",
    duration: 4000,
    description: "Classical piano melody"
  },
  gitar: {
    path: "/audio/gitar.mp3",
    videoPath: "/videos/gitar.mp4",
    duration: 3500,
    description: "Acoustic guitar melody"
  },
  keman: {
    path: "/audio/keman.mp3",
    videoPath: "/videos/keman.mp4",
    duration: 4500,
    description: "Classical violin melody"
  },
  trompet: {
    path: "/audio/trompet.mp3",
    videoPath: "/videos/trompet.mp4",
    duration: 3000,
    description: "Brass trumpet melody"
  },
  bateri: {
    path: "/audio/bateri.mp3",
    videoPath: "/videos/bateri.mp4",
    duration: 2500,
    description: "Modern drum kit beat"
  },
  flut: {
    path: "/audio/flut.mp3",
    videoPath: "/videos/flut.mp4",
    duration: 4000,
    description: "Classical flute melody"
  },
  obua: {
    path: "/audio/obua.mp3",
    videoPath: "/videos/obua.mp4",
    duration: 4000,
    description: "Oboe classical melody"
  },
  baglama: {
    path: "/audio/baglama.mp3",
    videoPath: "/videos/baglama.mp4",
    duration: 4500,
    description: "Traditional Turkish baglama melody"
  },
  cumbus: {
    path: "/audio/cumbus.mp3",
    videoPath: "/videos/cumbus.mp4",
    duration: 3800,
    description: "Turkish cumbus melody"
  }
} as const;

// Helper function to check if audio file exists (for development)
export function validateAudioFile(filename: string): boolean {
  return filename in AUDIO_FILES;
}
