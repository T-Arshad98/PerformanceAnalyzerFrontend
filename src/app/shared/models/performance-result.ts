export interface PerformanceResult {
    id?: number;
    url: string;
    loadTime: number;
    resourceCount: number;
    totalSize: number;
    analyzedAt?: string;
    feedbacks?: { title: string; message: string; rating: number }[];
}