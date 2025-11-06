import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Zap, Lock, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { signIn, signUp, continueAsGuest, getCurrentUser } from "@/lib/auth";
import { initTheme } from "@/lib/theme";

/**
 * Index / Landing Page
 * Hero section with project introduction
 * Sign-in and sign-up forms
 * Continue as guest option
 */
const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initTheme();
    // Redirect if already logged in
    if (getCurrentUser()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password, name);
        toast({
          title: "Welcome to TECHNIQUERAG!",
          description: "Your account has been created successfully.",
        });
      } else {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });
      }
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Authentication Error",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    continueAsGuest();
    toast({
      title: "Guest Mode Active",
      description: "Your data will be temporary. Sign in to save your work.",
      variant: "default",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield className="h-12 w-12 text-primary glow-cyan" />
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
            <span className="text-glow-cyan">TECHNIQUE</span>
            <span className="text-glow-purple">RAG</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Retrieval Augmented Generation for Adversarial Technique Annotation
            in Cyber Threat Intelligence
          </p>

          {/* Feature bullets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-6 hover:border-primary transition-smooth hover-lift">
              <Zap className="h-8 w-8 text-primary mb-3 mx-auto" />
              <h3 className="font-heading font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Advanced RAG technology for accurate threat detection
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-6 hover:border-secondary transition-smooth hover-lift">
              <Lock className="h-8 w-8 text-secondary mb-3 mx-auto" />
              <h3 className="font-heading font-semibold mb-2">MITRE ATT&CK</h3>
              <p className="text-sm text-muted-foreground">
                Automatic mapping to industry-standard framework
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur border border-border rounded-lg p-6 hover:border-accent transition-smooth hover-lift">
              <TrendingUp className="h-8 w-8 text-accent mb-3 mx-auto" />
              <h3 className="font-heading font-semibold mb-2">Real-time Insights</h3>
              <p className="text-sm text-muted-foreground">
                Instant analysis with confidence scoring
              </p>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-card/80 backdrop-blur-lg border border-border rounded-xl p-8 shadow-2xl">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-heading font-bold">
                {isSignUp ? "Create Account" : "Sign In"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required={isSignUp}
                    className="bg-cyber-surface border-border"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="bg-cyber-surface border-border"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-cyber-surface border-border"
                />
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Button variant="link" size="sm" className="text-primary hover:text-glow-cyan">
                    Forgot password?
                  </Button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan font-semibold"
                disabled={loading}
              >
                {loading ? (
                  "Processing..."
                ) : isSignUp ? (
                  <>
                    Create Account <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-accent text-accent hover:bg-accent/10"
              onClick={handleGuestAccess}
            >
              Continue as Guest
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <Button
                variant="link"
                className="text-secondary hover:text-glow-purple p-0 h-auto"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
