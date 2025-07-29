import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Download, Share, X } from 'lucide-react';
import { Button } from '@/components/UI/button';
import { Comic } from '@/services/mangaApi';

interface MangaGridProps {
  comics: Comic[];
  onLike?: (comicId: string) => void;
  isLoading?: boolean;
}

const MangaGrid: React.FC<MangaGridProps> = ({ comics, onLike, isLoading }) => {
  const [selectedComic, setSelectedComic] = useState<Comic | null>(null);
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded aspect-square mb-2"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (comics.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">No manga found</div>
        <div className="text-muted-foreground text-sm">
          Start creating your first manga by typing a prompt below!
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-2 md:gap-3 space-y-2 md:space-y-3">
        {comics.map((comic, index) => (
          <motion.div
            key={comic._id}
            className="group bg-card rounded border border-border overflow-hidden hover:shadow-lg transition-all duration-300 break-inside-avoid mb-3 inline-block w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            {/* Manga Image */}
            <div className="relative overflow-hidden bg-muted cursor-pointer" onClick={() => setSelectedComic(comic)}>
              <img
                src={comic.image_url}
                alt={comic.prompt}
                className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              
              {/* Heart Overlay */}
              {onLike && (
                <div className="absolute top-2 right-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLike(comic._id);
                    }}
                    className="flex items-center space-x-1 hover:text-red-500 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Heart 
                      className={`w-4 h-4 ${comic.is_liked ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                    <span className="text-xs">{comic.likes || 0}</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-2">
              <p className="text-xs text-foreground line-clamp-2">
                {comic.prompt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedComic && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto backdrop-blur-sm bg-black/20"
          onClick={() => setSelectedComic(null)}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={selectedComic.image_url}
              alt={selectedComic.prompt}
              className="w-full h-auto object-contain rounded-lg shadow-2xl"
              style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            />
            
            {/* Close Button */}
            <Button
              onClick={() => setSelectedComic(null)}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background/90"
              size="sm"
              variant="ghost"
            >
              <X className="w-4 h-4" />
            </Button>
            
            {/* Heart Overlay on Modal */}
            {onLike && (
              <div className="absolute top-4 left-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike(selectedComic._id);
                  }}
                  className="flex items-center space-x-1 hover:text-red-500 bg-background/80 backdrop-blur-sm rounded-full p-2"
                >
                  <Heart 
                    className={`w-4 h-4 ${selectedComic.is_liked ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                  <span className="text-xs">{selectedComic.likes || 0}</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MangaGrid;