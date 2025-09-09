import { Drum, Guitar, Music, Wind, Piano } from "lucide-react";
import type { InstrumentCategory } from "@shared/schema";

const CATEGORY_ICONS = {
  vurmalı: Drum,
  telli: Guitar,
  yaylı: Music,
  üflemeli: Wind,
  tuşlu: Piano,
};

const CATEGORIES = [
  { id: "vurmalı", label: "Vurmalı", icon: CATEGORY_ICONS.vurmalı },
  { id: "telli", label: "Telli", icon: CATEGORY_ICONS.telli },
  { id: "yaylı", label: "Yaylı", icon: CATEGORY_ICONS.yaylı },
  { id: "üflemeli", label: "Üflemeli", icon: CATEGORY_ICONS.üflemeli },
  { id: "tuşlu", label: "Tuşlu", icon: CATEGORY_ICONS.tuşlu },
] as const;

interface CategoryFilterProps {
  selectedCategory: InstrumentCategory;
  onCategoryChange: (category: InstrumentCategory) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-4">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id as InstrumentCategory)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 min-w-32 flex items-center justify-center space-x-2 ${
                selectedCategory === category.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              data-testid={`button-category-${category.id}`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
