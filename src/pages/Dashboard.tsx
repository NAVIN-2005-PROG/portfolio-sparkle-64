import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Eye, Edit, Trash2, TrendingUp, Users, BarChart } from "lucide-react";

const Dashboard = () => {
  const portfolios = [
    { id: 1, title: "My Professional Portfolio", template: "Modern Minimal", lastEdited: "2 hours ago" },
    { id: 2, title: "Creative Showcase", template: "Creative Bold", lastEdited: "1 day ago" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
            <p className="text-muted-foreground">Manage your digital portfolios</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Portfolio
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <BarChart className="w-8 h-8 text-primary" />
              <span className="text-xs text-muted-foreground">+12%</span>
            </div>
            <div className="text-3xl font-bold text-primary mb-1">2</div>
            <p className="text-muted-foreground">Active Portfolios</p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              <span className="text-xs text-muted-foreground">+24%</span>
            </div>
            <div className="text-3xl font-bold text-primary mb-1">1.2K</div>
            <p className="text-muted-foreground">Total Views</p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-primary" />
              <span className="text-xs text-muted-foreground">+8%</span>
            </div>
            <div className="text-3xl font-bold text-primary mb-1">45</div>
            <p className="text-muted-foreground">Profile Visitors</p>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recent Portfolios</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {portfolios.map((portfolio) => (
              <Card key={portfolio.id} className="p-6 hover:shadow-lg transition-all border-2 hover:border-primary/20">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{portfolio.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span>Template: {portfolio.template}</span>
                      <span>•</span>
                      <span>Edited {portfolio.lastEdited}</span>
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
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
