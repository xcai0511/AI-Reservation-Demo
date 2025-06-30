
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Clock, Users, Mail, Phone, User } from "lucide-react";
import { format } from "date-fns";

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: Date | undefined;
  time: string;
  guests: string;
  specialRequests: string;
}

interface ConfirmationProps {
  reservationData: ReservationData;
  onNewReservation: () => void;
}

const Confirmation = ({ reservationData, onNewReservation }: ConfirmationProps) => {
  return (
    <div className="min-h-screen cream-gradient py-16 px-6 flex items-center justify-center">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-none shadow-2xl p-12 text-center animate-fade-in border border-gray-100">
          <div className="mb-12">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6 animate-scale-in" />
            <h2 className="text-4xl font-light text-gray-900 mb-4 tracking-wide">Reservation Confirmed</h2>
            <div className="w-16 h-0.5 gold-gradient mx-auto mb-6"></div>
            <p className="text-gray-600 font-light text-lg">We look forward to welcoming you to Bella Vista</p>
          </div>

          <div className="bg-gray-50/80 rounded-none p-8 mb-12 text-left border border-gray-100">
            <h3 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-wide">Reservation Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <User className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Guest Name</p>
                  <p className="font-light text-gray-900 text-lg">{reservationData.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Email</p>
                  <p className="font-light text-gray-900 text-lg">{reservationData.email}</p>
                </div>
              </div>

              {reservationData.phone && (
                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Phone</p>
                    <p className="font-light text-gray-900 text-lg">{reservationData.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <Users className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Party Size</p>
                  <p className="font-light text-gray-900 text-lg">{reservationData.guests} guests</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Calendar className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Date</p>
                  <p className="font-light text-gray-900 text-lg">
                    {reservationData.date ? format(reservationData.date, "EEEE, MMMM do, yyyy") : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Time</p>
                  <p className="font-light text-gray-900 text-lg">{reservationData.time}</p>
                </div>
              </div>
            </div>

            {reservationData.specialRequests && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500 uppercase tracking-wider font-medium mb-2">Special Requests</p>
                <p className="text-gray-900 font-light text-lg leading-relaxed">{reservationData.specialRequests}</p>
              </div>
            )}
          </div>

          <div className="bg-yellow-50/80 border border-yellow-200/50 rounded-none p-6 mb-12">
            <p className="text-yellow-800 font-light leading-relaxed">
              <strong className="font-medium">Please note:</strong> A confirmation email has been sent to your address. 
              For any modifications or cancellations, please contact us at <strong>(555) 123-4567</strong>.
            </p>
          </div>

          <div className="space-y-6">
            <Button
              onClick={onNewReservation}
              className="w-full gold-gradient text-black py-6 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300 rounded-none tracking-wider"
            >
              Make Another Reservation
            </Button>
            
            <p className="text-gray-500 font-light italic text-lg">
              We anticipate the pleasure of your company at Bella Vista
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
