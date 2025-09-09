import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Music, Play, Pause, X } from "lucide-react";
import type { Instrument, InstrumentOrigin, InstrumentCategory } from "@shared/schema";
import { INSTRUMENT_CATEGORIES } from "@shared/schema";
import InstrumentCard from "../components/instrument-card";
import VideoPlayer from "../components/video-player";
import InlineVideoPlayer from "../components/inline-video-player";
import { useAudio } from "../hooks/use-audio";
import { useVideo } from "../hooks/use-video";
import turkeyMapIcon from "@assets/haritaicon_1756933438334.jpg";
import worldIcon from "@assets/dunyaicon_1756933438333.jpg";
import interestingIcon from "@assets/enteresan_1756933510623.jpeg";
import vurmaliIcon from "@assets/vurmaliicon_1756919053806.jpg";
import telliIcon from "@assets/telliicon_1756919053805.jpg";
import yayliIcon from "@assets/yayliicon_1756919053805.jpg";
import uflemeliIcon from "@assets/uflemeicon_1756919599386.webp";
import tusluIcon from "@assets/tusluicon_1756919948724.jpg";

const CATEGORY_ICONS = {
  vurmalı: vurmaliIcon,
  telli: telliIcon,
  yaylı: yayliIcon,
  üflemeli: uflemeliIcon,
  tuşlu: tusluIcon,
  videolar: yayliIcon, // Videolar için yayliIcon kullanıyoruz geçici olarak
};

const TURKISH_CATEGORIES = [
  { id: "vurmalı", label: "Vurmalı", icon: CATEGORY_ICONS.vurmalı },
  { id: "telli", label: "Telli", icon: CATEGORY_ICONS.telli },
  { id: "yaylı", label: "Yaylı", icon: CATEGORY_ICONS.yaylı },
  { id: "üflemeli", label: "Üflemeli", icon: CATEGORY_ICONS.üflemeli },
  { id: "tuşlu", label: "Tuşlu", icon: CATEGORY_ICONS.tuşlu },
] as const;

const FOREIGN_CATEGORIES = [
  { id: "vurmalı", label: "Vurmalı", icon: CATEGORY_ICONS.vurmalı },
  { id: "telli", label: "Telli", icon: CATEGORY_ICONS.telli },
  { id: "yaylı", label: "Yaylı", icon: CATEGORY_ICONS.yaylı },
  { id: "üflemeli", label: "Üflemeli", icon: CATEGORY_ICONS.üflemeli },
  { id: "tuşlu", label: "Tuşlu", icon: CATEGORY_ICONS.tuşlu },
] as const;

const INTERESTING_CATEGORIES = [
  { id: "vurmalı", label: "Vurmalı", icon: CATEGORY_ICONS.vurmalı },
  { id: "telli", label: "Telli", icon: CATEGORY_ICONS.telli },
  { id: "üflemeli", label: "Üflemeli", icon: CATEGORY_ICONS.üflemeli },
  { id: "tuşlu", label: "Tuşlu", icon: CATEGORY_ICONS.tuşlu },
  { id: "videolar", label: "Videolar", icon: CATEGORY_ICONS.videolar },
] as const;

