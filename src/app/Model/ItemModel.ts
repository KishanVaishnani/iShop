import { Guid } from "guid-typescript";

export interface ItemModel {
    id: Guid;
    categoryId: number,
    name: string,
    description: string;
}
