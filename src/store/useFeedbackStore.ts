import { $apiClient } from "@/shared/api/api_client";
import { create } from "zustand";

interface ErrorResponse {
  [key: string]: string[];
}

interface FeedbackState {
  full_name: string;
  email: string;
  message: string;
  setField: (field: keyof Omit<FeedbackState, 'setField' | 'sendFeedback' | 'loading' | 'error' | 'success'>, value: string) => void;
  setFieldError: (field: string, messages: string[]) => void;
  sendFeedback: (recipientEmail?: string) => Promise<void>;
  loading: boolean;
  error: ErrorResponse | null; 
  success: boolean;
}

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  full_name: "",
  email: "",
  message: "",
  loading: false,
  error: null,
  success: false,

  setField: (field, value) => {
    set((state) => {
      const prevErrors = state.error ?? {};
      const newErrors = { ...prevErrors } as ErrorResponse;
      if (newErrors[field]) {
        delete newErrors[field];
      }
      return {
        [field]: value,
        error: Object.keys(newErrors).length > 0 ? newErrors : null,
      };
    });
  },

  setFieldError: (field, messages) => {
    set((state) => {
      const prevErrors = state.error ?? {};
      const newErrors: ErrorResponse = { ...prevErrors, [field]: messages };
      return { error: newErrors };
    });
  },

  sendFeedback: async (recipientEmail?: string) => {
    const { full_name, email, message } = get();
    const trimmedMessage = message.trim();
    set({ loading: true, error: null, success: false });

    try {
      const payload: {
        full_name: string;
        email: string;
        message: string;
        recipient_email?: string;
      } = {
        full_name,
        email,
        message: trimmedMessage,
      };
      
      if (recipientEmail) {
        payload.recipient_email = recipientEmail;
      }

      await $apiClient.post("/contacts/form/", payload);
      set({ 
        success: true, 
        full_name: "", 
        email: "", 
        message: "",
        error: null,
      });
    } catch (e: unknown) {
      const error = e instanceof Error ? e.message : 'Произошла непредвиденная ошибка.';
      set({ error: { detail: [error] } });
    } finally {
      set({ loading: false });
    }
  },
}));