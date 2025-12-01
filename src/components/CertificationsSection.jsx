import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Upload, Edit2, Save, X, Plus, Trash2, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { usePortfolio } from '@/context/PortfolioContext';
import { toast } from 'sonner';

const CertificationsSection = () => {
  const { portfolioData, updatePortfolioData, isEditMode } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [editCerts, setEditCerts] = useState(portfolioData.certifications);

  // Sync local state with global state when it changes
  React.useEffect(() => {
    setEditCerts(portfolioData.certifications);
  }, [portfolioData.certifications]);

  const handleSave = () => {
    updatePortfolioData({ certifications: editCerts });
    setIsEditing(false);
    toast.success('Certifications updated successfully!');
  };

  const handleCancel = () => {
    setEditCerts(portfolioData.certifications);
    setIsEditing(false);
  };

  const updateCert = (id, field, value) => {
    setEditCerts(prev =>
      prev.map(c => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleBadgeUpload = async (id, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        updateCert(id, 'badge', data.url);
        toast.success('Badge uploaded successfully!');
      } catch (error) {
        console.error('Error uploading badge:', error);
        toast.error('Failed to upload badge');
      }
    }
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: 'New Certification',
      issuer: '',
      link: '',
      credentialId: '',
      badge: ''
    };
    setEditCerts(prev => [...prev, newCert]);
  };

  const removeCert = (id) => {
    setEditCerts(prev => prev.filter(c => c.id !== id));
  };

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const CertCard = ({ cert, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="section-card h-full group relative"
    >
      {isEditing && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeCert(cert.id)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive z-10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}

      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-chart-1/20 flex items-center justify-center flex-shrink-0">
          <Award className="h-6 w-6 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <Input
              value={cert.name}
              onChange={e => updateCert(cert.id, 'name', e.target.value)}
              className="font-semibold mb-1"
            />
          ) : (
            <h3 className="font-semibold text-lg truncate">{cert.name}</h3>
          )}

          {isEditing ? (
            <Input
              value={cert.issuer}
              onChange={e => updateCert(cert.id, 'issuer', e.target.value)}
              placeholder="Issuer/Organization"
              className="text-sm"
            />
          ) : (
            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="space-y-2 mb-4">
          <Input
            value={cert.link}
            onChange={e => updateCert(cert.id, 'link', e.target.value)}
            placeholder="Certificate URL"
          />
          <Input
            value={cert.credentialId}
            onChange={e => updateCert(cert.id, 'credentialId', e.target.value)}
            placeholder="Credential ID"
          />
        </div>
      )}

      {!isEditing && cert.credentialId && (
        <p className="text-xs text-muted-foreground mb-3">
          Credential ID: {cert.credentialId}
        </p>
      )}

      {cert.badge && (
        <div className="mb-4 flex justify-center">
          <img
            src={cert.badge}
            alt={`${cert.name} badge`}
            className="h-20 w-auto object-contain rounded-lg shadow-md hover:scale-110 transition-transform"
          />
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        {isEditing ? (
          <label className="flex-1">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <span>
                <Image className="h-4 w-4 mr-1" />
                {cert.badge ? 'Change Badge' : 'Upload Badge'}
              </span>
            </Button>
            <input
              type="file"
              accept="image/*"
              onChange={e => handleBadgeUpload(cert.id, e)}
              className="hidden"
            />
          </label>
        ) : cert.link ? (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4" /> View Certificate
          </a>
        ) : null}
      </div>
    </motion.div>
  );

  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and credentials that validate my expertise.
          </p>

          {isEditMode && !isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mt-4"
            >
              <Edit2 className="h-4 w-4 mr-1" /> Edit Certifications
            </Button>
          )}
        </motion.div>

        {isEditing && (
          <div className="flex justify-center gap-2 mb-8">
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-1" /> Save Changes
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button onClick={addCertification} variant="secondary" size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add Certification
            </Button>
          </div>
        )}

        {isEditing ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editCerts.map((cert, index) => (
              <CertCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
        ) : (
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[autoplayPlugin.current]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {portfolioData.certifications.map((cert, index) => (
                <CarouselItem
                  key={cert.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <CertCard cert={cert} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
