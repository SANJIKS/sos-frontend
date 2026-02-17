import { create } from "zustand";
import { $apiClient } from "@/shared/api/api_client";
import { FAQ, SuccessStory } from "@/store/donatePageStore";

// === Типы для новостей ===
export type News = {
    id: number;
    title: string;
    description: string;
    image: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    order: number;
};

// === Тип состояния стора ===
interface MainPageState {
    data: {
        faq: FAQ | null;
        successStories: SuccessStory | null;
        news: News | null;
    };
    loading: boolean;
    error: string | null;

    fetchSuccessStories: (locale?: string) => Promise<void>;
    fetchFAQ: (locale?: string) => Promise<void>;
    fetchNews: (locale?: string) => Promise<void>;
}

// === Zustand store ===
export const useMainPageStore = create<MainPageState>((set) => ({
    data: {
        faq: null,
        successStories: null,
        news: null,
    },
    loading: false,
    error: null,
  fetchSuccessStories: async (locale = "ru") => {
        set({ loading: true, error: null });
        try {
            const searchParams = new URLSearchParams({ lang: locale, story_type: "success" });
            const { data: response } = await $apiClient.get<SuccessStory>(
                `/success-stories/stories/?${searchParams.toString()}`
            );

            if (response) {
                set((state) => ({
                    data: { ...state.data, successStories: response },
                }));
            } else {
                set({ error: "Ошибка при загрузке историй успеха" });
            }
        } catch {
            set({ error: "Ошибка при загрузке историй успеха" });
        } finally {
            set({ loading: false });
        }
    },

    fetchFAQ: async (locale = "ru") => {
        set({ loading: true, error: null });
        try {
            const searchParams = new URLSearchParams({ lang: locale });
            const { data: response } = await $apiClient.get<FAQ>(
                `/faq/?${searchParams.toString()}`
            );

            if (response) {
                set((state) => ({
                    data: { ...state.data, faq: response },
                }));
            } else {
                set({ error: "Ошибка при загрузке FAQ" });
            }
        } catch {
            set({ error: "Ошибка при загрузке FAQ" });
        } finally {
            set({ loading: false });
        }
    },

    fetchNews: async (locale = "ru") => {
        set({ loading: true, error: null });
        try {
            const searchParams = new URLSearchParams({ lang: locale });
            const { data: response } = await $apiClient.get<News>(
                `/news/?${searchParams.toString()}`
            );


            if (response) {
                set((state) => ({
                    data: { ...state.data, news: response },
                }));
            } else {
                set({ error: "Ошибка при загрузке новостей" });
            }
        } catch {
            set({ error: "Ошибка при загрузке новостей" });
        } finally {
            set({ loading: false });
        }
    },
}));
