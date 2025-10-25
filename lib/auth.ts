import { betterAuth, User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../lib/generated/prisma";
import { admin } from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";
import { transporter } from "@/app/[locale]/(auth)/forget-password/_constants/transporteremail";
import { ResetPasswordEmail } from "@/app/[locale]/(auth)/forget-password/_components/ResetPasswordEmail";
import { render } from '@react-email/components';

const prisma = new PrismaClient();

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        async sendResetPassword({ user, url }: { user: User, url: string }, request: any) {
            try {
            const emailHtml = await render(ResetPasswordEmail({ url }));
            
            const options = {
                from: 'bgamer1612@gmail.com',
                to: user.email,
                subject: 'Reset Password',
                html: emailHtml
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