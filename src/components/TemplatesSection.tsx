import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    name: "Modern Minimal",
    category: "Professional",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Creative Bold",
    category: "Designer",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Tech Pro",
    category: "Developer",
    color: "from-green-500 to-teal-500",
  },
  {
    name: "Executive",
    category: "Business",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Portfolio Plus",
    category: "Creative",
    color: "from-indigo-500 to-blue-500",
  },
  {
    name: "Clean & Simple",
    category: "Minimal",
    color: "from-gray-600 to-gray-800",
  },
];

export const TemplatesSection = () => {
  const navigate = useNavigate();

  return (
    <section id="templates" className="py-16 sm:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Beautiful Templates to Start With
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose a template and customize it to make it uniquely yours
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10">
            {templates.map((template, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-xl transition-all cursor-pointer border-2 hover:border-primary/20"
              >
                <div
                  className={`h-48 bg-gradient-to-br ${template.color} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="relative z-10 text-white text-center">
                    <div className="w-full max-w-[200px] mx-auto space-y-3 px-4">
                      <div className="h-3 bg-white/30 rounded"></div>
                      <div className="h-8 bg-white/50 rounded"></div>
                      <div className="h-2 bg-white/30 rounded w-3/4 mx-auto"></div>
                      <div className="flex gap-2 justify-center">
                        <div className="w-16 h-6 bg-white/40 rounded"></div>
                        <div className="w-16 h-6 bg-white/40 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Copy className="w-4 h-4 mr-1" />
                      Use
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.category}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" onClick={() => navigate("/auth?mode=signup")}>
              Start Building Your Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
