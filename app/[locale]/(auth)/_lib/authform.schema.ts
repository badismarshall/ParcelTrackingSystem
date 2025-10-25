import * as z from "zod";


export function getSignInSchema(t?: (key: string) => string) {
  return z.object({
    email: z.string().trim().min(1, t ? t("email_required") : "Email est requis").email({
      message: t ? t("email_invalid") : "Email invalide",
    }),
    password: z.string().min(1, t ? t("password_required") : "Mot de passe est requis"),
  });
}

export type SignInFormValues = z.infer<
  Awaited<ReturnType<typeof getSignInSchema>>
>;

export function getSignUpSchema(t?: (key: string) => string) {
  return z.object({
    username: z.string()
        .min(6, t ? t("username_min") : "Nom d'utilisateur doit être au moins de 6 caractères")
        .max(20, t ? t("username_max") : "Nom d'utilisateur doit être au plus de 20 caractères")
        .regex(/^[a-zA-Z0-9_-]+$/, t ? t("username_regex") : "Le nom d'utilisateur ne peut contenir que des lettres, des chiffres, des tirets et des underscores")
        .refine((value) => !/^\d+$/.test(value), {
        message: t ? t("username_numbers") : "Le nom d'utilisateur ne peut pas contenir uniquement des chiffres",
        })
        .refine((value) => !/[@$!%*?&]/.test(value), {
        message: t ? t("username_special_characters") : "Le nom d'utilisateur ne peut pas contenir de caractères spéciaux comme @$!%*?&",
    }),
    
    email: z.string().trim().min(1, t ? t("email_required") : "Email est requis").email({
      message: t ? t("email_invalid") : "Email invalide",
    }),
    password: z.string()
        .min(8, t ? t("password_min") : "Le mot de passe doit être au moins de 8 caractères")
        .regex(/[A-Z]/, t ? t("password_uppercase") : "Le mot de passe doit contenir au moins une lettre majuscule")
        .regex(/[a-z]/, t ? t("password_lowercase") : "Le mot de passe doit contenir au moins une lettre minuscule") 
        .regex(/[0-9]/, t ? t("password_numbers") : "Le mot de passe doit contenir au moins un chiffre")
        .regex(/[@$!%*?&]/, t ? t("password_special_characters") : "Le mot de passe doit contenir au moins un caractère spécial"),
    
    password_confirmation: z.string().min(1, t ? t("password_confirmation_required") : "La confirmation du mot de passe est requise")

    })
    .refine((data) => data.password === data.password_confirmation, {
        path: ["password_confirmation"],
        message: t ? t("password_confirmation_match") : "Les mots de passe ne correspondent pas",
    });
}

export type SignUpFormValues = z.infer<
    Awaited<ReturnType<typeof getSignUpSchema>>
>;

export function getForgetPasswordSchema(t?: (key: string) => string) {
  return z.object({
    email: z.string().trim().min(1, t ? t("email_required") : "Email est requis").email({
      message: t ? t("email_invalid") : "Email invalide",
    }),
  });
}
export type ForgetPasswordFormValues = z.infer<
  Awaited<ReturnType<typeof getForgetPasswordSchema>>
>;

export function getResetPasswordSchema(t?: (key: string) => string) {
  return z.object({
    password: z.string().min(1, t ? t("password_required") : "Mot de passe est requis"),
  });
}
export type ResetPasswordFormValues = z.infer<
  Awaited<ReturnType<typeof getResetPasswordSchema>>
>;
