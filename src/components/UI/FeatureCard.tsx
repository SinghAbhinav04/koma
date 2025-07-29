import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  gradient,
  delay = 0 
}) => {
  return (
    <motion.div
      className="group relative p-6 rounded-xl bg-card border border-border overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Gradient Background on Hover */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ${gradient}`}
        initial={false}
        whileHover={{ 
          background: [
            gradient,
            gradient.replace('0.1', '0.15').replace('0.3', '0.4'),
            gradient
          ]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="p-2 rounded-lg bg-secondary group-hover:bg-background/20 transition-colors duration-300"
            whileHover={{ 
              scale: 1.2, 
              rotate: [0, -10, 10, 0],
              transition: { 
                scale: { type: "spring", stiffness: 400, damping: 10 },
                rotate: { duration: 0.5, ease: "easeInOut" }
              }
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ 
                rotateY: [0, 360],
                transition: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
            >
              <Icon className="w-6 h-6 text-foreground" />
            </motion.div>
          </motion.div>
          <motion.h3 
            className="text-lg font-semibold text-foreground"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {title}
          </motion.h3>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
          {description}
        </p>
      </div>
      
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(45deg, 
            hsl(var(--primary) / 0.3) 0%, 
            hsl(var(--secondary) / 0.3) 50%, 
            hsl(var(--accent) / 0.3) 100%)`
        }}
        initial={false}
        animate={{
          background: [
            `linear-gradient(45deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--secondary) / 0.3) 50%, hsl(var(--accent) / 0.3) 100%)`,
            `linear-gradient(45deg, hsl(var(--secondary) / 0.3) 0%, hsl(var(--accent) / 0.3) 50%, hsl(var(--primary) / 0.3) 100%)`,
            `linear-gradient(45deg, hsl(var(--accent) / 0.3) 0%, hsl(var(--primary) / 0.3) 50%, hsl(var(--secondary) / 0.3) 100%)`
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", type: "tween" }}
      />
      
      {/* Floating Particles Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
        initial={false}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FeatureCard;