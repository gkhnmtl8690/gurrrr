import { useRef, useImperativeHandle, forwardRef } from "react";

export interface AudioPlayerRef {
  play: (src: string) => Promise<void>;
  stop: () => void;
  setVolume: (volume: number) => void;
}

interface AudioPlayerProps {
  onEnded: () => void;
  onError: (error: string) => void;
}

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  ({ onEnded, onError }, ref) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useImperativeHandle(ref, () => ({
      play: async (src: string) => {
        try {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }

          const audio = new Audio(src);
          audioRef.current = audio;
          
          audio.addEventListener('ended', onEnded);
          audio.addEventListener('error', () => {
            onError('Failed to load audio file');
          });

          await audio.play();
        } catch (error) {
          onError('Failed to play audio');
        }
      },
      
      stop: () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current = null;
        }
      },
      
      setVolume: (volume: number) => {
        if (audioRef.current) {
          audioRef.current.volume = Math.max(0, Math.min(1, volume));
        }
      }
    }));

    return null;
  }
);

AudioPlayer.displayName = "AudioPlayer";
