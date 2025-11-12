export interface IResponse<Entity> {
    data?: Entity;
    message?: string;
    status?: string;
}