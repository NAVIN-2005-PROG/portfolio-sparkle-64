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
  Palette,
  Loader2
} from 'lucide-react';
import { templates, PortfolioTemplate, defaultUserData } from '@/data/templates';
import { toast } from 'sonner';
import { PortfolioPreview } from '@/components/PortfolioPreview';
import { usePortfolios } from '@/hooks/usePortfolios';
import { useAuth } from '@/hooks/useAuth';
import { Json } from '@/integrations/supabase/types';

const TemplateEditor = () => {
  const { templateId, portfolioId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createPortfolio, updatePortfolio, getPortfolioById } = usePortfolios();
  
  const [template, setTemplate] = useState<PortfolioTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [portfolioName, setPortfolioName] = useState('My Portfolio');
  const [currentPortfolioId, setCurrentPortfolioId] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
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
    const loadData = async () => {
      setLoading(true);
      
      if (portfolioId) {
        // Load existing portfolio from database
        const savedPortfolio = await getPortfolioById(portfolioId);
        if (savedPortfolio) {
          const foundTemplate = templates.find(t => t.id === savedPortfolio.template_id);
          setTemplate(foundTemplate || null);
          setPortfolioName(savedPortfolio.name);
          setCurrentPortfolioId(savedPortfolio.id);
          setShareLink(savedPortfolio.share_link);
          
          // Restore form data from saved portfolio
          const data = savedPortfolio.data as Record<string, unknown>;
          setFormData({
            name: (data?.name as string) || defaultUserData.name,
            title: (data?.title as string) || defaultUserData.title,
            email: (data?.email as string) || defaultUserData.email,
            phone: (data?.phone as string) || defaultUserData.phone,
            location: (data?.location as string) || defaultUserData.location,
            bio: (data?.bio as string) || defaultUserData.bio,
            skills: (data?.skills as string[]) || defaultUserData.skills,
            linkedin: (data?.linkedin as string) || defaultUserData.social.linkedin,
            github: (data?.github as string) || defaultUserData.social.github,
            twitter: (data?.twitter as string) || defaultUserData.social.twitter,
            experience: (data?.experience as typeof defaultUserData.experience) || defaultUserData.experience,
            projects: (data?.projects as typeof defaultUserData.projects) || defaultUserData.projects,
            education: (data?.education as typeof defaultUserData.education) || defaultUserData.education,
          });
          
          const style = savedPortfolio.style as Record<string, unknown>;
          setCustomColors({
            primaryColor: (style?.primaryColor as string) || '',
            secondaryColor: (style?.secondaryColor as string) || '',
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
      
      setLoading(false);
    };
    
    loadData();
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

  const handleSave = async () => {
    if (!template) return;
    
    if (!user) {
      toast.error('Please sign in to save your portfolio');
      navigate('/auth?mode=signup');
      return;
    }

    setSaving(true);
    
    const portfolioData = {
      ...formData,
      skills: formData.skills.filter(s => s.trim() !== ''),
    } as Json;

    const style = {
      ...template.style,
      primaryColor: customColors.primaryColor || template.style.primaryColor,
      secondaryColor: customColors.secondaryColor || template.style.secondaryColor,
    } as Json;

    if (currentPortfolioId) {
      // Update existing portfolio
      const success = await updatePortfolio(currentPortfolioId, {
        name: portfolioName,
        data: portfolioData,
        style,
      });
      
      if (!success) {
        setSaving(false);
        return;
      }
    } else {
      // Save new portfolio
      const saved = await createPortfolio(
        template.id,
        template.name,
        portfolioName,
        portfolioData,
        style
      );
      
      if (saved) {
        setCurrentPortfolioId(saved.id);
        setShareLink(saved.share_link);
        navigate(`/editor/portfolio/${saved.id}`, { replace: true });
      }
    }
    
    setSaving(false);
  };

  const handleShare = () => {
    if (!shareLink) {
      toast.error('Please save your portfolio first to get a shareable link.');
      return;
    }
    
    const fullUrl = `${window.location.origin}/portfolio/${shareLink}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success('Share link copied to clipboard!');
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

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
            <Button variant="outline" onClick={handleShare} disabled={!shareLink}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
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
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
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
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <h4 className="font-medium pt-4">Social Links</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={formData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    placeholder="github.com/yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    placeholder="@yourhandle"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Style Tab */}
          <TabsContent value="style">
            <Card className="p-6 space-y-6">
              <h3 className="text-lg font-semibold">Customize Colors</h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      id="primaryColor"
                      value={customColors.primaryColor || template.style.primaryColor}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <Input
                      value={customColors.primaryColor || template.style.primaryColor}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, primaryColor: e.target.value }))}
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      id="secondaryColor"
                      value={customColors.secondaryColor || template.style.secondaryColor}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <Input
                      value={customColors.secondaryColor || template.style.secondaryColor}
                      onChange={(e) => setCustomColors(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      placeholder="#06B6D4"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-3">Preview</h4>
                <div 
                  className="h-32 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{
                    background: `linear-gradient(135deg, ${customColors.primaryColor || template.style.primaryColor}, ${customColors.secondaryColor || template.style.secondaryColor})`
                  }}
                >
                  Your Portfolio Colors
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TemplateEditor;
