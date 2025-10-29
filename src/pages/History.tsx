import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Clock, Eye, Edit, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const historyItems = [
  {
    id: 1,
    action: "Created portfolio",
    portfolio: "My Professional Portfolio",
    timestamp: "2 hours ago",
    icon: FileText,
  },
  {
    id: 2,
    action: "Edited content",
    portfolio: "Creative Showcase",
    timestamp: "1 day ago",
    icon: Edit,
  },
  {
    id: 3,
    action: "Viewed portfolio",
    portfolio: "Developer Portfolio",
    timestamp: "2 days ago",
    icon: Eye,
  },
  {
    id: 4,
    action: "Updated template",
    portfolio: "My Professional Portfolio",
    timestamp: "3 days ago",
    icon: Edit,
  },
  {
    id: 5,
    action: "Created portfolio",
    portfolio: "Creative Showcase",
    timestamp: "5 days ago",
    icon: FileText,
  },
  {
    id: 6,
    action: "Edited content",
    portfolio: "Developer Portfolio",
    timestamp: "1 week ago",
    icon: Edit,
  },
];

const History = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Activity History</h1>
          <p className="text-muted-foreground">
            Track all your portfolio activities and changes
          </p>
        </div>

        <div className="space-y-4">
          {historyItems.map((item, index) => (
            <Card
              key={item.id}
              className="p-6 hover:shadow-lg transition-all border-l-4 border-l-primary/20 hover:border-l-primary"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium mb-1">{item.action}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.portfolio}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {item.timestamp}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {historyItems.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No activity yet</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default History;
