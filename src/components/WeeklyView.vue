<template>
  <div class="flex flex-col w-full h-full">
    <!-- Header: Days of the week -->
    <div class="flex sticky top-0 z-10 border-b border-gray-300 bg-gray-100">
      <div class="w-16"></div>
      <!-- Placeholder for time column -->
      <div
        v-for="day in days"
        :key="day"
        class="flex-1 text-center py-2 font-bold"
      >
        {{ day }}
      </div>
    </div>

    <!-- Body: Time and Timeslots -->
    <div class="relative flex flex-1">
      <!-- Horizontal Lines -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div
          v-for="time in timeSlots"
          :key="time"
          class="bg-gray-200 absolute left-0 w-full"
          :style="{ top: `${timeSlots.indexOf(time) * 4}rem`, height: '1px' }"
        ></div>
      </div>

      <!-- Time Column -->
      <div class="flex flex-col w-16 border-r border-gray-100 bg-gray-50 z-10">
        <div
          v-for="time in timeSlots"
          :key="time"
          class="relative text-right pr-2 h-16 text-xs text-gray-500"
        >
          <div
            class="bg-gray-200 absolute left-0 w-full"
            style="height: 1px"
          ></div>
          <div class="p-2">
            {{ time }}
          </div>
        </div>
      </div>

      <!-- Days Columns -->
      <div class="flex flex-1 relative">
        <div
          v-for="day in days"
          :key="day"
          class="flex-1 border-r border-gray-300 relative"
        >
          <!-- Render Timeslots for this Day -->
          <div
            v-for="slot in filteredSlots(day)"
            :key="slot.id"
            class="absolute w-full p-0.5 rounded-md text-white text-sm"
            :style="calculateSlotStyle(slot)"
          >
            <TimeSlotComponent :timeslot="slot"></TimeSlotComponent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TimeSlotComponent from "@/components/TimeSlotComponent.vue";
import { TimeSlot } from "@/models/TimeSlot";

export default defineComponent({
  name: "WeeklyView",
  components: { TimeSlotComponent },
  props: {
    timeslots: {
      type: Array as () => TimeSlot[],
      required: true,
    },
  },
  setup(props) {
    // Assume that the array of days will be like that
    // TODO: make it more dynamic
    const days = [
      "2024-12-02",
      "2024-12-03",
      "2024-12-04",
      "2024-12-05",
      "2024-12-06",
    ];

    const timeSlots = Array.from({ length: 24 }, (_, i) => {
      const hour = i < 10 ? `0${i}:00` : `${i}:00`;
      return hour;
    });

    const filteredSlots = (day: string) => {
      return props.timeslots.filter((slot) => slot.start_time.startsWith(day));
    };

    const calculateSlotStyle = (slot: TimeSlot) => {
      const start = new Date(slot.start_time);
      const end = new Date(slot.end_time);

      const startHour = start.getUTCHours();
      const startMinutes = start.getUTCMinutes();
      const endHour = end.getUTCHours();
      const endMinutes = end.getUTCMinutes();

      const startOffset = (startHour * 60 + startMinutes) / 60;
      const endOffset = (endHour * 60 + endMinutes) / 60;

      return {
        top: `${startOffset * 4}rem`,
        height: `${(endOffset - startOffset) * 4}rem`,
      };
    };

    return {
      days,
      timeSlots,
      filteredSlots,
      calculateSlotStyle,
    };
  },
});
</script>
