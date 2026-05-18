export interface GetDetailsService {
    getPartDetail(id: string): Promise<unknown>;
}
