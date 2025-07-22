import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Brain, BarChart3, AlertCircle } from "lucide-react";

const InfoCards = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms analyze email patterns, grammar, and suspicious indicators to identify potential phishing attempts."
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Risk Scoring (1-5)",
      description: "Get clear risk ratings from 1 (very safe) to 5 (high risk) with detailed explanations of detected issues and confidence levels."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Real-time Analysis",
      description: "Instant results with comprehensive breakdown of suspicious elements, helping you make informed decisions about email safety."
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-primary" />,
      title: "Educational Tool",
      description: "Learn about phishing tactics and improve your cybersecurity awareness through detailed analysis explanations."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How PhishGuard Works</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our comprehensive analysis system examines multiple factors to provide accurate phishing detection
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                {feature.icon}
              </div>
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InfoCards;