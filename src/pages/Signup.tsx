import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import SignupForm from '@/components/Auth/SignupForm';

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Start Your Journey with
              <span className="block bg-heading-gradient bg-clip-text text-transparent mt-2">
                Koma
              </span>
            </motion.h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-md lg:max-w-none">
              Join thousands of creators who are already using Koma to bring their stories to life. 
              Create professional manga panels in seconds with our advanced AI technology.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-accent rounded-full"></div>
                <span>Free to Start</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-accent rounded-full"></div>
                <span>Professional Quality</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-accent rounded-full"></div>
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-accent rounded-full"></div>
                <span>Lightning Fast</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Signup Form */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SignupForm />
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Signup;