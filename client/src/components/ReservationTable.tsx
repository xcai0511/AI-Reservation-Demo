
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Calendar, Clock, Users, Mail, Phone, User, MessageSquare } from "lucide-react";

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: string;
  specialRequests: string;
  status: string;
}

interface ReservationTableProps {
  reservations: Reservation[];
}

const ReservationTable = ({ reservations }: ReservationTableProps) => {
  const getStatusBadge = (date: Date) => {
    const today = new Date();
    const reservationDate = new Date(date);
    
    if (reservationDate.toDateString() === today.toDateString()) {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Today</Badge>;
    } else if (reservationDate > today) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Upcoming</Badge>;
    } else {
      return <Badge variant="secondary">Past</Badge>;
    }
  };

  if (reservations.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No reservations found</h3>
        <p className="text-gray-600">Try adjusting your filter to see more results.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Special Requests</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id} className="hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{reservation.name}</p>
                    {/*<p className="text-sm text-gray-500">ID: {reservation.id}</p>*/}
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{reservation.email}</span>
                  </div>
                  {reservation.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-600">{reservation.phone}</span>
                    </div>
                  )}
                </div>
              </TableCell>
              
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-3 h-3 text-amber-600" />
                    <span className="font-medium">
                      {format(new Date(reservation.date), "MMM dd, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span className="text-gray-600">{reservation.time}</span>
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{reservation.guests}</span>
                </div>
              </TableCell>
              
              <TableCell>
                {getStatusBadge(reservation.date)}
              </TableCell>
              
              <TableCell>
                {reservation.specialRequests ? (
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-3 h-3 text-gray-400 mt-0.5" />
                    <span className="text-sm text-gray-600 max-w-xs">
                      {reservation.specialRequests}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">None</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationTable;
