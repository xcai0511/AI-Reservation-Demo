
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-6 flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-scale-in" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h2>
            <p className="text-gray-600">We look forward to serving you at Bella Vista</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Reservation Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium text-gray-900">{reservationData.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{reservationData.email}</p>
                </div>
              </div>

              {reservationData.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{reservationData.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-500">Party Size</p>
                  <p className="font-medium text-gray-900">{reservationData.guests} guests</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">
                    {reservationData.date ? format(reservationData.date, "EEEE, MMMM do, yyyy") : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium text-gray-900">{reservationData.time}</p>
                </div>
              </div>
            </div>

            {reservationData.specialRequests && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Special Requests</p>
                <p className="text-gray-900">{reservationData.specialRequests}</p>
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-amber-800 text-sm">
              <strong>Please note:</strong> A confirmation email has been sent to your email address. 
              If you need to modify or cancel your reservation, please call us at (555) 123-4567.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={onNewReservation}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Make Another Reservation
            </Button>
            
            <p className="text-gray-500 text-sm">
              We can't wait to welcome you to Bella Vista!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
