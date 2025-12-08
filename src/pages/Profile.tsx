import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Mail, User, MapPin, Link as LinkIcon, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useProfile } from "@/hooks/useProfile";
import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    location: "",
    website: "",
  });
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  // Sync form data with profile
  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        bio: profile.bio || "",
        location: profile.location || "",
        website: profile.website || "",
      });
      setPhotoUrl(profile.photo_url);
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setPhotoUrl(base64);
      setHasChanges(true);
      toast.success("Photo updated!");
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
    setHasChanges(true);
    toast.success("Photo removed");
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await updateProfile({
      ...formData,
      photo_url: photoUrl,
    });
    setSaving(false);
    if (success) {
      setHasChanges(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        bio: profile.bio || "",
        location: profile.location || "",
        website: profile.website || "",
      });
      setPhotoUrl(profile.photo_url);
    }
    setHasChanges(false);
    toast.info("Changes discarded");
  };

  if (profileLoading) {
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
                {photoUrl ? (
                  <AvatarImage src={photoUrl} alt="Profile" />
                ) : null}
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {formData.first_name?.[0] || user?.email?.[0]?.toUpperCase() || "P"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2" onClick={handlePhotoClick}>
                    <Camera className="w-4 h-4" />
                    Change Photo
                  </Button>
                  {photoUrl && (
                    <Button variant="outline" size="icon" onClick={handleRemovePhoto}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
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
                    <Input
                      id="firstName"
                      value={formData.first_name}
                      onChange={(e) => handleInputChange("first_name", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange("last_name", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="pl-10 bg-muted"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
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
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button onClick={handleSave} disabled={!hasChanges || saving}>
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={!hasChanges || saving}>
                Cancel
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Subscription & Payment</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="font-medium">Current Plan</p>
                  <p className="text-sm text-muted-foreground">Free Plan</p>
                </div>
                <Button onClick={() => (window.location.href = "/subscriptions")}>
                  Upgrade Plan
                </Button>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-3">Payment Methods</h3>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
                      <div>
                        <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      Remove
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full">
                    Add Payment Method
                  </Button>
                </div>
              </div>
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