export default function Home() {
  const [selectedOrigin, setSelectedOrigin] = useState<InstrumentOrigin | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<InstrumentCategory | null>(null);
  
  const { currentAudio, isPlaying, currentInstrument, playAudio, stopAudio } = useAudio();
  const { currentVideoInstrument, isVideoPlayerOpen, openVideoPlayer, closeVideoPlayer, changeVideo } = useVideo();

  // Fetch instruments based on current filters
  const { data: instruments = [], isLoading } = useQuery<Instrument[]>({
    queryKey: ["/api/instruments", { origin: selectedOrigin, category: selectedCategory }],
    queryFn: async () => {
      if (!selectedOrigin || !selectedCategory) return [];
      const params = new URLSearchParams();
      params.set('origin', selectedOrigin);
      params.set('category', selectedCategory);
      const response = await fetch(`/api/instruments?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch instruments');
      }
      return response.json();
    },
    enabled: !!selectedOrigin && !!selectedCategory,
  });

  const handleOriginSelect = (origin: InstrumentOrigin) => {
    setSelectedOrigin(origin);
    setSelectedCategory(null);
    stopAudio();
  };

  const handleCategorySelect = (category: InstrumentCategory) => {
    setSelectedCategory(category);
    stopAudio();
  };

  const handleBackToOrigin = () => {
    setSelectedCategory(null);
    stopAudio();
  };

  const handleBackToMain = () => {
    setSelectedOrigin(null);
    setSelectedCategory(null);
    stopAudio();
  };

  return (
    <div className="bg-background text-foreground font-sans h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-center items-center">
            <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-red-500 bg-clip-text animate-pulse">
              ENSTRÜMANLARI TANIYORUM
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 flex-1 overflow-hidden">
        {!selectedOrigin ? (
          // Main screen with three origin buttons
          <div className="flex flex-col items-center justify-center h-96">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              <button
                onClick={() => handleOriginSelect("turkish")}
                className="relative overflow-hidden rounded-xl text-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg min-w-56 h-44 group"
                data-testid="button-origin-turkish"
              >
                <img src={turkeyMapIcon} alt="Türkiye" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-white font-bold text-xl bg-red-600 bg-opacity-90 px-3 py-2 rounded-lg shadow-lg border-2 border-white">Türk Çalgıları</span>
                </div>
              </button>
              <button
                onClick={() => handleOriginSelect("foreign")}
                className="relative overflow-hidden rounded-xl text-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg min-w-56 h-44 group"
                data-testid="button-origin-foreign"
              >
                <img src={worldIcon} alt="Dünya" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-white font-bold text-xl bg-blue-600 bg-opacity-90 px-3 py-2 rounded-lg shadow-lg border-2 border-white">Yabancı Çalgılar</span>
                </div>
              </button>
              <button
                onClick={() => handleOriginSelect("interesting")}
                className="relative overflow-hidden rounded-xl text-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg min-w-56 h-44 group"
                data-testid="button-origin-interesting"
              >
                <img src={interestingIcon} alt="Enteresan" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-white font-bold text-xl bg-purple-600 bg-opacity-90 px-3 py-2 rounded-lg shadow-lg border-2 border-white">Enteresan Çalgılar</span>
                </div>
              </button>
            </div>
          </div>
        ) : !selectedCategory ? (
          // Category selection screen
          <div className="space-y-8">
            <div className="flex justify-center">
              <button
                onClick={handleBackToMain}
                className="bg-muted text-muted-foreground px-6 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all"
                data-testid="button-back-main"
              >
                ← Ana Sayfa
              </button>
            </div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground">
                {selectedOrigin === "turkish" ? (
                  <div className="flex items-center justify-center space-x-2">
                    <img src={turkeyMapIcon} alt="Türkiye" className="w-8 h-6 object-contain" />
                    <span>Türk Çalgıları</span>
                  </div>
                ) : selectedOrigin === "foreign" ? (
                  "🌍 Yabancı Çalgılar"
                ) : (
                  "✨ Enteresan Çalgılar"
                )}
              </h2>
              <p className="text-muted-foreground mt-2">
                {selectedOrigin === "interesting" ? "Dünyanın en ilginç ve sıra dışı çalgıları" : "Bir kategori seçin"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {(selectedOrigin === "turkish" ? TURKISH_CATEGORIES : 
                selectedOrigin === "foreign" ? FOREIGN_CATEGORIES : 
                INTERESTING_CATEGORIES).map((category) => {
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id as InstrumentCategory)}
                    className="relative overflow-hidden rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-40 group"
                    data-testid={`button-category-${category.id}`}
                  >
                    <img 
                      src={category.icon} 
                      alt={category.label} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70"></div>
                    <div className="absolute bottom-3 left-0 right-0 text-center">
                      <span className="text-white font-bold text-xl bg-red-600 bg-opacity-90 px-3 py-2 rounded-lg shadow-lg border-2 border-white">{category.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          // Instruments display screen
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBackToOrigin}
                className="bg-muted text-muted-foreground px-6 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all"
                data-testid="button-back-category"
              >
                ← Kategoriler
              </button>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground flex items-center justify-center space-x-2">
                  {selectedOrigin === "turkish" ? (
                    <img src={turkeyMapIcon} alt="Türkiye" className="w-6 h-4 object-contain" />
                  ) : selectedOrigin === "foreign" ? (
                    <span>🌍</span>
                  ) : (
                    <span>✨</span>
                  )}
                  <span>{INSTRUMENT_CATEGORIES[selectedCategory]}</span>
                </h2>
              </div>
              <div></div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : instruments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Music className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-lg font-semibold text-muted-foreground">Bu kategoride çalgı bulunamadı</p>
              </div>
            ) : selectedOrigin === "interesting" && selectedCategory === "videolar" ? (
              // Videolar kategorisi için tek media oynatıcı
              <InlineVideoPlayer className="w-full" />
            ) : (
              // Diğer kategoriler için horizontal scroll layout
              <div className="overflow-x-auto overflow-y-hidden pb-4">
                <div className="flex space-x-4 min-w-max px-4" data-testid="instrument-horizontal-list">
                  {instruments.map((instrument) => (
                    <div key={instrument.id} className={`flex-shrink-0 ${
                      (selectedOrigin === "turkish" && selectedCategory === "vurmalı") ||
                      (selectedOrigin === "foreign" && selectedCategory === "telli")
                        ? "w-56" // Smaller width to fit more in view
                        : "w-64"
                    }`}>
                      <InstrumentCard
                        instrument={instrument}
                        isPlaying={isPlaying && currentInstrument?.id === instrument.id}
                        onPlay={() => playAudio(instrument)}
                        onStop={stopAudio}
                        onPlayVideo={() => openVideoPlayer(instrument)}
                        origin={selectedOrigin}
                        category={selectedCategory}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Currently Playing Indicator */}
        {isPlaying && currentInstrument && (
          <div 
            className="fixed bottom-6 right-6 bg-card border border-border rounded-lg shadow-lg p-4 animate-pulse"
            data-testid="now-playing"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-full">
                <Music className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium">{currentInstrument.name}</p>
                <p className="text-sm text-muted-foreground">{INSTRUMENT_CATEGORIES[currentInstrument.category]}</p>
              </div>
              <button 
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={stopAudio}
                data-testid="button-stop-audio"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Video Player Modal */}
      {currentVideoInstrument && (
        <VideoPlayer
          instrument={currentVideoInstrument}
          isOpen={isVideoPlayerOpen}
          onClose={closeVideoPlayer}
          onVideoSelect={changeVideo}
        />
      )}

      {/* Footer */}
    </div>
  );
}
