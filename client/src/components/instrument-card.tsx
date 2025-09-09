import { Play, Pause, Video } from "lucide-react";
import type { Instrument, InstrumentOrigin, InstrumentCategory } from "@shared/schema";

interface InstrumentCardProps {
  instrument: Instrument;
  isPlaying: boolean;
  onPlay: () => void;
  onStop: () => void;
  onPlayVideo: () => void;
  origin?: InstrumentOrigin;
  category?: InstrumentCategory;
}

export default function InstrumentCard({ instrument, isPlaying, onPlay, onStop, onPlayVideo, origin, category }: InstrumentCardProps) {
  // Enteresan çalgılardaki videolar kategorisinde sadece görsel göster
  const isInterestingVideoCategory = origin === "interesting" && category === "videolar";
  
  // Enteresan çalgılardaki diğer kategorilerde (vurmalı, telli, üflemeli, tuşlu) çal/durdur butonunu kaldır
  const shouldShowPlayStopButtons = !(origin === "interesting" && category !== "videolar");

  // Videolar kategorisinde card'a tıklandığında video açılması için
  const handleCardClick = () => {
    if (isInterestingVideoCategory) {
      onPlayVideo();
    }
  };

  return (
    <div 
      className={`instrument-card bg-card rounded-lg shadow-md border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col ${isInterestingVideoCategory ? 'cursor-pointer' : ''}`} 
      data-testid={`card-instrument-${instrument.id}`}
      onClick={isInterestingVideoCategory ? handleCardClick : undefined}
    >
      <div className={`image-container relative flex-shrink-0 w-full overflow-hidden rounded-t-lg ${isInterestingVideoCategory ? 'h-20' : 'h-40'}`}>
        <img 
          src={instrument.imageUrl} 
          alt={instrument.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          data-testid={`img-instrument-${instrument.id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <div className={`flex flex-col flex-grow ${isInterestingVideoCategory ? 'p-2' : 'p-4'}`}>
        <h3 className={`font-semibold text-center ${isInterestingVideoCategory ? 'text-sm mb-1' : 'text-lg mb-2'}`} data-testid={`text-name-${instrument.id}`}>
          {instrument.name}
        </h3>
        <p className={`text-muted-foreground flex-grow text-center leading-tight ${isInterestingVideoCategory ? 'text-xs mb-1' : 'text-sm mb-4 leading-relaxed'}`} data-testid={`text-description-${instrument.id}`}>
          {instrument.description}
        </p>
        
        {/* Videolar kategorisinde hiç buton gösterme */}
        {!isInterestingVideoCategory && (
          <div className="flex flex-col space-y-2">
            {shouldShowPlayStopButtons && (
              <div className="flex space-x-2">
                <button
                  onClick={onPlay}
                  className="play-button flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-105 active:scale-95 text-base bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  disabled={isPlaying}
                  data-testid={`button-play-${instrument.id}`}
                >
                  <Play className="w-5 h-5" />
                  <span>Çal</span>
                </button>
                <button
                  onClick={onStop}
                  className="stop-button flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-105 active:scale-95 text-base bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50"
                  disabled={!isPlaying}
                  data-testid={`button-stop-${instrument.id}`}
                >
                  <Pause className="w-5 h-5" />
                  <span>Durdur</span>
                </button>
              </div>
            )}
            <button
              onClick={onPlayVideo}
              className="video-button w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-105 active:scale-95 text-base bg-secondary text-secondary-foreground hover:bg-secondary/90"
              data-testid={`button-video-${instrument.id}`}
            >
              <Video className="w-5 h-5" />
              <span>Video İzle</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
