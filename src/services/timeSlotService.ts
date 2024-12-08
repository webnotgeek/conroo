import axios from "axios";
import { Timeslot } from "@/models/TimeSlot";

const baseURL = "https://timeslot-stream-ha2tva3niq-ey.a.run.app";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTimeslots = async (): Promise<Timeslot[]> => {
  const response = await apiClient.get<Timeslot[]>("/timeSlots");
  return response.data;
};

export const fetchTimeslotById = async (id: number): Promise<Timeslot> => {
  const response = await apiClient.get<Timeslot>(`/timeSlots/${id}`);
  return response.data;
};
