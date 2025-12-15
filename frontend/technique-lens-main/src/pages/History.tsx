import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { GuestBanner } from "@/components/GuestBanner";
import { isGuest } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, Trash2, RotateCcw, FileText } from "lucide-react";
import { type AnalysisResult } from "@/lib/mockData";

/**
 * History Page
 * Displays past analysis results
 * Signed-in: Persistent mock history (TODO: connect to backend)
 * Guest: sessionStorage only, cleared on logout/refresh
 */
const History = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const guest = isGuest();
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHistory, setFilteredHistory] = useState<AnalysisResult[]>([]);

  useEffect(() => {
    // Load history based on user type
    if (guest) {
      const stored = sessionStorage.getItem('analysis-history');
      if (stored) {
        try {
          setHistory(JSON.parse(stored));
        } catch (error) {
          setHistory([]);
        }
      }
    } else {
      // TODO: Load from backend
      // For now, use mock data
      const mockHistory: AnalysisResult[] = [];
      setHistory(mockHistory);
    }
  }, [guest]);

  useEffect(() => {
    // Filter history based on search query
    if (!searchQuery.trim()) {
      setFilteredHistory(history);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = history.filter((item) => {
        return (
          item.inputText.toLowerCase().includes(query) ||
          item.techniques.some((t) => 
            t.id.toLowerCase().includes(query) ||
            t.name.toLowerCase().includes(query)
          )
        );
      });
      setFilteredHistory(filtered);
    }
  }, [searchQuery, history]);

  const handleDelete = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    
    if (guest) {
      sessionStorage.setItem('analysis-history', JSON.stringify(updated));
    } else {
      // TODO: Delete from backend
    }

    toast({
      title: "Deleted",
      description: "Analysis removed from history.",
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    if (guest) {
      sessionStorage.removeItem('analysis-history');
    }
    toast({
      title: "History Cleared",
      description: "All analysis history has been cleared.",
    });
  };

  const exportHistory = (format: 'csv' | 'pdf') => {
    toast({
      title: "Export Started",
      description: `Exporting history as ${format.toUpperCase()}...`,
    });

    // TODO: Implement actual export logic
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `History exported as ${format.toUpperCase()}.`,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 container mx-auto px-4 pb-8">
        {guest && <GuestBanner />}

        <Card className="bg-card border-border p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-glow-cyan mb-2">
                Analysis History
              </h1>
              <p className="text-sm text-muted-foreground">
                {guest
                  ? "Session history (temporary)"
                  : "Your saved analysis results"}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportHistory('csv')}
                className="border-border"
              >
                <Download className="h-4 w-4 mr-1" />
                CSV
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportHistory('pdf')}
                className="border-border"
              >
                <Download className="h-4 w-4 mr-1" />
                PDF
              </Button>
              {history.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearHistory}
                  className="border-destructive text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by technique ID, name, or content..."
              className="pl-10 bg-cyber-surface border-border"
            />
          </div>

          {/* History Table */}
          {filteredHistory.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <FileText className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
              <div>
                <h3 className="text-lg font-heading font-semibold mb-2">
                  {searchQuery ? "No Results Found" : "No History Yet"}
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try a different search term"
                    : "Your analysis results will appear here"}
                </p>
              </div>
              {!searchQuery && (
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Start Analyzing
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="font-heading">Date</TableHead>
                    <TableHead className="font-heading">Input Preview</TableHead>
                    <TableHead className="font-heading">Techniques</TableHead>
                    <TableHead className="font-heading">Confidence</TableHead>
                    <TableHead className="font-heading text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((item) => (
                    <TableRow key={item.id} className="border-border hover:bg-cyber-elevated">
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(item.timestamp).toLocaleDateString()}
                        <br />
                        <span className="text-xs">
                          {new Date(item.timestamp).toLocaleTimeString()}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">{item.inputText}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.techniques.slice(0, 3).map((tech) => (
                            <Badge
                              key={tech.id}
                              variant="outline"
                              className="border-primary text-primary text-xs"
                            >
                              {tech.id}
                            </Badge>
                          ))}
                          {item.techniques.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{item.techniques.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium text-primary">
                          {(
                            item.techniques.reduce((sum, t) => sum + t.confidence, 0) /
                            item.techniques.length *
                            100
                          ).toFixed(0)}
                          %
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Re-analyze"
                            className="hover:bg-cyber-elevated"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Export"
                            className="hover:bg-cyber-elevated"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            title="Delete"
                            className="hover:bg-destructive/10 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default History;
