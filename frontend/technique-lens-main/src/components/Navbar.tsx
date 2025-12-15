import { Shield, LogOut, User, History, LayoutDashboard } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { getCurrentUser, signOut, isGuest } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Navbar Component
 * Main navigation bar with logo, theme toggle, and user menu
 * Adapts for guest vs authenticated users
 */
export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const guest = isGuest();

  const handleSignOut = () => {
    signOut();
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Shield className="h-6 w-6 text-primary group-hover:glow-cyan transition-smooth" />
          <span className="text-xl font-heading font-bold text-glow-cyan">
            TECHNIQUERAG
          </span>
        </Link>

        {/* Navigation Links */}
        {!guest && (
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={isActive("/dashboard") ? "bg-cyber-elevated text-primary" : ""}
            >
              <Link to="/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={isActive("/history") ? "bg-cyber-elevated text-primary" : ""}
            >
              <Link to="/history">
                <History className="h-4 w-4 mr-2" />
                History
              </Link>
            </Button>
          </div>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {!guest && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-cyber-elevated">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : guest ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-accent hover:text-glow-magenta"
            >
              Sign In
            </Button>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
