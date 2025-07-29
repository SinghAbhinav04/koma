import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { Checkbox } from '@/components/UI/checkbox';
import { Alert, AlertDescription } from '@/components/UI/alert';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      await login({
        identifier: formData.identifier,
        password: formData.password
      });
      navigate('/koma');
    } catch (error) {
      // Error is handled by context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Koma account</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <Alert className="bg-destructive/10 border-destructive/20">
              <AlertDescription className="text-destructive">
                {error}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="identifier" className="text-foreground">
              Email or Username
            </Label>
            <Input
              id="identifier"
              name="identifier"
              type="text"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Enter your email or username"
              className="bg-input text-foreground"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="bg-input text-foreground pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                }
              />
              <Label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                Remember me
              </Label>
            </div>
            
            <Link 
              to="#" 
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginForm;