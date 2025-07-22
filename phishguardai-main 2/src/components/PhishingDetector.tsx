import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Mail, Clock, Eye } from "lucide-react";
import { toast } from "sonner";

interface HighlightedText {
  text: string;
  riskLevel: "none" | "low" | "medium" | "high";
  reason?: string;
}

interface AnalysisResult {
  riskScore: number;
  riskLevel: "Very Low" | "Low" | "Medium" | "High" | "Very High";
  issues: string[];
  summary: string;
  confidence: number;
  highlightedContent: HighlightedText[];
}

const PhishingDetector = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const highlightText = (text: string): HighlightedText[] => {
    const suspiciousKeywords = [
        "urgent", "verify account", "click here", "limited time", "act now", 
  "suspended", "confirm identity", "winner", "prize", "congratulations",
  "tax refund", "inheritance", "lottery", "prince", "million dollars",
  "free gift", "exclusive deal", "security alert", "update your info", 
  "account locked", "unauthorized login", "reset password", "claim now", 
  "risk-free", "guaranteed", "easy money", "investment opportunity", 
  "double your income", "no credit check", "pre-approved", 
  "wire transfer", "Bitcoin", "crypto", "act immediately", 
  "limited availability", "secret deal", "dear customer", 
  "bank notice", "social security", "insurance payout", 
  "unclaimed funds", "congrats", "get paid", "urgent message", 
  "confirm now", "malware", "virus detected", "your device is at risk"
    ];
    
    const mediumRiskPatterns = [
      /\b[A-Z]{3,}\b/g, // All caps words
      /!!+/g, // Multiple exclamation marks
      /\$\d+(?:,\d{3})*(?:\.\d{2})?/g, // Money amounts
    ];
    
    const highRiskPatterns = [
      /https?:\/\/[^\s]+/g, // URLs
      /\b\w+@\w+\.\w+/g, // Email addresses
    ];

    let result: HighlightedText[] = [];
    let currentIndex = 0;
    
    // Find all patterns and their positions
    const matches: Array<{start: number, end: number, level: "low" | "medium" | "high", reason: string}> = [];
    
    // High risk patterns
    highRiskPatterns.forEach((pattern, patternIndex) => {
      const patternMatches = [...text.matchAll(pattern)];
      patternMatches.forEach(match => {
        if (match.index !== undefined) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            level: "high",
            reason: patternIndex === 0 ? "Suspicious link" : "Email address in content"
          });
        }
      });
    });
    
    // Medium risk patterns
    mediumRiskPatterns.forEach((pattern, patternIndex) => {
      const patternMatches = [...text.matchAll(pattern)];
      patternMatches.forEach(match => {
        if (match.index !== undefined) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            level: "medium",
            reason: patternIndex === 0 ? "Excessive capitalization" : 
                   patternIndex === 1 ? "Excessive punctuation" : "Money mentioned"
          });
        }
      });
    });
    
    // Suspicious keywords (low risk)
    suspiciousKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const keywordMatches = [...text.matchAll(regex)];
      keywordMatches.forEach(match => {
        if (match.index !== undefined) {
          matches.push({
            start: match.index,
            end: match.index + match[0].length,
            level: "low",
            reason: "Suspicious keyword"
          });
        }
      });
    });
    
    // Sort matches by start position
    matches.sort((a, b) => a.start - b.start);
    
    // Remove overlapping matches, keeping highest risk
    const filteredMatches = matches.filter((match, index) => {
      const nextMatch = matches[index + 1];
      if (nextMatch && match.end > nextMatch.start) {
        const riskOrder = {"high": 3, "medium": 2, "low": 1};
        return riskOrder[match.level] >= riskOrder[nextMatch.level];
      }
      return true;
    });
    
    // Build highlighted text array
    filteredMatches.forEach(match => {
      // Add text before match
      if (currentIndex < match.start) {
        result.push({
          text: text.slice(currentIndex, match.start),
          riskLevel: "none"
        });
      }
      
      // Add highlighted match
      result.push({
        text: text.slice(match.start, match.end),
        riskLevel: match.level,
        reason: match.reason
      });
      
      currentIndex = match.end;
    });
    
    // Add remaining text
    if (currentIndex < text.length) {
      result.push({
        text: text.slice(currentIndex),
        riskLevel: "none"
      });
    }
    
    return result.length > 0 ? result : [{text, riskLevel: "none"}];
  };

  const analyzeEmail = async () => {
    if (!emailAddress.trim() || !emailBody.trim()) {
      toast.error("Please fill in both email address and body");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
     // Mock analysis logic
 const suspiciousKeywords = [
  "urgent", "verify account", "click here", "limited time", "act now", 
  "suspended", "confirm identity", "winner", "prize", "congratulations",
  "tax refund", "inheritance", "lottery", "prince", "million dollars",
  "free gift", "exclusive deal", "security alert", "update your info", 
  "account locked", "unauthorized login", "reset password", "claim now", 
  "risk-free", "guaranteed", "easy money", "investment opportunity", 
  "double your income", "no credit check", "pre-approved", 
  "wire transfer", "Bitcoin", "crypto", "act immediately", 
  "limited availability", "secret deal", "dear customer", 
  "bank notice", "social security", "insurance payout", 
  "unclaimed funds", "congrats", "get paid", "urgent message", 
  "confirm now", "malware", "virus detected", "your device is at risk"
];
    const grammarIssues = [
      "unusual capitalization", "poor grammar", "spelling errors", 
      "inconsistent formatting", "unusual punctuation"
    ];
    
    const emailLower = emailBody.toLowerCase();
    const addressLower = emailAddress.toLowerCase();
    
    let riskScore = 1;
    const issues: string[] = [];
    
    // Check for suspicious keywords
    const foundKeywords = suspiciousKeywords.filter(keyword => 
      emailLower.includes(keyword)
    );
    if (foundKeywords.length > 0) {
      riskScore += Math.min(foundKeywords.length * 0.5, 2);
      issues.push(`Contains suspicious phrases: ${foundKeywords.slice(0, 3).join(", ")}`);
    }
    
    // Check email domain and address patterns
  if (addressLower.includes("noreply@") || addressLower.includes("support@") || 
    addressLower.includes("admin@") || addressLower.includes("helpdesk@") || 
    addressLower.includes("service@") || addressLower.includes("security@") || 
    addressLower.includes("update@") || addressLower.includes("account@") || 
    addressLower.includes("webmaster@") || addressLower.includes("paypal@") || 
    addressLower.includes("appleid@") || addressLower.includes("netflix@") || 
    addressLower.includes("amazon@") || addressLower.includes("billing@") || 
    addressLower.includes("contact@") || addressLower.includes("team@") || 
    addressLower.includes("customerservice@") || addressLower.includes("verify@") || 
    addressLower.includes("alert@") || addressLower.includes("notice@") || 
    addressLower.includes("recovery@") || addressLower.includes("reset@") || 
    addressLower.includes("login@") || addressLower.includes("access@") || 
    addressLower.includes("unusualactivity@") || addressLower.includes("bank@") || 
    addressLower.includes("finance@") || addressLower.includes("official@") || 
    addressLower.includes("gov@") || addressLower.includes("irs@") || 
    addressLower.includes("lottery@") || addressLower.includes("reward@") || 
    addressLower.includes("winnings@") || addressLower.includes("claim@") || 
    addressLower.includes("crypto@") || addressLower.includes("wallet@") || 
    addressLower.includes("btc@") || addressLower.includes("satoshi@") || 
    addressLower.includes("transfer@") || addressLower.includes("fund@") || 
    addressLower.includes("payment@") || addressLower.includes("congrats@") || 
    addressLower.includes("winner@") || addressLower.includes("free@") || 
    addressLower.includes("gift@") || addressLower.includes("securemail@") || 
    addressLower.includes("secure-update@") || addressLower.includes("verify-now@") || 
    addressLower.includes("quickaccess@") || addressLower.includes("instantclaim@")) {
  riskScore += 0.5;
  issues.push("Sender email contains suspicious pattern");
}

    
    // Check for urgency indicators
    if (emailLower.includes("urgent") || emailLower.includes("immediately")) {
      riskScore += 1;
      issues.push("Creates false sense of urgency");
    }
    
    // Check for grammar issues (simplified)
    if (emailBody.includes("!!!") || emailBody.match(/[A-Z]{10,}/)) {
      riskScore += 0.5;
      issues.push("Poor formatting or excessive capitalization");
    }
    
    // Cap at 5
    riskScore = Math.min(Math.round(riskScore * 10) / 10, 5);
    
    let riskLevel: AnalysisResult["riskLevel"];
    if (riskScore <= 1.5) riskLevel = "Very Low";
    else if (riskScore <= 2.5) riskLevel = "Low";
    else if (riskScore <= 3.5) riskLevel = "Medium";
    else if (riskScore <= 4.5) riskLevel = "High";
    else riskLevel = "Very High";
    
    const confidence = Math.min(85 + Math.random() * 10, 95);
    
    setResult({
      riskScore,
      riskLevel,
      issues: issues.length > 0 ? issues : ["No significant red flags detected"],
      summary: riskScore > 3 ? 
        "This email shows multiple indicators of a potential phishing attempt. Exercise extreme caution." :
        riskScore > 2 ?
        "This email has some suspicious characteristics. Verify the sender before taking action." :
        "This email appears relatively safe, but always verify unexpected requests.",
      confidence,
      highlightedContent: highlightText(emailBody)
    });
    
    setIsAnalyzing(false);
    toast.success("Analysis complete!");
  };

  const getRiskColor = (score: number) => {
    if (score <= 1.5) return "safe";
    if (score <= 2.5) return "safe";
    if (score <= 3.5) return "warning";
    return "danger";
  };

  const getRiskIcon = (score: number) => {
    if (score <= 2.5) return <Shield className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Form */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Email Analysis
          </CardTitle>
          <CardDescription>
            Paste the email address and body content below for phishing analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email-address">Sender Email Address</Label>
            <Input
              id="email-address"
              type="email"
              placeholder="e.g., sender@example.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="shadow-soft"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email-body">Email Body Content</Label>
            <Textarea
              id="email-body"
              placeholder="Paste the complete email content here..."
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              rows={8}
              className="shadow-soft resize-none"
            />
          </div>
          
          <Button 
            onClick={analyzeEmail}
            disabled={isAnalyzing || !emailAddress.trim() || !emailBody.trim()}
            variant="gradient"
            size="lg"
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Analyzing Email...
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                Analyze for Phishing
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="shadow-strong">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getRiskIcon(result.riskScore)}
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Risk Score Display */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl font-bold text-foreground">
                  {result.riskScore}/5
                </div>
                <Badge 
                  variant={getRiskColor(result.riskScore) === "safe" ? "default" : 
                          getRiskColor(result.riskScore) === "warning" ? "secondary" : "destructive"}
                  className="text-lg px-4 py-2"
                >
                  {result.riskLevel} Risk
                </Badge>
              </div>
              
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    getRiskColor(result.riskScore) === "safe" ? "bg-gradient-safe" :
                    getRiskColor(result.riskScore) === "warning" ? "bg-gradient-to-r from-warning to-warning" :
                    "bg-gradient-danger"
                  }`}
                  style={{ width: `${(result.riskScore / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Summary */}
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-2">Summary</p>
                <p className="font-medium">{result.summary}</p>
              </CardContent>
            </Card>

            {/* Highlighted Email Content */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Email Content Analysis:</h4>
              <div className="p-4 bg-muted/30 rounded-lg border text-sm leading-relaxed">
                {result.highlightedContent.map((segment, index) => (
                  <span
                    key={index}
                    className={
                      segment.riskLevel === "high" ? "bg-danger/20 text-danger-foreground px-1 rounded" :
                      segment.riskLevel === "medium" ? "bg-warning/20 text-warning-foreground px-1 rounded" :
                      segment.riskLevel === "low" ? "bg-safe/20 text-safe-foreground px-1 rounded" :
                      ""
                    }
                    title={segment.reason}
                  >
                    {segment.text}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-danger/20 rounded"></div>
                  <span>High Risk</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-warning/20 rounded"></div>
                  <span>Medium Risk</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-safe/20 rounded"></div>
                  <span>Low Risk</span>
                </div>
              </div>
            </div>

            {/* Issues Found */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Issues Detected:</h4>
              <div className="space-y-2">
                {result.issues.map((issue, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence */}
            <div className="flex items-center gap-2 pt-4 border-t">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Confidence: {result.confidence.toFixed(1)}%
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PhishingDetector;