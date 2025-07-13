import axios from "./axios";

export const createReservation = async (data: {
    name: string;
    phone: string;
    party_size: number;
    reservation_date: string;
    reservation_time: string;
    special_request?: string;
}) => {
    const res = await axios.post("/reservations", data);
    return res.data;
};

export const getAllReservations = async () => {
    const res = await axios.get("/reservations");
    return res.data;
};

export const getReservationById = async (id: string) => {
    const res = await axios.get(`/reservations/${id}`);
    return res.data;
};

export const updateReservation = async (id: string, updates: any) => {
    const res = await axios.put(`/reservations/${id}`, updates);
    return res.data;
};

export const deleteReservation = async (id: string) => {
    const res = await axios.delete(`/reservations/${id}`);
    return res.data;
};