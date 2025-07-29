import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/UI/button';
import { Textarea } from '@/components/UI/textarea';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  onSubmit, 
  isLoading = false,
  placeholder = "Describe the manga you want to create..."
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 md:left-64 right-0 p-2 md:p-3"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 md:space-x-3 bg-background/90 backdrop-blur-md border border-border rounded-lg shadow-lg">
          <div className="flex-1 px-2 md:px-3 py-2">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="min-h-[32px] md:min-h-[40px] max-h-[32px] md:max-h-[40px] bg-transparent border-0 text-foreground resize-none text-sm focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 w-full"
              disabled={isLoading}
            />
          </div>
          
          <div className="px-1 md:px-2 py-2">
            <Button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-[32px] md:h-[40px] px-3 md:px-4 rounded-md"
              size="sm"
            >
              {isLoading ? (
                <Loader2 className="w-3 md:w-4 h-3 md:h-4 animate-spin" />
              ) : (
                <Send className="w-3 md:w-4 h-3 md:h-4" />
              )}
            </Button>
          </div>
        </form>
        
        <div className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </motion.div>
  );
};

export default PromptInput;