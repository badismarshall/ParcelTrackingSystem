import { z } from "zod";

export const productDetailsValidation = z.object({
    productName: z.string().min(1, 'Product name is required'),
    productQuantity: z.coerce.number().min(1, 'Product quantity is required'),
    idExterne: z.string().min(1, 'Product id is required'),
})  