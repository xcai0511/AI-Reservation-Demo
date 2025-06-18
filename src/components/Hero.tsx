
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";

const Hero = ({ onReserveClick }: { onReserveClick: () => void }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmYmY3ZjMiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzQgNi0ydi0ySDI4djJsNiAyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
          Bella Vista
          <span className="block text-3xl font-light text-amber-700 mt-2">
            Fine Dining Experience
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          Indulge in exquisite cuisine crafted with passion. Reserve your table for an unforgettable culinary journey in the heart of the city.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-5 h-5 text-amber-600" />
            <span>Open Daily</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-amber-600" />
            <span>5:00 PM - 11:00 PM</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Users className="w-5 h-5 text-amber-600" />
            <span>2-12 Guests</span>
          </div>
        </div>
        
        <Button 
          onClick={onReserveClick}
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Make Reservation
        </Button>
      </div>
    </div>
  );
};

export default Hero;
