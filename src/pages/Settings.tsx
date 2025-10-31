import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Lock, Palette, Globe } from "lucide-react";

const Settings = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [animations, setAnimations] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      if (systemTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Lock className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="domain" className="gap-2">
              <Globe className="w-4 h-4" />
              Domain
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your portfolios
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="portfolio-views">Portfolio View Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone views your portfolio
                    </p>
                  </div>
                  <Switch id="portfolio-views" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="marketing">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive tips, updates and special offers
                    </p>
                  </div>
                  <Switch id="marketing" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="weekly-digest">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Get a summary of your portfolio performance
                    </p>
                  </div>
                  <Switch id="weekly-digest" defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Privacy Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="public-profile">Public Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your profile visible to everyone
                    </p>
                  </div>
                  <Switch id="public-profile" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="search-engines">Search Engine Indexing</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow search engines to index your portfolios
                    </p>
                  </div>
                  <Switch id="search-engines" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="analytics">Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Track visitor analytics on your portfolios
                    </p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline">Download My Data</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Appearance</h2>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button 
                      onClick={() => setTheme("light")}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        theme === "light" ? "border-primary" : "border-transparent hover:border-muted"
                      }`}
                    >
                      <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-2"></div>
                      <p className="text-sm font-medium">Light</p>
                    </button>
                    <button 
                      onClick={() => setTheme("dark")}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        theme === "dark" ? "border-primary" : "border-transparent hover:border-muted"
                      }`}
                    >
                      <div className="w-full h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded mb-2"></div>
                      <p className="text-sm font-medium">Dark</p>
                    </button>
                    <button 
                      onClick={() => setTheme("system")}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        theme === "system" ? "border-primary" : "border-transparent hover:border-muted"
                      }`}
                    >
                      <div className="w-full h-20 bg-gradient-to-br from-gray-200 via-gray-800 to-gray-200 rounded mb-2"></div>
                      <p className="text-sm font-medium">Auto</p>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="animations">Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Show smooth transitions and animations
                    </p>
                  </div>
                  <Switch 
                    id="animations" 
                    checked={animations}
                    onCheckedChange={setAnimations}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="reduced-motion">Reduce Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimize animations for better accessibility
                    </p>
                  </div>
                  <Switch id="reduced-motion" />
                </div>

                <div className="space-y-3">
                  <Label>Font Size</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Small</Button>
                    <Button variant="outline" size="sm" className="border-primary">Medium</Button>
                    <Button variant="outline" size="sm">Large</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="domain">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Custom Domain</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Current Domain</Label>
                  <div className="p-4 bg-secondary rounded-lg">
                    <code className="text-sm">johndoe.portfoliobuilder.com</code>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Custom Domain</Label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="yourdomain.com"
                      className="flex-1 px-4 py-2 border rounded-lg bg-background"
                    />
                    <Button>Connect Domain</Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Connect your own domain name to your portfolio
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
