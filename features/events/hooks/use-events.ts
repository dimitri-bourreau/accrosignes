import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EventOccurrence, RecurrenceType, EventColor, EventCategory } from "../types/event.type";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch("/api/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      return response.json() as Promise<EventOccurrence[]>;
    },
  });
};

interface CreateEventData {
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime?: string;
  color?: EventColor;
  category?: EventCategory;
  authorId: string;
  recurrence?: {
    type: RecurrenceType;
    endDate: string;
  };
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateEventData) => {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create event");
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
};

interface UpdateEventData {
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime?: string;
  color?: EventColor;
  category?: EventCategory;
  adminId: string;
  recurrence?: {
    type: RecurrenceType;
    endDate: string;
  };
  scope?: "this" | "all";
  originalDate?: string;
  seriesId?: string;
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateEventData }) => {
      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update event");
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
};

interface DeleteEventData {
  id: string;
  adminId: string;
  scope?: "this" | "all";
  originalDate?: string;
  seriesId?: string;
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, adminId, scope, originalDate, seriesId }: DeleteEventData) => {
      const response = await fetch(`/api/events/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, scope, originalDate, seriesId }),
      });
      if (!response.ok) throw new Error("Failed to delete event");
      return response.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
};
