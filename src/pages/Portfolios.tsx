import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Eye, Edit, Trash2, Search, Share2, Loader2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolios } from "@/hooks/usePortfolios";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const Portfolios = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { portfolios, loading, deletePortfolio } = usePortfolios();
  const { user } = useAuth();

  const filteredPortfolios = portfolios.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyShareLink = (shareLink: string | null) => {
    if (!shareLink) return;
    const fullUrl = `${window.location.origin}/portfolio/${shareLink}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Share link copied to clipboard!");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this portfolio?")) {
      await deletePortfolio(id);
    }
  };

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Sign in to view your portfolios</h1>
          <Button onClick={() => navigate("/auth")}>Sign In</Button>
        </div>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

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
          <Button className="gap-2" onClick={() => navigate("/templates")}>
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
                    <h3 className="text-xl font-bold">{portfolio.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        portfolio.is_public
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {portfolio.is_public ? "Public" : "Private"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>Template: {portfolio.template_name}</span>
                    <span>•</span>
                    <span>
                      Edited {formatDistanceToNow(new Date(portfolio.updated_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`/portfolio/${portfolio.share_link}`, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyShareLink(portfolio.share_link)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/editor/portfolio/${portfolio.id}`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(portfolio.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {portfolios.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              You haven't created any portfolios yet
            </p>
            <Button onClick={() => navigate("/templates")}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Portfolio
            </Button>
          </div>
        )}

        {portfolios.length > 0 && filteredPortfolios.length === 0 && (
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
