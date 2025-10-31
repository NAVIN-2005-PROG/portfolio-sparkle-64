import { Card } from "@/components/ui/card";
import { CheckCircle, Target, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Professional Portfolios",
    description: "Create stunning digital portfolios that showcase your work and skills professionally.",
  },
  {
    icon: Zap,
    title: "Easy to Use",
    description: "Intuitive drag-and-drop interface makes building your portfolio fast and simple.",
  },
  {
    icon: Users,
    title: "Stand Out",
    description: "Differentiate yourself from the competition with unique, interactive portfolios.",
  },
  {
    icon: CheckCircle,
    title: "Fully Customizable",
    description: "Personalize every aspect of your portfolio to match your brand and style.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              About PortfolioBuilder
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering professionals to create stunning digital portfolios that make lasting impressions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all border-2 hover:border-primary/20"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="bg-card border-2 rounded-lg p-8 sm:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Join Thousands of Professionals
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              From developers and designers to entrepreneurs and creatives, professionals worldwide trust PortfolioBuilder to showcase their work and land their dream opportunities.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-8">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">1000+</div>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">5000+</div>
                <p className="text-sm text-muted-foreground">Portfolios Created</p>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
