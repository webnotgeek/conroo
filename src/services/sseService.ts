import { useTimeslotStore } from "@/stores/timeSlotStore";

export const initializeSSE = () => {
  const timeslotStore = useTimeslotStore();

  const eventSource = new EventSource(
    "https://timeslot-stream-ha2tva3niq-ey.a.run.app/sse"
  );

  eventSource.onmessage = (event) => {
    try {
      const newTimeslot = JSON.parse(event.data);
      timeslotStore.updateTimeSlot(newTimeslot);
    } catch (error) {
      console.error("Error processing SSE data:", error);
    }
  };

  eventSource.onerror = (error) => {
    console.error("SSE connection error:", error);
    eventSource.close(); // Optionally close the connection on error
  };

  console.log("SSE connection established.");
};
