import { Card } from "@/components/ui/card";
import { FileText, Globe, Check, X } from "lucide-react";

export const ComparisonSection = () => {
  return (
    <section id="comparison" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Traditional Resume vs Digital Portfolio
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              See why leading professionals are switching to digital portfolios
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Traditional Resume */}
            <Card className="p-6 sm:p-8 bg-card border-2 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <FileText className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Traditional Resume</h3>
                  <p className="text-sm text-muted-foreground">PDF/Paper Format</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Static content with no interactivity
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Limited formatting options
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-muted-foreground">
                    No multimedia support
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Difficult to update and share
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Looks the same as everyone else's
                  </p>
                </div>
              </div>
            </Card>

            {/* Digital Portfolio */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-2 border-primary/20 hover:shadow-xl hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Digital Portfolio</h3>
                  <p className="text-sm text-primary">Modern & Interactive</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base">
                    <strong>Interactive & Animated</strong> - Engage visitors with smooth animations
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base">
                    <strong>Fully Customizable</strong> - Choose from 50+ professional templates
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base">
                    <strong>Multimedia Support</strong> - Add images, videos, and projects
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base">
                    <strong>Real-time Updates</strong> - Change and share instantly
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm sm:text-base">
                    <strong>Unique & Professional</strong> - Stand out from the crowd
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
