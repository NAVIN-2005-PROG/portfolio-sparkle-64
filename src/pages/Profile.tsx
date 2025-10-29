import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Mail, User, MapPin, Link as LinkIcon } from "lucide-react";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" className="gap-2">
                  <Camera className="w-4 h-4" />
                  Change Photo
                </Button>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="firstName" defaultValue="John" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john@example.com"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  rows={4}
                  defaultValue="Passionate developer and designer creating beautiful digital experiences."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    defaultValue="San Francisco, CA"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button>Save Changes</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 text-destructive">Danger Zone</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
