
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
      content: "Hello! I'm your Bella Vista assistant. How can I help you today? I can answer questions about our restaurant, menu, reservations, and dining experience.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("menu") || lowerMessage.includes("food")) {
      return "Our menu features exquisite fine dining cuisine with seasonal ingredients. We offer a variety of dishes including premium steaks, fresh seafood, and vegetarian options. Would you like to know about any specific dietary requirements or preferences?";
    }
    
    if (lowerMessage.includes("hours") || lowerMessage.includes("open")) {
      return "We're open daily from 5:00 PM to 11:00 PM. We recommend making a reservation to ensure your preferred dining time.";
    }
    
    if (lowerMessage.includes("reservation") || lowerMessage.includes("book")) {
      return "You can make a reservation by clicking the 'Make Reservation' button on our homepage. We accept reservations for 2-12 guests and can accommodate special requests.";
    }
    
    if (lowerMessage.includes("location") || lowerMessage.includes("address")) {
      return "Bella Vista is located in the heart of the city. For specific directions, please contact us directly or check our website for detailed location information.";
    }
    
    if (lowerMessage.includes("dress code") || lowerMessage.includes("attire")) {
      return "We maintain a smart casual to formal dress code to preserve our fine dining atmosphere. Business casual attire is perfectly appropriate.";
    }
    
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "As a fine dining establishment, our prices reflect the quality of our ingredients and service. For detailed pricing, please visit us or contact our team directly.";
    }
    
    return "Thank you for your question! For specific inquiries about our menu, reservations, or services, I'd recommend speaking with our staff directly. Is there anything else about Bella Vista I can help you with?";
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

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-600" />
            Bella Vista Assistant
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}
              >
                {!message.isUser && (
                  <Bot className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                {message.isUser && (
                  <User className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Bot className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="flex gap-2 pt-4 border-t">
          <Input
            placeholder="Ask me about Bella Vista..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            size="icon"
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBot;
