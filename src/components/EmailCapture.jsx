import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePortfolio } from '@/context/PortfolioContext';
import { toast } from 'sonner';

const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addVisitor } = usePortfolio();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    addVisitor(email);
    setIsSubmitted(true);
    setEmail('');
    toast.success('Thank you for connecting!');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);

    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass rounded-2xl p-6 max-w-md mx-auto"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">Stay Connected</h3>
          <p className="text-sm text-muted-foreground">Get notified about my latest work</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitted || isLoading}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={isSubmitted || isLoading || !email.trim()}
          className="px-4"
        >
          {isSubmitted ? (
            <Check className="h-4 w-4" />
          ) : isLoading ? (
            <span className="animate-pulse">...</span>
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>

      {isSubmitted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-primary mt-3 text-center"
        >
          ✓ Thank you for subscribing!
        </motion.p>
      )}
    </motion.div>
  );
};

export default EmailCapture;
