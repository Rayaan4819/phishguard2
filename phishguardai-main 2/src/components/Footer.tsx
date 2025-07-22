import { GraduationCap, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCap className="h-5 w-5" />
            <span className="text-sm">University Project - Cybersecurity Research</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-sm">Contact for more info</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Github className="h-4 w-4" />
              <span className="text-sm">Open Source</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t text-center text-xs text-muted-foreground">
          <p>⚠️ This is an educational tool. Always verify suspicious emails through official channels.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;