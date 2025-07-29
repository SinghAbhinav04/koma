import React from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import sampleManga1 from '/sample-manga-1.jpg';
import sampleManga2 from '/sample-manga-2.jpg';
import sampleManga3 from '/sample-manga-3.jpg';

const MacWindow: React.FC = () => {
  const isMobile = useIsMobile();
  
  const sampleMessages = [
    { type: 'user', text: 'Generate a manga about a ninja' },
    { type: 'bot', text: 'Here\'s your ninja manga!' },
    { type: 'user', text: 'Create a magical girl story' },
    { type: 'bot', text: 'Creating magical girl manga...' },
  ];

  const sampleImages = [sampleManga1, sampleManga2, sampleManga3];

  return (
    <motion.div 
      className={`relative w-full bg-card rounded-2xl shadow-mac overflow-hidden ${
        isMobile ? 'max-w-sm mx-auto' : 'max-w-4xl mx-auto'
      }`}
      initial={{  opacity: 0, y: 50 }}
      animate={{  opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={!isMobile ? { 
        scale: 1.01,
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      } : {}}
    >
      {/* Mac Title Bar */}
      <motion.div 
        className="flex items-center justify-between px-4 py-3 bg-secondary border-b border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* Traffic Lights */}
        <div className="flex items-center space-x-2">
          <motion.div 
            className="w-3 h-3 rounded-full bg-mac-red cursor-pointer"
            whileHover={{ scale: 1, boxShadow: "0 0 10px hsl(var(--mac-red))" }}
            whileTap={{ scale: 1 }}
            animate={{ 
              boxShadow: ["0 0 0px hsl(var(--mac-red))", "0 0 8px hsl(var(--mac-red))", "0 0 0px hsl(var(--mac-red))"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-mac-yellow cursor-pointer"
            whileHover={{ scale: 1, boxShadow: "0 0 10px hsl(var(--mac-yellow))" }}
            whileTap={{ scale: 1 }}
            animate={{ 
              boxShadow: ["0 0 0px hsl(var(--mac-yellow))", "0 0 8px hsl(var(--mac-yellow))", "0 0 0px hsl(var(--mac-yellow))"]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          <motion.div 
            className="w-3 h-3 rounded-full bg-mac-green cursor-pointer"
            whileHover={{  boxShadow: "0 0 10px hsl(var(--mac-green))" }}
            whileTap={{ }}
            animate={{ 
              boxShadow: ["0 0 0px hsl(var(--mac-green))", "0 0 8px hsl(var(--mac-green))", "0 0 0px hsl(var(--mac-green))"]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 2 }}
          />
        </div>
        
        {/* Title */}
        <motion.div 
          className="text-sm font-medium text-black"
          animate={{ 
            textShadow: ["0 0 0px hsl(var(--primary))", "0 0 10px hsl(var(--primary))", "0 0 0px hsl(var(--primary))"]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Koma Demo
        </motion.div>
        
        {/* Spacer */}
        <div className="w-16"></div>
      </motion.div>

      {/* Demo Content */}
      <div className={`${isMobile ? 'p-3 h-80' : 'p-6 h-96'} flex`}>
        {/* Sidebar - Hidden on mobile */}
        {!isMobile && (
          <div className="w-48 pr-4 border-r border-border">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Navigation
              </div>
              {['Explore', 'Top', 'Liked', 'Gallery'].map((item, index) => (
                <motion.div
                  key={item}
                  className="px-3 py-2 rounded-md bg-secondary/50 text-sm text-foreground cursor-pointer"
                  whileHover={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 ${!isMobile ? 'pl-4' : ''} flex flex-col`}>
          {/* Chat Messages */}
          <div className="flex-1 space-y-3 overflow-hidden">
            {sampleMessages.map((msg, index) => (
              <motion.div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.2 }}
              >
                <div
                  className={`px-3 py-2 rounded-lg ${isMobile ? 'text-xs max-w-[180px]' : 'text-xs max-w-xs'} ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Sample Images Grid */}
            <motion.div
              className={`grid ${isMobile ? 'grid-cols-2 gap-1' : 'grid-cols-3 gap-2'} mt-4`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0 }}
            >
              {sampleImages.map((img, index) => (
                <motion.div
                  key={index}
                  className="aspect-square rounded-md overflow-hidden bg-muted"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={img}
                    alt={`Sample manga ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Input Field */}
          <motion.div
            className="mt-4 p-2 bg-input rounded-md border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="text-xs text-muted-foreground">
              Type your manga prompt here...
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MacWindow;