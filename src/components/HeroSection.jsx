import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { MapPin, Mail, Phone, Github, Award, FileText, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePortfolio } from '@/context/PortfolioContext';
import { toast } from 'sonner';

const HeroSection = () => {
  const { portfolioData, updatePortfolioData, isEditMode, getBadgeCount, getCertificationCount } = usePortfolio();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    ...portfolioData.studentDetails,
    typingTexts: portfolioData.typingTexts,
    summary: portfolioData.summary
  });

  const handleSave = () => {
    updatePortfolioData({
      studentDetails: {
        name: editData.name,
        location: editData.location,
        email: editData.email,
        phone: editData.phone,
        github: editData.github,
        profileImage: editData.profileImage
      },
      typingTexts: editData.typingTexts,
      summary: editData.summary
    });

    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditData({
      ...portfolioData.studentDetails,
      typingTexts: portfolioData.typingTexts,
      summary: portfolioData.summary
    });
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setEditData(prev => ({ ...prev, profileImage: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const typingSequence = portfolioData.typingTexts.flatMap(text => [text, 2000]);

  return (
    <section id="about" className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 gradient-hero opacity-50" />

      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-chart-2/10 rounded-full blur-3xl animate-pulse-soft"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Student Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-6 sticky top-24">

              {isEditMode && !isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="absolute top-4 right-4"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}

              {/* Profile Picture */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full rounded-full overflow-hidden bg-primary/20 
                    flex items-center justify-center border-4 border-primary/30 
                    hover:scale-105 transition-transform duration-300">
                  
                  {(isEditing ? editData.profileImage : portfolioData.studentDetails.profileImage) ? (
                    <img
                      src={isEditing ? editData.profileImage : portfolioData.studentDetails.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-primary">
                      {portfolioData.studentDetails.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>

                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/80 transition-colors">
                    <Edit2 className="h-4 w-4 text-primary-foreground" />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                )}
              </div>

              {/* Name + Typing Role */}
              <div className="text-center mb-6">
                {isEditing ? (
                  <Input
                    value={editData.name}
                    onChange={e => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="text-center text-xl font-bold mb-2"
                  />
                ) : (
                  <h1 className="text-2xl font-bold mb-2">
                    {portfolioData.studentDetails.name}
                  </h1>
                )}

                <div className="text-primary font-medium h-6">
                  <TypeAnimation
                    sequence={typingSequence}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">

                {/* Location */}
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  {isEditing ? (
                    <Input
                      value={editData.location}
                      onChange={e => setEditData(prev => ({ ...prev, location: e.target.value }))}
                      className="h-8 text-sm"
                    />
                  ) : (
                    <span>{portfolioData.studentDetails.location}</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  {isEditing ? (
                    <Input
                      value={editData.email}
                      onChange={e => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      className="h-8 text-sm"
                    />
                  ) : (
                    <a
                      href={`mailto:${portfolioData.studentDetails.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {portfolioData.studentDetails.email}
                    </a>
                  )}
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  {isEditing ? (
                    <Input
                      value={editData.phone}
                      onChange={e => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                      className="h-8 text-sm"
                    />
                  ) : (
                    <a
                      href={`tel:${portfolioData.studentDetails.phone}`}
                      className="hover:text-primary transition-colors"
                    >
                      {portfolioData.studentDetails.phone}
                    </a>
                  )}
                </div>

                {/* GitHub */}
                <div className="flex items-center gap-3 text-sm">
                  <Github className="h-4 w-4 text-primary" />
                  {isEditing ? (
                    <Input
                      value={editData.github}
                      onChange={e => setEditData(prev => ({ ...prev, github: e.target.value }))}
                      placeholder="GitHub URL"
                      className="h-8 text-sm"
                    />
                  ) : portfolioData.studentDetails.github ? (
                    <a
                      href={portfolioData.studentDetails.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors truncate"
                    >
                      {portfolioData.studentDetails.github.replace('https://github.com/', '')}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">Not added</span>
                  )}
                </div>
              </div>

              {/* Badges + Certifications */}
              <div className="border-t border-border/50 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Badges</span>
                  </div>
                  <span className="font-semibold">{getBadgeCount()}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span>Certifications</span>
                  </div>
                  <span className="font-semibold">{getCertificationCount()}</span>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-2 mt-4">
                  <Button onClick={handleSave} size="sm" className="flex-1">
                    <Save className="h-4 w-4 mr-1" /> Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1">
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Summary + Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">
                  About <span className="text-gradient">Me</span>
                </h2>

                {isEditMode && !isEditing && (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-1" /> Edit
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={editData.summary}
                    onChange={e => setEditData(prev => ({ ...prev, summary: e.target.value }))}
                    rows={6}
                    className="resize-none"
                  />

                  <div>
                    <label className="text-sm font-medium mb-2 block">Typing Texts (one per line)</label>
                    <Textarea
                      value={editData.typingTexts.join('\n')}
                      onChange={e =>
                        setEditData(prev => ({
                          ...prev,
                          typingTexts: e.target.value.split('\n').filter(t => t.trim())
                        }))
                      }
                      rows={4}
                      placeholder="I am a Developer.&#10;I am a Data Scientist."
                      className="resize-none"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-lg leading-relaxed text-foreground/90">
                  {portfolioData.summary}
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
            >
              {[

                { label: 'Projects', value: portfolioData.internshipProjects.length + portfolioData.personalProjects.length },
                { label: 'Internships', value: portfolioData.internships.length },
                { label: 'Skills', value: portfolioData.skills.technical.length },
                { label: 'Certifications', value: getCertificationCount() }

              ].map((stat) => (
                <div key={stat.label} className="glass-subtle rounded-xl p-4 text-center hover-lift">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
