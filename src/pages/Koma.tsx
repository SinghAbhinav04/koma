import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mangaApi, Comic } from '@/services/mangaApi';
import Sidebar from '@/components/Layout/Sidebar';
import MangaGrid from '@/components/Chat/MangaGrid';
import PromptInput from '@/components/Chat/PromptInput';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/UI/button';

const Koma: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('explore');
  const [comics, setComics] = useState<Comic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Load comics when section changes
  useEffect(() => {
    if (isAuthenticated) {
      loadComics();
    }
  }, [currentSection, isAuthenticated]);

  const loadComics = async () => {
    try {
      setIsLoading(true);
      let result: Comic[] = [];
      
      switch (currentSection) {
        case 'explore':
          result = await mangaApi.getExploreComics();
          break;
        case 'top':
          result = await mangaApi.getTopComics();
          break;
        case 'liked':
          result = await mangaApi.getLikedComics();
          break;
        case 'library':
          result = await mangaApi.getMyLibrary();
          break;
        default:
          result = await mangaApi.getExploreComics();
      }
      
      setComics(result);
    } catch (error) {
      console.error('Failed to load comics:', error);
      toast({
        title: "Error",
        description: "Failed to load manga. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateComic = async (prompt: string) => {
    try {
      setIsGenerating(true);
      const result = await mangaApi.generateComic(prompt);
      
      toast({
        title: "Success!",
        description: "Your manga has been generated successfully.",
      });
      
      // Refresh the current section to show the new comic
      if (currentSection === 'library' || currentSection === 'explore') {
        loadComics();
      } else {
        // Switch to library to show the new creation
        setCurrentSection('library');
      }
    } catch (error) {
      console.error('Failed to generate comic:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate manga. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLikeComic = async (comicId: string) => {
    try {
      await mangaApi.likeComic(comicId);
      
      // Update the comics state to reflect the like change
      setComics(prevComics =>
        prevComics.map(comic =>
          comic._id === comicId
            ? {
                ...comic,
                is_liked: !comic.is_liked,
                likes: comic.is_liked ? comic.likes - 1 : comic.likes + 1
              }
            : comic
        )
      );
      
      const comic = comics.find(c => c._id === comicId);
      toast({
        title: comic?.is_liked ? "Unliked" : "Liked",
        description: "Manga like status updated.",
      });
    } catch (error) {
      console.error('Failed to like comic:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getSectionTitle = () => {
    switch (currentSection) {
      case 'explore':
        return 'Explore Manga';
      case 'top':
        return 'Top Manga';
      case 'liked':
        return 'Liked Manga';
      case 'library':
        return 'My Library';
      default:
        return 'Koma';
    }
  };

  const getSectionDescription = () => {
    switch (currentSection) {
      case 'explore':
        return 'Discover amazing manga created by the community';
      case 'top':
        return 'The most popular manga on Koma';
      case 'liked':
        return 'Manga you\'ve liked and saved';
      case 'library':
        return 'Your personal manga creations';
      default:
        return 'AI-powered manga generation';
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="h-screen bg-background flex">
      {/* Mobile Menu Button */}
      <div className={`md:hidden fixed top-4 z-50 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'left-[268px]' : 'left-4'
      }`}>
        <Button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur-sm"
        >
          {isSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:relative md:z-auto`}>
        <Sidebar 
          currentSection={currentSection} 
          onSectionChange={(section) => {
            setCurrentSection(section);
            setIsSidebarOpen(false); // Close sidebar on mobile after selection
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Content Area */}
        <div className="flex-1 p-4 md:p-6 pt-16 md:pt-6 overflow-y-auto">
          {/* Section Header */}
          <div className="mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {getSectionTitle()}
            </h1>
            <p className="text-muted-foreground">
              {getSectionDescription()}
            </p>
          </div>
          
          <MangaGrid
            comics={comics}
            onLike={handleLikeComic}
            isLoading={isLoading}
          />
        </div>

        {/* Prompt Input */}
        <PromptInput
          onSubmit={handleGenerateComic}
          isLoading={isGenerating}
          placeholder="Describe the manga you want to create..."
        />
      </div>
    </div>
  );
};

export default Koma;