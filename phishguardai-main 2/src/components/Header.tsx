import { Shield, AlertTriangle } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-hero text-white shadow-strong">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              PhishGuard
            </h1>
          </div>
          
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Advanced AI-powered phishing detection system. Analyze suspicious emails 
            and get instant risk assessment to protect yourself from cyber threats.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse-soft" />
              <span>Real-time Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Risk Scoring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse-soft" />
              <span>University Project</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;