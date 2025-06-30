
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Settings, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChatBot from "./ChatBot";

const Hero = ({ onReserveClick }: { onReserveClick: () => void }) => {
  const navigate = useNavigate();
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  return (
    <div className="relative min-h-screen luxury-gradient flex items-center justify-center overflow-hidden">
      {/* Elegant overlay pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20"></div>
      
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rotate-45"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 border border-white rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rotate-45"></div>
      </div>
      
      {/* Admin Button */}
      <div className="absolute top-8 right-8 z-20">
        <Button
          onClick={() => navigate("/admin")}
          variant="outline"
          className="bg-black/10 backdrop-blur-md border-white/20 text-white hover:bg-white/10 shadow-xl transition-all duration-300"
        >
          <Settings className="w-4 h-4 mr-2" />
          Admin Dashboard
        </Button>
      </div>

      {/* Chatbot Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <Button
          onClick={() => setIsChatBotOpen(true)}
          size="lg"
          className="gold-gradient hover:shadow-2xl text-black shadow-xl transition-all duration-300 transform hover:scale-105 rounded-full w-16 h-16 animate-elegant-glow"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-7xl font-light text-white mb-4 tracking-wide">
            Bella Vista
          </h1>
          <div className="w-24 h-0.5 gold-gradient mx-auto mb-6"></div>
          <span className="block text-2xl font-light text-white/90 tracking-widest uppercase">
            Fine Dining Experience
          </span>
        </div>
        
        <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in">
          Indulge in an extraordinary culinary journey where each dish is meticulously crafted with the finest ingredients. 
          Experience the pinnacle of gastronomy in an atmosphere of refined elegance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16 animate-fade-in">
          <div className="flex items-center gap-3 text-white/70">
            <Calendar className="w-6 h-6 text-yellow-400" />
            <span className="font-light">Open Daily</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/30"></div>
          <div className="flex items-center gap-3 text-white/70">
            <Clock className="w-6 h-6 text-yellow-400" />
            <span className="font-light">5:00 PM - 11:00 PM</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/30"></div>
          <div className="flex items-center gap-3 text-white/70">
            <Users className="w-6 h-6 text-yellow-400" />
            <span className="font-light">Intimate Dining • 2-12 Guests</span>
          </div>
        </div>
        
        <Button 
          onClick={onReserveClick}
          className="gold-gradient text-black px-12 py-6 text-lg font-medium rounded-none shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 tracking-wider uppercase animate-fade-in"
        >
          Reserve Your Table
        </Button>
      </div>

      <ChatBot open={isChatBotOpen} onOpenChange={setIsChatBotOpen} />
    </div>
  );
};

export default Hero;
