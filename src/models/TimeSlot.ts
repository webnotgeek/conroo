export interface Capacity {
  current_capacity: number;
  max_capacity: number;
}

export interface TimeSlot {
  id: number;
  start_time: string;
  end_time: string;
  category: CapacityType;
  capacity: Capacity;
}

export enum CapacityType {
  GREEN = "green",
  RED = "red",
  YELLOW = "yellow",
}

export interface UpdatedTimeSlot {
  id: number;
  currentCapacity: number;
  category: CapacityType;
}
