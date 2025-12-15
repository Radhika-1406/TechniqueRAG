import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { GuestBanner } from "@/components/GuestBanner";
import { isGuest } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Upload, Sparkles, RotateCcw, Download, Save, Trash2 } from "lucide-react";
import { sampleCTIText, generateMockAnalysis, type AnalysisResult } from "@/lib/mockData";

/**
 * Dashboard Page
 * Main analysis interface with input/output panels
 * Left: Text input, file upload, sample selector
 * Right: Analysis results with MITRE techniques
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const guest = isGuest();
  
  const [inputText, setInputText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Check authentication
    if (!guest && !sessionStorage.getItem('techniquerag-session')) {
      const user = localStorage.getItem('techniquerag-user');
      if (!user) {
        navigate("/");
      }
    }
  }, [navigate, guest]);

  const handleAnalyze = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter CTI text to analyze.",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const analysis = generateMockAnalysis(inputText);
      setResult(analysis);
      
      // Save to history
      if (guest) {
        const history = JSON.parse(sessionStorage.getItem('analysis-history') || '[]');
        history.unshift(analysis);
        sessionStorage.setItem('analysis-history', JSON.stringify(history.slice(0, 50)));
      } else {
        // TODO: Save to backend
      }

      setAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: `Detected ${analysis.techniques.length} MITRE ATT&CK techniques.`,
      });
    }, 2000);
  };

  const handleClear = () => {
    setInputText("");
    setResult(null);
  };

  const loadSample = () => {
    setInputText(sampleCTIText);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.txt') && !file.name.endsWith('.json')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a .txt or .json file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInputText(text);
      toast({
        title: "File Loaded",
        description: `Successfully loaded ${file.name}`,
      });
    };
    reader.readAsText(file);
  };

  const exportResults = (format: 'json' | 'csv' | 'pdf') => {
    if (!result) return;

    toast({
      title: "Export Started",
      description: `Exporting results as ${format.toUpperCase()}...`,
    });

    // TODO: Implement actual export logic
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Results exported as ${format.toUpperCase()}.`,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 container mx-auto px-4 pb-8">
        {guest && <GuestBanner />}

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <Card className="bg-card border-border p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold text-glow-cyan">Input</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadSample}
                  className="border-secondary text-secondary hover:bg-secondary/10"
                >
                  Load Sample
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                  className="border-destructive text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="cti-input">CTI Content</Label>
                <Textarea
                  id="cti-input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste your cyber threat intelligence text here..."
                  className="min-h-[300px] bg-cyber-surface border-border font-mono text-sm resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild className="border-border">
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </span>
                  </Button>
                </Label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="text-xs text-muted-foreground">
                  Accepts .txt, .json files
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-type">User Type (Optional)</Label>
                <Select>
                  <SelectTrigger id="user-type" className="bg-cyber-surface border-border">
                    <SelectValue placeholder="Select user type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="individual">Individual Analyst</SelectItem>
                    <SelectItem value="company">Company / Organization</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={analyzing || !inputText.trim()}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-cyan font-semibold"
              >
                {analyzing ? (
                  <>
                    <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze CTI
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Output Panel */}
          <Card className="bg-card border-border p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-heading font-bold text-glow-purple">Results</h2>
              {result && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportResults('json')}
                    className="border-border"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    JSON
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportResults('csv')}
                    className="border-border"
                  >
                    CSV
                  </Button>
                  {!guest && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary"
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>

            {!result ? (
              <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
                <div className="text-center space-y-2">
                  <Sparkles className="h-12 w-12 mx-auto opacity-50" />
                  <p>No analysis yet. Enter CTI text and click Analyze.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-cyber-surface rounded-lg p-4 border border-border">
                  <p className="text-sm text-muted-foreground mb-2">Summary</p>
                  <p className="text-sm">{result.summary}</p>
                </div>

                <div>
                  <h3 className="text-lg font-heading font-semibold mb-3">
                    Detected Techniques
                  </h3>
                  <div className="space-y-3">
                    {result.techniques.map((technique) => (
                      <div
                        key={technique.id}
                        className="bg-cyber-surface rounded-lg p-4 border border-border hover:border-primary transition-smooth"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="border-primary text-primary">
                                {technique.id}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                {technique.tacticName}
                              </Badge>
                            </div>
                            <h4 className="font-semibold text-sm">{technique.name}</h4>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground mb-1">Confidence</div>
                            <div className="text-lg font-bold text-primary">
                              {(technique.confidence * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {technique.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
