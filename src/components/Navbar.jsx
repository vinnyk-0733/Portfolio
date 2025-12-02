import React, { useState } from 'react';
import { Settings, Eye, Edit, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { usePortfolio } from '@/context/PortfolioContext';
import PasswordModal from './PasswordModal';
import ChangePasswordModal from './ChangePasswordModal';
import VisitorsModal from './VisitorsModal';
import { ModeToggle } from './mode-toggle';

const Navbar = () => {
  const { isEditMode, setIsEditMode } = usePortfolio();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isVisitorsModalOpen, setIsVisitorsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
  ];

  const handleEditClick = () => {
    if (isEditMode) {
      setIsEditMode(false);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <a href="#" className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity">
              VK
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">

              {/* Edit Mode Badge */}
              {isEditMode && (
                <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30 animate-pulse-soft">
                  Edit Mode
                </span>
              )}

              {/* Mode Toggle */}
              <ModeToggle />

              {/* Settings Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 glass-strong bg-card/95 backdrop-blur-xl border-border/50">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={() => setIsVisitorsModalOpen(true)}
                    className="cursor-pointer focus:bg-primary/10"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Portfolio Viewed By
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleEditClick}
                    className="cursor-pointer focus:bg-primary/10"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {isEditMode ? 'Exit Edit Mode' : 'Portfolio Edit'}
                  </DropdownMenuItem>

                  {isEditMode && (
                    <DropdownMenuItem
                      onClick={() => setIsChangePasswordModalOpen(true)}
                      className="cursor-pointer focus:bg-primary/10"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Change Password
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Hamburger */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-primary/10 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Nav Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 animate-slide-up shadow-2xl z-40">
              <div className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Password Modal for Edit Mode */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />

      <VisitorsModal
        isOpen={isVisitorsModalOpen}
        onClose={() => setIsVisitorsModalOpen(false)}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
