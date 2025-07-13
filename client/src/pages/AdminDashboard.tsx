
import { useState, useMemo } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import ReservationTable from "../components/ReservationTable";
import { Calendar, Clock, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SlotManager from "../components/SlotManager";

// Mock data for demonstration
const mockReservations = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "555-123-4567",
    date: new Date("2024-12-20"),
    time: "7:00 PM",
    guests: "4",
    specialRequests: "Birthday celebration",
    status: "upcoming"
  },
  {
    id: "2",
    name: "Jane Smith", 
    email: "jane@example.com",
    phone: "555-987-6543",
    date: new Date("2024-12-15"),
    time: "6:30 PM",
    guests: "2",
    specialRequests: "",
    status: "past"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com", 
    phone: "555-456-7890",
    date: new Date("2024-12-18"),
    time: "8:00 PM",
    guests: "6",
    specialRequests: "Dietary restrictions - vegetarian",
    status: "today"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "555-321-0987",
    date: new Date("2024-12-22"),
    time: "7:30 PM", 
    guests: "3",
    specialRequests: "",
    status: "upcoming"
  }
];

type FilterStatus = "all" | "today" | "this-week" | "upcoming" | "past";

const AdminDashboard = () => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const navigate = useNavigate();

  const filteredReservations = useMemo(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return mockReservations.filter((reservation) => {
      const reservationDate = new Date(reservation.date);
      
      switch (filterStatus) {
        case "today":
          return reservationDate.toDateString() === today.toDateString();
        case "this-week":
          return reservationDate >= startOfWeek && reservationDate <= endOfWeek;
        case "upcoming":
          return reservationDate > today;
        case "past":
          return reservationDate < today;
        default:
          return true;
      }
    });
  }, [filterStatus]);

  const getStatusCounts = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return {
      total: mockReservations.length,
      today: mockReservations.filter(r => new Date(r.date).toDateString() === today.toDateString()).length,
      thisWeek: mockReservations.filter(r => {
        const date = new Date(r.date);
        return date >= startOfWeek && date <= endOfWeek;
      }).length,
      upcoming: mockReservations.filter(r => new Date(r.date) > today).length,
      past: mockReservations.filter(r => new Date(r.date) < today).length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage restaurant reservations</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600" />
                  <span className="text-2xl font-bold">{statusCounts.total}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-2xl font-bold">{statusCounts.today}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-2xl font-bold">{statusCounts.thisWeek}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Upcoming</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <span className="text-2xl font-bold">{statusCounts.upcoming}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Reservations</h2>
              <Badge variant="secondary" className="px-3 py-1">
                {filteredReservations.length} results
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Filter by:</span>
              <Select value={filterStatus} onValueChange={(value: FilterStatus) => setFilterStatus(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reservations</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="past">Past</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Reservations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Reservation Details</CardTitle>
            <CardDescription>
              View and manage all restaurant reservations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReservationTable reservations={filteredReservations} />
          </CardContent>
        </Card>

        {/* Slot Availability Manager */}
        <SlotManager />
      </div>
    </div>
  );
};

export default AdminDashboard;
