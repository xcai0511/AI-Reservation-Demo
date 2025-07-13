import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import {Card, CardHeader, CardTitle, CardContent, CardDescription} from "./ui/card";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";

type Slot = {
    time: string;
    available: number;
};

const DEFAULT_SLOTS: Slot[] = [
    { time: "17:00", available: 8 },
    { time: "17:30", available: 12 },
    { time: "18:00", available: 0 },
    { time: "18:30", available: 6 },
    { time: "19:00", available: 10 },
    { time: "19:30", available: 2 },
    { time: "20:00", available: 4 },
    { time: "20:30", available: 0 },
    { time: "21:00", available: 5 },
    { time: "21:30", available: 12 },
    { time: "22:00", available: 8 },
    { time: "22:30", available: 10 }
];

const SlotManager = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [slots, setSlots] = useState<Slot[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSlots = (date: Date) => {
        setIsLoading(true);
        setTimeout(() => {
            setSlots(DEFAULT_SLOTS);
            setIsLoading(false);
        }, 300);
    };

    const handleDateChange = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) fetchSlots(date);
    };

    const blockSlot = (index: number) => {
        const updated = [...slots];
        updated[index].available = 0;
        setSlots(updated);
    };

    const unblockSlot = (index: number) => {
        const updated = [...slots];
        updated[index].available = 10;
        setSlots(updated);
    };

    const blockAll = () => {
        setSlots(slots.map(slot => ({ ...slot, available: 0 })));
    };

    const unblockAll = () => {
        setSlots(DEFAULT_SLOTS);
    };

    return (
        <Card className="mt-10">
            <CardHeader>
                <CardTitle>Manage Slot Availability</CardTitle>
                <CardDescription>
                    View and manage all restaurant available slots
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Calendar */}
                    <div>
                        <Label className="mb-2 block">Select a date</Label>
                        <Calendar mode="single" selected={selectedDate} onSelect={handleDateChange} />
                    </div>

                    {/* Slot List + Controls */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-4">
                            <Label className="text-base font-semibold">
                                {selectedDate ? `Slots for ${selectedDate.toDateString()}` : "Select a date to view slots"}
                            </Label>
                            {selectedDate && (
                                <div className="flex gap-2">
                                    <Button size="sm" variant="default" onClick={blockAll}>
                                        Block Day
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={unblockAll}>
                                        Unblock Day
                                    </Button>
                                </div>
                            )}
                        </div>

                        {isLoading ? (
                            <p className="text-gray-500">Loading slots...</p>
                        ) : (
                            <div className="space-y-2">
                                {slots.map((slot, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "flex justify-between items-center px-4 py-2 rounded-md border",
                                            slot.available === 0 ? "bg-red-50 border-red-200" : "bg-gray-50 border-gray-200"
                                        )}
                                    >
                                        <div>
                                            <span className="font-medium text-sm">{slot.time}</span>
                                            <span className={cn("ml-3 text-sm", slot.available === 0 ? "text-red-600" : "text-gray-600")}>
                        {slot.available === 0 ? "Blocked" : `${slot.available} seats`}
                      </span>
                                        </div>
                                        <div>
                                            {slot.available === 0 ? (
                                                <Button size="sm" variant="outline" onClick={() => unblockSlot(idx)}>
                                                    Unblock
                                                </Button>
                                            ) : (
                                                <Button size="sm" variant="outline" onClick={() => blockSlot(idx)}>
                                                    Block
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SlotManager;
