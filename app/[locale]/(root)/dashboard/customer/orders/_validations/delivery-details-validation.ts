import { z } from "zod";

export const deliveryDetailsValidation = z.object({
    deliveryMethod: z.string().min(1, 'Delivery method is required'),
    deliveryAddress: z.string().min(1, 'Delivery address is required'),
    deliveryPhone: z.string().min(1, 'Delivery phone is required'),
    notToDeliver: z.boolean().optional(),
    totalPrice: z.number().min(1, 'Total price is required'),
})  