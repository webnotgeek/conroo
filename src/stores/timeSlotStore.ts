import { defineStore } from "pinia";
import { Timeslot, UpdatedTimeSlot } from "@/models/TimeSlot";

export const useTimeslotStore = defineStore("timeSlot", {
  state: (): { timeslots: Timeslot[] } => ({
    timeslots: [],
  }),
  actions: {
    setTimeSlots(timeslots: Timeslot[]) {
      this.timeslots = timeslots;
    },
    updateTimeSlot(newTimeslot: UpdatedTimeSlot) {
      const updatedTimeSlotIndex = this.timeslots.findIndex(
        (slot) => slot.id === newTimeslot.id
      );

      if (updatedTimeSlotIndex !== -1) {
        this.timeslots[updatedTimeSlotIndex] = {
          ...this.timeslots[updatedTimeSlotIndex],
          ...newTimeslot,
          capacity: {
            ...this.timeslots[updatedTimeSlotIndex]?.capacity,
            current_capacity: newTimeslot.currentCapacity,
            max_capacity:
              this.timeslots[updatedTimeSlotIndex]?.capacity?.max_capacity ??
              50,
          },
        };
      }
    },
  },
  getters: {
    getTimeslots: (state) => state.timeslots,
  },
});
