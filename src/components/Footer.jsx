import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import EmailCapture from './EmailCapture';
import { usePortfolio } from '@/context/PortfolioContext';

const Footer = () => {
  const { portfolioData } = usePortfolio();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Mail,
      href: `mailto:${portfolioData.studentDetails.email}`,
      label: 'Email'
    },
    {
      icon: Github,
      href: portfolioData.studentDetails.github || 'https://github.com/vinnyk-0733?tab=repositories',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/vinaya-kumar-49472031b',
      label: 'LinkedIn'
    }
  ];

  return (
    <footer className="py-12 md:py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-8 md:mb-12">

          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Let's <span className="text-gradient">Connect</span>
            </h2>

            <p className="text-muted-foreground mb-6 text-sm md:text-base">
              I'm always open to discussing new opportunities, collaborations,
              or just having a chat about data science and technology.
            </p>

            <div className="flex gap-4 justify-center md:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-subtle flex items-center justify-center hover:bg-primary/20 hover:scale-110 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Email Capture */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <EmailCapture />
          </motion.div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-xs md:text-sm text-muted-foreground">
              © {currentYear} {portfolioData.studentDetails.name}. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
