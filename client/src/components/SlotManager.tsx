import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from "./ui/card";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import {
    fetchAllSlotsByDate,
    blockSlotById,
    unblockSlotById,
    blockAllSlots,
    unblockAllSlots
} from "../services/slotService";


type Slot = {
    id: string;
    reservation_time: string;
    seats_booked: number;
    max_capacity: number;
    is_blocked: boolean;
};

const SlotManager = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAndSetSlots = async (date: Date) => {
        setIsLoading(true);
        try {
            const dateStr = date.toISOString().split("T")[0];
            const data = await fetchAllSlotsByDate(dateStr);
            setSlots(data);
        } catch (err) {
            console.error("Error fetching slots", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedDate) fetchAndSetSlots(selectedDate);
    }, [selectedDate]);

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
    };

    const handleBlock = async (id: string) => {
        await blockSlotById(id);
        if (selectedDate) fetchAndSetSlots(selectedDate);
    };

    const handleUnblock = async (id: string) => {
        await unblockSlotById(id);
        if (selectedDate) fetchAndSetSlots(selectedDate);
    };

    const handleBlockAll = async () => {
        if (!selectedDate) return;
        const dateStr = selectedDate.toISOString().split("T")[0];
        await blockAllSlots(dateStr);
        fetchAndSetSlots(selectedDate);
    };

    const handleUnblockAll = async () => {
        if (!selectedDate) return;
        const dateStr = selectedDate.toISOString().split("T")[0];
        await unblockAllSlots(dateStr);
        fetchAndSetSlots(selectedDate);
    };

    return (
        <Card className="mt-10">
            <CardHeader>
                <CardTitle>Manage Slot Availability</CardTitle>
                <CardDescription>View and manage all restaurant available slots</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div>
                        <Label className="mb-2 block">Select a date</Label>
                        <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-4">
                            <Label className="text-base font-semibold">
                                {selectedDate ? `Slots for ${selectedDate.toDateString()}` : "Select a date to view slots"}
                            </Label>
                            {selectedDate && (
                                <div className="flex gap-2">
                                    <Button size="sm" variant="default" onClick={handleBlockAll}>
                                        Block Day
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={handleUnblockAll}>
                                        Unblock Day
                                    </Button>
                                </div>
                            )}
                        </div>

                        {isLoading ? (
                            <p className="text-gray-500">Loading slots...</p>
                        ) : (
                            <div className="space-y-2">
                                {Array.isArray(slots) ? (
                                    slots.map((slot) => (
                                        <div
                                            key={slot.id}
                                            className={cn(
                                                "flex justify-between items-center px-4 py-2 rounded-md border",
                                                slot.is_blocked ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
                                            )}
                                        >
                                            <div>
                                                <span className="font-medium text-sm">{slot.reservation_time.slice(0, 5)}</span>
                                                <span className={cn("ml-3 text-sm", slot.is_blocked ? "text-red-600" : "text-gray-600")}>
                        {slot.is_blocked ? "Blocked" : `${slot.max_capacity - slot.seats_booked} seats available`}
                      </span>
                                            </div>
                                            <div>
                                                {slot.is_blocked ? (
                                                    <Button size="sm" variant="outline" onClick={() => handleUnblock(slot.id)}>
                                                        Unblock
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" variant="outline" onClick={() => handleBlock(slot.id)}>
                                                        Block
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-red-500 text-sm">Error: Slots data is not an array</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SlotManager;

