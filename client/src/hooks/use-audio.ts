import { useState, useRef, useCallback } from "react";
import type { Instrument } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useAudio() {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentInstrument, setCurrentInstrument] = useState<Instrument | null>(null);
  const [globalVolume, setGlobalVolume] = useState(0.8);
  
  const { toast } = useToast();

  const playAudio = useCallback(async (instrument: Instrument) => {
    try {
      // Stop any currently playing audio
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      const audio = new Audio(instrument.audioFile);
      audio.volume = globalVolume;
      
      // Set up event listeners
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setCurrentInstrument(null);
        setCurrentAudio(null);
      });
      
      audio.addEventListener('error', () => {
        setIsPlaying(false);
        setCurrentInstrument(null);
        setCurrentAudio(null);
        toast({
          title: "Ses dosyası yüklenemedi",
          description: `${instrument.name} çalgısının ses dosyası çalınamıyor.`,
          variant: "destructive",
        });
      });

      await audio.play();
      
      setCurrentAudio(audio);
      setIsPlaying(true);
      setCurrentInstrument(instrument);
      
    } catch (error) {
      toast({
        title: "Ses çalınamıyor",
        description: `${instrument.name} çalgısı şu anda çalınamıyor.`,
        variant: "destructive",
      });
    }
  }, [currentAudio, globalVolume, toast]);

  const stopAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentInstrument(null);
    setCurrentAudio(null);
  }, [currentAudio]);

  const updateGlobalVolume = useCallback((volume: number) => {
    setGlobalVolume(volume);
    if (currentAudio) {
      currentAudio.volume = volume;
    }
  }, [currentAudio]);

  return {
    currentAudio,
    isPlaying,
    currentInstrument,
    playAudio,
    stopAudio,
    setGlobalVolume: updateGlobalVolume,
  };
}
