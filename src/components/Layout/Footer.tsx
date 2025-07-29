import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border py-6 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">
            © 2025 Koma. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link 
              to="/privacy-policy" 
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/gemini-guide" 
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Gemini Guide
            </Link>
            <Link 
              to="#" 
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;