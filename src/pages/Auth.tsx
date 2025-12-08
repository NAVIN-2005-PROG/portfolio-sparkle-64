import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Github, Linkedin, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "signin";
  const [isSignUp, setIsSignUp] = useState(mode === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    setIsSignUp(mode === "signup");
  }, [mode]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              first_name: name.split(" ")[0] || "Poovi",
            },
          },
        });

        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("This email is already registered. Please sign in instead.");
          } else {
            toast.error(error.message);
          }
          return;
        }

        toast.success("Account created! You can now sign in.");
        navigate("/dashboard");
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password. Please try again.");
          } else {
            toast.error(error.message);
          }
          return;
        }

        toast.success("Welcome back!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "linkedin_oidc" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast.error(`Failed to connect with ${provider}: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">P</span>
            </div>
            <span className="font-bold text-xl">Poovi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp
              ? "Start building your digital portfolio today"
              : "Sign in to continue to your portfolio"}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin("google")}
            disabled={loading}
          >
            <Mail className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin("linkedin_oidc")}
            disabled={loading}
          >
            <Linkedin className="w-5 h-5 mr-2" />
            Continue with LinkedIn
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin("github")}
            disabled={loading}
          >
            <Github className="w-5 h-5 mr-2" />
            Continue with GitHub
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          </span>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              navigate(`/auth?mode=${isSignUp ? "signin" : "signup"}`);
            }}
            className="text-primary hover:underline font-medium"
            disabled={loading}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
