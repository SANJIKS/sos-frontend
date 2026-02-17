import {create} from 'zustand'
import {$apiClient} from '@/shared/api/api_client'

export interface ISocialNetwork {
    uuid: string;
    name: string;
    network_type: string;
    network_type_display: string;
    url: string;
    icon: string;
    custom_icon: string;
    is_featured: boolean;
    order: number;
}

interface SocialNetworksState {
    socialNetworks: ISocialNetwork[];
    loading: boolean;
    error: string | null;
    fetchSocialNetworks: () => Promise<void>;
}

export const useSocialNetworksStore = create<SocialNetworksState>((set) => ({
    socialNetworks: [],
    loading: false,
    error: null,

    fetchSocialNetworks: async () => {
        set({ loading: true, error: null });

        try {
            const res = await $apiClient.get<ISocialNetwork[]>('/social-networks/');

            if (res.success && res.data) {
                set({ socialNetworks: res.data, loading: false });
            } else {
                set({
                    error: (res.error as string) || 'Ошибка загрузки социальных сетей',
                    loading: false,
                });
            }
        } catch {
            set({ error: 'Ошибка загрузки социальных сетей', loading: false });
        }
    },
}));
