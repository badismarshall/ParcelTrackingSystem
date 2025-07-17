import { z } from "zod";

export const customerInformationValidation = z.object({
    customerName: z.string().min(1, 'Customer name is required'),
    customerEmail: z.string().email('Invalid email address'),
    customerPhone: z.string().min(1, 'Customer phone is required'),
    city: z.string().min(1, 'City is required'),
    Commune: z.string().min(1, 'Commune is required'),
    idExterne: z.string().min(1, 'ID externe is required'),
})  
