import { useState, useCallback } from "react";
import type { Instrument } from "@shared/schema";

export function useVideo() {
  const [currentVideoInstrument, setCurrentVideoInstrument] = useState<Instrument | null>(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  const openVideoPlayer = useCallback((instrument: Instrument) => {
    setCurrentVideoInstrument(instrument);
    setIsVideoPlayerOpen(true);
  }, []);

  const closeVideoPlayer = useCallback(() => {
    setCurrentVideoInstrument(null);
    setIsVideoPlayerOpen(false);
  }, []);

  const changeVideo = useCallback((instrument: Instrument) => {
    setCurrentVideoInstrument(instrument);
  }, []);

  return {
    currentVideoInstrument,
    isVideoPlayerOpen,
    openVideoPlayer,
    closeVideoPlayer,
    changeVideo,
  };
}