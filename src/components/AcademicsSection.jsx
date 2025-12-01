import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Edit2, Save, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePortfolio } from '@/context/PortfolioContext';
import { toast } from 'sonner';

const AcademicsSection = () => {
  const { portfolioData, updatePortfolioData, isEditMode } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [editAcademics, setEditAcademics] = useState(portfolioData.academics);

  const handleSave = () => {
    updatePortfolioData({ academics: editAcademics });
    setIsEditing(false);
    toast.success('Academics updated successfully!');
  };

  const handleCancel = () => {
    setEditAcademics(portfolioData.academics);
    setIsEditing(false);
  };

  const updateAcademic = (id, field, value) => {
    setEditAcademics(prev =>
      prev.map(a => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const addAcademic = () => {
    const newAcademic = {
      id: Date.now().toString(),
      degree: 'New Degree',
      institute: 'New Institute',
      graduationDate: 'Year'
    };
    setEditAcademics(prev => [...prev, newAcademic]);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic journey and qualifications
          </p>
          {isEditMode && !isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mt-4"
            >
              <Edit2 className="h-4 w-4 mr-1" /> Edit Education
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
            <Button onClick={addAcademic} variant="secondary" size="sm">
              <Plus className="h-4 w-4 mr-1" /> Add Education
            </Button>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          {(isEditing ? editAcademics : portfolioData.academics).map(
            (academic, index) => (
              <motion.div
                key={academic.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary shadow-lg shadow-primary/30" />

                <div className="section-card ml-4 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-primary" />
                    </div>

                    <div className="flex-1 space-y-3">
                      {isEditing ? (
                        <>
                          <Input
                            value={academic.degree}
                            onChange={e =>
                              updateAcademic(
                                academic.id,
                                'degree',
                                e.target.value
                              )
                            }
                            className="font-semibold text-lg"
                            placeholder="Degree"
                          />
                          <Input
                            value={academic.institute}
                            onChange={e =>
                              updateAcademic(
                                academic.id,
                                'institute',
                                e.target.value
                              )
                            }
                            placeholder="Institute"
                          />
                          <Input
                            value={academic.graduationDate}
                            onChange={e =>
                              updateAcademic(
                                academic.id,
                                'graduationDate',
                                e.target.value
                              )
                            }
                            placeholder="Graduation Date"
                          />
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-semibold">
                            {academic.degree}
                          </h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{academic.institute}</span>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <Calendar className="h-4 w-4" />
                            <span>{academic.graduationDate}</span>
                          </div>
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

export default AcademicsSection;
