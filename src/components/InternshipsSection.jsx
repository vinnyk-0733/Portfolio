

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, MapPin, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePortfolio } from '@/context/PortfolioContext';
import { toast } from 'sonner';

const InternshipsSection = () => {
  const { portfolioData, updatePortfolioData, isEditMode } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [editInternships, setEditInternships] = useState(portfolioData.internships);

  const handleSave = () => {
    updatePortfolioData({ internships: editInternships });
    setIsEditing(false);
    toast.success('Experience updated successfully!');
  };

  const handleCancel = () => {
    setEditInternships(portfolioData.internships);
    setIsEditing(false);
  };

  const updateInternship = (id, field, value) => {
    setEditInternships(prev =>
      prev.map(i => (i.id === id ? { ...i, [field]: value } : i))
    );
  };

  const updateBullet = (id, bulletIndex, value) => {
    setEditInternships(prev =>
      prev.map(i => {
        if (i.id === id) {
          const newBullets = [...i.bullets];
          newBullets[bulletIndex] = value;
          return { ...i, bullets: newBullets };
        }
        return i;
      })
    );
  };

  const addBullet = (id) => {
    setEditInternships(prev =>
      prev.map(i =>
        i.id === id ? { ...i, bullets: [...i.bullets, ''] } : i
      )
    );
  };

  const removeBullet = (id, bulletIndex) => {
    setEditInternships(prev =>
      prev.map(i =>
        i.id === id
          ? { ...i, bullets: i.bullets.filter((_, idx) => idx !== bulletIndex) }
          : i
      )
    );
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and internship experiences in the tech industry.
          </p>

          {isEditMode && !isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mt-4"
            >
              <Edit2 className="h-4 w-4 mr-1" /> Edit Experience
            </Button>
          )}
        </motion.div>

        {/* Save / Cancel Buttons */}
        {isEditing && (
          <div className="flex justify-center gap-2 mb-8">
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-1" /> Save Changes
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm">
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
          </div>
        )}

        {isEditing && (
          <div className="flex justify-center mb-8">
            <Button onClick={() => setEditInternships([{
              id: Date.now().toString(),
              company: 'New Company',
              role: 'New Role',
              duration: 'Present',
              bullets: ['New responsibility']
            }, ...editInternships])} variant="outline" className="border-dashed">
              <Plus className="h-4 w-4 mr-2" /> Add Experience
            </Button>
          </div>
        )}

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto space-y-8">
          {(isEditing ? editInternships : portfolioData.internships).map(
            (internship, index) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="section-card hover-lift">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">

                    {/* Company Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-8 w-8 text-primary" />
                    </div>

                    {/* Internship Info */}
                    <div className="flex-1">
                      {isEditing ? (
                        <div className="space-y-3">

                          {/* Company */}
                          <Input
                            value={internship.company}
                            onChange={(e) =>
                              updateInternship(internship.id, 'company', e.target.value)
                            }
                            placeholder="Company name"
                            className="font-semibold text-lg"
                          />

                          {/* Role */}
                          <Input
                            value={internship.role}
                            onChange={(e) =>
                              updateInternship(internship.id, 'role', e.target.value)
                            }
                            placeholder="Role"
                          />

                          {/* Duration */}
                          <Input
                            value={internship.duration}
                            onChange={(e) =>
                              updateInternship(internship.id, 'duration', e.target.value)
                            }
                            placeholder="Duration (e.g., Apr 2024 – Aug 2025)"
                          />

                          {/* Responsibilities */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Responsibilities</label>

                            {internship.bullets.map((bullet, bulletIndex) => (
                              <div key={bulletIndex} className="flex gap-2">
                                <Textarea
                                  value={bullet}
                                  onChange={(e) =>
                                    updateBullet(internship.id, bulletIndex, e.target.value)
                                  }
                                  placeholder="Describe responsibility..."
                                  rows={2}
                                  className="flex-1"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeBullet(internship.id, bulletIndex)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addBullet(internship.id)}
                            >
                              <Plus className="h-4 w-4 mr-1" /> Add Bullet
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Display Mode */}
                          <h3 className="text-xl font-semibold mb-1">
                            {internship.company}
                          </h3>

                          <div className="flex flex-wrap gap-4 mb-4 text-sm">
                            <span className="flex items-center gap-1 text-primary font-medium">
                              <MapPin className="h-4 w-4" />
                              {internship.role}
                            </span>

                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              {internship.duration}
                            </span>
                          </div>

                          <ul className="space-y-2">
                            {internship.bullets.map((bullet, bulletIndex) => (
                              <li key={bulletIndex} className="flex items-start gap-3 text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>

      </div>
    </section>
  );
};

export default InternshipsSection;
