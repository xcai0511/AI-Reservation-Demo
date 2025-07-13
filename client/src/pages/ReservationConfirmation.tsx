import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { CalendarDays, Clock, Users, User } from "lucide-react";

const ReservationConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const reservation = location.state?.reservation;

    if (!reservation) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-red-600">No reservation data found.</h1>
                    <Button
                        onClick={() => navigate("/")}
                        variant="outline"
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    const formattedDate = new Date(reservation.reservation_date).toLocaleDateString(undefined, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-yellow-500 text-center mb-1">🎉 Reservation Accepted</h1>
                <p className="text-center text-gray-600 mb-6">
                    We've successfully booked your reservation.
                </p>

                <div className="text-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">DEMO RESTAURANT</h2>
                </div>

                <div className="space-y-4 text-gray-700 ml-10">
                    <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-500" />
                        <span>{reservation.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <CalendarDays className="w-5 h-5 text-gray-500" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span>{reservation.reservation_time?.slice(0, 5)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-gray-500" />
                        <span>{reservation.party_size} People</span>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Button
                        variant="outline"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReservationConfirmation;
