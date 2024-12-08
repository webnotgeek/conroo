<template>
  <div
    class="border-2 rounded-md h-full text-gray-600 text-left p-2"
    :class="getSlotColor(timeslot.category)"
  >
    <div>{{ calculateTimeslots(timeslot.start_time, timeslot.end_time) }}</div>
    <div>
      <strong>booked</strong>
      {{ timeslot.capacity.current_capacity }} of
      {{ timeslot.capacity.max_capacity }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { TimeSlot } from "@/models/TimeSlot";

export default defineComponent({
  name: "TimeSlotComponent",
  props: {
    timeslot: {
      type: Object as PropType<TimeSlot>,
      required: true,
    },
  },
  setup() {
    const title = ref("Hello from MyComponent");

    const calculateTimeslots = (start: string, end: string) => {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const startHour = startDate.getUTCHours();
      const startMinutes = startDate.getUTCMinutes();
      const endHour = endDate.getUTCHours();
      const endMinutes = endDate.getUTCMinutes();

      return `${startHour}:${startMinutes}0 to ${endHour}:${endMinutes}0`;
    };

    const getSlotColor = (category: string) => {
      switch (category) {
        case "green":
          return "border-green-500";
        case "red":
          return "border-red-500";
        case "yellow":
          return "border-yellow-500";
        default:
          return "border-gray-500";
      }
    };

    return {
      title,
      getSlotColor,
      calculateTimeslots,
    };
  },
});
</script>
