import * as z from "zod"


export function getChangePasswordSchema(t?: (key: string) => string) {
    return z.object({
        currentPassword: z.string().min(1, t ? t("password_required") : "Mot de passe est requis"),
        newPassword: z.string()
            .min(8, t ? t("password_min") : "Le mot de passe doit être au moins de 8 caractères")
            .regex(/[A-Z]/, t ? t("password_uppercase") : "Le mot de passe doit contenir au moins une lettre majuscule")
            .regex(/[a-z]/, t ? t("password_lowercase") : "Le mot de passe doit contenir au moins une lettre minuscule") 
            .regex(/[0-9]/, t ? t("password_numbers") : "Le mot de passe doit contenir au moins un chiffre")
            .regex(/[@$!%*?&]/, t ? t("password_special_characters") : "Le mot de passe doit contenir au moins un caractère spécial"),
        password_confirmation: z.string().min(1, t ? t("password_confirmation_required") : "La confirmation du mot de passe est requise")

        })
        .refine((data) => data.newPassword === data.password_confirmation, {
            path: ["password_confirmation"],
            message: t ? t("password_confirmation_match") : "Les mots de passe ne correspondent pas",
        });
}

export type ChangePasswordFormValues = z.infer<
    Awaited<ReturnType<typeof getChangePasswordSchema>>
>;