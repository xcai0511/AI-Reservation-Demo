
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "../lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Users, Mail, Phone, User } from "lucide-react";

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: Date | undefined;
  time: string;
  guests: string;
  specialRequests: string;
}

interface ReservationFormProps {
  onSubmit: (data: ReservationData) => void;
  onBack: () => void;
}

const ReservationForm = ({ onSubmit, onBack }: ReservationFormProps) => {
  const [formData, setFormData] = useState<ReservationData>({
    name: "",
    email: "",
    phone: "",
    date: undefined,
    time: "",
    guests: "",
    specialRequests: ""
  });

  const timeSlots = [
    "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", 
    "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", 
    "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.date && formData.time && formData.guests) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen cream-gradient py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-none shadow-2xl p-12 animate-fade-in border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">Reserve Your Table</h2>
            <div className="w-16 h-0.5 gold-gradient mx-auto mb-6"></div>
            <p className="text-gray-600 font-light">Please provide your details to secure your reservation at Bella Vista</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="flex items-center gap-2 text-gray-800 font-medium tracking-wide">
                  <User className="w-4 h-4 text-yellow-600" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-gray-200 focus:border-yellow-600 focus:ring-yellow-600/20 rounded-none h-12 font-light"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="flex items-center gap-2 text-gray-800 font-medium tracking-wide">
                  <Mail className="w-4 h-4 text-yellow-600" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-gray-200 focus:border-yellow-600 focus:ring-yellow-600/20 rounded-none h-12 font-light"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone" className="flex items-center gap-2 text-gray-800 font-medium tracking-wide">
                <Phone className="w-4 h-4 text-yellow-600" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="border-gray-200 focus:border-yellow-600 focus:ring-yellow-600/20 rounded-none h-12 font-light"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <Label className="text-gray-800 font-medium tracking-wide">Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-light border-gray-200 hover:border-yellow-600 rounded-none h-12",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-4 w-4 text-yellow-600" />
                      {formData.date ? format(formData.date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-none shadow-xl" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData({ ...formData, date })}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-4"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-3">
                <Label className="text-gray-800 font-medium tracking-wide">Preferred Time</Label>
                <Select value={formData.time} onValueChange={(time) => setFormData({ ...formData, time })}>
                  <SelectTrigger className="border-gray-200 focus:border-yellow-600 rounded-none h-12 font-light">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none shadow-xl">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time} className="font-light">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-gray-800 font-medium tracking-wide">
                  <Users className="w-4 h-4 text-yellow-600" />
                  Party Size
                </Label>
                <Select value={formData.guests} onValueChange={(guests) => setFormData({ ...formData, guests })}>
                  <SelectTrigger className="border-gray-200 focus:border-yellow-600 rounded-none h-12 font-light">
                    <SelectValue placeholder="Number of guests" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none shadow-xl">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <SelectItem key={num} value={num.toString()} className="font-light">
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="requests" className="text-gray-800 font-medium tracking-wide">Special Requests</Label>
              <textarea
                id="requests"
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Dietary restrictions, celebrations, special accommodations..."
                className="w-full p-4 border border-gray-200 rounded-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600/20 resize-none font-light"
                rows={4}
              />
            </div>

            <div className="flex gap-6 pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 border-gray-300 hover:bg-gray-50 rounded-none h-14 font-medium tracking-wide"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 gold-gradient text-black rounded-none h-14 font-medium tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Confirm Reservation
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
