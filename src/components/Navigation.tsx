import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-lg shadow-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/subscriptions")}
              className="border-primary/30 hover:bg-primary/10"
            >
              <Crown className="w-4 h-4 mr-2 text-primary" />
              <span className="text-sm font-semibold">Pricing</span>
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("comparison")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Compare
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </button>
            <Button onClick={() => navigate("/dashboard")}>Get Started</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("features")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("comparison")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              >
                Compare
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
              >
                About
              </button>
              <Button onClick={() => navigate("/dashboard")}>Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
