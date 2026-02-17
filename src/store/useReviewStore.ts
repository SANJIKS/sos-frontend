import { $apiClient } from "@/shared/api/api_client";
import { create } from "zustand";
import { CONTENT_TYPE } from "@/shared/types/api_types";

interface ErrorResponse {
  [key: string]: string[];
}

interface ReviewState {
  name: string;
  last_name: string;
  email: string;
  message: string;
  photo: File | null;
  setField: (field: 'name' | 'last_name' | 'email' | 'message', value: string) => void;
  setPhoto: (file: File | null) => void;
  setFieldError: (field: string, messages: string[]) => void;
  sendReview: () => Promise<void>;
  loading: boolean;
  error: ErrorResponse | null;
  success: boolean;
  reset: () => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  name: "",
  last_name: "",
  email: "",
  message: "",
  photo: null,
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

  setPhoto: (file) => {
    set({ photo: file });
  },

  setFieldError: (field, messages) => {
    set((state) => {
      const prevErrors = state.error ?? {};
      const newErrors: ErrorResponse = { ...prevErrors, [field]: messages };
      return { error: newErrors };
    });
  },

  sendReview: async () => {
    const { name, last_name, email, message, photo } = get();
    const trimmedMessage = message.trim();
    set({ loading: true, error: null, success: false });

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('last_name', last_name);
      formData.append('email', email);
      formData.append('message', trimmedMessage);
      
      if (photo) {
        formData.append('photo', photo);
      }

      const response = await $apiClient.post<FormData, any>(
        "/feedback/review-feedback/",
        formData,
        CONTENT_TYPE.FORM_DATA
      );

      if (response.success) {
        set({
          success: true,
          name: "",
          last_name: "",
          email: "",
          message: "",
          photo: null,
          error: null,
        });
      } else {
        // Если response.error уже объект с ошибками
        if (response.error && typeof response.error === 'object' && !Array.isArray(response.error)) {
          set({ error: response.error as ErrorResponse });
        } else {
          set({ error: { detail: [typeof response.error === 'string' ? response.error : "Произошла непредвиденная ошибка."] } });
        }
      }
    } catch (e: unknown) {
      const error = e instanceof Error ? e.message : 'Произошла непредвиденная ошибка.';
      set({ error: { detail: [error] } });
    } finally {
      set({ loading: false });
    }
  },

  reset: () => {
    set({
      name: "",
      last_name: "",
      email: "",
      message: "",
      photo: null,
      error: null,
      success: false,
    });
  },
}));

