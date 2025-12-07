/**
 * Portfolio Preview Component
 * Renders a full-screen preview of the portfolio with user data
 */

import { Button } from '@/components/ui/button';
import { X, Share2, Download } from 'lucide-react';
import { PortfolioTemplate } from '@/data/templates';
import { toast } from 'sonner';

interface PortfolioPreviewProps {
  template: PortfolioTemplate;
  data: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    skills: string[];
    linkedin: string;
    github: string;
    twitter: string;
    experience: { company: string; role: string; duration: string }[];
    projects: { name: string; description: string }[];
    education: { degree: string; institution: string; year: string }[];
  };
  customColors: {
    primaryColor: string;
    secondaryColor: string;
  };
  onClose: () => void;
  shareLink?: string;
  isPublic?: boolean;
}

export const PortfolioPreview = ({
  template,
  data,
  customColors,
  onClose,
  shareLink,
  isPublic = false,
}: PortfolioPreviewProps) => {
  const primaryColor = customColors.primaryColor || template.style.primaryColor;
  const secondaryColor = customColors.secondaryColor || template.style.secondaryColor;

  const handleShare = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-auto">
      {/* Header Controls */}
      {!isPublic && (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          {shareLink && (
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          )}
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in"
            style={{ fontFamily: template.style.fontFamily }}
          >
            {data.name}
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-6">{data.title}</p>
          <p className="text-lg opacity-80">{data.location}</p>
          <div className="flex justify-center gap-4 mt-8">
            <a
              href={`mailto:${data.email}`}
              className="px-6 py-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              Contact Me
            </a>
            {data.linkedin && (
              <a
                href={`https://${data.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8 text-center"
            style={{ color: primaryColor }}
          >
            About Me
          </h2>
          <p className="text-lg text-muted-foreground text-center leading-relaxed">
            {data.bio}
          </p>
        </div>
      </section>

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <section className="py-20 px-6 bg-secondary/30">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{ color: primaryColor }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.skills.filter(s => s.trim()).map((skill, index) => (
                <span
                  key={index}
                  className="px-6 py-3 rounded-full text-white font-medium"
                  style={{ backgroundColor: primaryColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience.some(e => e.company || e.role) && (
        <section className="py-20 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{ color: primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-8">
              {data.experience
                .filter(e => e.company || e.role)
                .map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-4 pl-6 py-4"
                    style={{ borderColor: primaryColor }}
                  >
                    <h3 className="text-xl font-bold">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-1">{exp.duration}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education.some(e => e.degree || e.institution) && (
        <section className="py-20 px-6 bg-secondary/30">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{ color: primaryColor }}
            >
              Education
            </h2>
            <div className="space-y-6">
              {data.education
                .filter(e => e.degree || e.institution)
                .map((edu, index) => (
                  <div key={index} className="text-center">
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.year}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section
        className="py-20 px-6"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Get In Touch</h2>
          <div className="space-y-4">
            <p className="text-xl">{data.email}</p>
            {data.phone && <p className="text-lg opacity-90">{data.phone}</p>}
          </div>
          <div className="flex justify-center gap-6 mt-8">
            {data.linkedin && (
              <a
                href={`https://${data.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                LinkedIn
              </a>
            )}
            {data.github && (
              <a
                href={`https://${data.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                GitHub
              </a>
            )}
            {data.twitter && (
              <a
                href={`https://twitter.com/${data.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 bg-background border-t">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {data.name}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
