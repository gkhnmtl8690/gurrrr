import { useRef, useState } from "react";
import { Play, Upload } from "lucide-react";

interface InlineVideoPlayerProps {
  className?: string;
}

export default function InlineVideoPlayer({ className = "" }: InlineVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setIsLoading(true);
      setHasError(false);
      
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setFileName(file.name);
      
      // Loading state will be handled by video element events
    } else {
      setHasError(true);
      setFileName("");
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {!videoSrc ? (
        // Initial state - show upload prompt
        <div className="bg-card border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 w-full max-w-xl text-center">
          <div className="flex flex-col items-center space-y-4">
            <Play className="w-16 h-16 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold">Video Oynatıcı</h3>
            <p className="text-muted-foreground">
              Video dosyası seçin ve oynatın
            </p>
            <button
              onClick={handleFileSelect}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Video Seç</span>
            </button>
          </div>
        </div>
      ) : (
        // Video player state
        <div className="w-full max-w-2xl space-y-4">
          <div className="bg-card rounded-lg p-4 border">
            {isLoading && (
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Video yükleniyor...</p>
                </div>
              </div>
            )}
            
            {hasError && (
              <div className="flex items-center justify-center h-48">
                <div className="text-center">
                  <p className="text-destructive mb-2">Video yüklenemedi</p>
                  <p className="text-sm text-muted-foreground">
                    Lütfen geçerli bir video dosyası seçin.
                  </p>
                </div>
              </div>
            )}
            
            <video
              ref={videoRef}
              className={`w-full h-auto rounded-lg ${isLoading || hasError ? 'hidden' : 'block'}`}
              controls
              onLoadedData={() => {
                setIsLoading(false);
                setHasError(false);
              }}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              onLoadStart={() => {
                setIsLoading(true);
                setHasError(false);
              }}
            >
              <source src={videoSrc} />
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Dosya:</span>
              <span className="text-sm font-medium">{fileName}</span>
            </div>
            
            <button
              onClick={handleFileSelect}
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Farklı Video Seç</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />
    </div>
  );
}