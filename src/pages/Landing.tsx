/**
 * Landing Page
 * 
 * The main marketing page that showcases:
 * - Hero section with animated particles
 * - Key features and benefits
 * - Comparison with traditional resumes
 * - Template showcase
 * - Call-to-action buttons
 */

import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AboutSection } from "@/components/AboutSection";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ComparisonSection />
      <AboutSection />
      
      <footer className="bg-secondary/50 py-8 sm:py-12 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 PortfolioBuilder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
