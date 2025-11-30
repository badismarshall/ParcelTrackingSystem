import * as z from "zod";

export function getAddUserSchema(t?: (key: string) => string) {
  return z
    .object({
      firstName: z.string().min(1, t ? t("first_name_required") : "First Name is required."),
      lastName: z.string().min(1, t ? t("last_name_required") : "Last Name is required."),
      username: z.string().min(1, t ? t("username_required") : "Username is required."),
      phoneNumber: z.string().min(1, t ? t("phone_number_required") : "Phone number is required."),
      email: z.string().trim().min(1, t ? t("email_required") : "Email is required.").email({ 
        message: t ? t("email_invalid") : "Email is invalid." 
      }),
      password: z.string()
        .min(8, t ? t("password_min") : "Le mot de passe doit être au moins de 8 caractères")
        .regex(/[A-Z]/, t ? t("password_uppercase") : "Le mot de passe doit contenir au moins une lettre majuscule")
        .regex(/[a-z]/, t ? t("password_lowercase") : "Le mot de passe doit contenir au moins une lettre minuscule") 
        .regex(/[0-9]/, t ? t("password_number") : "Le mot de passe doit contenir au moins un chiffre")
        .regex(/[@$!%*?&]/, t ? t("password_special_characters") : "Le mot de passe doit contenir au moins un caractère spécial"),
      role: z.string().min(1, t ? t("role_required") : "Role is required."),
      confirmPassword: z.string().min(1, t ? t("password_confirmation_required") : "La confirmation du mot de passe est requise"),
      isEdit: z.boolean(),
    })

    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: t ? t("password_mismatch") : "Les mots de passe ne correspondent pas",
    });;
}

export type getAddUserSchema = z.infer<
  Awaited<ReturnType<typeof getAddUserSchema>>
>;

