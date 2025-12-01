import React from 'react';
import { Users, Mail, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePortfolio } from '@/context/PortfolioContext';

const VisitorsModal = ({ isOpen, onClose }) => {
  const { visitors } = usePortfolio();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-strong sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Portfolio Viewed By
          </DialogTitle>
          <DialogDescription>
            List of visitors who have shared their email addresses.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {visitors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No visitors yet</p>
              <p className="text-sm">Visitor emails will appear here</p>
            </div>
          ) : (
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-3">
                {visitors.map((visitor, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-accent/50 hover:bg-accent transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{visitor.email}</p>

                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(visitor.dateVisited)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            Total visitors:{' '}
            <span className="font-semibold text-foreground">{visitors.length}</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisitorsModal;
