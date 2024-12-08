<template>
  <div class="home">
    <WeeklyView :timeslots="timeslots || []" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { fetchTimeslots } from "@/services/timeSlotService";
import { useTimeslotStore } from "@/stores/timeSlotStore";
import WeeklyView from "@/components/WeeklyView.vue";
import { initializeSSE } from "@/services/sseService";

export default defineComponent({
  name: "HomeView",
  components: { WeeklyView },
  setup() {
    const timeslotStore = useTimeslotStore();

    const loadTimeslots = async () => {
      try {
        const data = await fetchTimeslots();
        timeslotStore.setTimeSlots(data);
      } catch (error) {
        console.error("Failed to fetch timeslots:", error);
      }
    };

    onMounted(() => {
      initializeSSE();
      loadTimeslots();
    });

    const timeslots = computed(() => timeslotStore.timeslots);

    return {
      timeslots,
    };
  },
});
</script>
