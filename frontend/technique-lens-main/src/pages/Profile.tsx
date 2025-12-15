import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { GuestBanner } from "@/components/GuestBanner";
import { getCurrentUser, isGuest, updateUser, type User } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User as UserIcon, Building, Crown, Save } from "lucide-react";

/**
 * Profile Page
 * User profile management
 * For signed-in users: editable name, email, organization, account type
 * For guests: prominent banner encouraging sign-in
 */
const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const guest = isGuest();
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    accountType: "individual" as "individual" | "company",
  });

  useEffect(() => {
    if (!guest) {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        navigate("/");
        return;
      }
      setUser(currentUser);
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        organization: currentUser.organization || "",
        accountType: currentUser.accountType,
      });
    }
  }, [guest, navigate]);

  const handleSave = () => {
    if (!user) return;

    const updated = updateUser(formData);
    if (updated) {
      setUser(updated);
      setEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return "bg-accent text-accent-foreground";
      case "pro":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 container mx-auto px-4 pb-8">
        {guest && <GuestBanner />}

        <div className="max-w-2xl mx-auto">
          <Card className="bg-card border-border p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-heading font-bold text-glow-cyan">
                    {guest ? "Guest Profile" : user?.name || "User Profile"}
                  </h1>
                  {!guest && user && (
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getPlanColor(user.plan)}>
                        <Crown className="h-3 w-3 mr-1" />
                        {user.plan.toUpperCase()}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
              {!guest && (
                <Button
                  onClick={() => editing ? handleSave() : setEditing(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {editing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    "Edit Profile"
                  )}
                </Button>
              )}
            </div>

            {guest ? (
              <div className="text-center py-12 space-y-4">
                <UserIcon className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
                <h2 className="text-xl font-heading font-semibold">Guest Mode Active</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  You're currently using TECHNIQUERAG as a guest. Sign in or create an account
                  to access personalized features and save your analysis history.
                </p>
                <Button
                  onClick={() => navigate("/")}
                  className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Sign In / Create Account
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!editing}
                      className="bg-cyber-surface border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!editing}
                      className="bg-cyber-surface border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      disabled={!editing}
                      placeholder="Optional"
                      className="bg-cyber-surface border-border"
                    />
                  </div>

                  <div>
                    <Label htmlFor="account-type">Account Type</Label>
                    <Select
                      value={formData.accountType}
                      onValueChange={(value: "individual" | "company") =>
                        setFormData({ ...formData, accountType: value })
                      }
                      disabled={!editing}
                    >
                      <SelectTrigger id="account-type" className="bg-cyber-surface border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem value="individual">
                          <div className="flex items-center gap-2">
                            <UserIcon className="h-4 w-4" />
                            Individual
                          </div>
                        </SelectItem>
                        <SelectItem value="company">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            Company
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {user && (
                  <div className="bg-cyber-surface rounded-lg p-4 border border-border space-y-2">
                    <h3 className="font-heading font-semibold text-sm">Account Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Plan:</span>
                        <span className="ml-2 font-medium">{user.plan.toUpperCase()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Login:</span>
                        <span className="ml-2 font-medium">
                          {new Date(user.lastLogin).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {editing && (
                  <div className="pt-4 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditing(false);
                        if (user) {
                          setFormData({
                            name: user.name,
                            email: user.email,
                            organization: user.organization || "",
                            accountType: user.accountType,
                          });
                        }
                      }}
                      className="mr-2"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
