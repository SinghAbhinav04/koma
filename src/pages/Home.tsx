import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Palette, Zap, Shield, Clock } from 'lucide-react';
import Header from '@/components/Layout/Header';
import MacWindow from '@/components/Layout/MacWindow';
import FeatureCard from '@/components/UI/FeatureCard';
import { Button } from '@/components/UI/button';
import { useAuth } from '@/contexts/AuthContext';
import logo from '/white_logo.png';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      title: 'Manga Art',
      description: 'Experience natural, beautiful manga panel generations with professional quality artwork.',
      icon: Palette,
      gradient: 'bg-gradient-blue',
    },
    {
      title: 'Lightning Fast',
      description: 'Get instant responses with our optimized AI processing system built for speed and efficiency.',
      icon: Zap,
      gradient: 'bg-gradient-orange',
    },
    {
      title: 'Secure & Private',
      description: 'Your conversations are protected with enterprise-grade security and end-to-end encryption.',
      icon: Shield,
      gradient: 'bg-gradient-green',
    },
    {
      title: 'Available 24/7',
      description: 'Access Koma anytime, anywhere, from any device with seamless synchronization.',
      icon: Clock,
      gradient: 'bg-gradient-purple',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            {/* Logo */}
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.img
                src={logo}
                alt="Koma Logo"
                className="h-20 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </motion.div>
                        
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transform your stories into stunning manga panels with our advanced AI technology. 
              Create professional-quality artwork in seconds.
            </motion.p>
          </div>

          {/* Demo Window */}
          <div className="mb-12">
            <MacWindow />
          </div>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link to={isAuthenticated ? "/koma" : "/signup"}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300  relative overflow-hidden group"
                >
                  <motion.span
                    className="relative z-10"
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isAuthenticated ? 'Start Creating' : 'Get Started Free'}
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    initial={false}
                  />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Koma?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to create amazing manga content with AI assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={1.2 + index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 mt-16">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="text-muted-foreground text-sm">
              © 2025 Koma. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/gemini-guide" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                Gemini Guide
              </Link>

            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;