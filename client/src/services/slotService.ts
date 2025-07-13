import axios from "./axios";

const BASE_URL = "/slots";

export const fetchAllSlotsByDate = async (date: string) => {
    const response = await axios.get(`${BASE_URL}?date=${date}`);
    return await response.data;
};

export const fetchAvailableSlotsByDate = async (date: string) => {
    const res = await axios.get(`${BASE_URL}/available?date=${date}`);
    return res.data;
};

export const blockSlotById = async (id: string) => {
    const res = await axios.patch(`${BASE_URL}/${id}/block`);
    return res.data;
};

export const unblockSlotById = async (id: string) => {
    const res = await axios.patch(`${BASE_URL}/${id}/unblock`);
    return res.data;
};

export const blockAllSlots = async (date: string) => {
    const res = await axios.patch(`${BASE_URL}/block-all`, { date });
    return res.data;
};

export const unblockAllSlots = async (date: string) => {
    const res = await axios.patch(`${BASE_URL}/unblock-all`, { date });
    return res.data;
};
