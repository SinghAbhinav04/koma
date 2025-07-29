import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Compass, TrendingUp, Heart, Library, LogOut, Trash2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';
import logo from '/white_logo.png';

interface SidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSectionChange }) => {
  const { user, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'explore', label: 'Explore', icon: Compass, description: 'Browse all public manga' },
    { id: 'top', label: 'Top', icon: TrendingUp, description: 'Most liked manga' },
    { id: 'liked', label: 'Liked', icon: Heart, description: 'Your liked manga' },
    { id: 'library', label: 'My Library', icon: Library, description: 'Your created manga' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      navigate('/');
    } catch (error) {
      console.error('Delete account failed:', error);
    }
  };

  return (
    <motion.div
      className="w-64 bg-card border-r border-border h-screen flex flex-col overflow-hidden"
      initial={{ x: -264 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Koma Logo */}
      <div className="p-4 md:p-6 pt-16 md:pt-6 border-b border-border">
        <button
          onClick={() => navigate('/')}
          className="w-full flex justify-center hover:opacity-80 transition-opacity duration-200"
        >
          <img
            src={logo}
            alt="Koma Logo"
            className="h-12 w-auto"
          />
        </button>
      </div>

      {/* User Profile Section */}
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-foreground truncate">
                {user?.name || user?.username}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {user?.email}
              </div>
            </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {navigationItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => onSectionChange(item.id)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                  currentSection === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <div className="flex-1">
                    <div className="text-xs font-medium">{item.label}</div>
                    <div className={`text-xs ${
                      currentSection === item.id 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-foreground hover:bg-orange-100 hover:text-orange-700 dark:hover:bg-orange-900/20 dark:hover:text-orange-400 text-xs transition-colors"
        >
          <LogOut className="w-3 h-3 mr-2" />
          Logout
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/20 dark:hover:text-red-400 text-xs transition-colors"
            >
              <Trash2 className="w-3 h-3 mr-2" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete your account? This action cannot be undone.
                All your manga creations and data will be permanently removed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
};

export default Sidebar;