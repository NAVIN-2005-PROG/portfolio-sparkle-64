import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Copy, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const templates = [
  {
    id: 1,
    name: "Modern Minimal",
    category: "Professional",
    color: "from-blue-500 to-cyan-500",
    rating: 4.8,
    uses: 1234,
  },
  {
    id: 2,
    name: "Creative Bold",
    category: "Designer",
    color: "from-purple-500 to-pink-500",
    rating: 4.9,
    uses: 987,
  },
  {
    id: 3,
    name: "Tech Pro",
    category: "Developer",
    color: "from-green-500 to-teal-500",
    rating: 4.7,
    uses: 2341,
  },
  {
    id: 4,
    name: "Executive",
    category: "Business",
    color: "from-orange-500 to-red-500",
    rating: 4.6,
    uses: 543,
  },
  {
    id: 5,
    name: "Portfolio Plus",
    category: "Creative",
    color: "from-indigo-500 to-blue-500",
    rating: 4.8,
    uses: 876,
  },
  {
    id: 6,
    name: "Clean & Simple",
    category: "Minimal",
    color: "from-gray-600 to-gray-800",
    rating: 4.5,
    uses: 654,
  },
];

const categories = ["All", "Professional", "Designer", "Developer", "Business", "Creative", "Minimal"];

const Templates = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Templates</h1>
          <p className="text-muted-foreground">
            Choose from our collection of professionally designed templates
          </p>
        </div>

        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="flex-wrap h-auto gap-2">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates
                  .filter((t) => category === "All" || t.category === category)
                  .map((template) => (
                    <Card
                      key={template.id}
                      className="group overflow-hidden hover:shadow-xl transition-all border-2 hover:border-primary/20"
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
                        <p className="text-sm text-muted-foreground mb-3">
                          {template.category}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="font-medium">{template.rating}</span>
                          </div>
                          <span className="text-muted-foreground">
                            {template.uses.toLocaleString()} uses
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Templates;
