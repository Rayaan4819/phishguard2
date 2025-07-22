import Header from "@/components/Header";
import PhishingDetector from "@/components/PhishingDetector";
import InfoCards from "@/components/InfoCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <PhishingDetector />
          <InfoCards />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
