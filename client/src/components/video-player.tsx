import { useEffect, useRef, useState } from "react";
import { X, Play } from "lucide-react";
import type { Instrument } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

interface VideoPlayerProps {
  instrument: Instrument;
  isOpen: boolean;
  onClose: () => void;
  onVideoSelect?: (instrument: Instrument) => void;
}

export default function VideoPlayer({ instrument, isOpen, onClose, onVideoSelect }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Instrument>(instrument);

  // Fetch all videos from interesting origin and videolar category
  const { data: availableVideos = [] } = useQuery<Instrument[]>({
    queryKey: ["/api/instruments", { origin: "interesting", category: "videolar" }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('origin', 'interesting');
      params.set('category', 'videolar');
      const response = await fetch(`/api/instruments?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      return response.json();
    },
    enabled: isOpen,
  });

  // Update selected video when instrument prop changes
  useEffect(() => {
    setSelectedVideo(instrument);
  }, [instrument]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      setIsLoading(true);
      setHasError(false);
      
      const video = videoRef.current;
      video.currentTime = 0;
      
      const handleLoadedData = () => {
        setIsLoading(false);
        video.play().catch(() => {
          setHasError(true);
        });
      };

      const handleError = () => {
        setIsLoading(false);
        setHasError(true);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, [isOpen, selectedVideo]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Convert audio file path to video file path for certain instruments
  const getVideoPath = (instrument: Instrument) => {
    // For baglama and cumbus, convert audio path to video path
    if (instrument.id === 'baglama') {
      return '/videos/baglama.mp4';
    }
    if (instrument.id === 'cumbus') {
      return '/videos/cumbus.mp4';
    }
    // For other instruments that might have video in audioFile
    if (instrument.audioFile.includes('/videos/')) {
      return instrument.audioFile;
    }
    // Try to convert audio path to video path
    return instrument.audioFile.replace('/audio/', '/videos/').replace('.mp3', '.mp4');
  };
  
  const videoSrc = getVideoPath(selectedVideo);

  const handleVideoSelect = (video: Instrument) => {
    setSelectedVideo(video);
    if (onVideoSelect) {
      onVideoSelect(video);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="relative bg-background rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{selectedVideo.name} - Video</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Video yükleniyor...</p>
              </div>
            </div>
          )}
          
          {hasError && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-destructive mb-2">Video yüklenemedi</p>
                <p className="text-sm text-muted-foreground">
                  {selectedVideo.name} için video dosyası bulunamadı.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Dosya yolu: {videoSrc}
                </p>
              </div>
            </div>
          )}
          
          <video
            ref={videoRef}
            className={`w-full h-auto rounded-lg ${isLoading || hasError ? 'hidden' : 'block'}`}
            controls
            autoPlay
            onEnded={onClose}
          >
            <source src={videoSrc} type="video/mp4" />
            Tarayıcınız video oynatmayı desteklemiyor.
          </video>
          
          {/* Video Selection Buttons */}
          {availableVideos.length > 1 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4 text-center">Video Seç</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 max-h-32 overflow-y-auto">
                {availableVideos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    className={`p-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1 ${
                      selectedVideo.id === video.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                    title={video.description}
                  >
                    <Play className="w-3 h-3" />
                    <span>{video.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}