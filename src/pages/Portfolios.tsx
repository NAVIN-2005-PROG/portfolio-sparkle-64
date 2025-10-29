import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Eye, Edit, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Portfolios = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const portfolios = [
    {
      id: 1,
      title: "My Professional Portfolio",
      template: "Modern Minimal",
      lastEdited: "2 hours ago",
      views: 234,
      status: "published",
    },
    {
      id: 2,
      title: "Creative Showcase",
      template: "Creative Bold",
      lastEdited: "1 day ago",
      views: 156,
      status: "draft",
    },
    {
      id: 3,
      title: "Developer Portfolio",
      template: "Tech Pro",
      lastEdited: "3 days ago",
      views: 892,
      status: "published",
    },
  ];

  const filteredPortfolios = portfolios.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Portfolios</h1>
            <p className="text-muted-foreground">
              Manage and organize your digital portfolios
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Portfolio
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search portfolios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredPortfolios.map((portfolio) => (
            <Card
              key={portfolio.id}
              className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/20"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{portfolio.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        portfolio.status === "published"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {portfolio.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>Template: {portfolio.template}</span>
                    <span>•</span>
                    <span>Edited {portfolio.lastEdited}</span>
                    <span>•</span>
                    <span>{portfolio.views} views</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPortfolios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No portfolios found</p>
            <Button variant="outline" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Portfolios;
