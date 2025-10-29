import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  Settings, 
  LogOut, 
  Plus,
  Eye,
  Edit,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const portfolios = [
    { id: 1, title: "My Professional Portfolio", template: "Modern Minimal", lastEdited: "2 hours ago" },
    { id: 2, title: "Creative Showcase", template: "Creative Bold", lastEdited: "1 day ago" },
  ];

  return (
    <div className="min-h-screen flex bg-secondary/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">P</span>
            </div>
            <span className="font-bold text-lg">PortfolioBuilder</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Button variant="secondary" className="w-full justify-start">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="w-4 h-4 mr-2" />
            My Portfolios
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <History className="w-4 h-4 mr-2" />
            History
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </nav>

        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => navigate("/")}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
                <p className="text-muted-foreground">Manage your digital portfolios</p>
              </div>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Portfolio
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">2</div>
                <p className="text-muted-foreground">Active Portfolios</p>
              </Card>
              <Card className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">1.2K</div>
                <p className="text-muted-foreground">Total Views</p>
              </Card>
              <Card className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">45</div>
                <p className="text-muted-foreground">Profile Visitors</p>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Your Portfolios</h2>
              <div className="space-y-4">
                {portfolios.map((portfolio) => (
                  <Card key={portfolio.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{portfolio.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Template: {portfolio.template}</span>
                          <span>•</span>
                          <span>Edited {portfolio.lastEdited}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
