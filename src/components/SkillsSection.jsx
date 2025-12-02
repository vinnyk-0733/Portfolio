import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Heart, Users, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePortfolio } from '@/context/PortfolioContext';
import { toast } from 'sonner';

const SkillsSection = () => {
  const { portfolioData, updatePortfolioData, isEditMode } = usePortfolio();
  console.log("SkillsSection rendering with:", portfolioData.skills);
  const [isEditing, setIsEditing] = useState(false);
  const [editSkills, setEditSkills] = useState(portfolioData.skills);
  const [newSkill, setNewSkill] = useState({ technical: '', interests: '', soft: '' });

  // Sync local state with global state when it changes
  React.useEffect(() => {
    setEditSkills(portfolioData.skills);
  }, [portfolioData.skills]);

  const handleSave = () => {
    updatePortfolioData({ skills: editSkills });
    setIsEditing(false);
    toast.success('Skills updated successfully!');
  };

  const handleCancel = () => {
    setEditSkills(portfolioData.skills);
    setIsEditing(false);
  };

  const addSkill = (category) => {
    if (newSkill[category].trim()) {
      setEditSkills(prev => ({
        ...prev,
        [category]: [...prev[category], newSkill[category].trim()]
      }));
      setNewSkill(prev => ({ ...prev, [category]: '' }));
    }
  };

  const removeSkill = (category, index) => {
    setEditSkills(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const skillCategories = [
    { key: 'technical', label: 'Technical Skills', icon: Code, color: 'primary' },
    { key: 'interests', label: 'Interests', icon: Heart, color: 'chart-1' },
    { key: 'soft', label: 'Soft Skills', icon: Users, color: 'chart-2' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-16 md:py-20 relative">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="text-gradient">Interests</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise, areas of interest,
            and interpersonal abilities.
          </p>

          {isEditMode && !isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mt-4"
            >
              <Edit2 className="h-4 w-4 mr-1" /> Edit Skills
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

        {/* Skill Sections */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <motion.div
              key={category.key}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="section-card"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg bg-${category.color}/20 flex items-center justify-center`}>
                  <category.icon className={`h-5 w-5 text-${category.color}`} />
                </div>
                <h3 className="text-xl font-semibold">
                  {category.label}
                  <span className="text-xs text-muted-foreground ml-2">
                    ({(isEditing ? editSkills : portfolioData.skills)[category.key]?.length || 0})
                  </span>
                </h3>
              </div>

              {/* Skill List */}
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editSkills : portfolioData.skills)[category.key].map(
                  (skill, index) => (
                    <motion.div
                      key={`${skill}-${index}`}
                      // variants={itemVariants}
                      initial={{ opacity: 1, y: 0 }}
                      className={`skill-tag ${isEditing ? 'pr-1' : ''}`}
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(category.key, index)}
                          className="ml-2 p-1 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </motion.div>
                  )
                )}
              </div>

              {/* Add Skill Input */}
              {isEditing && (
                <div className="flex gap-2 mt-4">
                  <Input
                    value={newSkill[category.key]}
                    onChange={(e) =>
                      setNewSkill(prev => ({
                        ...prev,
                        [category.key]: e.target.value
                      }))
                    }
                    placeholder={`Add ${category.label.toLowerCase().slice(0, -1)}`}
                    className="h-9"
                    onKeyPress={(e) =>
                      e.key === 'Enter' && addSkill(category.key)
                    }
                  />
                  <Button size="sm" onClick={() => addSkill(category.key)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
