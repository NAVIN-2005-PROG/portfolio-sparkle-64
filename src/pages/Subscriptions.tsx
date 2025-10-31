import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Gem } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    icon: Check,
    color: "text-muted-foreground",
    features: [
      "1 Portfolio",
      "Basic Templates",
      "Limited Customization",
      "Community Support",
      "Standard Analytics",
    ],
    buttonText: "Current Plan",
    buttonVariant: "outline" as const,
  },
  {
    name: "Platinum",
    price: "₹199",
    period: "per month",
    icon: Crown,
    color: "text-blue-500",
    popular: true,
    features: [
      "5 Portfolios",
      "All Premium Templates",
      "Full Customization",
      "Priority Support",
      "Advanced Analytics",
      "Custom Domain",
      "Remove Branding",
    ],
    buttonText: "Upgrade to Platinum",
    buttonVariant: "default" as const,
  },
  {
    name: "Diamond",
    price: "₹499",
    period: "per month",
    icon: Gem,
    color: "text-purple-500",
    features: [
      "Unlimited Portfolios",
      "All Templates + Exclusives",
      "White Label Solution",
      "24/7 Premium Support",
      "AI-Powered Suggestions",
      "Multiple Custom Domains",
      "API Access",
      "Team Collaboration",
      "Export Options",
    ],
    buttonText: "Upgrade to Diamond",
    buttonVariant: "default" as const,
  },
];

const Subscriptions = () => {
  const navigate = useNavigate();

  const handleSubscribe = (planName: string) => {
    if (planName === "Free") return;
    // Payment gateway integration will go here
    console.log(`Subscribing to ${planName}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your portfolio needs. Upgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 sm:p-8 relative overflow-hidden transition-all hover:shadow-xl ${
                plan.popular ? "border-2 border-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
              )}
              
              <div className="text-center mb-6">
                <plan.icon className={`w-12 h-12 mx-auto mb-4 ${plan.color}`} />
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.period}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.buttonVariant}
                className="w-full"
                onClick={() => handleSubscribe(plan.name)}
                disabled={plan.name === "Free"}
              >
                {plan.buttonText}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            All plans include secure payment processing and can be cancelled anytime
          </p>
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscriptions;
