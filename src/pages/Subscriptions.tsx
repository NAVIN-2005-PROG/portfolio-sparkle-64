import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Gem, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const plans = [
  {
    name: "Free",
    price: 0,
    displayPrice: "₹0",
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
    price: 199,
    displayPrice: "₹199",
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
    buttonText: "Pay with UPI",
    buttonVariant: "default" as const,
  },
  {
    name: "Diamond",
    price: 499,
    displayPrice: "₹499",
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
    buttonText: "Pay with UPI",
    buttonVariant: "default" as const,
  },
];

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Subscriptions = () => {
  const navigate = useNavigate();

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubscribe = async (planName: string, price: number) => {
    if (planName === "Free" || price === 0) return;

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway");
        return;
      }

      toast.loading("Creating order...", { id: "order" });

      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: { amount: price, planName },
      });

      if (error) throw error;

      toast.dismiss("order");

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Poovi Portfolio",
        description: `${planName} Plan Subscription`,
        order_id: data.orderId,
        handler: function (response: any) {
          toast.success(`Payment successful! Welcome to ${planName} plan.`);
          console.log("Payment response:", response);
          // Here you can verify payment and update user subscription
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#3B82F6",
        },
        modal: {
          ondismiss: function () {
            toast.info("Payment cancelled");
          },
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      toast.dismiss("order");
      toast.error(error.message || "Failed to process payment");
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your portfolio needs. Pay securely with UPI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  plan.popular ? "border-2 border-primary ring-2 ring-primary/20" : "hover:border-primary/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl">
                    POPULAR
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center`}>
                    <plan.icon className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-1">
                    <span className="text-5xl font-bold">{plan.displayPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.period}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.buttonVariant}
                  className={`w-full py-6 text-base font-semibold ${
                    plan.popular ? "bg-primary hover:bg-primary/90" : ""
                  }`}
                  onClick={() => handleSubscribe(plan.name, plan.price)}
                  disabled={plan.name === "Free"}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              🔒 Secure payment powered by Razorpay
            </p>
            <p className="text-xs text-muted-foreground">
              All plans include secure UPI payment processing and can be cancelled anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
