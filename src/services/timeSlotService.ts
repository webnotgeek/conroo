import axios from "axios";
import { TimeSlot } from "@/models/TimeSlot";

const baseURL = "https://timeslot-stream-ha2tva3niq-ey.a.run.app";

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTimeslots = async (): Promise<TimeSlot[]> => {
  const response = await apiClient.get<TimeSlot[]>("/timeSlots");
  return response.data;
};
