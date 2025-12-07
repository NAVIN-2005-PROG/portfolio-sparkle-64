/**
 * Public Portfolio Page
 * Displays a shared portfolio using its unique ID
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPortfolioById } from '@/lib/portfolio-storage';
import { templates, SavedPortfolio, defaultUserData } from '@/data/templates';
import { PortfolioPreview } from '@/components/PortfolioPreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PublicPortfolio = () => {
  const { portfolioId } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState<SavedPortfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (portfolioId) {
      const found = getPortfolioById(portfolioId);
      setPortfolio(found);
      setLoading(false);
    }
  }, [portfolioId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading portfolio...</div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <h1 className="text-2xl font-bold">Portfolio Not Found</h1>
        <p className="text-muted-foreground">
          This portfolio may have been deleted or the link is invalid.
        </p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Home
        </Button>
      </div>
    );
  }

  const template = templates.find(t => t.id === portfolio.templateId);
  
  if (!template) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <h1 className="text-2xl font-bold">Template Not Found</h1>
        <p className="text-muted-foreground">
          The template for this portfolio is no longer available.
        </p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Home
        </Button>
      </div>
    );
  }

  // Reconstruct data from saved portfolio
  const data = {
    name: (portfolio.data.name as string) || defaultUserData.name,
    title: (portfolio.data.title as string) || defaultUserData.title,
    email: (portfolio.data.email as string) || defaultUserData.email,
    phone: (portfolio.data.phone as string) || defaultUserData.phone,
    location: (portfolio.data.location as string) || defaultUserData.location,
    bio: (portfolio.data.bio as string) || defaultUserData.bio,
    skills: (portfolio.data.skills as string[]) || defaultUserData.skills,
    linkedin: (portfolio.data.linkedin as string) || defaultUserData.social.linkedin,
    github: (portfolio.data.github as string) || defaultUserData.social.github,
    twitter: (portfolio.data.twitter as string) || defaultUserData.social.twitter,
    experience: defaultUserData.experience,
    projects: defaultUserData.projects,
    education: defaultUserData.education,
  };

  const customColors = {
    primaryColor: portfolio.style.primaryColor,
    secondaryColor: portfolio.style.secondaryColor,
  };

  return (
    <PortfolioPreview
      template={template}
      data={data}
      customColors={customColors}
      onClose={() => navigate('/')}
      shareLink={portfolio.shareLink}
      isPublic={true}
    />
  );
};

export default PublicPortfolio;
