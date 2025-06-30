
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatBot = ({ open, onOpenChange }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Good evening, and welcome to Bella Vista. I am your personal dining concierge. How may I assist you with your fine dining experience today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("menu") || lowerMessage.includes("food")) {
      return "Our culinary artisans craft each dish with the finest seasonal ingredients. Our menu features premium cuts of beef, fresh seafood flown in daily, and artisanal vegetarian creations. Would you like to know about our tasting menu or specific dietary accommodations?";
    }
    
    if (lowerMessage.includes("hours") || lowerMessage.includes("open")) {
      return "Bella Vista welcomes guests daily from 5:00 PM to 11:00 PM. We highly recommend securing a reservation to ensure your preferred dining time in our intimate setting.";
    }
    
    if (lowerMessage.includes("reservation") || lowerMessage.includes("book")) {
      return "I would be delighted to assist with your reservation. Please use the 'Reserve Your Table' button on our homepage. We accommodate parties of 2-12 guests and are happy to arrange special occasions or dietary requirements.";
    }
    
    if (lowerMessage.includes("location") || lowerMessage.includes("address")) {
      return "Bella Vista is situated in the heart of the city's cultural district. For precise directions and parking information, please contact our maître d' directly.";
    }
    
    if (lowerMessage.includes("dress code") || lowerMessage.includes("attire")) {
      return "We maintain an elegant dress code to complement our refined atmosphere. Smart casual to formal attire is appropriate - think business attire or cocktail dress for the evening.";
    }
    
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "Our pricing reflects the exceptional quality of our ingredients and the artistry of our culinary team. For detailed information about our offerings, I encourage you to speak with our sommelier upon arrival.";
    }
    
    return "Thank you for your inquiry. For personalized assistance with our culinary offerings or to discuss special arrangements, our team would be honored to assist you directly. Is there anything else about your Bella Vista experience I may help clarify?";
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg h-[650px] flex flex-col rounded-none shadow-2xl border-gray-200">
        <DialogHeader className="border-b border-gray-100 pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl font-light tracking-wide">
            <Bot className="w-6 h-6 text-yellow-600" />
            Bella Vista Concierge
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                {!message.isUser && (
                  <Bot className="w-8 h-8 text-yellow-600 mt-1 flex-shrink-0" />
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-none shadow-sm ${
                    message.isUser
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-900 border border-gray-100"
                  }`}
                >
                  <p className="text-sm font-light leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-60 mt-2 block font-light">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {message.isUser && (
                  <User className="w-8 h-8 text-gray-600 mt-1 flex-shrink-0" />
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <Bot className="w-8 h-8 text-yellow-600 mt-1 flex-shrink-0" />
                <div className="bg-gray-50 border border-gray-100 p-4 rounded-none shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <Input
            placeholder="How may I assist you this evening?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 rounded-none border-gray-200 focus:border-yellow-600 font-light"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="gold-gradient text-black rounded-none w-12 h-12 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBot;
