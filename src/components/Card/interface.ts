// import { Roles } from "@prisma/client";

export interface IPropsCard {
    data: any;
    // image: string;
    // title: string;
    price: Price | null | undefined;
    rating: Rating | null | undefined;
    instructor: Instructor | null | undefined;
    // chapters: string;
    layout?: "columns" | "rows";
}

type Price = {
    id: string; 
    value: number; 
    currency: string; 
    discount: number | null;
}

type Rating = {
    id: string; 
    value: number; 
    reviews: number;
}

type Instructor = {
    id: string; 
    name: string | null; 
    email: string | null;
    image: string | null; 
    imageLarge: string | null; 
    createdAt: Date; 
    updatedAt: Date;
}