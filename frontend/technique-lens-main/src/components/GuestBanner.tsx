import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

/**
 * GuestBanner Component
 * Warning banner for guest mode users
 * Prompts them to sign in for persistent data
 */
export const GuestBanner = () => {
  const navigate = useNavigate();

  return (
    <Alert className="bg-accent/10 border-accent mb-6">
      <AlertCircle className="h-4 w-4 text-accent" />
      <AlertDescription className="flex items-center justify-between">
        <span className="text-sm">
          <strong>Guest Mode:</strong> Your session data is temporary and will be lost on logout or refresh.
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="ml-4 text-accent hover:text-glow-magenta"
        >
          Sign In
        </Button>
      </AlertDescription>
    </Alert>
  );
};
