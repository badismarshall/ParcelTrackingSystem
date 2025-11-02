import { betterAuth, User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../lib/generated/prisma";
import { admin } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";
import { transporter } from "@/app/[locale]/(auth)/forget-password/_constants/transporteremail";
import { ResetPasswordEmail } from "@/app/[locale]/(auth)/forget-password/_emails/ResetPasswordEmail";
import { render } from '@react-email/components';
import { VerificationEmail } from "@/app/[locale]/(auth)/sign-up/_emails/VerificationEmail";

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 24 * 30, // 30 days
        },
    },
    rateLimit: {
        enabled: true,
        max: 3,
        window: 60 , // 1 minute
        message: 'Too many requests, please try again later.',
    },
    emailVerification: {
        autoSignInAfterVerification: true,
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url }) => {
            try {
                const verificationEmail = await render(VerificationEmail({ url }));
                const options = {
                    from: 'bgamer1612@gmail.com',
                    to: user.email,
                    subject: 'Verify Your Email',
                    html: verificationEmail
                };
                await transporter.sendMail(options);
            } catch (error) {
                console.error('Error sending verification email', error);
                throw error;
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        async sendResetPassword({ user, url }: { user: User, url: string }, request: any) {
            try {
                
            const resetPasswordEmail = await render(ResetPasswordEmail({ url }));
            
            const options = {
                from: 'bgamer1612@gmail.com',
                to: user.email,
                subject: 'Reset Password',
                html: resetPasswordEmail
            };
            
            await transporter.sendMail(options);

            } catch (error) {
                console.error('Error sending reset password email', error);
                throw error;
            }
        },
    },
    plugins: [
        admin(),
        nextCookies() 
    ],
});


// TODO: Add email verification