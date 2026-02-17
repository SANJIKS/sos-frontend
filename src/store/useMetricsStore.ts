import {create} from 'zustand'
import {$apiClient} from '@/shared/api/api_client'

export interface IMetric {
    id: number;
    metric_type: string;
    name: string;
    value: string;
    unit: string;
    date_recorded: string;
    notes: string | null;
    created_at: string;
}

interface MetricsState {
    metrics: IMetric[];
    loading: boolean;
    error: string | null;
    fetchMetrics: () => Promise<void>;
}

export const useMetricsStore = create<MetricsState>((set) => ({
    metrics: [],
    loading: false,
    error: null,

    fetchMetrics: async () => {
        set({ loading: true, error: null });
        try {
            const res = await $apiClient.get<IMetric[]>(`/digital-campaigns/metrics/`);
            if (res.success && res.data) {
                set({ metrics: res.data, loading: false });
            } else {
                set({ error: (res.error as string) || 'Ошибка загрузки', loading: false });
            }
        } catch {
            set({ error: 'Ошибка загрузки', loading: false });
        }
    },
}));
