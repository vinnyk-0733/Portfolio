import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  User,
  ExternalLink,
  Github,
  Edit2,
  Save,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePortfolio } from '@/context/PortfolioContext';
import { toast } from 'sonner';

const ProjectsSection = () => {
  const { portfolioData, updatePortfolioData, isEditMode } = usePortfolio();
  const [isEditing, setIsEditing] = useState(false);
  const [editInternship, setEditInternship] = useState(portfolioData.internshipProjects);
  const [editPersonal, setEditPersonal] = useState(portfolioData.personalProjects);

  const handleSave = () => {
    updatePortfolioData({
      internshipProjects: editInternship,
      personalProjects: editPersonal
    });
    setIsEditing(false);
    toast.success('Projects updated successfully!');
  };

  const handleCancel = () => {
    setEditInternship(portfolioData.internshipProjects);
    setEditPersonal(portfolioData.personalProjects);
    setIsEditing(false);
  };

  const updateProject = (type, id, field, value) => {
    const setter = type === 'internship' ? setEditInternship : setEditPersonal;
    setter(prev => prev.map(p => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const addInternshipProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'New Internship Project',
      category: 'Internship Project',
      description: '',
      liveDemo: '',
      repository: ''
    };
    setEditInternship(prev => [...prev, newProject]);
  };

  const addPersonalProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'New Project',
      category: 'Personal Project',
      description: '',
      techStack: '',
      liveDemo: '',
      repository: ''
    };
    setEditPersonal(prev => [...prev, newProject]);
  };

  const removeProject = (type, id) => {
    const setter = type === 'internship' ? setEditInternship : setEditPersonal;
    setter(prev => prev.filter(p => p.id !== id));
  };

  const ProjectCard = ({ project, type, index }) => {
    const isInternship = type === 'internship';
    const projects = isInternship
      ? isEditing
        ? editInternship
        : portfolioData.internshipProjects
      : isEditing
        ? editPersonal
        : portfolioData.personalProjects;

    const projectData = projects.find(p => p.id === project.id) || project;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="section-card hover-lift group relative h-full flex flex-col"
      >
        {isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeProject(type, project.id)}
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive z-10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}

        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-10 h-10 rounded-lg ${isInternship ? 'bg-primary/20' : 'bg-chart-1/20'
              } flex items-center justify-center`}
          >
            {isInternship ? (
              <Briefcase className="h-5 w-5 text-primary" />
            ) : (
              <User className="h-5 w-5 text-chart-1" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={projectData.title}
                onChange={e =>
                  updateProject(type, project.id, 'title', e.target.value)
                }
                className="font-semibold text-lg mb-1"
              />
            ) : (
              <h3 className="text-xl font-semibold mb-1 truncate">
                {projectData.title}
              </h3>
            )}

            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              {projectData.category}
            </span>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={projectData.description}
              onChange={e =>
                updateProject(type, project.id, 'description', e.target.value)
              }
              placeholder="Project description"
              rows={3}
            />

            {!isInternship && (
              <Input
                value={projectData.techStack || ''}
                onChange={e =>
                  updateProject(type, project.id, 'techStack', e.target.value)
                }
                placeholder="Tech stack (comma separated)"
              />
            )}

            <div className="grid grid-cols-2 gap-2">
              <Input
                value={projectData.liveDemo}
                onChange={e =>
                  updateProject(type, project.id, 'liveDemo', e.target.value)
                }
                placeholder="Live demo URL"
              />
              <Input
                value={projectData.repository}
                onChange={e =>
                  updateProject(type, project.id, 'repository', e.target.value)
                }
                placeholder="Repository URL"
              />
            </div>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              {projectData.description}
            </p>

            {projectData.techStack && (
              <div className="flex flex-wrap gap-2 mb-4">
                {projectData.techStack.split(',').map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              {projectData.liveDemo && (
                <a
                  href={projectData.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              )}

              {projectData.repository && (
                <a
                  href={projectData.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  <Github className="h-4 w-4" /> Repository
                </a>
              )}
            </div>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-16 md:py-20 relative">
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
            My <span className="text-gradient">Projects</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            A showcase of my work including internship projects and personal experiments.
          </p>

          {isEditMode && !isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="mt-4"
            >
              <Edit2 className="h-4 w-4 mr-1" /> Edit Projects
            </Button>
          )}
        </motion.div>

        {/* Save/Cancel Buttons */}
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

        {/* Tabs */}
        <Tabs defaultValue="internship" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="internship" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Internship
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" /> Personal
            </TabsTrigger>
          </TabsList>

          {/* Internship Projects Tab */}
          <TabsContent value="internship">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(isEditing ? editInternship : portfolioData.internshipProjects).map(
                (project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    type="internship"
                    index={index}
                  />
                )
              )}
            </div>
          </TabsContent>

          {/* Personal Projects Tab */}
          <TabsContent value="personal">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(isEditing ? editPersonal : portfolioData.personalProjects).map(
                (project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    type="personal"
                    index={index}
                  />
                )
              )}

              {isEditing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="section-card flex items-center justify-center min-h-[200px] border-2 border-dashed border-border cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={addInternshipProject}
                >
                  <div className="text-center text-muted-foreground">
                    <Plus className="h-8 w-8 mx-auto mb-2" />
                    <span>Add Internship Project</span>
                  </div>
                </motion.div>
              )}

              {isEditing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="section-card flex items-center justify-center min-h-[200px] border-2 border-dashed border-border cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={addPersonalProject}
                >
                  <div className="text-center text-muted-foreground">
                    <Plus className="h-8 w-8 mx-auto mb-2" />
                    <span>Add Personal Project</span>
                  </div>
                </motion.div>
              )}

              {!isEditing && portfolioData.personalProjects.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No personal projects yet</p>
                  {isEditMode && (
                    <p className="text-sm">Click "Edit Projects" to add some</p>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProjectsSection;
