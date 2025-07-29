import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Check, X, HelpCircle } from 'lucide-react';
import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { Checkbox } from '@/components/UI/checkbox';
import { Alert, AlertDescription } from '@/components/UI/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/UI/tooltip';
import { useAuth } from '@/contexts/AuthContext';

interface PasswordRequirement {
  text: string;
  test: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { text: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
  { text: 'Uppercase letter (A-Z)', test: (pwd) => /[A-Z]/.test(pwd) },
  { text: 'Lowercase letter (a-z)', test: (pwd) => /[a-z]/.test(pwd) },
  { text: 'Number (0-9)', test: (pwd) => /\d/.test(pwd) },
  { text: 'Special character (!@#$%^&*)', test: (pwd) => /[!@#$%^&*]/.test(pwd) },
];

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: '',
    api: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup, error, clearError } = useAuth();
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

  const passwordsMatch = formData.password && formData.confirmPassword && 
    formData.password === formData.confirmPassword;
  
  const passwordsDontMatch = formData.confirmPassword && 
    formData.password !== formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordsMatch) {
      return;
    }
    
    if (!formData.agreeToTerms) {
      return;
    }
    
    try {
      setIsLoading(true);
      await signup({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        dob: formData.dob,
        password: formData.password,
        api: formData.api,
      });
      navigate('/koma');
    } catch (error) {
      // Error is handled by context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <motion.div
        className="w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-card rounded-xl border border-border p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join Koma and start creating amazing manga</p>
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
            {/* Row 1: Name and Username */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="bg-input text-foreground"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="bg-input text-foreground"
                  required
                />
              </div>
            </div>

            {/* Row 2: Email and Date of Birth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="bg-input text-foreground"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-foreground">
                  Date of Birth
                </Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  className="bg-input text-foreground"
                  required
                />
              </div>
            </div>

            {/* Row 3: Password and Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="Create a password"
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
                
                {/* Password Requirements */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    {passwordRequirements.map((req, index) => {
                      const isValid = req.test(formData.password);
                      return (
                        <div key={index} className="flex items-center space-x-2">
                          {isValid ? (
                            <Check className="w-3 h-3 text-green-accent" />
                          ) : (
                            <X className="w-3 h-3 text-destructive" />
                          )}
                          <span className={`text-xs ${isValid ? 'text-green-accent' : 'text-muted-foreground'}`}>
                            {req.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="bg-input text-foreground pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="flex items-center space-x-2 mt-2">
                    {passwordsMatch ? (
                      <>
                        <Check className="w-3 h-3 text-green-accent" />
                        <span className="text-xs text-green-accent">Passwords match</span>
                      </>
                    ) : passwordsDontMatch ? (
                      <>
                        <X className="w-3 h-3 text-destructive" />
                        <span className="text-xs text-destructive">Passwords don't match</span>
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            </div>

            {/* Row 4: API Key */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="api" className="text-foreground">
                  Gemini API Key
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Required for manga generation. Your API key is stored securely and never shared.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="api"
                name="api"
                type="text"
                value={formData.api}
                onChange={handleChange}
                placeholder="Enter your Gemini API key"
                className="bg-input text-foreground"
                required
              />
              <p className="text-xs text-muted-foreground">
                Don't have an API key?{' '}
                <Link to="/gemini-guide" className="text-primary hover:text-primary/80">
                  Learn how to get one for free
                </Link>
              </p>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                }
                className="mt-0.5"
              />
              <Label htmlFor="agreeToTerms" className="text-sm text-muted-foreground leading-relaxed">
                I agree to the{' '}
                <Link to="/privacy-policy" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !passwordsMatch || !formData.agreeToTerms}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

export default SignupForm;