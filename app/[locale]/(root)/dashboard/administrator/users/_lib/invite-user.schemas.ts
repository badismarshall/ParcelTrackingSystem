import * as z from "zod";

export function getInviteUserSchema(t?: (key: string) => string) {
  return z.object({
    email: z.string().trim().min(1, t ? t("email_required") : "Email est requis").email({ 
        message: t ? t("email_invalid") : "Email invalide" 
    }),    
    role: z.string().min(1, t ? t("role_required") : "Le rôle est requis"),
    desc: z.string().max(255, t ? t("desc_max") : "La description doit être au maximum de 255 caractères").optional().or(z.literal('')),
  });
}

export type getInviteUserSchema = z.infer<
  Awaited<ReturnType<typeof getInviteUserSchema>>
>;
