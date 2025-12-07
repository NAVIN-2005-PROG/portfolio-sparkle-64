/**
 * Template Editor Page
 * Allows users to customize and edit their portfolio template
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, 
  Eye, 
  Share2, 
  ArrowLeft, 
  Plus, 
  X,
  User,
  Briefcase,
  GraduationCap,
  Mail,
  Palette
} from 'lucide-react';
import { templates, PortfolioTemplate, defaultUserData } from '@/data/templates';
import { savePortfolio, updatePortfolio, getPortfolioById, createPortfolioData } from '@/lib/portfolio-storage';
import { toast } from 'sonner';
import { PortfolioPreview } from '@/components/PortfolioPreview';

const TemplateEditor = () => {
  const { templateId, portfolioId } = useParams();
  const navigate = useNavigate();
  
  const [template, setTemplate] = useState<PortfolioTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [portfolioName, setPortfolioName] = useState('My Portfolio');
  
  // Form data state
  const [formData, setFormData] = useState({
    name: defaultUserData.name,
    title: defaultUserData.title,
    email: defaultUserData.email,
    phone: defaultUserData.phone,
    location: defaultUserData.location,
    bio: defaultUserData.bio,
    skills: [...defaultUserData.skills],
    linkedin: defaultUserData.social.linkedin,
    github: defaultUserData.social.github,
    twitter: defaultUserData.social.twitter,
    experience: [...defaultUserData.experience],
    projects: [...defaultUserData.projects],
    education: [...defaultUserData.education],
  });

  const [customColors, setCustomColors] = useState({
    primaryColor: '',
    secondaryColor: '',
  });

  useEffect(() => {
    // Load existing portfolio or template
    if (portfolioId) {
      const savedPortfolio = getPortfolioById(portfolioId);
      if (savedPortfolio) {
        const foundTemplate = templates.find(t => t.id === savedPortfolio.templateId);
        setTemplate(foundTemplate || null);
        setPortfolioName(savedPortfolio.name);
        
        // Restore form data from saved portfolio
        const data = savedPortfolio.data;
        setFormData({
          name: (data.name as string) || defaultUserData.name,
          title: (data.title as string) || defaultUserData.title,
          email: (data.email as string) || defaultUserData.email,
          phone: (data.phone as string) || defaultUserData.phone,
          location: (data.location as string) || defaultUserData.location,
          bio: (data.bio as string) || defaultUserData.bio,
          skills: (data.skills as string[]) || defaultUserData.skills,
          linkedin: (data.linkedin as string) || defaultUserData.social.linkedin,
          github: (data.github as string) || defaultUserData.social.github,
          twitter: (data.twitter as string) || defaultUserData.social.twitter,
          experience: defaultUserData.experience,
          projects: defaultUserData.projects,
          education: defaultUserData.education,
        });
        
        setCustomColors({
          primaryColor: savedPortfolio.style.primaryColor,
          secondaryColor: savedPortfolio.style.secondaryColor,
        });
      }
    } else if (templateId) {
      const foundTemplate = templates.find(t => t.id === parseInt(templateId));
      setTemplate(foundTemplate || null);
      if (foundTemplate) {
        setCustomColors({
          primaryColor: foundTemplate.style.primaryColor,
          secondaryColor: foundTemplate.style.secondaryColor,
        });
      }
    }
  }, [templateId, portfolioId]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillAdd = () => {
    setFormData(prev => ({ ...prev, skills: [...prev.skills, ''] }));
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };

  const handleSkillRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    if (!template) return;

    const portfolioData = {
      ...formData,
      skills: formData.skills.filter(s => s.trim() !== ''),
    };

    const style = {
      ...template.style,
      primaryColor: customColors.primaryColor || template.style.primaryColor,
      secondaryColor: customColors.secondaryColor || template.style.secondaryColor,
    };

    if (portfolioId) {
      // Update existing portfolio
      const updated = updatePortfolio(portfolioId, {
        name: portfolioName,
        data: portfolioData,
        style,
      });
      
      if (updated) {
        toast.success('Portfolio updated successfully!');
      }
    } else {
      // Save new portfolio
      const saved = savePortfolio({
        templateId: template.id,
        templateName: template.name,
        name: portfolioName,
        updatedAt: new Date().toISOString(),
        data: portfolioData,
        style,
      });
      
      toast.success('Portfolio saved successfully!');
      navigate(`/editor/portfolio/${saved.id}`);
    }
  };

  const handleShare = () => {
    if (!portfolioId) {
      toast.error('Please save your portfolio first to get a shareable link.');
      return;
    }
    
    const portfolio = getPortfolioById(portfolioId);
    if (portfolio) {
      navigator.clipboard.writeText(portfolio.shareLink);
      toast.success('Share link copied to clipboard!');
    }
  };

  if (!template) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Template not found</p>
        </div>
      </DashboardLayout>
    );
  }

  if (showPreview) {
    return (
      <PortfolioPreview
        template={template}
        data={formData}
        customColors={customColors}
        onClose={() => setShowPreview(false)}
      />
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/templates')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <Input
                value={portfolioName}
                onChange={(e) => setPortfolioName(e.target.value)}
                className="text-xl font-bold border-none p-0 h-auto focus-visible:ring-0"
                placeholder="Portfolio Name"
              />
              <p className="text-sm text-muted-foreground">
                Using: {template.name} template
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Editor Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Experience</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">Education</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="style" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Style</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal">
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Full Stack Developer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio / About</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Write a short bio about yourself..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                />
              </div>

              {/* Skills Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Skills</Label>
                  <Button variant="outline" size="sm" onClick={handleSkillAdd}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Skill
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Input
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        className="w-32"
                        placeholder="Skill name"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleSkillRemove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-semibold">Work Experience</h3>
              
              {formData.experience.map((exp, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...formData.experience];
                          newExp[index] = { ...newExp[index], company: e.target.value };
                          setFormData(prev => ({ ...prev, experience: newExp }));
                        }}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input
                        value={exp.role}
                        onChange={(e) => {
                          const newExp = [...formData.experience];
                          newExp[index] = { ...newExp[index], role: e.target.value };
                          setFormData(prev => ({ ...prev, experience: newExp }));
                        }}
                        placeholder="Your role"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => {
                        const newExp = [...formData.experience];
                        newExp[index] = { ...newExp[index], duration: e.target.value };
                        setFormData(prev => ({ ...prev, experience: newExp }));
                      }}
                      placeholder="e.g., 2021 - Present"
                    />
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    experience: [...prev.experience, { company: '', role: '', duration: '' }],
                  }));
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-semibold">Education</h3>
              
              {formData.education.map((edu, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdu = [...formData.education];
                        newEdu[index] = { ...newEdu[index], degree: e.target.value };
                        setFormData(prev => ({ ...prev, education: newEdu }));
                      }}
                      placeholder="Degree name"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        value={edu.institution}
                        onChange={(e) => {
                          const newEdu = [...formData.education];
                          newEdu[index] = { ...newEdu[index], institution: e.target.value };
                          setFormData(prev => ({ ...prev, education: newEdu }));
                        }}
                        placeholder="University/College name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Year</Label>
                      <Input
                        value={edu.year}
                        onChange={(e) => {
                          const newEdu = [...formData.education];
                          newEdu[index] = { ...newEdu[index], year: e.target.value };
                          setFormData(prev => ({ ...prev, education: newEdu }));
                        }}
                        placeholder="Graduation year"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    education: [...prev.education, { degree: '', institution: '', year: '' }],
                  }));
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-semibold">Contact & Social</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Social Links</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      placeholder="github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={formData.twitter}
                      onChange={(e) => handleInputChange('twitter', e.target.value)}
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Style Tab */}
          <TabsContent value="style">
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-semibold">Customize Style</h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="primaryColor"
                      value={customColors.primaryColor || template.style.primaryColor}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={customColors.primaryColor || template.style.primaryColor}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, primaryColor: e.target.value }))}
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="secondaryColor"
                      value={customColors.secondaryColor || template.style.secondaryColor}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <Input
                      value={customColors.secondaryColor || template.style.secondaryColor}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      placeholder="#06B6D4"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Font Family</Label>
                <p className="text-sm text-muted-foreground">
                  Current font: {template.style.fontFamily}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Layout Style</Label>
                <p className="text-sm text-muted-foreground capitalize">
                  {template.style.layout}
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TemplateEditor;
